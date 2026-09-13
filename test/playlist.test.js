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
    shufflePlaylist,
    resetPlaylist
} = require("../src/music/playlist");

// Reset playlist state before every test
test.beforeEach(() => {
    resetPlaylist();
});

// 1. Add a song
test("addToPlaylist adds a song to the playlist", () => {
    addToPlaylist("Song1.mp3");

    const playlist = getPlaylist();

    assert.strictEqual(playlist.length, 1);
    assert.strictEqual(playlist[0], "Song1.mp3");
});

// 2. Get a song
test("getSong returns the correct song", () => {
    addToPlaylist("Song1.mp3");

    const song = getSong(0);

    assert.strictEqual(song, "Song1.mp3");
});

// 3. Invalid index
test("getSong returns null for an invalid index", () => {
    const song = getSong(99);

    assert.strictEqual(song, null);
});

// 4. Negative index
test("getSong returns null for a negative index", () => {
    const song = getSong(-1);

    assert.strictEqual(song, null);
});

// 5. Remove a song
test("removeFromPlaylist removes the correct song", () => {
    addToPlaylist("Song1.mp3");

    const removed = removeFromPlaylist(0);

    assert.strictEqual(removed, true);
    assert.strictEqual(getPlaylist().length, 0);
});

// 6. Invalid removal
test("removeFromPlaylist returns false for an invalid index", () => {
    const removed = removeFromPlaylist(99);

    assert.strictEqual(removed, false);
});

// 7. Current index adjustment
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

// 8. Repeat modes
test("repeat mode can be changed", () => {
    assert.strictEqual(setRepeatMode("one"), true);
    assert.strictEqual(getRepeatMode(), "one");

    assert.strictEqual(setRepeatMode("all"), true);
    assert.strictEqual(getRepeatMode(), "all");

    assert.strictEqual(setRepeatMode("off"), true);
    assert.strictEqual(getRepeatMode(), "off");
});

// 9. Invalid repeat mode
test("invalid repeat mode is rejected", () => {
    assert.strictEqual(setRepeatMode("invalid"), false);
    assert.strictEqual(getRepeatMode(), "off");
});

// 10. Shuffle
test("shufflePlaylist keeps all songs in the playlist", () => {
    addToPlaylist("Song1.mp3");
    addToPlaylist("Song2.mp3");
    addToPlaylist("Song3.mp3");

    const beforeShuffle = [...getPlaylist()];

    shufflePlaylist();

    const afterShuffle = getPlaylist();

    assert.strictEqual(
        afterShuffle.length,
        beforeShuffle.length
    );

    assert.deepStrictEqual(
        [...afterShuffle].sort(),
        [...beforeShuffle].sort()
    );
});

// 11. Empty playlist removal
test("removeFromPlaylist returns false when playlist is empty", () => {
    const removed = removeFromPlaylist(0);

    assert.strictEqual(removed, false);
    assert.strictEqual(getPlaylist().length, 0);
});