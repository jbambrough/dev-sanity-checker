module.exports = /*@ngInject*/ function(
  $scope,
  $timeout,
  slowService
) {
  slowService.get()
    .then(() => $scope.thenHandler())
    .then(() => $scope.thenHandler2())
    .catch(() => $scope.catchHandler())
    .finally(() => $scope.finallyHandler());

  $scope.waitForIt = () => {
    $timeout(() => $scope.waitHandler(), 10000);
  };
};
