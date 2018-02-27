class Component {
  /*@ngInject*/
  constructor(
    $location,
    sss,
    featureFlags,
    strings
  ) {
    this.$location = $location;
    this.featureFlags = featureFlags;
    this.strings = strings;
  }

  $onInit() {
    this.initStep1();
    this.initStep2(this.dataModel);
  }

  $onChanges(changes) {
    if (changes.text && this.featureFlags.HIGHLIGHT_TEXT) {
      this.highlight();
    }

    if (changes.href) {
      this.$location.path(changes.href);
    }
  }

  highlight() {
    // ...
  }

  initStep1() {
    // ...
  }

  initStep2() {
    // ...
  }
}

module.exports = {
  controller: Component,
  bindings: {
    dataModel: '=',
    href: '=?',
    text: '@'
  },
  templateUrl: /*@ngInject*/ siteConfig =>
    `/template${siteConfig.fileSuffix}.html`
};
