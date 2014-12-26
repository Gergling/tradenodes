angular.module("node").factory("node.class.Production", [

    // Resources

    function () {
        "use strict";

        return function (product) {
            var labour = [ ];
            if (!product instanceof Order) {throw new Error("Production needs to be passed an Order."); }

            this.product = function () {return product; };
            this.labour = function (order) {labour.push(order); };
        };
    }
]);
