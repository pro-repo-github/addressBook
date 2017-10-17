var controller = require('./controller.js');

module.exports = function (app) {
    app.get('/address', controller.fetchAll);
    app.post('/address', controller.create);
    app.get('/address/:id', controller.fetch);
    app.put('/address/:id', controller.update);
    app.delete('/address/:id', controller.remove);
};