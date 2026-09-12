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
function getSong(index) {
    if (index < 0 || index >= playlist.length) {
        return null;
    }

    return playlist[index];
}
module.exports = {
    addToPlaylist,
    getPlaylist,
    removeFromPlaylist,
    getSong
};