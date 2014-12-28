angular.module("node").factory("node.class.Production", [

    "node.class.Order",

    function (Order) {
        "use strict";

        return function (product) {
            var labour = [ ];
            if (!product instanceof Order) {throw new Error("Production(product) needs to be passed an Order."); }

            this.product = function () {return product; };
            this.labour = function (order) {
                if (order) {
                    if (!order instanceof Order) {throw new Error("Production::labour(order) needs to be passed an Order."); }
                    labour.push(order);
                }
                return labour;
            };
        };
    }
]);
