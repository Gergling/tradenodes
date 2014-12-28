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
                supplier = new Node("Supplier World"),
                dead = new Node("Dead World"),
                production = new Production(new Order(products.food, 1));

            buyer.consumptions(new Order(products.food, 3));
            list.push(buyer);

            supplier.productions(production);
            supplier.exports(new Export(new Order(products.food, 1), buyer));
            list.push(supplier);

            list.push(dead);
        }(this.list));
    }
]);
