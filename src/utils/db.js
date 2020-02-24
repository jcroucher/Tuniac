/**
 * Database connection to SQL Lite.
 * Contains common queries needed for interacting with the database
 */

const sqlite3 = require('sqlite3').verbose();
let db;

/**
 * Connect to the db or return the existing connection if it is already open
 * @returns {*}
 */
function conn () {
    if (!db || !db.open) {
        db = new sqlite3.Database('tuniac.db')
    }
    return db
}

/**
 * Database initialization
 * @returns {Promise<unknown>}
 */
export const initDB = () => {
    return new Promise((resolve) => {
        let db = conn();
        // Our database structure
        db.serialize(() => {
            db.run('CREATE TABLE if not exists library (' +
                'entryId INTEGER NOT NULL,' +
                'kind INTEGER DEFAULT 0 NOT NULL,' +
                'url TEXT NOT NULL,' +
                'filesize INTEGER,' +
                'availability INTEGER DEFAULT 0 NOT NULL,' +
                'dateadded TEXT,' +
                'filecreation TEXT,' +
                'lastplayed TEXT,' +
                'playcount INTEGER DEFAULT 0 NOT NULL,' +
                'rating INTEGER DEFAULT 0 NOT NULL,' +
                'title TEXT NOT NULL,' +
                'artist TEXT NOT NULL,' +
                'album TEXT NOT NULL,' +
                'genre TEXT,' +
                'albumartist TEXT NOT NULL,' +
                'composer TEXT NOT NULL,' +
                '"year" TEXT NOT NULL,' +
                'track INTEGER NOT NULL,' +
                'disc INTEGER DEFAULT 0 NOT NULL,' +
                'duration INTEGER DEFAULT 0 NOT NULL,' +
                'bitrate INTEGER DEFAULT 0 NOT NULL,' +
                'samplerate INTEGER DEFAULT 0 NOT NULL,' +
                'channels INTEGER DEFAULT 2 NOT NULL,' +
                'bitspersample INTEGER DEFAULT 16 NOT NULL,' +
                'rgTrackG NUMERIC,' +
                'rgTrackP NUMERIC,' +
                'rgAlbumP NUMERIC,' +
                'bpm INTEGER DEFAULT 0 NOT NULL,' +
                'filetype TEXT NOT NULL' +
                ')');
            resolve()
        })
    })
};

/**
 * Get get the tracks from the media library
 * @returns {Promise<unknown>}
 */
export const getTracks = () => {
    return new Promise((resolve, reject) => {
        let db = conn();
        db.all('select entryId, title, artist, album, year, track, duration from library', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows || []);
            }
        })
    })
};

/**
 * Details for an individual track
 * @param entryId
 * @returns {Promise<unknown>}
 */
export const getTrackDetails = (entryId) => {
    return new Promise((resolve, reject) => {
        let db = conn();
        db.get('select * from library where entryId = ?', [entryId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row || {});
            }
        })
    })
};


export const insertTrack = (product) => {
    return new Promise((resolve) => {
        let db = conn();
        let prepare = db.prepare('replace into library (id, name) values (?, ?)');
        prepare.run(product.id, product.name);
        prepare.finalize(err => {
            if (!err) {
                resolve();
            }
        })
    })
};
