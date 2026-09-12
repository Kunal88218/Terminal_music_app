let playlist = [];

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

module.exports = {
    addToPlaylist,
    getPlaylist,
    removeFromPlaylist
};