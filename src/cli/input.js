const readline = require("readline");

const {
    addToPlaylist,
    getPlaylist,
    removeFromPlaylist,
    getSong,
    setCurrentIndex,
    getCurrentIndex
} = require("../music/playlist");

const { scanMusicDirectory } = require("../music/scanner");

const { playMusic, stopMusic } = require("../music/player");

function startInput() {

    function playNextSong() {
        const nextIndex = getCurrentIndex() + 1;

        const nextSong = getSong(nextIndex);

        if (nextSong === null) {
            console.log("Playlist finished.");
            return;
        }

        setCurrentIndex(nextIndex);

        const path = require("path");

        const nextFilePath = path.join(
            __dirname,
            "..",
            "..",
            "music",
            nextSong
        );

        playMusic(nextFilePath, playNextSong);
    }

    function nextSong() {
        const nextIndex = getCurrentIndex() + 1;

        const song = getSong(nextIndex);

        if (song === null) {
            console.log("Already at the end of the playlist.");
            return;
        }

        stopMusic();

        setCurrentIndex(nextIndex);

        const path = require("path");

        const filePath = path.join(
            __dirname,
            "..",
            "..",
            "music",
            song
        );

        playMusic(filePath, playNextSong);
    }

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

                console.log(
                    "Please provide a filename or playlist number."
                );

            } else {

                const playlistIndex = Number(argument);

                if (!Number.isNaN(playlistIndex)) {

                    const song = getSong(playlistIndex - 1);

                    if (song === null) {

                        console.log("Invalid playlist number.");

                    } else {

                        setCurrentIndex(playlistIndex - 1);

                        const path = require("path");

                        const filePath = path.join(
                            __dirname,
                            "..",
                            "..",
                            "music",
                            song
                        );

                        playMusic(filePath, playNextSong);
                    }

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

        }

        else if (command === "add") {

            if (!argument) {

                console.log("Please provide a filename.");

            } else {

                const musicFiles = scanMusicDirectory();

                if (!musicFiles.includes(argument)) {

                    console.log("Music file not found.");

                } else {

                    addToPlaylist(argument);

                    console.log(`Added to playlist: ${argument}`);
                }
            }

        }

        else if (command === "playlist") {

            const songs = getPlaylist();

            if (songs.length === 0) {

                console.log("Playlist is empty.");

            } else {

                songs.forEach((song, index) => {
                    console.log(`${index + 1}. ${song}`);
                });
            }

        }

        else if (command === "remove") {

            if (!argument) {

                console.log("Please provide a playlist number.");

            } else {

                const index = Number(argument) - 1;

                if (Number.isNaN(index)) {

                    console.log("Please provide a valid number.");

                } else {

                    const removed = removeFromPlaylist(index);

                    if (!removed) {

                        console.log("Invalid playlist number.");

                    } else {

                        console.log("Song removed from playlist.");
                    }
                }
            }

        }

        else if (command === "next") {

            nextSong();

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