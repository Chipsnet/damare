const axios = require("axios")

module.exports = async function(bunyan, packageJson) {
    let log = bunyan.child({ module: 'update' });

    log.info("🔍 アップデートを確認しています...")

    try { 
        let res = await axios.get("https://api.github.com/repos/Chipsnet/damare/releases/latest")

        if (res.data.tag_name === `v${packageJson.version}`) {
            log.info("✅ バージョンは最新です！")
        } else {
            log.info("=================================================\n"+
                    "📦 アップデートがあります！\n"+
                    `現在のバージョン: v${packageJson.version} 最新のバージョン: ${res.data.tag_name}\n`+
                    "アップデート方法 https://docs.damare.m86.work/guide/update\n"+
                    "=================================================\n")
        }
    } catch (error) {
        log.error("🤕 アップデートの確認に失敗しました")
        log.error(error)
    }
}