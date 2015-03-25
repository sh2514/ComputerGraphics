/*
Shikuan Huang
Professor Kenneth Perlin
Computer Graphics
25, March 2015

Assignment 6
*/

function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);
}

function drawDrawings() {
    var cube1 = new cube();
    cube1.v[0] = new Vector4(-1, -1, -1, 1);
    cube1.v[1] = new Vector4(1, -1, -1, 1);
    cube1.v[2] = new Vector4(-1, 1, -1, 1);
    cube1.v[3] = new Vector4(1, 1, -1, 1);
    cube1.v[4] = new Vector4(-1, -1, 1, 1);
    cube1.v[5] = new Vector4(1, -1, 1, 1);
    cube1.v[6] = new Vector4(-1, 1, 1, 1);
    cube1.v[7] = new Vector4(1, 1, 1, 1);

    var train1 = new train();
    // Car 1
    train1.v[0] = new Vector4(.55, 0, -.15, 1);
    train1.v[1] = new Vector4(.85, 0, -.15, 1);
    train1.v[2] = new Vector4(.55, .35, -.15, 1);
    train1.v[3] = new Vector4(.85, .25, -.15, 1);
    train1.v[4] = new Vector4(.55, 0, .15, 1);
    train1.v[5] = new Vector4(.85, 0, .15, 1);
    train1.v[6] = new Vector4(.55, .35, .15, 1);
    train1.v[7] = new Vector4(.85, .25, .15, 1);
    // Car 2
    train1.v[8] = new Vector4(-.05, 0, -.20, 1);
    train1.v[9] = new Vector4(.5, 0, -.20, 1);
    train1.v[10] = new Vector4(-.05, .45, -.20, 1);
    train1.v[11] = new Vector4(.5, .45, -.20, 1);
    train1.v[12] = new Vector4(-.05, 0, .20, 1);
    train1.v[13] = new Vector4(.5, 0, .20, 1);
    train1.v[14] = new Vector4(-.05, .45, .20, 1);
    train1.v[15] = new Vector4(.5, .45, .20, 1);
    // Car 3
    train1.v[16] = new Vector4(-.75, 0, -.20, 1);
    train1.v[17] = new Vector4(-.1, 0, -.20, 1);
    train1.v[18] = new Vector4(-.75, .45, -.20, 1);
    train1.v[19] = new Vector4(-.1, .45, -.20, 1);
    train1.v[20] = new Vector4(-.75, 0, .20, 1);
    train1.v[21] = new Vector4(-.1, 0, .20, 1);
    train1.v[22] = new Vector4(-.75, .45, .20, 1);
    train1.v[23] = new Vector4(-.1, .45, .20, 1);
    // Connect 1
    train1.v[24] = new Vector4(.5, 0, -.05, 1);
    train1.v[25] = new Vector4(.55, 0, -.05, 1);
    train1.v[26] = new Vector4(.5, 0, .05, 1);
    train1.v[27] = new Vector4(.55, 0, .05, 1);
    // Connect 2
    train1.v[28] = new Vector4(-.1, 0, -.05, 1);
    train1.v[29] = new Vector4(-.05, 0, -.05, 1);
    train1.v[30] = new Vector4(-.1, 0, .05, 1);
    train1.v[31] = new Vector4(-.05, 0, .05, 1);
    // Car 1 Door
    train1.v[32] = new Vector4(.6, .01, .15, 1);
    train1.v[33] = new Vector4(.7, .01, .15, 1);
    train1.v[34] = new Vector4(.6, .2, .15, 1);
    train1.v[35] = new Vector4(.7, .2, .15, 1);
    // Car 2 Door
    train1.v[36] = new Vector4(.35, .01, .20, 1);
    train1.v[37] = new Vector4(.45, .01, .20, 1);
    train1.v[38] = new Vector4(.35, .2, .20, 1);
    train1.v[39] = new Vector4(.45, .2, .20, 1);
    // Car 3 Door
    train1.v[40] = new Vector4(-.25, .01, .20, 1);
    train1.v[41] = new Vector4(-.15, .01, .20, 1);
    train1.v[42] = new Vector4(-.25, .2, .20, 1);
    train1.v[43] = new Vector4(-.15, .2, .20, 1);
    // Car 1 Window
    train1.v[44] = new Vector4(.85, .1, -.12, 1);
    train1.v[45] = new Vector4(.85, .2, -.12, 1);
    train1.v[46] = new Vector4(.85, .1, .12, 1);
    train1.v[47] = new Vector4(.85, .2, .12, 1);
    // Car 2 Windows
    train1.v[48] = new Vector4(0, .1, -.20, 1);
    train1.v[49] = new Vector4(.3, .1, -.20, 1);
    train1.v[50] = new Vector4(0, .2, -.20, 1);
    train1.v[51] = new Vector4(.3, .2, -.20, 1);
    train1.v[52] = new Vector4(0, .1, .20, 1);
    train1.v[53] = new Vector4(.3, .1, .20, 1);
    train1.v[54] = new Vector4(0, .2, .20, 1);
    train1.v[55] = new Vector4(.3, .2, .20, 1);
    // Car 3 Back Doors
    train1.v[56] = new Vector4(-.75, .01, -.17, 1);
    train1.v[57] = new Vector4(-.75, .4, -.17, 1);
    train1.v[58] = new Vector4(-.75, .01, 0, 1);
    train1.v[59] = new Vector4(-.75, .4, 0, 1);
    train1.v[60] = new Vector4(-.75, .01, .17, 1);
    train1.v[61] = new Vector4(-.75, .4, .17, 1);
    train1.v[62] = new Vector4(-.75, .01, 0, 1);
    train1.v[63] = new Vector4(-.75, .4, 0, 1);

    drawOnCanvas1(cube1);
    drawOnCanvas2(train1);
}

function drawOnCanvas1(cube) {
    var canvas = initCanvas('canvas1');
    canvas.update = function (g) {
        var transform1 = new matrix();
        var transform2 = new matrix();
        var transform3 = new matrix();
        var transform4 = new matrix();
        var transform5 = new matrix();
        var copy = cube.makeCopy();

        if (this.cursor.z) {
            transform1.scale(1, 1, 1);
            transform2.rotateX(this.cursor.y / 100);
            transform3.rotateY(this.cursor.x / 100);
            transform4.rotateZ(-this.cursor.x / 100);
            transform5.perspective(-2.4);
        }
        else {
            transform1.scale(Math.tan(time), Math.tan(time), Math.tan(time));
            transform2.rotateX(Math.tan(time));
            transform3.rotateY(Math.tan(time));
            transform4.rotateZ(Math.tan(time));
            transform5.perspective(-2.4);
        }

        for (var i = 0; i < cube.v.length; i++) {
            copy.v[i] = transform1.dot(copy.v[i]);
            copy.v[i] = transform2.dot(copy.v[i]);
            copy.v[i] = transform3.dot(copy.v[i]);
            copy.v[i] = transform4.dot(copy.v[i]);
            copy.v[i] = transform5.dot(copy.v[i]);

            copy.v[i].x = -2.4 * copy.v[i].x / copy.v[i].z;
            copy.v[i].y = -2.4 * copy.v[i].y / copy.v[i].z;
            copy.v[i].z = -2.4 / copy.v[i].z;
        }

        copy.draw(g, 100, 100, canvas.width / 2, canvas.height / 2);
    }
}

function drawOnCanvas2(train) {
    var canvas = initCanvas('canvas2');
    canvas.update = function (g) {
        var transform1 = new matrix();
        var transform2 = new matrix();
        var transform3 = new matrix();
        var transform4 = new matrix();
        var transform5 = new matrix();

        var copy = train.makeCopy();

        if (this.cursor.z) {
            transform1.scale(1, 1, 1);
            transform2.rotateY(-this.cursor.x / 100);
            transform3.rotateZ(0);
            transform4.rotateX(this.cursor.y / 100 - 2);
            transform5.perspective(-2.4);
        }
        else {
            transform1.scale(1, 1, 1);
            transform2.rotateY(time);
            transform3.rotateZ(0);
            transform4.rotateX(Math.PI / 9);
            transform5.perspective(-2.4);
        }

        for (var i = 0; i < train.v.length; i++) {
            copy.v[i] = transform1.dot(copy.v[i]);
            copy.v[i] = transform2.dot(copy.v[i]);
            copy.v[i] = transform3.dot(copy.v[i]);
            copy.v[i] = transform4.dot(copy.v[i]);
            copy.v[i] = transform5.dot(copy.v[i]);

            copy.v[i].x = -2.4 * copy.v[i].x / copy.v[i].z;
            copy.v[i].y = -2.4 * copy.v[i].y / copy.v[i].z;
            copy.v[i].z = -2.4 / copy.v[i].z;
        }

        if (this.cursor.z) {
            copy.draw(g, -50, 0, canvas.width * 1.5, canvas.height * 1.5);
        }
        else {
            copy.draw(g, 50, 50, canvas.width / 1.25, canvas.height / 1.25);
        }
    }
}


/* ==================================================
Matrix
================================================== */
function matrix(width, height) {
    this.m = [];
    this.identity();
    this.width = width;
    this.height = height;
}
matrix.prototype = {
    identity: function () {
        this.m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];
    },
    translate: function (x, y, z) {
        this.m[0][3] = x;
        this.m[1][3] = y;
        this.m[2][3] = z;
    },
    rotateX: function(theta) {
        this.m[1][1] = Math.cos(theta);
        this.m[1][2] = -Math.sin(theta);
        this.m[2][1] = Math.sin(theta);
        this.m[2][2] = Math.cos(theta);
    },
    rotateY: function(theta) {
        this.m[0][0] = Math.cos(theta);
        this.m[2][0] = Math.sin(theta);
        this.m[0][2] = -Math.sin(theta);
        this.m[2][2] = Math.cos(theta);
    },
    rotateZ: function(theta) {
        this.m[0][0] = Math.cos(theta);
        this.m[0][1] = -Math.sin(theta);
        this.m[1][0] = Math.sin(theta);
        this.m[1][1] = Math.cos(theta);
    }, 
    scale: function(x, y, z) {
        this.m[0][0] = x;
        this.m[1][1] = y;
        this.m[2][2] = z;
    },
    // Arguments are vectors
    transform: function(src, dst) {
        dst.x = (this.width / 2) + src.x * (this.width / 2);
        dst.y = (this.height / 2) - src.y * (this.width / 2);
        dst.z = (this.height / 2) - src.z * (this.width / 2);
        dst.w = (this.height / 2) - src.w * (this.width / 2);
    },
    perspective: function (p) {
        this.m[2][3] = p;
    },
    // Argument is a vector
    dot: function (rightVector) {
        var right = [];
        right[0] = rightVector.x;
        right[1] = rightVector.y;
        right[2] = rightVector.z;
        right[3] = rightVector.w;

        var product = [0, 0, 0, 0];
        var currentSum = 0;
        for (var i = 0; i < this.m.length; i++) {
            for (var j = 0; j < this.m[i].length; j++) {
                product[i] += this.m[i][j] * right[j];
            }
        }
        var productVector = new Vector4();
        productVector.copyArray(product);
        return productVector;
    }
}

/* ==================================================
Vector 4
================================================== */
function Vector4(x, y, z, w) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
    this.set(x, y, z, w);
}
Vector4.prototype = {
    set: function (x, y, z, w) {
        if (x !== undefined) this.x = x;
        if (y !== undefined) this.y = y;
        if (z !== undefined) this.z = z;
        if (w !== undefined) this.w = w;
    },
    copy: function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
    },
    copyArray: function (a) {
        this.x = a[0];
        this.y = a[1];
        this.z = a[2];
        this.w = a[3];
    },
}

/* ==================================================
Square
================================================== */
function square(width, height) {
    this.v = [];
    for (var i = 0; i < 4; i++) {
        this.v[i] = new Vector4(0, 0, 0, 1);
    }
}

/* ==================================================
Cube
================================================== */
function cube() {
    this.v = [];
    for (var i = 0; i < 8; i++) {
        this.v[i] = new Vector4(0, 0, 0, 1);
    }

    this.e = [];
    this.e[0] = [0, 1];
    this.e[1] = [0, 2];
    this.e[2] = [1, 3];
    this.e[3] = [2, 3];
    this.e[4] = [0, 4];
    this.e[5] = [1, 5];
    this.e[6] = [2, 6];
    this.e[7] = [3, 7];
    this.e[8] = [4, 5];
    this.e[9] = [4, 6];
    this.e[10] = [5, 7];
    this.e[11] = [6, 7];
}
cube.prototype = {
    draw: function (g, xOff, yOff, width, height) {
        var transformMatrix = new matrix(width, height);
        g.strokeStyle = 'black';
        g.beginPath();

        for (var i = 0; i < this.e.length; i++) {
            var transformedFrom = new Vector4();
            transformedFrom.copy(this.v[this.e[i][0]]);
            transformMatrix.transform(this.v[this.e[i][0]], transformedFrom);

            var transformedTo = new Vector4();
            transformedTo.copy(this.v[this.e[i][1]]);
            transformMatrix.transform(this.v[this.e[i][1]], transformedTo)
            
            g.moveTo(transformedFrom.x + xOff, transformedFrom.y + yOff);
            g.lineTo(transformedTo.x + xOff, transformedTo.y + yOff);
        }

        g.stroke();
    },
    makeCopy: function () {
        var copy = new cube();
        for (var i = 0; i < 8; i++) {
            copy.v[i].copy(this.v[i]);
        }
        return copy;
    }
}

/* ==================================================
Train
================================================== */
function train() {
    this.v = [];
    for (var i = 0; i < 64; i++) {
        this.v[i] = new Vector4(0, 0, 0, 1);
    }

    this.e = [
        // Car 1
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 5],
        [4, 6],
        [5, 7],
        [6, 7],

        // Car 2
        [8, 9],
        [8, 10],
        [9, 11],
        [10, 11],
        [8, 12],
        [9, 13],
        [10, 14],
        [11, 15],
        [12, 13],
        [12, 14],
        [13, 15],
        [14, 15],

        // Car 3
        [16, 17],
        [16, 18],
        [17, 19],
        [18, 19],
        [16, 20],
        [17, 21],
        [18, 22],
        [19, 23],
        [20, 21],
        [20, 22],
        [21, 23],
        [22, 23],

        // Connect 1
        [24, 25],
        [24, 26],
        [25, 27],
        [26, 27],

        // Connect 2
        [28, 29],
        [28, 30],
        [29, 31],
        [30, 31],

        // Car 1 Door
        [32, 33],
        [32, 34],
        [34, 35],
        [35, 33],

        // Car 2 Door
        [36, 37],
        [36, 38],
        [38, 39],
        [39, 37],

        // Car 3 Doors
        [40, 41],
        [40, 42],
        [42, 43],
        [43, 41],

        // Car 1 Window
        [44, 45],
        [44, 46],
        [46, 47],
        [47, 45],

        // Car 2 Windows
        [48, 49],
        [48, 50],
        [50, 51],
        [51, 49],

        [52, 53],
        [52, 54],
        [54, 55],
        [55, 53],

        // Car 3 Back Doors
        [56, 57],
        [56, 58],
        [58, 59],
        [59, 57],

        [60, 61],
        [60, 62],
        [62, 63],
        [63, 61],
    ];
}
train.prototype = {
    draw: function (g, xOff, yOff, width, height) {
        var transformMatrix = new matrix(width, height);
        g.strokeStyle = 'snow';
        g.beginPath();

        /*g.moveTo(xOff, yOff);
        g.lineTo(xOff + 100, yOff + 100);*/

        for (var i = 0; i < 44; i++) {
            var transformedFrom = new Vector4();
            transformedFrom.copy(this.v[this.e[i][0]]);
            transformMatrix.transform(this.v[this.e[i][0]], transformedFrom);

            var transformedTo = new Vector4();
            transformedTo.copy(this.v[this.e[i][1]]);
            transformMatrix.transform(this.v[this.e[i][1]], transformedTo);

            g.moveTo(transformedFrom.x + xOff, transformedFrom.y + yOff);
            g.lineTo(transformedTo.x + xOff, transformedTo.y + yOff);
        }
        g.stroke();
        
        g.beginPath();
        g.strokeStyle = 'gray';
        for (var i = 44; i < this.e.length; i++) {
            var transformedFrom = new Vector4();
            transformedFrom.copy(this.v[this.e[i][0]]);
            transformMatrix.transform(this.v[this.e[i][0]], transformedFrom);

            var transformedTo = new Vector4();
            transformedTo.copy(this.v[this.e[i][1]]);
            transformMatrix.transform(this.v[this.e[i][1]], transformedTo);

            g.moveTo(transformedFrom.x + xOff, transformedFrom.y + yOff);
            g.lineTo(transformedTo.x + xOff, transformedTo.y + yOff);
        }
        g.stroke();
        

    },
    makeCopy: function () {
        var copy = new train();
        for (var i = 0; i < this.v.length; i++) {
            copy.v[i].copy(this.v[i]);
        }
        return copy;
    }
}


loadScript('drawlib1.js', drawDrawings);

