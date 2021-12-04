const { execFileSync } = require('child_process');
const iconv = require('iconv-lite');
const fs = require('fs');

module.exports = class {
    constructor(log) {
        this.log = log.child({ module: 'openjtalk' });
        //this.htsvoice = "./openjtalk/voice/hts_voice_nitech_jp_atr503_m001-1.05/nitech_jp_atr503_m001.htsvoice";
        this.htsvoice = "./openjtalk/voice/mei/mei_normal.htsvoice";

        if (process.platform === 'win32') {
            this.dic = "./openjtalk/dic/open_jtalk_dic_shift_jis-1.11"
        } else {
            this.dic = "./openjtalk/dic/open_jtalk_dic_utf_8-1.11"
        }
    }

    async createVoice(message) {
        this.log.debug("📝 input.txtを生成します:", message)

        if (process.platform === 'win32') {
            fs.writeFileSync('./input.txt', iconv.encode(message, 'shift_jis'));
        } else {
            fs.writeFileSync('./input.txt', message);
        }

        execFileSync("open_jtalk", ["-m", this.htsvoice, "-x", this.dic, , "-g", "9", "-ow", "voice.wav", "./input.txt"]);
        this.log.debug("🎤 voice.wavを生成しました")

        return;
    }
}