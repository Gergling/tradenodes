angular.module("node").factory("node.class.Export", [

    // Resources

    function () {
        "use strict";

        return function (order, node) {
            this.order = function () {return order; };
            this.node = function () {return node; };

            node.imports(order);
        };
    }
]);
