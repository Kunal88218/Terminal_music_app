const { Command } = require("commander");
const { scanMusicDirectory } = require("../music/scanner");
const program = new Command();

program
    .name("music-player")
    .description("A terminal music player")
    .version("1.0.0");

program
    .command("list")
    .description("List all available music files")
    .action(() => {
        const musicFiles = scanMusicDirectory();

        console.log("Available music:");

        if (musicFiles.length === 0) {
            console.log("No .mp3 or .wav files found.");
            return;
        }

        musicFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
    });

module.exports = program;