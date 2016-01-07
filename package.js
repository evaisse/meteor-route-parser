Package.describe({
    name: 'meteor-route-parser',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'A vanilla route parser that implements all features of ruby sinatra routing',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.export('RouteParser');
    api.addFiles('meteor-route-parser.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('meteor-route-parser');
    api.addFiles('meteor-route-parser-tests.js');
});
