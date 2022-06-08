const log4js = require('log4js')
const axios = require("axios")

const log = log4js.getLogger("Update")
log.level = "debug"

module.exports = async function(packageJson) {
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