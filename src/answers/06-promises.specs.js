const factory = require('../exercises/06-promises');

let $q;
let $rootScope;
let service;

describe('06 - promises', () => {
  beforeEach(angular.mock.inject($injector => {
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');

    service = factory(
      $q
    );
  }));

  describe('get()', () => {
    it('should return a promise containing \'value\'', done => {
      service.get().then(response => {
        response.should.equal('value');
        done();
      });
      $rootScope.$apply();
    });
  });
});
