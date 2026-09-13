const test = require("node:test");
const assert = require("node:assert");

const {
    addToPlaylist,
    getPlaylist,
    getSong,
    removeFromPlaylist,
    setCurrentIndex,
    getCurrentIndex,
    setRepeatMode,
    getRepeatMode,
    shufflePlaylist
} = require("../src/music/playlist");

test("addToPlaylist adds a song to the playlist", () => {
    addToPlaylist("Song1.mp3");

    const playlist = getPlaylist();

    assert.strictEqual(playlist.length, 1);
    assert.strictEqual(playlist[0], "Song1.mp3");
});

test("getSong returns the correct song", () => {
    const song = getSong(0);

    assert.strictEqual(song, "Song1.mp3");
});
test("getSong returns null for an invalid index", () => {
    const song = getSong(99);

    assert.strictEqual(song, null);
});
test("getSong returns null for a negative index", () => {
    const song = getSong(-1);

    assert.strictEqual(song, null);
});
test("removeFromPlaylist removes the correct song", () => {
    const removed = removeFromPlaylist(0);

    assert.strictEqual(removed, true);
    assert.strictEqual(getPlaylist().length, 0);
});
test("removeFromPlaylist returns false for an invalid index", () => {
    const removed = removeFromPlaylist(99);

    assert.strictEqual(removed, false);
});
test("removeFromPlaylist adjusts currentIndex when a previous song is removed", () => {
    addToPlaylist("Song1.mp3");
    addToPlaylist("Song2.mp3");
    addToPlaylist("Song3.mp3");

    setCurrentIndex(2);

    const removed = removeFromPlaylist(0);

    assert.strictEqual(removed, true);
    assert.strictEqual(getCurrentIndex(), 1);
    assert.strictEqual(getSong(1), "Song3.mp3");
});
test("repeat mode can be changed", () => {
    assert.strictEqual(setRepeatMode("one"), true);
    assert.strictEqual(getRepeatMode(), "one");

    assert.strictEqual(setRepeatMode("all"), true);
    assert.strictEqual(getRepeatMode(), "all");

    assert.strictEqual(setRepeatMode("off"), true);
    assert.strictEqual(getRepeatMode(), "off");
});
test("invalid repeat mode is rejected", () => {
    assert.strictEqual(setRepeatMode("invalid"), false);
    assert.strictEqual(getRepeatMode(), "off");
});
test("shufflePlaylist keeps all songs in the playlist", () => {
    addToPlaylist("Song1.mp3");
    addToPlaylist("Song2.mp3");
    addToPlaylist("Song3.mp3");

    const beforeShuffle = [...getPlaylist()];

    shufflePlaylist();

    const afterShuffle = getPlaylist();

    assert.strictEqual(afterShuffle.length, beforeShuffle.length);

    assert.deepStrictEqual(
        [...afterShuffle].sort(),
        [...beforeShuffle].sort()
    );
});
test("removeFromPlaylist returns false when playlist is empty", () => {
    // Make sure playlist is empty
    while (getPlaylist().length > 0) {
        removeFromPlaylist(0);
    }

    const removed = removeFromPlaylist(0);

    assert.strictEqual(removed, false);
    assert.strictEqual(getPlaylist().length, 0);
});