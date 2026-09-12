const readline = require("readline");

const { scanMusicDirectory } = require("../music/scanner");
const { playMusic, stopMusic } = require("../music/player");

function startInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> "
    });

    rl.prompt();

    rl.on("line", (input) => {
        const parts = input.trim().split(" ");
        const command = parts[0];
        const argument = parts[1];

        if (command === "list") {
            const musicFiles = scanMusicDirectory();

            musicFiles.forEach((file, index) => {
                console.log(`${index + 1}. ${file}`);
            });
        }

        else if (command === "play") {
            if (!argument) {
                console.log("Please provide a filename.");
            } else {
                const path = require("path");

                const filePath = path.join(
                    __dirname,
                    "..",
                    "..",
                    "music",
                    argument
                );

                playMusic(filePath);
            }
        }

        else if (command === "stop") {
            stopMusic();
        }

        else if (command === "exit") {
            rl.close();
            return;
        }

        else {
            console.log("Unknown command.");
        }

        rl.prompt();
    });

    return rl;
}

module.exports = {
    startInput
};