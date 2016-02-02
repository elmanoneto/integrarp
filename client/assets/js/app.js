var app = angular.module('ideros', ['ngRoute', 'ngResource', 'angular-storage']);

app.config(function ($routeProvider, $httpProvider) {

    $routeProvider
      .when('/', {
          templateUrl : '../views/home.html',
          controller  : 'AuthController'
      })
      .when('/account', {
          templateUrl : '../views/account.html',
          controller  : 'AccountController'
      })
      .when('/account/deposit', {
          templateUrl : '../views/deposit.html',
          controller  : 'AccountController'
      });

      $httpProvider.interceptors.push('APIInterceptor');
})
