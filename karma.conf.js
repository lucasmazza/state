module.exports = function(config) {
  config.set({
    plugins: ['karma-browserify', 'karma-qunit', 'karma-phantomjs-launcher'],
    frameworks: ['browserify', 'qunit'],
    files: [
      'src/*.js',
      'test/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/**/*.js' : ['browserify'],
      'test/**/*.js': ['browserify']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    browserify: {
      debug: true,
      transform: ['babelify']
    }
  })
}
