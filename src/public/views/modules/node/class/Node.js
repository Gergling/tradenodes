angular.module("node").factory("node.class.Node", [

    "node.class.Production",

    function (Production) {
        "use strict";

        return function (label) {
            var productions = [ ],
                consumptions = [ ],
                imports = [ ],
                exports = [ ],
                storage = [ ];

            this.label = function () {return label; };
            this.productions = function (production) {
                if (production) {
                    if (!production instanceof Production) {throw new Error("Node::productions(production) must be passed an object of type Production.");}
                    productions.push(production);
                }
                return productions;
            };
            this.consumptions = function (order) {consumptions.push(order); };
            this.imports = function (order) {imports.push(order); };
            this.exports = function (exp) {exports.push(exp);};

            this.analysis = function () {
                // Get total consumptions
                var analysis = {
                        productions: productions.length,
                        consumptions: consumptions.length,
                        imports: imports.length,
                        exports: exports.length,
                        storage: storage.length,
                        show: false,
                        products: { },
                        anomalies: [ ],
                        warning: [ ],
                        waste: [ ]
                    },
                    surplus = { },
                    setSurplus = function (order, add) {
                        var name = order.product().name(),
                            quantity = order.quantity();

                        if (!surplus[name]) {surplus[name] = 0; }
                        if (add) {
                            surplus[name] += quantity;
                        } else {
                            surplus[name] -= quantity;
                        }
                    },
                    addSurplus = function (order) {setSurplus(order, true); };

                // Internal
                productions.forEach(function (production) {
                    addSurplus(production.product());
                    if (production.labour().length === 0) {
                        analysis.anomalies.push([
                            "No labour costs for production: ",
                            production.product().product().name()
                        ].join(""));
                    }
                });
                consumptions.forEach(setSurplus);

                // External
                imports.forEach(addSurplus);
                exports.forEach(function (exp) {
                    setSurplus(exp.order());
                });

                // Create analyses object and return.
                angular.forEach(surplus, function (quantity, name) {
                    if (quantity < 0) {
                        analysis.warning.push("Immediate deficit: " + name + " (" + quantity + "/time unit)");
                        analysis.show = true;
                    }
                    if (quantity > 0) {
                        analysis.waste.push(name + " (" + quantity + "/time unit)");
                        analysis.show = true;
                    }
                });
                // Total imports + productions - consumptions
                // = surplus
                // if surplus -ve, is deficit, number of years before starvation
                // if surplus +ve, number of years before storage space filled
                // if storage space 0, +ve surplus is all waste

                return analysis;
            };
        };
    }
]);
