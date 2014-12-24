angular.module("common").directive("unfoldableList", function () {
    "use strict";

    return {
        transclude: true,
        templateUrl: 'modules/common/partial/unfoldable-list.html'
    };
});
