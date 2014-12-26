angular.module("node").factory("node.class.Node", [

    // Resources

    function () {
        "use strict";

        return function (label) {
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
    }
]);
