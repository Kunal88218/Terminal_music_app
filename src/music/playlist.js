let playlist = [];
let currentIndex = -1;
let repeatMode = "off";
function addToPlaylist(song) {
    playlist.push(song);
}

function getPlaylist() {
    return playlist;
}
function shufflePlaylist() {
    for (let i = playlist.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [playlist[i], playlist[randomIndex]] = [
            playlist[randomIndex],
            playlist[i]
        ];
    }
}
function resetPlaylist() {
    playlist = [];
    currentIndex = -1;
    repeatMode = "off";
}
function removeFromPlaylist(index) {
    if (index < 0 || index >= playlist.length) {
        return false;
    }

    playlist.splice(index, 1);

    // If the removed song was before the current song,
    // shift the current index backward.
    if (index < currentIndex) {
        currentIndex--;
    }

    // If playlist became empty
    if (playlist.length === 0) {
        currentIndex = -1;
    }

    // If the last song was removed while currentIndex
    // is now outside the playlist
    else if (currentIndex >= playlist.length) {
        currentIndex = playlist.length - 1;
    }

    return true;
}
function getSong(index) {
    if (index < 0 || index >= playlist.length) {
        return null;
    }

    return playlist[index];
}
function setCurrentIndex(index) {
    currentIndex = index;
}

function getCurrentIndex() {
    return currentIndex;
}
function setRepeatMode(mode) {
    if (mode !== "off" && mode !== "one" && mode !== "all") {
        return false;
    }

    repeatMode = mode;
    return true;
}

function getRepeatMode() {
    return repeatMode;
}
module.exports = {
    addToPlaylist,
    getPlaylist,
    removeFromPlaylist,
    getSong,
    setCurrentIndex,
    getCurrentIndex,
    shufflePlaylist,
    setRepeatMode,
    getRepeatMode,
    resetPlaylist
};