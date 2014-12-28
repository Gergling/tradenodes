angular.module("product").service("product.service.list", [

    "product.class.Product",

    function (Product) {
        "use strict";

        this.food = new Product("food", "Food", "Tonnes");
        this.iron = new Product("iron", "Iron", "Tonnes");
    }
]);
