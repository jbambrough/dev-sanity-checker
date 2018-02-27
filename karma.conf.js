module.exports = function(config) {
  var filesOverride = '';
  var options = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    browserNoActivityTimeout: Math.max(process.env.KARMA_BROWSER_NO_ACTIVITY_TIMEOUT || 100000, 100000),
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'sinon', 'jasmine', 'sinon-chai'],
    // list of files / patterns to load in the browser
    files: [
      'node_modules/array.prototype.find/index.js',
      'node_modules/array.prototype.findindex/index.js',
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jquery/dist/jquery.js',
      process.env.CH_SPEC || 'src/exercises/**/*.specs.js'
    ],
    // list of files to exclude
    exclude: [],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.specs.js': ['webpack']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/'},
        {type: 'cobertura'}
      ]
    },
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      process.env.CH_KARMA_BROWSER || 'PhantomJS'
    ],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !process.env.CH_SPEC,
    webpack: {
      debug: true,
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [
              'transform/cacheable?brfs',
              'babel?cacheDirectory'
            ]
          },
          {
            test: /\.js$/,
            include: /node_modules/,
            loaders: ['transform/cacheable?brfs']
          },
          {
            test: /\.(html|css|less)$/,
            loader: 'ignore'
          }
        ],
        postLoaders: []
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      // Karma will require() these plugins
      'karma-webpack',
      'karma-chai',
      'karma-spec-reporter',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-coverage'
    ]
  };

  if (!process.env.CH_KARMA_BROWSER) {
    options.webpack.module.postLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /.*\.specs\.js/,
        /.*\.mock\.js/
      ],
      loader: 'istanbul-instrumenter'
    });
  }

  config.set(options);
};
