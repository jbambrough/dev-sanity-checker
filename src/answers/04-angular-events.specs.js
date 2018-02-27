const factory = require('../exercises/04-angular-events');

let $rootScope;
let $scope;
let instance;

describe('04 - angular events', () => {
  beforeEach(angular.mock.inject($injector => {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
  }));

  function createInstance() {
    instance = factory(
      $rootScope,
      $scope
    );
  }

  it('should listen for eventName', () => {
    createInstance();
    $scope.$broadcast('eventName', 'param');
    $scope.eventCalledWith.should.equal('param');
  });

  it('should broadcast otherEventName', done => {
    $scope.$on('otherEventName', () => done());
    createInstance();
  });

  it('should emit otherOtherEventName on root', done => {
    const callback = $rootScope.$on('otherOtherEventName', () => done());
    $scope.emitOtherEvent = true;
    createInstance();
    callback();
  });
});
