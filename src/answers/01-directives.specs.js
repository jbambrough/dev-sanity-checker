const factory = require('../exercises/01-directives');

let $sce;
let $scope;
let directive;
let featureFlags;
let strings;

describe('01 - directives', () => {
  beforeEach(angular.mock.inject($injector => {
    $sce = {trustAsHtml: sinon.stub().returnsArg(0)};
    featureFlags = {BUTTON: false};
    strings = {displayHtml: '<div>display</div>'};

    $scope = $injector.get('$rootScope').$new();

    directive = factory(
      $sce,
      featureFlags,
      strings
    );
  }));

  function runLink(attr = {}) {
    directive.link($scope, null, attr);
  }

  it('should get trusted html', () => {
    runLink();
    $scope.getDisplayHtml().should.equal(strings.displayHtml);
    $sce.trustAsHtml.should.have.been.called;
  });

  it('should hide if there is a hidden attribute', () => {
    runLink({hidden: undefined});
    $scope.hide.should.be.true;
  });

  it('should show the button when feature flag is active', () => {
    featureFlags.BUTTON = true;
    $scope.showButton = true;
    runLink();
    $scope.isButtonShowing.should.be.true;
  });

  it('should hide the button when feature flag is inactive', () => {
    $scope.showButton = true;
    runLink();
    expect($scope.isButtonShowing).to.be.falsy;
  });
});
