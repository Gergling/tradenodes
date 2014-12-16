module.exports = function (png) {
    "use strict";

    var Raster = require("./raster");

    this.Pixel = require("./pixel");

    this.raster = new Raster(png);
};
