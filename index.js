const Discord = require('discord.js');
const packageJson = require('./package.json');
const fs = require('fs');
const OpenJtalk = require('./openjtalk')
const Softalk = require('./softalk')
const update = require('./update')
const { Bot } = require('./bot')
const yaml = require("js-yaml");
const log4js = require('log4js')

const log = log4js.getLogger("Boot")
log.level = "debug"

let useVoiceClient;
let voiceClient;

log.info("Damare 読み上げBot v" + packageJson.version);
log.info("開発者: 巳波みなと https://minato86.me")
log.info("このソフトウェアが気に入ったらサポートをお願いします: https://ko-fi.com/minato86")

update(packageJson);

if (fs.existsSync('./voice.wav')) {
    log.debug('⚠️ voice.wavが見つかりました、削除します')
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
    log.warn("⚠️ 設定ファイルにvoiceclientが設定されていません. デフォルト設定のSoftalkを使用します.")
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

const bot = new Bot(voiceClient, config)

process.on('uncaughtException', function(err) {
    log.fatal("🚫 プロセスでエラーが発生しました.", err);
    bot.logout()
    startBotProcess()
});

function startBotProcess() {
    try {
        bot.start()
    } catch (error) {
        log.fatal(error)
    }
}

startBotProcess()