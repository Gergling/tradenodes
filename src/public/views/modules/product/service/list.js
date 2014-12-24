angular.module("product").service("product.service.list", [

    function () {
        "use strict";

        var Product;

        this.list = { };

        Product = function (name, label, units) {
            this.name = function () {return name; };
            this.label = function () {return label; };
            this.units = function () {return units || label + " Units"; };
        };

        this.list.food = new Product("food", "Food", "Tonnes");
    }
]);
