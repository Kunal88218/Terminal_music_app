const player = require("play-sound")();

function playMusic(filePath) {
    player.play(filePath, (error) => {
        if (error) {
            console.error("Error playing music:", error.message);
        }
    });
}

module.exports = {
    playMusic
};