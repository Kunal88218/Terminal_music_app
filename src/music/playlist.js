let playlist = [];
let currentIndex = -1;
function addToPlaylist(song) {
    playlist.push(song);
}

function getPlaylist() {
    return playlist;
}

function removeFromPlaylist(index) {
    if (index < 0 || index >= playlist.length) {
        return false;
    }

    playlist.splice(index, 1);
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
module.exports = {
    addToPlaylist,
    getPlaylist,
    removeFromPlaylist,
    getSong,
    setCurrentIndex,
    getCurrentIndex
};