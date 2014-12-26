angular.module("product").factory("product.class.Product", [

    // Resources

    function () {
        "use strict";

        return function (name, label, units) {
            this.name = function () {return name; };
            this.label = function () {return label; };
            this.units = function () {return units || label + " Units"; };
        };
    }
]);
