const factory = require('../exercises/07-http-requests');

let $http;
let $httpBackend;
let $scope;
let objectMock = require('../mocks/object.mock');
let service;

describe('07 - http requests', () => {
  beforeEach(angular.mock.inject($injector => {
    $http = $injector.get('$http');
    $scope = $injector.get('$rootScope').$new();

    $httpBackend = $injector.get('$httpBackend');
    angular.extend($scope, objectMock(
      'getThenHandler',
      'getCatchHandler',
      'postThenHandler',
      'postCatchHandler'
    ));

    service = factory(
      $http,
      $scope
    );
  }));

  describe('GET', () => {
    it('should handle successful responses', () => {
      $httpBackend.whenGET('http://domain.org').respond('value');
      service.get();
      $httpBackend.flush();
      $scope.getThenHandler.should.have.been.called;
      $scope.getCatchHandler.should.not.have.been.called;
    });

    it('should handle error responses', () => {
      $httpBackend.whenGET('http://domain.org').respond(500);
      service.get();
      $httpBackend.flush();
      $scope.getThenHandler.should.not.have.been.called;
      $scope.getCatchHandler.should.have.been.called;
    });
  });

  describe('POST', () => {
    it('should handle successful responses', () => {
      $httpBackend.whenPOST('http://domain.org').respond(200);
      service.post();
      $httpBackend.flush();
      $scope.postThenHandler.should.have.been.called;
      $scope.postCatchHandler.should.not.have.been.called;
    });

    it('should handle error responses', () => {
      $httpBackend.whenPOST('http://domain.org').respond(500);
      service.post();
      $httpBackend.flush();
      $scope.postThenHandler.should.not.have.been.called;
      $scope.postCatchHandler.should.have.been.called;
    });
  });
});
