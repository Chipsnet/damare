const fs = require('fs');

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
}