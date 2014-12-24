angular.module("application").directive("componentBracket", function () {
    "use strict";

    return {
        transclude: true,
        scope: {horizontal: "@"},
        templateUrl: 'modules/application/partial/component-bracket.html'
    };
});
