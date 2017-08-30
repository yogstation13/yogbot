define([], function () {
  return {
    defaultRoutePath: '/404',
    routes: {
      '/': {
        templateUrl: 'js/templates/home.html',
        dependencies: [
                    'controllers/HomeViewController'
                ]
      },
      '/about': {
        templateUrl: 'js/templates/about.html',
        dependencies: [
                    'controllers/AboutViewController'
                ]
      },
      '/home': {
        templateUrl: 'js/templates/home.html',
        dependencies: [
                    'controllers/PublicViewController'
                ]
      },
      '/bans/:ckey?/:pageNumber?/:pageLimit?': {
        templateUrl: 'js/templates/bans.html',
        dependencies: [
                    'controllers/BanViewController'
                ]
      },
      '/library/book/:id?': {
        templateUrl: 'js/templates/book.html',
        dependencies: [
                    'controllers/BookViewController'
                ]
      },
      '/library/:category?/:pageNumber?/:pageLimit?': {
        templateUrl: 'js/templates/library.html',
        dependencies: [
                    'controllers/LibraryViewController'
                ]
      },
      '/donate': {
        templateUrl: 'js/templates/donate.html',
        dependencies: [
                ]
      },
      '/login': {
        templateUrl: 'js/templates/login.html',
        dependencies: [
                      'controllers/LoginViewController'
                ]
      },
      '/register': {
        templateUrl: 'js/templates/register.html',
        dependencies: [
                      'controllers/RegisterViewController'
                ]
      },
      '/dashboard': {
        templateUrl: 'js/templates/dashboard.html',
        dependencies: [
                      'controllers/DashboardViewController'
                ]
      },
      '/404': {
        templateUrl: 'js/templates/404.html',
        dependencies: []
      }

    }
  };
});
