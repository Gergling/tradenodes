var radius = 100, 
    rd2 = radius / 2,
    rd4 = radius / 4,
    rd8 = radius / 8,
    rd16 = radius / 16,
    rd32 = radius / 32;
this.width = (radius * 4);
this.height = (radius * 3);
var ratio = this.height / this.width;
var cx = this.width/2, cy = this.height/2;
var l = new Point(cx - radius, cy);
var r = new Point(cx + radius, cy);
var al = new Point();
var ar = new Point();
var lx, ly, h, gradients = {
    darkred: function () {
        var grd = ctx.createLinearGradient(0,cy-radius,0,cy+radius);
        grd.addColorStop(0,"darkred");
        grd.addColorStop(0.18,"darkred");
        grd.addColorStop(0.21,"red");
        grd.addColorStop(0.25,"darkred");
        grd.addColorStop(1,"darkred");
        return grd;
    }()
};


var background = new Image();
background.src = "https://c3e0976d5fa48a0ee2571be341af11486e64e7de.googledrive.com/host/0Bxf8n7VcUjWsdlc0QUpRWUEzTUk/black-hole.jpg";
background.onload = function() {
    // Draw in background image
    var backgroundRatio = background.height / background.width, 
        scale = ratio / backgroundRatio,
        bgWidth = scope.width * scale,
        xOffSet = (scope.width - bgWidth) * (scale / 2),
        i;
    ctx.drawImage(background, xOffSet, 0, bgWidth, scope.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'grey';
    var drawHLine = function (y) {
        var al = new Point(0, y);
        var ar = new Point(scope.width, y);
        scope.drawLine(ctx, al, ar);
    };
    for(i = 0; i < cy - radius; i++) {drawHLine(i);}
    for(i = cy - radius; i < cy + radius; i++) {
        var xOffset = Math.sqrt(Math.pow(radius, 2) - Math.pow(i - cy, 2));
        var ll = new Point(0, i);
        var lr = new Point(cx - xOffset, i);
        scope.drawLine(ctx, ll, lr);
        var rl = new Point(cx + xOffset, i);
        var rr = new Point(scope.width, i);
        scope.drawLine(ctx, rl, rr);
    }
    for(i = cy + radius; i < scope.height; i++) {drawHLine(i);}

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = radius/4;
    ctx.strokeStyle = gradients.darkred;
    ctx.stroke();

    var grd=ctx.createLinearGradient(0,cy-radius,0,cy+radius);
    grd.addColorStop(0,"#400");
    grd.addColorStop(1,"#d00");
    ctx.beginPath();
    ctx.arc(cx, cy, radius - rd16, 0, 2 * Math.PI, false);
    ctx.lineWidth = rd8;
    ctx.strokeStyle = grd;
    ctx.stroke();

    grd=ctx.createLinearGradient(cx+(radius/2),cy-radius,cx-(radius/2),cy+radius);
    grd.addColorStop(0,"#ff00ff");
    grd.addColorStop(0.4,"orange");
    grd.addColorStop(0.5,"red");
    grd.addColorStop(0.85,"#c55");
    grd.addColorStop(1,"#f0f");
    ctx.beginPath();
    ctx.arc(cx, cy, radius - (radius/8), 0, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = grd;
    ctx.stroke();

    ctx.lineWidth = rd8;
    ctx.strokeStyle = 'darkred';
    scope.drawLine(ctx, l, r);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    for(i = 0;i < rd16; i++) {
        h = cy - rd8 + i;
        al.copy(l);
        ar.copy(r);
        al.x = l.x - (i*2) + rd8;
        ar.x = r.x + (i*2) - rd8;
        al.y = h;ar.y = al.y;
        scope.drawLine(ctx, al, ar);
    }
    ctx.strokeStyle = '#400';
    for(i = 0;i < rd16; i++) {
        h = cy + rd16 + i;
        al.copy(l);
        ar.copy(r);
        al.x = l.x + (i*2);
        ar.x = r.x - (i*2);
        al.y = h;ar.y = al.y;
        scope.drawLine(ctx, al, ar);
    }

    grd = ctx.createLinearGradient(cx-radius,0,cx+radius,0);
    grd.addColorStop(0,"red");
    grd.addColorStop(0.4,"orange");
    grd.addColorStop(0.48,"white");
    grd.addColorStop(0.55,"#fdf");
    grd.addColorStop(0.7,"#f0f");
    grd.addColorStop(1,"darkred");
    ctx.lineWidth = 1;
    ctx.strokeStyle = grd;
    al.copy(l);
    ar.copy(r);
    al.x += rd8;
    al.y -= rd8;ar.y = al.y;
    ar.x -= rd8;
    scope.drawLine(ctx, al, ar);

    grd = ctx.createLinearGradient(cx-radius,0,cx+radius,0);
    grd.addColorStop(0,"darkred");
    grd.addColorStop(0.1,"red");
    grd.addColorStop(0.4,"orange");
    grd.addColorStop(0.52,"white");
    grd.addColorStop(0.6,"orange");
    grd.addColorStop(0.9,"red");
    grd.addColorStop(1,"darkred");
    ctx.strokeStyle = grd;
    al.y += rd4;ar.y = al.y;
    scope.drawLine(ctx, al, ar);
};
