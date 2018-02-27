const factory = require('../exercises/05-promise-mocks');

let $scope;
let $timeout;
let instance;
let objectMock = require('../mocks/object.mock');
let promiseMock = require('../mocks/promise.mock');
let slowService;
let slowServiceResponse = promiseMock('then', 'catch', 'finally');

describe('05 - promise mocks', () => {
  beforeEach(angular.mock.inject($injector => {
    $scope = $injector.get('$rootScope').$new();
    $timeout = $injector.get('$timeout');
    slowServiceResponse.reset();
    slowService = {
      get: sinon.stub().returns(slowServiceResponse)
    };

    angular.extend($scope,
      objectMock('thenHandler', 'thenHandler2', 'catchHandler', 'finallyHandler', 'waitHandler')
    );

    instance = factory(
      $scope,
      $timeout,
      slowService
    );
  }));

  describe('slow service', () => {
    it('should handle successful responses', () => {
      slowServiceResponse.then.args[0][0]();
      $scope.thenHandler.should.have.been.called;

      slowServiceResponse.then.args[1][0]();
      $scope.thenHandler2.should.have.been.called;
    });

    it('should handle error responses', () => {
      slowServiceResponse.catch.args[0][0]();
      $scope.catchHandler.should.have.been.called;
    });

    it('should handle all responses', () => {
      slowServiceResponse.finally.args[0][0]();
      $scope.finallyHandler.should.have.been.called;
    });
  });

  describe('waitForIt', () => {
    it('should call the wait handler after 10 seconds', () => {
      $scope.waitForIt();
      $timeout.flush();
      $scope.waitHandler.should.have.been.called;
    });
  });
});
