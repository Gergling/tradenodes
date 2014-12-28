angular.module("node").factory("node.class.Order", [

    // Resources

    function () {
        "use strict";

        return function (product, quantity) {
            this.product = function () {return product; };
            this.quantity = function () {return quantity; };
        };
    }
]);
