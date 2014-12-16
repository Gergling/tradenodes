module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        getDec = function (hex) {
            return parseInt(hex, 16);
        },
        colours = {
            lightblue: new Pixel(
                getDec("20"),
                getDec("d0"),
                getDec("f0")
            ),
            lighterblue: new Pixel(
                getDec("90"),
                getDec("e0"),
                getDec("f7")
            )
        };

    png.width = 19;

    generator.raster.gradient(
        colours.lightblue.copy(),
        colours.lighterblue.copy(),
        0,
        0,
        9,
        0
    );

    generator.raster.gradient(
        colours.lighterblue.copy(),
        colours.lightblue.copy(),
        9,
        0,
        19,
        0
    );

};
