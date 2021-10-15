const bunyan = require('bunyan');
const { exec } = require('child_process');
const Encoding = require('encoding-japanese');
const packageJson = require('./package.json');
const fs = require('fs');
const { exit } = require('process');
const Discord = require('discord.js');
const chokidar = require('chokidar');
const yaml = require("js-yaml");

const log = bunyan.createLogger({name: 'damare', level: 'debug'});
let engDic = {};

log.info("Damare reading bot v" + packageJson.version);
log.info("開発者: 巳波みなと Github: https://github.com/Chipsnet/damare")
log.info("このソフトウェアを気に入ったら支援もお願いします！ https://ko-fi.com/minato86")
log.info("------------------------------------------------------------------------------")

log.info('🔎 Softalkを探しています...');

if (fs.existsSync('./softalk/SofTalk.exe')) {
    log.info('✅ Softalkが見つかりました！');
} else {
    log.error('😞 Softalkが見つかりませんでした。Softalkが正しく配置されてることを確認してください。詳しくはHPをご覧ください: https://damare.m86.work/');
    exit()
}

if (fs.existsSync('./voice.wav')) {
    log.debug('🔥 voice.wavファイルが残っていました。削除します。')
    fs.unlinkSync('./voice.wav');
}

log.info('🔎 英語カタカナ変換表(bep-eng.dic)を探しています...');

if (fs.existsSync('./bep-eng.dic')) {
    log.info('✅ 英語カタカナ変換表(bep-eng.dic)が見つかりました！');
    log.info('🔄 辞書データを読込中です...')

    let dic = fs.readFileSync('./bep-eng.dic', 'utf8');
    dic = dic.split('\n');

    dic.forEach(function(line) {
        if (line.startsWith('#')) {
            return;
        }

        if (line === "") {
            return;
        }

        let lineSplit = line.split(' ');
        log.debug(`🔄 辞書データ ${lineSplit[0].toLowerCase()} → ${lineSplit[1]} を変換中...`)
        engDic[lineSplit[0].toLowerCase()] = lineSplit[1];
    })
} else {
    log.warn('😞 英語カタカナ変換表(bep-eng.dic)が見つかりませんでした。スムーズな変換を利用するには表のセットアップが必要です。詳しくはHPをご覧ください: https://damare.m86.work/')
}

try {
    config = yaml.load(
        fs.readFileSync("./config.yml", "utf-8")
    );
} catch (error) {
    log.fatal('Config file not found. Please make config file. More information: https://github.com/Chipsnet/warbot-js.')
    log.error(error);
    process.exit(0)
}

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
    log.info('✨ Discordにユーザー名 '+client.user.tag+' でログインしました！');
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
            log.info('💫 ボイスチャンネルに接続しました！')
        }
    }

    if (message.content === `${prefix}stop`) {
        if (connection === null) {
            message.reply('⚠ ボイスチャンネルに接続されていないので、切断ができませんでした。');
        } else {
            connection.disconnect();
            message.reply('👍 無事切断できました')
            connection = null;
            readChannel = null;
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

    log.debug(`💬 以下のメッセージを変換します: ${mes}`)
    mes = mes.toLowerCase();

    mes = mes.replace(/<.*?>/g, "")
    mes = mes.replace(/:.*?:/g, "")
    mes = mes.replace(/\|\|.*?\|\|/g, "伏せ字")
    mes = mes.replace(/(https?:\/\/[\x21-\x7e]+)/g, "ゆーあーるえる")

    // log.debug(mes.split(/[A-Za-z0-9]+/g))

    Object.keys(engDic).forEach(function(key) {
        if (key.length <= 2) return;

        // log.debug(`🔎 ${key} を探しています... 変換後: ${engDic[key]}`)
        if (mes.match(new RegExp(key,'g'))) {
            log.debug(`👀 ${key} が見つかりました！`)
            mes = mes.replace(new RegExp(key,'g'), engDic[key]);
        }
    })

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

    log.debug('🎤 メッセージを読み上げます:' + mes);
    log.debug('In queue' + readMessages);

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
}

chokidar.watch("./voice.wav").on('add', () => {
    log.debug('New file found.');

    let dispatcher = broadcast.play('./voice.wav');

    dispatcher.on('finish', () => {
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