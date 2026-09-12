const fs = require("fs");
const path = require("path");

const musicDirectory = path.join(__dirname, "..", "..", "music");

function scanMusicDirectory() {
    try {
        const files = fs.readdirSync(musicDirectory);

        const audioFiles = files.filter((file) => {
            const extension = path.extname(file).toLowerCase();

            return extension === ".mp3" || extension === ".wav";
        });

        return audioFiles;
    } catch (error) {
        console.error("Error reading music directory:", error.message);
        return [];
    }
}

module.exports = {
    scanMusicDirectory
};