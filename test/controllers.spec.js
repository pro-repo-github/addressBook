describe('Address Book:', function () {
    var scope;
    var $httpBackend;
    var Ctrl;
    var stateParams;
    beforeEach(module('addressBook'));
    beforeEach(inject(function (_$stateParams_, $rootScope, $controller, _$httpBackend_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        stateParams = _$stateParams_;

    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    it('ListController should call dataFactory getAll and receive data', inject(function ($controller, _dataFactory_) {
        var data = [{
            "id": 1, "firstname": "Peter", "surname": "Müller",
            "street": "Zürichstr 110", "postcode": "8000", "place": "Zürich", "country": "Schweiz"
        }];
        Ctrl = $controller('ListController', { $scope: scope, dataFactory: _dataFactory_ });
        $httpBackend.when('GET', '/address').respond(200, data);
        scope.init();
        $httpBackend.flush();
        expect(scope.addresses).not.toBe(null);
    }));
    it('FormController should call dataFactory read and receive data', inject(function ($controller, _dataFactory_) {
        var data = {
            "id": 1, "firstname": "Peter", "surname": "Müller",
            "street": "Zürichstr 110", "postcode": "8000", "place": "Zürich", "country": "Schweiz"
        };
        stateParams = { id: 1 };
        Ctrl = $controller('FormController', { $scope: scope, dataFactory: _dataFactory_, $stateParams: stateParams });
        $httpBackend.whenGET('/address/1').respond(200, data);
        scope.init();
        $httpBackend.flush();
        expect(scope.firstname).toBe("Peter");
    }));
    it('DeleteController should call dataFactory delete', inject(function ($controller, _dataFactory_) {

        stateParams = { id: 1 };
        Ctrl = $controller('DeleteController', { $scope: scope, dataFactory: _dataFactory_, $stateParams: stateParams });
        var ttt = $httpBackend.whenDELETE('/address/1').respond(200, { deletAdress: true });
        scope.init();
        $httpBackend.flush();
        expect(scope.sdeletAdress).toBe(true);
    }));
});
