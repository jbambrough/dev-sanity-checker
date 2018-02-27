module.exports = /*@ngInject*/ function(
  $sce,
  featureFlags,
  strings
) {
  function link(scope, element, attr) {
    scope.getDisplayHtml = () => $sce.trustAsHtml(strings.displayHtml);

    if ('hidden' in attr) {
      scope.hide = true;
    }

    if (featureFlags.BUTTON && scope.showButton) {
      scope.isButtonShowing = true;
    }
  }

  return {
    scope: {
      people: '=',
      showButton: '=?'
    },
    link: link,
    template: `
      <div ng-hide="hide">
        {{::getDisplayHtml()}}
        <button ng-show="isButtonShowing">Click me</button>
      </div>
    `
  };
};
