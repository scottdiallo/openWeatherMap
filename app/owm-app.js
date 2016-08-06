angular.module('OWMApp', ['ngRoute'])

.value('owmCities', ['New York', 'Dallas', 'Chicago'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
            })
            .run(function ($rootScope, $location) {
                $rootScope.$on('$routeChangeError', function () {
                    $location.path('/error');
                });
            })
            .when('/city', {
                templateUrl: 'city.html',
                controller: 'CityCtrl',
                resolve: {
                    city: function (owmFindCity, $route) {
                        var city = $route.current.params.city;
                        return owmFindCity(city);
                    }
                }
            })
    }])
    .when('/error', {
        template: '<p>Error - Page Not Found</p>'
    })
    .controller('HomeCtrl', function () {
        this.welcomeMessage = "Welcome Home";
    });

.controller('CityCtrl', function ($scope, city) {
    $scope.city = city;
});
