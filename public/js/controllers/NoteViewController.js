define(['app', 'scripts/dateToHuman'], function (app, dateToHuman) {
  app.controller('NoteViewController', ['$scope', '$rootScope', '$http', '$routeParams', '$location', function ($scope, $rootScope, $http, $routeParams, $location) {
    $rootScope.backgroundEnabled = false;
    $rootScope.mainNavigation = "dashboard";
    $rootScope.showTabs = true;

    $scope.currentPage = 1;

    if ($routeParams.pageNumber) {
      $scope.currentPage = parseInt($routeParams.pageNumber);
    }

    if ($routeParams.pageLimit) {
      $scope.pageLimit = parseInt($routeParams.pageLimit);
    }

    $scope.categorySelected = () => {
      $scope.loadNotes()
    }

    $scope.loadNotes = () => {
      $http.get("/api/user/" + $rootScope.login.id + "/" + $scope.currentPage + "/" + $scope.pageLimit).then((response) => {
        var notes = [];
        response.data.forEach((note) => {
          note.datetime_human = dateToHuman(new Date(note.datetime));
          notes.push(note);
        });
        $scope.notes = notes;
      });
    }

    $scope.loadNotes();

    }]);
});
