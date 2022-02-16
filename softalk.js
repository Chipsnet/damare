const fs = require('fs');
const { execFile } = require('child_process');
const chokidar = require('chokidar');
const Encoding = require('encoding-japanese');

module.exports = class {
    constructor(log) {
        this.log = log.child({ module: 'softalk' });

        this.log.debug('🔎 Softalkを探しています...');

        if (fs.existsSync('./softalk/SofTalk.exe')) {
            this.log.debug('✅ Softalkが見つかりました！');
        } else {
            this.log.fatal('💥 Softalkの実行ファイルが見つかりませんでした. 正しくSoftalkが配置されてるか確認してください. 詳しくは公式サイトをご覧ください: https://damare.m86.work/');
            process.exit(1);
        }
    }

    toString(bytes) {
        return Encoding.convert(bytes, {
            from: 'SJIS',
            to: 'UNICODE',
            type: 'string',
        });
    }

    async createVoice(message) {
        this.log.debug("🎤 Softalkで音声を生成します:", message);

        execFile(`${__dirname}/softalk/SofTalk.exe`, ["/NM:女性01", `/R:${__dirname}\\voice.wav`, "/T:0", "/X:1", "/V:100", `/W:${message}`], { shell: true }, (error, stdout, stderr) => {
            if (error) {
                this.log.error(error);
                return;
            }
        });

        this.log.debug("📌 音声生成コマンドを実行しました")

        let waitVoiceCreate = new Promise((resolve, reject) => {
            let watcher = chokidar.watch('./voice.wav');

            watcher.on('add', (path) => {
                this.log.debug("🔍 chokidarが音声ファイルを見つけました:", path);
                watcher.close();
                resolve();
            });
        })

        await waitVoiceCreate;
        this.log.debug("✅ 生成処理が完了しました");

        return;
    }
}