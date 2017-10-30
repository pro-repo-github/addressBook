module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-resource/angular-resource.min.js',
            'public/lib/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'public/app/*.js',
            'test/**/*[Ss]pec.js'],
        preprocessors: {
            'public/app/*.js': ['coverage']
        },
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
			'karma-firefox-launcher',
            'karma-coverage'
        ],
        reporters: ['progress', 'coverage'],
        port: 9878,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autowatch: true,
        browsers: ['Chrome','Firefox'],
        singleRun: false,
        concurrency: Infinity,
        coverageReporter: {
            includeAllSources: true,
            dir: 'coverage/',
            reporters: [
                { type: "html", subdir: "html" },
                { type: 'text-summary' }
            ]
        }
    });
};