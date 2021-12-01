const bunyan = require('bunyan');
const packageJson = require('./package.json');
const fs = require('fs');
const OpenJtalk = require('./openjtalk')
const Softalk = require('./softalk')
const Discord = require('discord.js');
const yaml = require("js-yaml");

const log = bunyan.createLogger({name: 'damare', level: 'debug'});
let useVoiceClient;
let voiceClient;

log.info("Damare 読み上げBot v" + packageJson.version);
log.info("開発者: 巳波みなと https://minato86.me")
log.info("このソフトウェアが気に入ったらサポートをお願いします: https://ko-fi.com/minato86")

if (fs.existsSync('./voice.wav')) {
    log.debug('⚠️  voice.wavが見つかりました、削除します')
    fs.unlinkSync('./voice.wav');
    log.debug('✅ voice.wavが削除されました')
}

try {
    log.debug("🔄 設定ファイルを読み込みます")
    config = yaml.load(
        fs.readFileSync("./config.yml", "utf-8")
    );
} catch (error) {
    log.fatal('💥 設定ファイルが見つかりませんでした. 起動には設定ファイルが必要です. 詳しくは公式サイトをご覧ください: https://damare.m86.work/')
    log.error(error);
    process.exit(1);
}

if (!config.voiceclient) {
    log.warn("⚠️  設定ファイルにvoiceclientが設定されていません. デフォルト設定のSoftalkを使用します.")
    useVoiceClient = 1;
} else {
    useVoiceClient = config.voiceclient;
}

if (useVoiceClient == 1) {
    voiceClient = new Softalk(log);
} else if (useVoiceClient == 2) {
    voiceClient = new OpenJtalk(log);
}


log.debug('✅ 設定ファイルを読み込みました')

const client = new Discord.Client();
const broadcast = client.voice.createBroadcast();
let connection = null;
let readMessages = [];
let canReadMessage = true;
let readChannel = null;
let prefix = config.prefix;

client.on('ready', () => {
    log.info('✨ Discordログイン完了！あなたのお名前：' + client.user.tag);
});

client.on('message', async message => {
    if (!message.guild) return;

    if (message.guild.id != config.useguild) return;

    if (message.content === `${prefix}talk`) {
        if (message.member.voice.channel) {
            readChannel = message.channel.id
            connection = await message.member.voice.channel.join();
            connection.play(broadcast, {volume: 0.3});
            
            message.reply('✨ VCに接続しました！');

            log.info(`💫 ボイスチャンネルに接続しました！チャンネル名: ${message.member.voice.channel.name}`);
            log.debug(`ℹ️  接続先チャンネル: ${message.member.voice.channel.name}, 実行ユーザ: ${message.author.tag}`)
        } else {
            message.reply('⚠️ まずはボイスチャンネルに接続してください！');
            log.debug(`🚫 ユーザーがVCにいないため、接続できませんでした. 実行ユーザ: ${message.author.tag}`);
        }
    }

    if (message.content === `${prefix}stop`) {
        if (connection === null) {
            message.reply('⚠️ ボイスチャンネルに接続されていないので、切断ができませんでした。');
        } else {
            connection.disconnect();
            connection = null;
            readChannel = null;

            message.reply('👍 無事切断できました')
            log.info(`🛠️  VCから切断しました. 実行ユーザ: ${message.author.tag}`);
        }
    }

    if (message.content === `${prefix}reset`) {
        readMessages = [];
        canReadMessage = true;
        message.reply('💥 読み上げ状態をリセットしました');
    }

    if (message.content === `${prefix}help`) {
        message.reply('```\n'+
            'Damare 読み上げBot コマンドリスト\n' +
            'Author:巳波みなと Version:v' + packageJson.version + '\n' +
            'https://github.com/Chipsnet/damare\n\n' +
            `${prefix}talk : 現在のテキストチャンネルを現在入っているVCで読み上げます。\n` +
            `${prefix}stop : 再生を停止してVCから切断します。\n` +
            `${prefix}reset : 読み上げ状態や内部のキューをリセットします。問題が発生した場合にのみ使用してください。\n` +
            `${prefix}help : ヘルプを表示します。\n` +
            '```'
        );
    }

    if (message.channel.id === readChannel && message.content != `${prefix}talk` && message.author.bot == false && message.content.startsWith(prefix) == false) {
        if (canReadMessage) {
            log.debug(`Message recived. canReadMessage: ${canReadMessage}`)
            readMessages.push(message.content);
            createVoice();
        } else {
            log.debug(`Message recived. canReadMessage: ${canReadMessage}`)
            readMessages.push(message.content);
        }
    }
});

function replaceString(mes) {
    mes = mes.replace(/<.*?>/g, "")
    mes = mes.replace(/:.*?:/g, "")
    mes = mes.replace(/\|\|.*?\|\|/g, "伏せ字")
    mes = mes.replace(/(https?:\/\/[\x21-\x7e]+)/g, "ゆーあーるえる")

    mes = mes.split('|').join('')
    mes = mes.split(';').join('')
    mes = mes.split('&').join('')
    mes = mes.split('-').join('')
    mes = mes.split('\\').join('')
    mes = mes.split('/').join('')
    mes = mes.split(':').join('')
    mes = mes.split('<').join('')
    mes = mes.split('>').join('')
    mes = mes.split('$').join('')
    mes = mes.split('*').join('')
    mes = mes.split('?').join('')
    mes = mes.split('{').join('')
    mes = mes.split('}').join('')
    mes = mes.split('[').join('')
    mes = mes.split(']').join('')
    mes = mes.split('!').join('')
    mes = mes.split('`').join('')

    return mes;
}

async function createVoice() {
    canReadMessage = false;
    log.debug(`ℹ️  音声生成を開始するためcanReadMessageが ${canReadMessage} に設定されました`);
    let mes = readMessages.shift();

    log.debug("ℹ️  キューにあるメッセージ:", readMessages)
    log.debug(`📝 変換前のテキスト: ${mes}`);

    mes = replaceString(mes);

    await voiceClient.createVoice(mes)
    playVoice();
}

function playVoice() {
    log.debug('📢 再生処理を開始しします');
    let dispatcher = broadcast.play('./voice.wav');

    dispatcher.on('finish', () => {
        log.debug("✅ 再生が完了しました")

        fs.unlinkSync('./voice.wav');

        if (!readMessages.length) {
            canReadMessage = true;
            log.debug(`ℹ️  再生終了によりcanReadMessageが ${canReadMessage} に設定されました`);
        } else {
            createVoice();
        }
    })
}

client.login(config.token);
log.info('🚀 Discordにログインを試みています...');