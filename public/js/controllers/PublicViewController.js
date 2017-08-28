define(['app'], function (app) {
  app.controller('HomeViewController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $rootScope.backgroundEnabled = true;
    $rootScope.mainNavigation = "public";
    $rootScope.showTabs = true;

    $http.get("/api/server").then(function (response) {
      $scope.serverStatus = response.data;
      $scope.serverStatus.onlineString = "No";
      if ($scope.serverStatus.online) {
        $scope.serverStatus.onlineString = "Yes";
      }

      var minutes = Math.floor(parseInt($scope.serverStatus.shuttle_timer) / 60);
      var seconds = parseInt($scope.serverStatus.shuttle_timer) - minutes * 60;
      $scope.serverStatus.shuttle_timer_friendly = minutes + ":" + seconds;
    });
  }]);
});
