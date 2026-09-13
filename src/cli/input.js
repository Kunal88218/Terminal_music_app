const readline = require("readline");
const path = require("path");

const {
    addToPlaylist,
    getPlaylist,
    removeFromPlaylist,
    getSong,
    setCurrentIndex,
    getCurrentIndex,
    shufflePlaylist,
    setRepeatMode,
    getRepeatMode
} = require("../music/playlist");

const { scanMusicDirectory } = require("../music/scanner");
const { playMusic, stopMusic } = require("../music/player");

function startInput() {

    function playNextSong() {
        const currentIndex = getCurrentIndex();
        const repeatMode = getRepeatMode();

        let nextIndex;

        // Repeat the current song
        if (repeatMode === "one") {
            nextIndex = currentIndex;
        }

        // Move to the next song
        else {
            nextIndex = currentIndex + 1;
        }

        let nextSong = getSong(nextIndex);

        // Reached the end of playlist
        if (nextSong === null) {

            // Repeat entire playlist
            if (repeatMode === "all") {
                nextIndex = 0;
                nextSong = getSong(nextIndex);
            }

            // No repeat
            else {
                console.log("Playlist finished.");
                return;
            }
        }

        setCurrentIndex(nextIndex);

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
        const currentIndex = getCurrentIndex();
        const repeatMode = getRepeatMode();

        let nextIndex = currentIndex + 1;
        let song = getSong(nextIndex);

        // Repeat all: go back to the first song
        if (song === null && repeatMode === "all") {
            nextIndex = 0;
            song = getSong(nextIndex);
        }

        if (song === null) {
            console.log("Already at the end of the playlist.");
            return;
        }

        stopMusic();

        setCurrentIndex(nextIndex);

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

        // LIST
        if (command === "list") {

            const musicFiles = scanMusicDirectory();

            console.log("Available music:");

            if (musicFiles.length === 0) {
                console.log("No .mp3 or .wav files found.");
            } else {
                musicFiles.forEach((file, index) => {
                    console.log(`${index + 1}. ${file}`);
                });
            }
        }

        // PLAY
        else if (command === "play") {

            if (!argument) {
                console.log("Please provide a filename or playlist number.");
            }

            else {
                const playlistIndex = Number(argument);

                // Play using playlist number
                if (!Number.isNaN(playlistIndex)) {

                    const song = getSong(playlistIndex - 1);

                    if (song === null) {
                        console.log("Invalid playlist number.");
                    }

                    else {
                        setCurrentIndex(playlistIndex - 1);

                        const filePath = path.join(
                            __dirname,
                            "..",
                            "..",
                            "music",
                            song
                        );

                        playMusic(filePath, playNextSong);
                    }
                }

                // Play using filename
                else {

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

        // ADD
        else if (command === "add") {

            if (!argument) {
                console.log("Please provide a filename.");
            }

            else {

                const musicFiles = scanMusicDirectory();

                if (!musicFiles.includes(argument)) {
                    console.log("Music file not found.");
                }

                else {
                    addToPlaylist(argument);
                    console.log(`Added to playlist: ${argument}`);
                }
            }
        }

        // PLAYLIST
        else if (command === "playlist") {

            const songs = getPlaylist();

            if (songs.length === 0) {
                console.log("Playlist is empty.");
            }

            else {
                songs.forEach((song, index) => {
                    console.log(`${index + 1}. ${song}`);
                });
            }
        }

        // REMOVE
        else if (command === "remove") {

            if (!argument) {
                console.log("Please provide a playlist number.");
            }

            else {

                const index = Number(argument) - 1;

                if (Number.isNaN(index)) {
                    console.log("Please provide a valid number.");
                }

                else {

                    const removed = removeFromPlaylist(index);

                    if (!removed) {
                        console.log("Invalid playlist number.");
                    }

                    else {
                        console.log("Song removed from playlist.");
                    }
                }
            }
        }

        // SHUFFLE
        else if (command === "shuffle") {

            shufflePlaylist();

            console.log("Playlist shuffled.");
        }

        // REPEAT
        else if (command === "repeat") {

            if (!argument) {
                console.log(`Repeat mode: ${getRepeatMode()}`);
            }

            else {

                const changed = setRepeatMode(argument);

                if (!changed) {
                    console.log(
                        "Invalid repeat mode. Use: off, one, or all."
                    );
                }

                else {
                    console.log(`Repeat mode set to: ${argument}`);
                }
            }
        }

        // NEXT
        else if (command === "next") {

            nextSong();
        }

        // STOP
        else if (command === "stop") {

            stopMusic();
        }

        // EXIT
        else if (command === "exit") {

            rl.close();
            return;
        }

        // UNKNOWN COMMAND
        else {

            console.log("Unknown command.");
        }

        rl.prompt();
    });
    rl.on("SIGINT", () => {
    console.log("\nExiting music player...");

    stopMusic();

    rl.close();
    });

    return rl;
}

module.exports = {
    startInput
};