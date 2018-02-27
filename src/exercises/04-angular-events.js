module.exports = /*@ngInject*/ function(
  $rootScope,
  $scope
) {
  $scope.$on('eventName', (e, args) => $scope.eventCalledWith = args);

  $scope.$broadcast('otherEventName');

  if ($scope.emitOtherEvent) {
    $rootScope.$emit('otherOtherEventName');
  }
};
