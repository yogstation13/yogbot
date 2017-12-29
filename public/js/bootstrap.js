require.config({
  baseUrl: '/js',
  paths: {
    'angular': '/bower_components/angular/angular.min',
    'angular-route': '/bower_components/angular-route/angular-route.min',
    'angular-sanitize': '/bower_components/angular-sanitize/angular-sanitize.min',
    'angular-jwt': '/bower_components/angular-jwt/dist/angular-jwt.min',
    'angular-cookies': '/bower_components/angular-cookies/angular-cookies.min'
  },
  shim: {
    'app': {
      deps: ['angular', 'angular-route', 'angular-sanitize', 'angular-jwt', 'angular-cookies']
    },
    'angular-route': {
      deps: ['angular']
    },
    'angular-sanitize': {
      deps: ['angular']
    },
    'angular-jwt': {
      deps: ['angular']
    },
    'angular-cookies': {
      deps: ['angular']
    }
  }
});

require
  (
    [
        'app'
    ],
    function (app) {
      angular.bootstrap(document, ['app']);
    }
  );
