angular.module("node").service("node.service.list", [

    "product.service.list",

    function (products) {
        "use strict";

        var Node,
            Order,
            Production;

        this.list = [ ];

        Order = function (product, quantity) {
            this.product = product;
            this.quantity = quantity;
        };
        Production = function (product) {
            var labour = [ ];
            if (!product instanceof Order) {throw new Error("Production needs to be passed an Order."); }

            this.product = function () {return product; };
            this.labour = function (order) {labour.push(order); };
        };
        Node = function (label) {
            var productions = [ ],
                consumptions = [ ],
                imports = [ ],
                exports = [ ];

            this.label = function () {return label; };
            this.productions = function (production) {
                if (production) {
                    productions.push(production);
                }
                return productions;
            };
            this.consumptions = function (order) {consumptions.push(order); };
            this.imports = function (order) {imports.push(order); };
            this.exports = function (order) {exports.push(order); };

            this.analysis = function () {
                // Get total consumptions
                var surplus = { };
                angular.forEach(consumptions, function (consumption) {
                    if (!surplus[consumption.name()]) {surplus[consumption.name()] = 0; }
                    surplus[consumption.name()] -= consumption.quantity();
                });
                // Get total imports + productions
                angular.forEach(imports, function (imp) {
                    if (!surplus[imp.name()]) {surplus[imp.name()] = 0; }
                    surplus[imp.name()] += imp.quantity();
                });
                // Total imports + productions - consumptions
                // = surplus
                // if surplus -ve, is deficit, number of years before starvation can be projected
                // if surplus +ve, number of years before storage space filled can be projected
                // if storage space 0, +ve surplus is all waste
            };
        };

        (function (list) {
            var buyer = new Node("Buyer World"),
                supplier = new Node("Supplier World"),
                production = new Production();

            buyer.consumptions(new Order(products.list.food, 3));
            list.push(buyer);

            supplier.productions(production);
            list.push(supplier);
        }(this.list));
    }
]);
