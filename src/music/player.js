const player = require("play-sound")();

let currentProcess = null;
let manuallyStopped = false;

function playMusic(filePath, onFinish = null) {
    manuallyStopped = false;

    currentProcess = player.play(filePath, (error) => {
        if (error) {
            console.error("Error playing music:", error.message);
            currentProcess = null;
        }
    });

    console.log(`Playing: ${filePath}`);
    console.log(`PID: ${currentProcess.pid}`);

    currentProcess.on("exit", () => {
        console.log("Song finished.");

        currentProcess = null;

        if (!manuallyStopped && onFinish) {
            onFinish();
        }

        manuallyStopped = false;
    });
}

function stopMusic() {
    if (currentProcess === null) {
        console.log("No music is currently playing.");
        return;
    }

    manuallyStopped = true;

    currentProcess.kill();

    console.log("Music stopped.");
}

module.exports = {
    playMusic,
    stopMusic
};