angular.module('OWMApp', ['ngRoute'])

.value('owmCities', ['New York', 'Dallas', 'Chicago'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
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
    .controller('HomeCtrl', ['$scope', function ($scope) {
        //empty for now
    }])
    .controller('CityCtrl', function ($scope, city) {
        $scope.city = city;
    });
