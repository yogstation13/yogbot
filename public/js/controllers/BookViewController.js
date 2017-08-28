define(['app', 'scripts/dateToHuman'], function (app, dateToHuman) {
  app.controller('BookViewController', ['$scope', '$rootScope', '$http', '$routeParams', '$location', function ($scope, $rootScope, $http, $routeParams, $location) {
    $rootScope.backgroundEnabled = false;
    $rootScope.mainNavigation = "public";
    $rootScope.showTabs = true;

    $scope.book = {};

    if ($routeParams.id) {
      $scope.id = parseInt($routeParams.id);
    }


    $http.get("/api/library/book/" + $scope.id).then((response) => {
      console.log($scope.id)
      if (response.data.error) {
        $scope.book = {
          title: "Error",
          content: response.data.error
        }
      }
      else {
        $scope.book = response.data;
        $scope.book.published = dateToHuman(new Date($scope.book.datetime));
      }
    });

    }]);
});
