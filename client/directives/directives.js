app.directive('back', function factory($window) {
  return {
    restrict   : 'E',
    replace    : true,
    transclude : true,
    link: function (scope, element, attrs) {
      scope.navBack = function() {
        $window.history.back();
      };
    }
  };
});
