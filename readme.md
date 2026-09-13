# 🎵 Terminal Music Player

A command-line music player built with **Node.js**.

The project demonstrates CLI development, file-system operations, audio playback, child-process management, event handling, playlist management, and automated testing.

## Features

- Scan local music files
- Play `.mp3` and `.wav` files
- Interactive terminal interface
- Create and manage playlists
- Add and remove songs
- Play songs by playlist number or filename
- Skip to the next song
- Stop playback
- Automatically play the next song
- Shuffle playlist
- Repeat modes:
  - `off`
  - `one`
  - `all`
- View current playback status
- Graceful shutdown with `exit` and `Ctrl+C`
- Automated playlist tests

## Tech Stack

- Node.js
- JavaScript
- `readline`
- `fs`
- `path`
- `child_process`
- `play-sound`
- `node:test`
- `node:assert`

## Project Structure

```text
terminal-music-player/
│
├── src/
│   ├── cli/
│   │   ├── args.js
│   │   └── input.js
│   │
│   ├── music/
│   │   ├── player.js
│   │   ├── playlist.js
│   │   └── scanner.js
│   │
│   └── index.js
│
├── music/
│   └── .gitkeep
│
├── tests/
│   └── playlist.test.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
