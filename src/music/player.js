const player = require("play-sound")();

let currentProcess = null;
let stoppedProcess = null;

function playMusic(filePath, onFinish = null) {
    const process = player.play(filePath, (error) => {
        if (error) {
            console.error("Error playing music:", error.message);
        }
    });

    currentProcess = process;

    console.log(`Playing: ${filePath}`);
    console.log(`PID: ${process.pid}`);

    process.on("exit", () => {

        // This process was stopped manually
        if (process === stoppedProcess) {
            stoppedProcess = null;

            if (currentProcess === process) {
                currentProcess = null;
            }

            return;
        }

        // This process finished naturally
        console.log("Song finished.");

        if (currentProcess === process) {
            currentProcess = null;
        }

        if (onFinish) {
            onFinish();
        }
    });
}

function stopMusic() {
    if (currentProcess === null) {
        console.log("No music is currently playing.");
        return;
    }

    stoppedProcess = currentProcess;

    currentProcess.kill();

    console.log("Music stopped.");
}

module.exports = {
    playMusic,
    stopMusic
};