angular.module("node").controller("node.controller.index", [

    "$rootScope",
    "node.service.list",

    function ($scope, nodes) {
        "use strict";

        $scope.nodes = nodes.list;
    }
]);
