angular.module('addressBook')
    .controller('ListController', ListController)
    .controller('FormController', FormController)
    .controller('DeleteController', DeleteController);
ListController.$inject = ['dataFactory'];
function ListController(dataFactory) {
    this.addresses = dataFactory.getAll();
}
FormController.$inject = ['$state', '$stateParams', 'dataFactory'];
function FormController($state, $stateParams, dataFactory) {
    this.firstname = '';
    this.surname = '';
    this.street = '';
    this.postcode = '';
    this.place = '';
    this.country = '';

    if ($stateParams.id) {
        dataFactory.read({ id: $stateParams.id }).$promise.then(function (address) {
            this.firstname = address.firstname;
            this.surname = address.surname;
            this.street = address.street;
            this.postcode = address.postcode;
            this.place = address.place;
            this.country = address.country;
        }.bind(this));
    }
this.save = function () {
        var data = {
            firstname: this.firstname,
            surname: this.surname,
            street: this.street,
            postcode: this.postcode,
            place: this.place,
            country: this.country
        };
        if ($stateParams.id) {
            data.id = $stateParams.id;
            dataFactory.update(data).$promise.then($state.go.bind($state, 'list'));
        } else {
           dataFactory.create(data).$promise.then($state.go.bind($state, 'list'));
        }
    }.bind(this);
}

DeleteController.$inject = ['$state', '$stateParams', 'dataFactory'];
function DeleteController($state, $stateParams, dataFactory) {
    dataFactory.delete({ id: $stateParams.id }).$promise.then(function () {
        $state.go('list');
    });
}

