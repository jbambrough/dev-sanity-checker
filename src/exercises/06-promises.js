module.exports = /*@ngInject*/ function(
  $q
) {
  function get() {
    let deferred = $q.defer();
    deferred.resolve('value');
    return deferred.promise;
  }

  return { get: get };
};
