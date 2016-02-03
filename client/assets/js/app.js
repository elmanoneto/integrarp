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
      })
      .when('/account/debit', {
          templateUrl : '../views/debit.html',
          controller  : 'AccountController'
      })
      .when('/account/edit', {
          templateUrl : '../views/edit.html',
          controller  : 'ClientController'
      })
      .when('/account/transfer', {
          templateUrl : '../views/transfer.html',
          controller  : 'AccountController'
      })
      .when('/account/statement', {
          templateUrl : '../views/statement.html',
          controller  : 'AccountController'
      });

      $httpProvider.interceptors.push('APIInterceptor');
})
