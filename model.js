var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('db/addressBook.db');

function fetchAll() {
    return new Promise(function (resolve, reject) {
        db.all('SELECT * FROM addresses', function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function fetch(id) {
    return new Promise(function (resolve, reject) {
        db.get('SELECT * FROM addresses WHERE id = ?', [id], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function insert(data) {
    return new Promise(function (resolve, reject) {
        db.run('INSERT INTO addresses (firstname, surname, street, postcode, place, country) VALUES (?, ?, ?, ?, ?, ?)', [data.firstname, data.surname, data.street, data.postcode, data.place, data.country], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

function update(data, id) {
    return new Promise(function (resolve, reject) {
        db.run('UPDATE addresses SET firstname = ?, surname = ?, street = ?, postcode = ?, place = ?, country = ? WHERE id = ?', [data.firstname, data.surname, data.street, data.postcode, data.place, data.country, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function remove(id) {
    return new Promise(function (resolve, reject) {
        db.run('DELETE FROM addresses WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    fetchAll: fetchAll,
    fetch: fetch,
    insert: insert,
    update: update,
    remove: remove
};