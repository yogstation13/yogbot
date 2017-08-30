define(['routes', 'scripts/dependencyResolverFor', 'scripts/locationPath'], function (config, dependencyResolverFor, locationPath) {
  var app = angular.module('app', ['ngRoute', 'ngSanitize', 'angular-jwt', 'ngCookies']);
  locationPath(app);

  app.config(
    [
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
      {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;

        $locationProvider.html5Mode(true);

        if (config.routes !== undefined) {
          angular.forEach(config.routes, function (route, path) {
            $routeProvider.when(path, {
              templateUrl: route.templateUrl,
              resolve: dependencyResolverFor(route.dependencies)
            });
          });
        }

        if (config.defaultRoutePath !== undefined) {
          $routeProvider.otherwise({
            redirectTo: config.defaultRoutePath
          });
        }
        }
    ]);

  app.controller("RootController", ['$scope', '$rootScope', '$location', '$cookies', 'jwtHelper', ($scope, $rootScope, $location, $cookies, jwtHelper) => {

    var cookie = $cookies.get('token');
    if (cookie) {
      $rootScope.login = jwtHelper.decodeToken(cookie);
    }

    $scope.changeLocation = (location) => {
      $location.path(location);
    }
  }]);

  app.factory('dateToHuman', [function () {
    return (datetime) => {
      var seconds = Math.floor((new Date() - datetime) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }
  }]);

  app.directive('rebuildTooltips', function ($timeout) {
    return {
      link: function (scope, element, attr) {
        $timeout(function () {

        });
      }
    };
  });

  return app;
});
