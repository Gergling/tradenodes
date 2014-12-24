angular.module("application")

    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        var Route = function (name, label, module) {
                this.name = name;
                this.label = label;
                this.partial = 'modules/' + module + '/partial/index.html';
            },

            containerPartial = 'modules/application/partial/container.html',
            routes = {
                '/': { redirectTo: '/overview/' },
                '/overview/': new Route("overview", "Overview", 'application'),
                '/products/': new Route("products", "Products", 'product'),
                '/nodes/': new Route("nodes", "Nodes", 'node')
            };

        angular.forEach(routes, function (obj, route) {
            obj.templateUrl = containerPartial;
            $routeProvider.when(route, obj);
        });

        $routeProvider.otherwise({templateUrl: containerPartial, partial: 'modules/application/partial/404.html'});
    }])

    .controller("application.controller.index", [

        "$rootScope",
        "application.service.primary-navigation",

        function ($scope, navigation) {
            "use strict";

            $scope.navigation = navigation;
            $scope.$on("$routeChangeStart", function (event, next) {
                $scope.routeTemplateUrl = next.partial;
                navigation.setActive(next.name);
            });
        }
    ]);
