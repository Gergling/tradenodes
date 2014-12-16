var scope = this;
var dimensionalRatio = 5/8;

this.width = 320;
this.height = this.width * dimensionalRatio;

var thickness = {
    border: {
        outer: 10,
        middle: 10,
        inner: 10
    }
};

var gradients = {
    light: (function () {
        grd = ctx.createLinearGradient(0,0,scope.width,scope.height);
        grd.addColorStop(0,"lightgrey");
        grd.addColorStop(0.1,"grey");
        grd.addColorStop(0.4,"lightgrey");
        grd.addColorStop(0.52,"grey");
        grd.addColorStop(0.6,"lightgrey");
        grd.addColorStop(0.9,"grey");
        grd.addColorStop(1,"lightgrey");
        return grd;
    }()),
    medium: (function () {
        grd = ctx.createLinearGradient(scope.width,0,0,scope.height);
        grd.addColorStop(0,"lightgrey");
        grd.addColorStop(0.1,"grey");
        grd.addColorStop(0.4,"lightgrey");
        grd.addColorStop(0.52,"grey");
        grd.addColorStop(0.6,"lightgrey");
        grd.addColorStop(0.9,"grey");
        grd.addColorStop(1,"lightgrey");
        return grd;
    }()),
    peppermint: (function () {
        grd = ctx.createLinearGradient(scope.width,0,0,scope.height);
        grd.addColorStop(0,"grey");
        grd.addColorStop(0.1,"#333");
        grd.addColorStop(0.4,"#a44");
        grd.addColorStop(0.52,"#333");
        grd.addColorStop(0.6,"grey");
        grd.addColorStop(0.9,"#333");
        grd.addColorStop(1,"#a44");
        return grd;
    }()),
    sideways: (function () {
        grd = ctx.createLinearGradient(0,0,0,scope.height);
        grd.addColorStop(0,"lightgrey");
        grd.addColorStop(0.1,"grey");
        grd.addColorStop(0.4,"lightgrey");
        grd.addColorStop(0.52,"grey");
        grd.addColorStop(0.6,"lightgrey");
        grd.addColorStop(0.9,"grey");
        grd.addColorStop(1,"lightgrey");
        return grd;
    }()),
    dark: (function () {
        grd = ctx.createLinearGradient(0,0,scope.width,scope.height);
        grd.addColorStop(0,"grey");
        grd.addColorStop(0.1,"#333");
        grd.addColorStop(0.4,"grey");
        grd.addColorStop(0.52,"#333");
        grd.addColorStop(0.6,"grey");
        grd.addColorStop(0.9,"#333");
        grd.addColorStop(1,"#a44");
        return grd;
    }())
};

var tbo = thickness.border.outer,
    tbm = thickness.border.middle,
    tbi = thickness.border.inner;

ctx.strokeStyle = gradients.sideways;
ctx.lineWidth = tbm;
var offset = tbo * 1.5,
    w = this.width - (offset * 2),
    h = this.height - (offset * 2);
ctx.rect(offset, offset, w, h);
ctx.stroke();

var a = new Point();
var b = new Point();
var points = {
    tl: new Point(0, 0),
    tr: new Point(this.width, 0),
    bl: new Point(0, this.height),
    br: new Point(this.width, this.height)
};

ctx.lineWidth = 2;

for(i = 0;i < tbo; i++) {
    // Outer Top
    ctx.strokeStyle = gradients.medium;
    a.x = points.tl.x + i;
    b.x = points.tr.x - i;
    a.y = i;b.y = a.y;
    scope.drawLine(ctx, a, b);

    // Outer Bottom
    ctx.strokeStyle = gradients.dark;
    a.y = this.height - i;b.y = a.y;
    scope.drawLine(ctx, a, b);

    // Outer Left
    ctx.strokeStyle = gradients.light;
    a.y = points.tl.y + i;
    b.y = points.bl.y - i;
    a.x = i;b.x = a.x;
    scope.drawLine(ctx, a, b);

    // Outer Right
    ctx.strokeStyle = gradients.peppermint;
    a.x = this.width - i;b.x = a.x;
    scope.drawLine(ctx, a, b);
}

for(j = 0;j < tbi; j++) {
    var i = j + tbo + tbm;
    // Inner Top
    ctx.strokeStyle = gradients.dark;
    a.x = points.tl.x + i;
    b.x = points.tr.x - i;
    a.y = i;b.y = a.y;
    scope.drawLine(ctx, a, b);

    // Inner Bottom
    ctx.strokeStyle = gradients.medium;
    a.y = this.height - i;b.y = a.y;
    scope.drawLine(ctx, a, b);

    // Inner Left
    ctx.strokeStyle = gradients.peppermint;
    a.y = points.tl.y + i;
    b.y = points.bl.y - i;
    a.x = i;b.x = a.x;
    scope.drawLine(ctx, a, b);

    // Inner Right
    ctx.strokeStyle = gradients.light;
    a.x = this.width - i;b.x = a.x;
    scope.drawLine(ctx, a, b);
}

//grd = ctx.createLinearGradient(scope.width,0,0,scope.height);
var x = tbo + (tbm/1.5);
y=x;
var sx = x - (tbm/4), sy = sx;
var grd=ctx.createRadialGradient(sx,sy,0,x,y,Math.ceil(tbm/3));
grd.addColorStop(0,"white");
grd.addColorStop(0.1,"lightgrey");
grd.addColorStop(0.3,"darkgrey");
grd.addColorStop(0.6,"grey");
grd.addColorStop(1,"black");


ctx.beginPath();
ctx.arc(x,y, tbo/3, 0, 2 * Math.PI, false);
ctx.fillStyle = grd;
ctx.fill();
