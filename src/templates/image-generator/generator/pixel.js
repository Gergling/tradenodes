var Pixel = function (red, green, blue, alpha) {
    "use strict";

    var maths = require("./maths"),
        channels = ["red", "green", "blue", "alpha"];

    this.red = red || 0;
    this.green = green || 0;
    this.blue = blue || 0;
    this.alpha = alpha || 255;

    this.toPNG = function (data, offset) {
        data[offset] = this.red;
        data[offset + 1] = this.green;
        data[offset + 2] = this.blue;
        data[offset + 3] = this.alpha;
    };

    this.getGradient = function (start, end, from, to, current, pixel) {
        pixel = pixel || new Pixel();
        channels.forEach(function (channel) {
            pixel[channel] = maths.interpolate(
                start[channel],
                end[channel],
                from,
                to,
                current
            );
        });
        return pixel;
    };
    this.setGradient = function (start, end, from, to, current) {
        return this.getGradient(start, end, from, to, current, this);
    };
    this.inspect = function () {
        return "Pixel RGBA: (" + [
            this.red,
            this.green,
            this.blue,
            this.alpha
        ].join(", ") + ")";
    };
    this.copy = function () {
        return new Pixel(this.red, this.green, this.blue, this.alpha);
    };
};

module.exports = Pixel;
