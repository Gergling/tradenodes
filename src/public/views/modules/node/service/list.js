angular.module("node").service("node.service.list", [

    "node.class.Export",
    "node.class.Node",
    "node.class.Order",
    "node.class.Production",

    "product.service.list",

    function (Export, Node, Order, Production, products) {
        "use strict";

        this.list = [ ];

        (function (list) {
            var buyer = new Node("Buyer World"),
                supplier = new Node("Supplier World");

            buyer.consumptions(new Order(products.food, 3));
            list.push(buyer);

            supplier.productions(new Production(new Order(products.food, 4)));
            supplier.consumptions(new Order(products.food, 3));
            supplier.exports(new Export(new Order(products.food, 2), buyer));
            list.push(supplier);

            list.push(new Node("Dead World"));

            list.push(function () {
                var node = new Node("Iron World");
                node.consumptions(new Order(products.food, 2));
                node.productions(function () {
                    var production = new Production(new Order(products.iron, 10));
                    // Labour costs for Iron.
                    return production;
                }());
                return node;
            }());
        }(this.list));
    }
]);
