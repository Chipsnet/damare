const fs = require("fs/promises");
const axios = require("axios");
const { execFile } = require("child_process");
const chokidar = require("chokidar");
const Encoding = require("encoding-japanese");

module.exports = class {
    constructor(log) {
        this.log = log.child({ module: "voicebox" });
    }

    async createVoice(message) {
        this.log.debug("🎤 Voiceboxで音声を生成します:", message);

        const queryRes = await axios.post(
            "http://localhost:50021/audio_query",
            null,
            {
                params: {
                    speaker: 1,
                    text: message,
                },
            }
        );

        const audioRes = await axios.post(
            "http://localhost:50021/synthesis",
            queryRes.data,
            {
                responseType: 'arraybuffer',
                params: {
                    speaker: 1,
                },
                headers: {
                    "accept": "audio/wav"
                }
            }
        );

        await fs.writeFile("./voice.wav", new Buffer.from(audioRes.data), 'binary');

        this.log.debug("✅ 生成処理が完了しました");

        return;
    }
};
