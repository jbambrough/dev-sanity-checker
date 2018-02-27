module.exports = /*@ngInject*/ function(
  $scope
) {
  let count = 0;

  $scope.$watch('value', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      count++;
    }
  });

  $scope.doesCountEqualThree = () => count === 3;
};
