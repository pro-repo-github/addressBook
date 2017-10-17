var adress = require('./model');

function fetchAll(req, res) {
    adress.fetchAll().then(function success(rows) {
        res.send(rows);
    }, function failure(err) {
        res.send(err);
    })
}
function fetch(req, res) {
    adress.fetch(req.params.id).then(function success(row) {
        res.send(row);
    }, function failure(err) {
        res.send(err);
    })
}
function create(req, res) {
    var addressData = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        street: req.body.street,
        postcode: req.body.postcode,
        place: req.body.place,
        country: req.body.country

    };
    console.log(addressData);

    adress.insert(addressData).then(function (id) {
        res.send(JSON.stringify({ id: id }));
    });
}
function update(req, res) {
    var addressData = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        street: req.body.street,
        postcode: req.body.postcode,
        place: req.body.place,
        country: req.body.country
    };

    adress.update(addressData, req.params.id).then(function () {
        res.send(JSON.stringify(true));
    });
}
function remove(req, res) {
    adress.remove(req.params.id).then(function () {
        res.send(JSON.stringify(true));
    });
}


module.exports = {
    fetchAll: fetchAll,
    fetch: fetch,
    create: create,
    update: update,
    remove: remove
};