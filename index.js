const bunyan = require('bunyan');
const { execFile } = require('child_process');
const Encoding = require('encoding-japanese');
const packageJson = require('./package.json');
const fs = require('fs');
const OpenJtalk = require('./openjtalk')
const Softalk = require('./softalk')
const Discord = require('discord.js');
const chokidar = require('chokidar');
const yaml = require("js-yaml");

const log = bunyan.createLogger({name: 'damare', level: 'debug'});
const useVoiceClient = 1;

log.info("Damare 読み上げBot v" + packageJson.version);
log.info("開発者: 巳波みなと https://minato86.me")
log.info("このソフトウェアが気に入ったらサポートをお願いします: https://ko-fi.com/minato86")

if (useVoiceClient == 1) {
    let voiceClient = new Softalk(log);
} else {
    let voiceClient = new OpenJtalk(log);
}

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

log.debug('✅ 設定ファイルを読み込みました')

function toString (bytes) {
    return Encoding.convert(bytes, {
      from: 'SJIS',
      to: 'UNICODE',
      type: 'string',
    });
}

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
            softalk();
        } else {
            log.debug(`Message recived. canReadMessage: ${canReadMessage}`)
            readMessages.push(message.content);
        }
    }
});

async function softalk() {
    canReadMessage = false;
    log.debug(`canReadMessage set to ${canReadMessage} on softalk.`);
    let mes = readMessages.shift();

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

    log.debug('Softalk talk message: ' + mes);
    log.debug('In queue' + readMessages);

    // voiceClient.createVoice(mes)

    /*
    exec('"./softalk/SofTalk.exe" /NM:女性01 /R:' + __dirname + '\\voice.wav /T:0 /X:1 /V:100 /W:' + mes, { encoding: 'Shift_JIS' }, (error, stdout, stderr) => {
        if (error) {
            log.error("An error occurred while running Softalk.\n" + toString(stderr));
            if (readMessages.length) {
                canReadMessage = true;
            } else {
                softalk();
            }
            return;
        }
    })
    */

    /*
    execFile("./softalk/SofTalk.exe", ["/NM:女性01", `/R:${__dirname}\\voice.wav`, "/T:0", "/X:1", "/V:100", `/W:${mes}`], { encoding: "Shift_JIS" }, (error, stdout, stderr) => {
        log.debug("execfile 終了")
        if (error) {
            log.error("An error occurred while running Softalk.\n" + toString(stderr));
            if (readMessages.length) {
                canReadMessage = true;
            } else {
                softalk();
            }
            return;
        }

        playVoice();
    })
    */

    await voiceClient.createVoice(mes)

    playVoice();
}

function playVoice() {
    log.debug('New file found.');

    let dispatcher = broadcast.play('./voice.wav');

    dispatcher.on('finish', () => {
        log.debug("再生終了")

        fs.unlinkSync('./voice.wav');
        if (!readMessages.length) {
            canReadMessage = true;
            log.debug(`canReadMessage set to ${canReadMessage} by chokidar due to finish.`);
        } else {
            softalk();
        }
    })
}

chokidar.watch("./voicea.wav").on('add', () => {
    log.debug('New file found.');

    let dispatcher = broadcast.play('./voice.wav');

    dispatcher.on('finish', () => {
        log.debug("再生終了")

        fs.unlinkSync('./voice.wav');
        if (!readMessages.length) {
            canReadMessage = true;
            log.debug(`canReadMessage set to ${canReadMessage} by chokidar due to finish.`);
        } else {
            softalk();
        }
    })
})


client.login(config.token);
log.info('🚀 Discordにログインを試みています...');