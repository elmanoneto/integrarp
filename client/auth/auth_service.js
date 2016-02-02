app.factory("AuthService", function($http, $q, $rootScope, AuthStorage) {
  return {
    login: function(email, password) {
      var d = $q.defer();
      $http.post('http://localhost:3000/auth', {
        email: email,
        password: password
      }).success(function(resp) {
        d.resolve(resp);
      }).error(function(resp) {
        d.reject(resp.error);
      });
      return d.promise;
    },
    
    logout: function () {
      $http.defaults.headers.authorization = null;
      AuthStorage.remove();
    }
  };
});
