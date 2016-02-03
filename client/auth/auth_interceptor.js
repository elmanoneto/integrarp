app.service('APIInterceptor', function($rootScope, AuthStorage) {
    var service = this;

    service.request = function(config) {
        var currentUser = AuthStorage.getToken(),
            access_token = currentUser ? currentUser : null;

        if (access_token) {
            config.headers.authorization = access_token;
        }
        return config;
    };

    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
})
