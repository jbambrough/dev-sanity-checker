const factory = require('../exercises/03-watchers');

let $scope;
let instance;

describe('03 - watchers', () => {
  beforeEach(angular.mock.inject($injector => {
    $scope = $injector.get('$rootScope').$new();

    instance = factory($scope);
  }));

  it('should count value changes', () => {
    $scope.$apply();
    $scope.value = 'foo';
    $scope.$apply();
    $scope.value = 'bar';
    $scope.$apply();
    $scope.value = 'foo';
    $scope.$apply();
    $scope.doesCountEqualThree().should.be.true;
  });

  it('should not count like value changes', () => {
    $scope.$apply();
    $scope.value = 'foo';
    $scope.$apply();
    $scope.value = 'foo';
    $scope.$apply();
    $scope.value = 'bar';
    $scope.$apply();
    $scope.doesCountEqualThree().should.be.false;
  });
});
