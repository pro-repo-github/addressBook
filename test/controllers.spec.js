describe('Address Book:', function () {
    var $httpBackend;
    var $controller
    var ctrl;
    var stateParams;
    beforeEach(module('addressBook', function ($qProvider) { $qProvider.errorOnUnhandledRejections(false) }));
    beforeEach(inject(function (_$stateParams_, _$controller_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        stateParams = _$stateParams_;
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    it('ListController should call dataFactory getAll and receive data', inject(function () {
        var data = [{
            "id": 1, "firstname": "Peter", "surname": "Müller",
            "street": "Zürichstr 110", "postcode": "8000", "place": "Zürich", "country": "Schweiz"
        }];
        ctrl = $controller('ListController', {});
        $httpBackend.when('GET', '/address').respond(200, data);
        $httpBackend.flush();
        expect(ctrl.addresses).not.toBe(null);
    }));
    it('FormController should call dataFactory read and receive data', inject(function () {
        var data = {
            "id": 1, "firstname": "Peter", "surname": "Müller",
            "street": "Zürichstr 110", "postcode": "8000", "place": "Zürich", "country": "Schweiz"
        };
        stateParams = { id: 1 };
        ctrl = $controller('FormController', { $stateParams: stateParams });
        $httpBackend.whenGET('/address/1').respond(200, data);
        $httpBackend.flush();
        expect(ctrl.firstname).toBe("Peter");
    }));
    it('FormController should call dataFactory update and send data', inject(function () {
        stateParams = { id: 2 };
        ctrl = $controller('FormController', { $stateParams: stateParams });
        ctrl.firstname = 'Sarah';
        ctrl.surname = 'Müller';
        ctrl.street = 'Bernstr 150';
        ctrl.postcode = '3000';
        ctrl.place = 'Bern';
        ctrl.country = 'Schweiz';
        var Data = {
            id: 2,
            firstname: ctrl.firstname,
            surname: ctrl.surname,
            street: ctrl.street,
            postcode: ctrl.postcode,
            place: ctrl.place,
            country: ctrl.country
        }
        $httpBackend.whenGET('/address/2').respond(200, {});
        $httpBackend.whenPUT('/address/2', Data).respond(200, {});
        ctrl.save();
        $httpBackend.flush();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
        expect($httpBackend.verifyNoOutstandingRequest).not.toThrow();
    }));
    it('FormController should call dataFactory create and send data', inject(function () {
        ctrl = $controller('FormController', {});
        ctrl.firstname = 'Sarah';
        ctrl.surname = 'Müller';
        ctrl.street = 'Bernstr 150';
        ctrl.postcode = '3000';
        ctrl.place = 'Bern';
        ctrl.country = 'Schweiz';
        var data = {
            firstname: ctrl.firstname,
            surname: ctrl.surname,
            street: ctrl.street,
            postcode: ctrl.postcode,
            place: ctrl.place,
            country: ctrl.country
        };
        $httpBackend.whenPOST('/address', data).respond(200, {});
        ctrl.save();
        $httpBackend.flush();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
        expect($httpBackend.verifyNoOutstandingRequest).not.toThrow();
    }));
    it('DeleteController should call dataFactory delete', inject(function () {
        stateParams = { id: 1 };
        ctrl = $controller('DeleteController', { $stateParams: stateParams });
        $httpBackend.whenDELETE('/address/1').respond(200, {});
        $httpBackend.flush();
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
        expect($httpBackend.verifyNoOutstandingRequest).not.toThrow();
    }));
}); 