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

log.info("Damare reading bot v" + packageJson.version);

log.info('Checking softalk...');

if (fs.existsSync('./softalk/SofTalk.exe')) {
    log.info('Softalk found.');
} else {
    log.error('Softalk not found. Can\'t Start damare. Please put softalk to current dir. If you want more info, visit https://github.com/Chipsnet/damare.');
    exit()
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

const toString = (bytes) => {
    return Encoding.convert(bytes, {
      from: 'SJIS',
      to: 'UNICODE',
      type: 'string',
    });
};

const client = new Discord.Client();
const broadcast = client.voice.createBroadcast();
let connection = null;
let readMessages = [];
let canReadMessage = true;
let readChannel = null;

client.on('ready', () => {
    log.info('Discord login success! Logged in as : ' + client.user.tag);
});

client.on('message', async message => {
    if (!message.guild) return;

    if (message.guild.id != config.useguild) return;

    if (message.content === ']talk') {
        if (message.member.voice.channel) {
            readChannel = message.channel.id
            connection = await message.member.voice.channel.join();
            connection.play(broadcast, {volume: 0.3});
            message.reply('✨ VCに接続しました！');
        }
    }

    if (message.content === ']stop') {
        if (connection === null) {
            message.reply('⚠ ボイスチャンネルに接続されていないので、切断ができませんでした。');
        } else {
            connection.disconnect();
            message.reply('👍 無事切断できました')
            connection = null;
        }
    }

    if (message.channel.id === readChannel && message.content != ']talk' && message.author.bot == false) {
        if (message.content.startsWith('http')) {
            message.content = "ユーアールエル"
        } 

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
    let mes = readMessages.shift();

    log.debug('softalk talk message: ' + mes);
    log.debug('in queue' + readMessages);

    exec('"./softalk/SofTalk.exe" /NM:女性01 /R:' + __dirname + '\\voice.wav /T:0 /X:1 /V:100 /W:' + mes, { encoding: 'Shift_JIS' }, (error, stdout, stderr) => {
        if (error) {
            log.error(toString(stderr));
            if (readMessages.length === 0) {
                canReadMessage = true;
            } else {
                softalk();
            }
            return;
        }
    })
}

chokidar.watch("./voice.wav").on('change', () => {
    let dispatcher = broadcast.play('./voice.wav');

    dispatcher.on('finish', () => {
        if (readMessages.length === 0) {
            canReadMessage = true;
        } else {
            softalk();
        }
    })
})


client.login(config.token);
log.info('Trying Login to discord...');