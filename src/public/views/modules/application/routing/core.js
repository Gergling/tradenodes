ngModules.get("application").component(function (ngm, mod) {
    "use strict";

    ngm.config(['$routeProvider', function ($routeProvider) {
        var getPartialUrl = function (name) {return 'modules/' + mod.getPartialUrl(name); };

        var routes = {
            '/': {redirectTo: "/mess/"},
            '/mess/': {partial: getPartialUrl('index'), name: "mess"},
            '/cargo-bay/': {partial: 'modules/test/partial/test.html', name: "cargo-bay"},
            '/bridge/': {partial: 'modules/quest/partial/quests.html', name: "bridge"},
            '/skills/': {partial: 'modules/skill/partial/skills.html', name: "skills"}
        };

        routes['/bridge/battle/'] = angular.copy(routes['/bridge/']);
        routes['/bridge/battle/'].partial = "modules/battle/partial/battle.html";

        routes['/skills/:skill*'] = routes['/skills/'];

        angular.forEach(routes, function (obj, route) {
            obj.templateUrl = getPartialUrl('container');
            $routeProvider.when(route, obj);
        });
        $routeProvider.otherwise({templateUrl: getPartialUrl('container'), partial: getPartialUrl('404')});
    }]);
    ngm.controller(mod.getModuleName("controller", "index"), [

        "$rootScope",
        "application.service.primary-navigation",
        "skill.service.navigation",

        function ($scope, navigation, skillNavigation) {
            $scope.navigation = navigation;
            $scope.$on("$routeChangeStart", function (event, next, current) {
                $scope.routeTemplateUrl = next.partial;
                navigation.setActive(next.name);

                if (next.name === "skills") {
                    skillNavigation.setPath(next.params.skill);
                }
            });
        }
    ]);
});
