module.exports = (function () {
    "use strict";

    var grunt = require("grunt"),
        pathService = require("path"),
        fs = require('fs'),
        PNG = require('pngjs').PNG,

        Generator = require("./generator/core"),

        newPNG = function () {
            var png = new PNG();
            if (!png.data) {png.data = [ ]; }
            png.width = 1;
            png.height = 1;
            png.alpha = true;
            return png;
        },
        paths = {
            module: "./",
            generator: "src/templates/image-generator/"
        },
        distFolderPath = paths.generator + "dist/";

    if (!grunt.file.isDir(distFolderPath)) {
        grunt.file.mkdir(distFolderPath);
    }

    grunt.file.expand(paths.generator + "src/*.js").forEach(function (srcPath) {
        var fileName = pathService.basename(srcPath, ".js"),
            distPath = distFolderPath + fileName + ".png",
            dst = fs.createWriteStream(distPath),
            png = newPNG(),
            fnc = require(paths.module + "src/" + fileName),
            gen = new Generator(png);

        if (typeof fnc === "function") {
            fnc(png, gen);

            png.pack().pipe(dst);
            grunt.log.writeln("- Image generated: '" + fileName + "'");
        } else {
            grunt.log.writeln("- No function exported for: "
                + fileName + ".js");
        }
    });

}());
