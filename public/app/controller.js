angular.module('addressBook')
    .controller('ListController', ListController)
    .controller('FormController', FormController)
    .controller('DeleteController', DeleteController);

ListController.$inject = ['dataFactory', '$scope'];
function ListController(dataFactory, $scope) {
    $scope.init = function () {
        dataFactory.getAll().$promise.then(function (data) { $scope.addresses = data; });
    }
    $scope.init();
}

FormController.$inject = ['$state', '$stateParams', 'dataFactory', '$scope'];
function FormController($state, $stateParams, dataFactory, $scope) {
    $scope.init = function () {
        $scope.firstname = '';
        $scope.surname = '';
        $scope.street = '';
        $scope.postcode = '';
        $scope.place = '';
        $scope.country = '';

        if ($stateParams.id) {
            dataFactory.read({ id: $stateParams.id }).$promise.then(function (address) {
                $scope.firstname = address.firstname;
                $scope.surname = address.surname;
                $scope.street = address.street;
                $scope.postcode = address.postcode;
                $scope.place = address.place;
                $scope.country = address.country;
            }.bind($scope));
        }
        $scope.save = function () {
            var data = {
                firstname: $scope.firstname,
                surname: $scope.surname,
                street: $scope.street,
                postcode: $scope.postcode,
                place: $scope.place,
                country: $scope.country
            };
            if ($stateParams.id) {
                data.id = $stateParams.id;
                dataFactory.update(data).$promise.then($state.go.bind($state, 'list'));//toDo, die in then methode durch bind gezwungene controller kontextwechsel ist für den controller unittest instabil.
            } else {
                dataFactory.create(data).$promise.then($state.go.bind($state, 'list'));//toDo, die in then methode durch bind gezwungene controller kontextwechsel ist für den controller unittest instabil. 
            }
        }.bind($scope);
    }
    $scope.init();
}

DeleteController.$inject = ['$state', '$stateParams', 'dataFactory', '$scope'];
function DeleteController($state, $stateParams, dataFactory, $scope) {
    $scope.init = function () {
        dataFactory.delete({ id: $stateParams.id }).$promise.then(function (data) {
            $scope.sdeletAdress = data.deletAdress;
            $state.go('list');
        });
    }
    $scope.init();
}

