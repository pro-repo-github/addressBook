describe('Address Book:', function () {
    beforeEach(module('addressBook', function ($qProvider) { $qProvider.errorOnUnhandledRejections(false) }));
    describe('dataFactory should call', function () {
        var $httpBackend;
		var dataFactory;
        var data = {
            "id": 1, "firstname": "Peter", "surname": "Müller",
            "street": "Zürichstr 110", "postcode": "8000", "place": "Zürich", "country": "Schweiz"
        };
        beforeEach(inject(function (_dataFactory_, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
			dataFactory = _dataFactory_;
        }));
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('getAll and receive data', inject(function () {
            $httpBackend.expect('GET', '/address').respond(200, [{}, {}, {}]);
            expect(dataFactory).not.toBe(null);
            var responsdata = dataFactory.getAll();
            expect(responsdata.length).toBe(0);
            $httpBackend.flush();
            expect(responsdata.length).toBe(3);
        }));
        it('create and send data', inject(function () {
            var data = {
                "firstname": "Peter", "surname": "Müller",
                "street": "Zürichstr 110", "postcode": "8000", "place": "Zürich", "country": "Schweiz"
            };
            $httpBackend.expect('POST', '/address', data).respond(200, { "id": 1 });
            expect(dataFactory).not.toBe(null);
            var responsdata = dataFactory.create(data);
            expect(responsdata).not.toBe(null);
            $httpBackend.flush();
            expect(responsdata.id).toBe(1);
        }));
        it('read and receive data', inject(function () {
            $httpBackend.expect('GET', '/address/1').respond(200, data);
            expect(dataFactory).not.toBe(null);
            var responsdata = dataFactory.read({ id: 1 });
            expect(responsdata).not.toBe(null);
            $httpBackend.flush();
            expect(responsdata.firstname).toBe("Peter");
        }));
        it('update and send data', inject(function () {
            $httpBackend.expect('PUT', '/address/1', data).respond(200, { updatedata: true });
            expect(dataFactory).not.toBe(null);
            var responsdata = dataFactory.update(data);
            expect(responsdata).not.toBe(null);
            $httpBackend.flush();
            expect(responsdata.updatedata).toBe(true);
        }));
        it('delete', inject(function () {
            $httpBackend.expect('DELETE', '/address/1').respond(200, { deletedata: true });
            expect(dataFactory).not.toBe(null);
            var responsdata = dataFactory.delete({ id: 1 });
            expect(responsdata).not.toBe(null);
            $httpBackend.flush();
            expect(responsdata.deletedata).toBe(true);
        }));
    });
});


