const Discord = require('discord.js');
const log4js = require('log4js')

const log = log4js.getLogger("Main")
log.level = "debug"

class Bot {
    constructor(voiceClient, config) {
        this.connection = null;
        this.readMessages = null;
        this.canReadMessage = true;
        this.dispatcher = null;
        this.readChannel = null;
        this.voiceClient = voiceClient;
        this.client = new Discord.Client();
        this.config = config;
        this.prefix = this.config.prefix
    }

    async start() {
        this.client.on('ready', () => {
            log.info('✨ Discordログイン完了！あなたのお名前：' + this.client.user.tag);
        });
        
        this.client.on('message', async message => {
            try {
                if (!message.guild) return;
            
                if (message.guild.id != config.useguild) return;
            
                if (message.content === `${this.prefix}talk`) {
                    if (message.member.voice.channel) {
                        this.readChannel = message.channel.id
                        this.connection = await message.member.voice.channel.join();
                        
                        message.reply('✨ VCに接続しました！');
            
                        log.info(`💫 ボイスチャンネルに接続しました！チャンネル名: ${message.member.voice.channel.name}`);
                        log.debug(`ℹ️ 接続先チャンネル: ${message.member.voice.channel.name}, 実行ユーザ: ${message.author.tag}`)
                    } else {
                        message.reply('⚠️ まずはボイスチャンネルに接続してください！');
                        log.debug(`🚫 ユーザーがVCにいないため、接続できませんでした. 実行ユーザ: ${message.author.tag}`);
                    }
                }
            
                if (message.content === `${this.prefix}stop`) {
                    if (this.connection === null) {
                        message.reply('⚠️ ボイスチャンネルに接続されていないので、切断ができませんでした。');
                    } else {
                        this.connection.disconnect();
                        this.connection = null;
                        this.readChannel = null;
            
                        message.reply('👍 無事切断できました')
                        log.info(`🛠️ VCから切断しました. 実行ユーザ: ${message.author.tag}`);
                    }
                }
            
                if (message.content === `${this.prefix}reset`) {
                    readMessages = [];
                    canReadMessage = true;
                    message.reply('💥 読み上げ状態をリセットしました');
                }
            
                if (message.content === `${this.prefix}skip` || message.content === `${this.prefix}damare`) {
                    dispatcher.end();
                    message.react('🤫');
                    log.debug(`ℹ️ ユーザーがスキップしました. 実行ユーザ: ${message.author.tag}`);
                }
            
                if (message.content === `${this.prefix}help`) {
                    message.reply('```\n'+
                        'Damare 読み上げBot コマンドリスト\n' +
                        'Author:巳波みなと Version:v' + packageJson.version + '\n' +
                        'https://github.com/Chipsnet/damare\n\n' +
                        `${prefix}talk : 現在のテキストチャンネルを現在入っているVCで読み上げます。\n` +
                        `${prefix}stop : 再生を停止してVCから切断します。\n` +
                        `${prefix}reset : 読み上げ状態や内部のキューをリセットします。問題が発生した場合にのみ使用してください。\n` +
                        `${prefix}help : ヘルプを表示します。\n` +
                        `${prefix}skip: 読み上げをスキップします。\n` +
                        '```'
                    );
                }
            
                if (message.channel.id === this.readChannel && message.content != `${this.prefix}talk` && message.author.bot == false && message.content.startsWith(this.prefix) == false) {
                    if (canReadMessage) {
                        log.debug(`ℹ️ テキストを受信しました. canReadMessage: ${canReadMessage}`)
                        readMessages.push(message.content);
                        createVoice();
                    } else {
                        log.debug(`ℹ️ テキストを受信しました. canReadMessage: ${canReadMessage}`)
                        readMessages.push(message.content);
                    }
                }
            } catch (error) {
                log.fatal("🚫 メッセージの処理中にエラーが発生しました: ", error)
            }
        });
        
        this.client.on("voiceStateUpdate", () => {
            if (this.connection === null) return;
        
            if (this.connection.channel.members.size <= 1) {
                this.connection.disconnect();
                this.connection = null;
                this.readChannel = null;
        
                log.info("🛠️ 誰もいなくなったため, VCから切断しました.")
            }
        })
        
        this.client.on('shardError', error => {
            console.error('A websocket connection encountered an error:', error);
        });

        this.client.login(config.token);

        log.info('🚀 Discordにログインを試みています...');
    }

    async createVoice() {
        canReadMessage = false;
        log.debug(`ℹ️ 音声生成を開始するためcanReadMessageが ${canReadMessage} に設定されました`);
        let mes = readMessages.shift();
    
        log.debug("ℹ️ キューにあるメッセージ:", readMessages)
        log.debug(`📝 変換前のテキスト: ${mes}`);
    
        mes = replaceString(mes);
        
        if (mes === "") {
            log.debug("ℹ️ 読み上げるテキストが空なので、読み上げをスキップします")
            nextMessage();
            return;
        }
    
        try {
            await voiceClient.createVoice(mes)
        } catch (error) {
            log.error("🚫 音声の生成中にエラーが発生しました", error)        
            nextMessage();
            return;
        }
    
        playVoice();
    }

    async playVoice() {
        log.debug('📢 再生処理を開始しします');
        dispatcher = this.connection.play('./voice.wav', { volume: 1 });
    
        dispatcher.on('finish', () => {
            setTimeout(() => {
                log.debug("✅ 再生が完了しました")
    
                fs.unlinkSync('./voice.wav');
    
                nextMessage();
            }, 1000)
        })
    }

    logout() {
        this.client.destroy()
        this.client = new Discord.Client()
    }

    async nextMessage() {
        if (!readMessages.length) {
            canReadMessage = true;
            log.debug(`ℹ️ 再生終了によりcanReadMessageが ${canReadMessage} に設定されました`);
        } else {
            createVoice();
        }
    }

    replaceString(mes) {
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
}

exports.Bot = Bot;