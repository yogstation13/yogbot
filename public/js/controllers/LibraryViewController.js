define(['app', 'scripts/dateToHuman'], function (app, dateToHuman) {
  app.controller('LibraryViewController', ['$scope', '$rootScope', '$http', '$routeParams', '$location', function ($scope, $rootScope, $http, $routeParams, $location) {
    $rootScope.backgroundEnabled = false;
    $rootScope.mainNavigation = "public";
    $rootScope.showTabs = true;

    $scope.currentPage = 1;
    $scope.categories = [];
    $scope.pageLimit = 30;
    $scope.category = "all";

    if ($routeParams.pageNumber) {
      $scope.currentPage = parseInt($routeParams.pageNumber);
    }

    if ($routeParams.category) {
      $scope.category = $routeParams.category;
    }

    if ($routeParams.pageLimit) {
      $scope.pageLimit = parseInt($routeParams.pageLimit);
    }

    //('select').material_select();

    $scope.categorySelected = () => {
      $scope.loadBooks()
    }

    $scope.loadBooks = () => {
      $http.get("/api/library/books/" + $scope.category + "/" + $scope.currentPage + "/" + $scope.pageLimit).then((response) => {
        var books = [];
        response.data.forEach((book) => {
          book.published = dateToHuman(new Date(book.datetime));
          books.push(book);
        });
        console.log(response);
        $scope.books = books;
      });
    }

    $scope.loadCategories = () => {
      $http.get("/api/library/categories").then((response) => {
        console.log(response);
        if (response.data.error) {
          $rootScope.error = {
            header: "Error",
            content: "There was an error fetching categories. This is the error code: " + response.data.error
          }
          $('#modal-error').modal('open');
          return;
        }

        $('select').material_select('destroy');

        $scope.categories = response.data;
        setTimeout(() => {
          $('select').material_select();
        }, 1000);
      });
    }

    $scope.previewBook = (id) => {
      $http.get("/api/library/book/" + id).then((response) => {
        console.log(id)
        if (response.data.error) {
          $scope.book = {
            title: "Error",
            content: response.data.error
          }
        }
        else {
          $scope.book = {
            title: response.data.title,
            content: response.data.content
          }
        }

        $('#modal-book').modal('open');
      });
    }

    $scope.loadCategories();
    $scope.loadBooks();

    }]);
});
