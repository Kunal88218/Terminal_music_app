const player = require("play-sound")();

let currentProcess = null;

function playMusic(filePath) {
    currentProcess = player.play(filePath, (error) => {
        if (error) {
            console.error("Error playing music:", error.message);
            currentProcess = null;
        }
    });

    console.log(`Playing: ${filePath}`);
    console.log(`PID: ${currentProcess.pid}`);

    currentProcess.on("exit", () => {
        currentProcess = null;
    });
}

function stopMusic() {
    if (currentProcess === null) {
        console.log("No music is currently playing.");
        return;
    }

    currentProcess.kill();
    currentProcess = null;

    console.log("Music stopped.");
}

module.exports = {
    playMusic,
    stopMusic
};