ngModules.get("application").component(function (ngm, mod) {
    "use strict";

    ngm.directive("componentBracket", function () {
        return {
            transclude: true,
            scope: {horizontal: "@"},
            templateUrl: 'modules/' + mod.getPartialUrl("component-bracket"),
            /*controller: [

                "$scope",

                function ($scope) {
                    var bracket = layout.bracket[$scope.name],
                        bracketWidth = 4,
                        align = bracket.align;

                    $scope.paddingLeft = align === "right" ? 0 : bracketWidth;
                    $scope.paddingRight = align === "left" ? 0 : bracketWidth;
                    $scope.paddingTop = align === "bottom" ? 0 : bracketWidth;
                    $scope.paddingBottom = align === "top" ? 0 : bracketWidth;
                    $scope.width = bracket.width;
                    $scope.height = bracket.height;
                }
            ]*/
        };
    });
});
