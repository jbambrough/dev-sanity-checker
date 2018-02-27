module.exports = /*@ngInject*/ function(
  $http,
  $scope
) {
  function get() {
    return $http.get('http://domain.org')
      .then(() => $scope.getThenHandler())
      .catch(() => $scope.getCatchHandler());
  }

  function post() {
    return $http.post('http://domain.org', {name: 'foo'})
      .then(() => $scope.postThenHandler())
      .catch(() => $scope.postCatchHandler());
  }

  return {
    get: get,
    post: post
  };
};
