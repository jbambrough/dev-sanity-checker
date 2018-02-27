const component = require('../exercises/02-components');

let $location;
let featureFlags;
let instance;
let strings;

describe('02 - components', () => {
  beforeEach(angular.mock.inject($injector => {
    $location = $injector.get('$location');
    featureFlags = {HIGHLIGHT_TEXT: false};
    strings = {};

    instance = new component.controller(
      $location,
      featureFlags,
      strings
    );
  }));

  it('should initialize', () => {
    const dataModel = {};
    sinon.stub(instance, 'initStep1');
    sinon.stub(instance, 'initStep2');
    instance.dataModel = dataModel;
    instance.$onInit();
    instance.initStep1.should.have.been.called;
    instance.initStep2.should.have.been.calledWith(dataModel);
  });

  it('should highlight changes when HIGHLIGHT_TEXT is active', () => {
    sinon.spy(instance, 'highlight');
    featureFlags.HIGHLIGHT_TEXT = true;
    instance.$onChanges({text: 'text'});
    instance.highlight.should.have.been.called;
  });

  it('should not highlight changes when HIGHLIGHT_TEXT is inactive', () => {
    sinon.spy(instance, 'highlight');
    instance.$onChanges({text: 'text'});
    instance.highlight.should.not.have.been.called;
  });

  it('should change location when href changes', () => {
    instance.$onChanges({href: '/new-url'});
    $location.path().should.equal('/new-url');
  });
});
