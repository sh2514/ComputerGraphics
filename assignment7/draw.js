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
    drawOnCanvasA();
    drawOnCanvasB();
    /*drawOnCanvas1();
    drawOnCanvas2();
    drawOnCanvas3();
    drawOnCanvas4();
    drawOnCanvas5();
    drawOnCanvas6();*/
}

function drawOnCanvasA() {
    var canvas = initCanvas('canvasA');
    canvas.update = function (g) {
        g.strokeStyle = 'white';
        g.beginPath();

        var transformMatrix = new matrix(canvas.width, canvas.height);

        var xModifiers = new Vector4();
        xModifiers.x = -.5;
        xModifiers.y = .8;
        xModifiers.z = 1;
        xModifiers.w = 2;

        var yModifiers = new Vector4();
        yModifiers.x = .5;
        yModifiers.y = .5;
        yModifiers.z = 2;
        yModifiers.w = 1;

        g.moveTo(hermite(xModifiers, 0), hermite(yModifiers, 0));
        for (var t = 0.00; t <= 1.0; t += 0.01) {
            var original = new Vector4();
            original.x = hermite(xModifiers, t);
            original.y = hermite(yModifiers, t);
            original.z = 0;
            original.w = 1;
            var transformedTo = new Vector4();
            transformedTo.copy(original);
            transformMatrix.transform(original, transformedTo);

            g.lineTo(transformedTo.x, transformedTo.y);
        }

        g.stroke();
    }
}

function drawOnCanvasB() {
    var canvas = initCanvas('canvasB');
    canvas.update = function (g) {
        g.strokeStyle = 'white';
        g.beginPath();

        var transformMatrix = new matrix(canvas.width, canvas.height);

        var xModifiers = new Vector4();
        xModifiers.x = -.5;
        xModifiers.y = -.6;
        xModifiers.z = .4;
        xModifiers.w = .6;

        var yModifiers = new Vector4();
        yModifiers.x = .5;
        yModifiers.y = -.6;
        yModifiers.z = -.4;
        yModifiers.w = .7;

        g.moveTo(bezier(xModifiers, 0), bezier(yModifiers, 0));
        for (var t = 0.00; t <= 1.0; t += 0.01) {
            var original = new Vector4();
            original.x = bezier(xModifiers, t);
            original.y = bezier(yModifiers, t);
            original.z = 0;
            original.w = 1;
            var transformedTo = new Vector4();
            transformedTo.copy(original);
            transformMatrix.transform(original, transformedTo);

            g.lineTo(transformedTo.x, transformedTo.y);
        }

        g.stroke();
    }
}

function bezier(arg, t) {
    var bezierMatrix = new matrix();
    bezierMatrix.bezier();
    var result = bezierMatrix.dot(arg);
    var sum = result.x * Math.pow(t, 3) + result.y * Math.pow(t, 2) + result.z * t + result.w;
    return sum;
}

function hermite(arg, t) {
    var hermiteMatrix = new matrix();
    hermiteMatrix.hermite();
    var result = hermiteMatrix.dot(arg);
    var sum = result.x * Math.pow(t, 3) + result.y * Math.pow(t, 2) + result.z * t + result.w;
    return sum;
}

/* ==================================================
Content from previous homeworks
================================================== */

function drawOnCanvas1() {
    var canvas = initCanvas('canvas1');
    canvas.update = function (g) {
        var animate = new matrix();
        var perspectiveMatrix = new matrix();

        var copy = new cube();

        if (this.cursor.z) {
            animate.scale(1, 1, 1);
            animate.rotateX(this.cursor.y / 100);
            animate.rotateY(this.cursor.x / 100);
            animate.rotateZ(-this.cursor.x / 100);
            perspectiveMatrix.perspective(-2.4);
        }
        else {
            animate.scale(.5, .5, .5);
            animate.rotateX(Math.tan(time));
            animate.rotateY(Math.tan(time));
            animate.rotateZ(Math.tan(time));
            animate.perspective(-2.4);
            perspectiveMatrix.perspective(-2.4);
        }

        for (var i = 0; i < copy.v.length; i++) {
            copy.v[i] = animate.dot(copy.v[i]);
            copy.v[i] = perspectiveMatrix.dot(copy.v[i]);

            copy.v[i].x = -2.4 * copy.v[i].x / copy.v[i].z;
            copy.v[i].y = -2.4 * copy.v[i].y / copy.v[i].z;
            copy.v[i].z = -2.4 / copy.v[i].z;
        }

        copy.draw(g, 100, 100, canvas.width / 2, canvas.height / 2);
    }
}

function drawOnCanvas2() {
    var canvas = initCanvas('canvas2');
    canvas.update = function (g) {
        var animate = new matrix();
        var perspectiveMatrix = new matrix();

        var copy = new train();

        if (this.cursor.z) {
            animate.scale(1, 1, 1);
            animate.rotateZ(0);
            animate.rotateX(this.cursor.y / 100 - 2);
            animate.rotateY(-this.cursor.x / 100);           
            perspectiveMatrix.perspective(-2.4);
        }
        else {
            animate.scale(1, 1, 1);
            animate.rotateZ(0);
            animate.rotateX(Math.PI / 9);
            animate.rotateY(time);
            perspectiveMatrix.perspective(-2.4);
        }

        for (var i = 0; i < copy.v.length; i++) {
            copy.v[i] = animate.dot(copy.v[i]);
            copy.v[i] = perspectiveMatrix.dot(copy.v[i]);

            copy.v[i].x = -2.4 * copy.v[i].x / copy.v[i].z;
            copy.v[i].y = -2.4 * copy.v[i].y / copy.v[i].z;
            copy.v[i].z = -2.4 / copy.v[i].z;
        }

        if (this.cursor.z) {
            copy.draw(g, -50, -50, canvas.width * 1.5, canvas.height * 1.5);
        }
        else {
            copy.draw(g, 50, 50, canvas.width / 1.25, canvas.height / 1.25);
        }
    }
}

function drawOnCanvas3() {
    var canvas = initCanvas('canvas3');
    canvas.update = function (g) {
        var frameCopy = new cylinder();
        
        var animate = new matrix();
        var perspectiveMatrix = new matrix();

        animate.rotateX(this.cursor.y / 100);
        animate.rotateY(this.cursor.x / 100);
        animate.rotateZ(-this.cursor.x / 100);
        perspectiveMatrix.perspective(-2.4);

        for (var i = 0; i < frameCopy.v.length; i++) {
            frameCopy.v[i] = animate.dot(frameCopy.v[i]);
            
            frameCopy.v[i] = perspectiveMatrix.dot(frameCopy.v[i]);
            frameCopy.v[i].x = -2.4 * frameCopy.v[i].x / frameCopy.v[i].z;
            frameCopy.v[i].y = -2.4 * frameCopy.v[i].y / frameCopy.v[i].z;
            frameCopy.v[i].z = -2.4 / frameCopy.v[i].z;
        }

        frameCopy.draw(g, 100, 100, .5 * canvas.width, .5 * canvas.height);
    }
}

function drawOnCanvas4() {
    var canvas = initCanvas('canvas4');
    canvas.update = function (g) {
        var frameCopy = new cylinder();
        frameCopy.init2();

        var animate = new matrix();
        var perspectiveMatrix = new matrix();

        animate.rotateX(this.cursor.y / 100);
        animate.rotateY(this.cursor.x / 100);
        animate.rotateZ(-this.cursor.x / 100);
        perspectiveMatrix.perspective(-2.4);

        for (var i = 0; i < frameCopy.v.length; i++) {
            frameCopy.v[i] = animate.dot(frameCopy.v[i]);

            frameCopy.v[i] = perspectiveMatrix.dot(frameCopy.v[i]);
            frameCopy.v[i].x = -2.4 * frameCopy.v[i].x / frameCopy.v[i].z;
            frameCopy.v[i].y = -2.4 * frameCopy.v[i].y / frameCopy.v[i].z;
            frameCopy.v[i].z = -2.4 / frameCopy.v[i].z;
        }

        frameCopy.draw(g, 100, 100, .5 * canvas.width, .5 * canvas.height);
    }
}

function drawOnCanvas5() {
    var canvas = initCanvas('canvas5');
    canvas.update = function (g) {
        var left = new sphere();
        var right = new sphere();

        var animate = new matrix();
        var perspectiveMatrix = new matrix();

        if (this.cursor.z) {
            animate.rotateY(Math.PI);
            animate.rotateX(this.cursor.y / 100);
            animate.rotateY(this.cursor.x / 100);
            animate.rotateZ(-this.cursor.x / 100);
            perspectiveMatrix.perspective(-2.4);
        }
        else {
            animate.rotateX(1.4);
            animate.rotateX(-Math.abs(Math.sin(time)) / 3);
            animate.rotateZ(-Math.cos(time) / 3);
            perspectiveMatrix.perspective(-2.4);
        }
        

        for (var i = 0; i < left.v.length; i++) {
            left.v[i] = animate.dot(left.v[i]);
            right.v[i] = animate.dot(right.v[i]);

            left.v[i] = perspectiveMatrix.dot(left.v[i]);
            left.v[i].x = -2.4 * left.v[i].x / left.v[i].z;
            left.v[i].y = -2.4 * left.v[i].y / left.v[i].z;
            left.v[i].z = -2.4 / left.v[i].z;

            right.v[i] = perspectiveMatrix.dot(right.v[i]);
            right.v[i].x = -2.4 * right.v[i].x / right.v[i].z;
            right.v[i].y = -2.4 * right.v[i].y / right.v[i].z;
            right.v[i].z = -2.4 / right.v[i].z;
        }

        left.drawEye(g, 75, 100, .3 * canvas.width, .3 * canvas.height);
        right.drawEye(g, 250, 100, .3 * canvas.width, .3 * canvas.height);
    }
}

function drawOnCanvas6() {
    var canvas = initCanvas('canvas6');
    canvas.update = function (g) {
        var neck = new Vector4(0, .55, 0, 1);
        var bodyTop = new Vector4(0, .35, 0, 1);
        var bodyBot = new Vector4(0, .05, 0, 1);
        var lElbow = new Vector4(-.05, -.2, .05, 1);
        var rElbow = new Vector4(.05, -.2, -.05, 1);
        var lKnee = new Vector4(-.05, -.35, .1, 1);
        var rKnee = new Vector4(.05, -.35, -.1, 1);
        var lFoot = new Vector4(-.05, -.8, .1, 1);
        var rFoot = new Vector4(.05, -.8, -.1, 1);

        var perspectiveMatrix = new matrix();
        perspectiveMatrix.perspective(-2.4);
        var transformMatrix = new matrix(canvas.width, canvas.height);
        var transformMatrixLLeg = new matrix();
        var transformMatrixRLeg = new matrix();
        var transformMatrixLArm = new matrix();
        var transformMatrixRArm = new matrix();
        var converted = new Vector4();

        g.strokeStyle = 'white';
        g.lineWidth = 10;
        g.lineCap = "round";
        g.beginPath();

        // Start at neck
        //transformMatrix.rotateX(Math.abs(Math.sin(time)));
        transformMatrix.translate(Math.sin(time) / 50, 0, 0);        
        neck = transformMatrix.dot(neck);
        neck = perspectiveMatrix.dot(neck);
        neck.x = -2.4 * neck.x / neck.z;
        neck.y = -2.4 * neck.y / neck.z;
        neck.z = -2.4 / neck.z;
        converted.copy(neck);
        transformMatrix.transform(neck, converted);
        g.moveTo(converted.x, converted.y);

        // Draw to bodyTop
        transformMatrix.translate(0, 0, Math.sin(time) / 50);
        bodyTop = transformMatrix.dot(bodyTop);
        bodyTop = perspectiveMatrix.dot(bodyTop);
        bodyTop.x = -2.4 * bodyTop.x / bodyTop.z;
        bodyTop.y = -2.4 * bodyTop.y / bodyTop.z;
        bodyTop.z = -2.4 / bodyTop.z;
        converted.copy(bodyTop);
        transformMatrix.transform(bodyTop, converted);
        g.lineTo(converted.x, converted.y);

        // Draw to bodyBot
        transformMatrix.translate(0, 0, -Math.sin(time) / 50);
        bodyBot = transformMatrix.dot(bodyBot);
        bodyBot = perspectiveMatrix.dot(bodyBot);
        bodyBot.x = -2.4 * bodyBot.x / bodyBot.z;
        bodyBot.y = -2.4 * bodyBot.y / bodyBot.z;
        bodyBot.z = -2.4 / bodyBot.z;
        converted.copy(bodyBot);
        transformMatrix.transform(bodyBot, converted);
        g.lineTo(converted.x, converted.y);

        // Draw to lKnee
        transformMatrixLLeg.rotateZ(Math.sin(time) / 1.5);
        lKnee = transformMatrixLLeg.dot(lKnee);
        lKnee = perspectiveMatrix.dot(lKnee);
        lKnee.x = -2.4 * lKnee.x / lKnee.z;
        lKnee.y = -2.4 * lKnee.y / lKnee.z;
        lKnee.z = -2.4 / lKnee.z;
        converted.copy(lKnee);
        transformMatrix.transform(lKnee, converted);
        g.lineTo(converted.x, converted.y);

        // Draw to lFoot
        transformMatrixLLeg.rotateZ(-Math.abs(Math.cos(time) / 3.5) - .1);
        lFoot = transformMatrixLLeg.dot(lFoot);
        lFoot = perspectiveMatrix.dot(lFoot);
        lFoot.x = -2.4 * lFoot.x / lFoot.z;
        lFoot.y = -2.4 * lFoot.y / lFoot.z;
        lFoot.z = -2.4 / lFoot.z;
        converted.copy(lFoot);
        transformMatrix.transform(lFoot, converted);
        g.lineTo(converted.x, converted.y);

        // Move back and draw to rKnee
        transformMatrixRLeg.rotateZ(-Math.sin(time) / 1.5);
        rKnee = transformMatrixRLeg.dot(rKnee);
        rKnee = perspectiveMatrix.dot(rKnee);
        rKnee.x = -2.4 * rKnee.x / rKnee.z;
        rKnee.y = -2.4 * rKnee.y / rKnee.z;
        rKnee.z = -2.4 / rKnee.z;
        converted.copy(bodyBot);
        transformMatrix.transform(bodyBot, converted);
        g.moveTo(converted.x, converted.y);
        converted.copy(rKnee);
        transformMatrix.transform(rKnee, converted);
        g.lineTo(converted.x, converted.y);

        // Draw rFoot
        transformMatrixRLeg.rotateZ(-Math.abs(Math.cos(time) / 1.5) - .1);
        rFoot = transformMatrixRLeg.dot(rFoot);
        rFoot = perspectiveMatrix.dot(rFoot);
        rFoot.x = -2.4 * rFoot.x / rFoot.z;
        rFoot.y = -2.4 * rFoot.y / rFoot.z;
        rFoot.z = -2.4 / rFoot.z;
        g.moveTo(converted.x, converted.y);
        converted.copy(rFoot);
        transformMatrix.transform(rFoot, converted);
        g.lineTo(converted.x, converted.y);

        // Move back and draw to lElbow
        transformMatrixLArm.rotateX(Math.cos(time + 100) * 2);
        transformMatrixLArm.rotateZ(Math.sin(time) / 2);
        lElbow = transformMatrixLArm.dot(lElbow);
        lElbow = perspectiveMatrix.dot(lElbow);
        lElbow.x = -2.4 * lElbow.x / lElbow.z;
        lElbow.y = -2.4 * lElbow.y / lElbow.z;
        lElbow.z = -2.4 / lElbow.z;
        converted.copy(bodyTop);
        transformMatrix.transform(bodyTop, converted);
        g.moveTo(converted.x, converted.y);
        converted.copy(lElbow);
        transformMatrix.transform(lElbow, converted);
        g.lineTo(converted.x, converted.y);

        // Move back and draw to rElbow
        transformMatrixRArm.rotateX(-Math.cos(time + 100) * 3);
        transformMatrixRArm.rotateZ(-Math.sin(time) / 2);
        rElbow = transformMatrixRArm.dot(rElbow);
        rElbow = perspectiveMatrix.dot(rElbow);
        rElbow.x = -2.4 * rElbow.x / rElbow.z;
        rElbow.y = -2.4 * rElbow.y / rElbow.z;
        rElbow.z = -2.4 / rElbow.z;
        converted.copy(bodyTop);
        transformMatrix.transform(bodyTop, converted);
        g.moveTo(converted.x, converted.y);
        converted.copy(rElbow);
        transformMatrix.transform(rElbow, converted);
        g.lineTo(converted.x, converted.y);

        g.stroke();
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
    bezier: function () {
        this.m = [
            [-1, 3, -3, 1],
            [3, -6, 3, 0],
            [-3, 3, 0, 0],
            [1, 0, 0, 0]];
    },
    hermite: function () {      // YOU GET a, b, c, d after multiplying 
        this.m = [              // the hermite matrix with P0, P1, R0, R1
            [2, -2, 1, 1],
            [-3, 3, -2, -1],
            [0, 0, 1, 0],
            [1, 0, 0, 0]];
    },
    identity: function () {
        this.m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];
    },
    multiply: function (argMatrix) {
        var newMatrix = new matrix();
        var currentSum = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    currentSum += this.m[i][k] * argMatrix[k][j];
                }
                newMatrix.m[i][j] = currentSum;
                currentSum = 0;
            }
        }
        this.m = newMatrix.m;
    },
    translate: function (x, y, z) {
        var transformMatrix = new matrix();
        transformMatrix.m[0][3] = x;
        transformMatrix.m[1][3] = y;
        transformMatrix.m[2][3] = z;
        this.multiply(transformMatrix.m);
    },
    rotateX: function (theta) {
        var transformMatrix = new matrix();
        transformMatrix.m[1][1] = Math.cos(theta);
        transformMatrix.m[1][2] = -Math.sin(theta);
        transformMatrix.m[2][1] = Math.sin(theta);
        transformMatrix.m[2][2] = Math.cos(theta);
        this.multiply(transformMatrix.m);
    },
    rotateY: function (theta) {
        var transformMatrix = new matrix();
        transformMatrix.m[0][0] = Math.cos(theta);
        transformMatrix.m[2][0] = Math.sin(theta);
        transformMatrix.m[0][2] = -Math.sin(theta);
        transformMatrix.m[2][2] = Math.cos(theta);
        this.multiply(transformMatrix.m);
    },
    rotateZ: function (theta) {
        var transformMatrix = new matrix();
        transformMatrix.m[0][0] = Math.cos(theta);
        transformMatrix.m[0][1] = -Math.sin(theta);
        transformMatrix.m[1][0] = Math.sin(theta);
        transformMatrix.m[1][1] = Math.cos(theta);
        this.multiply(transformMatrix.m);
    }, 
    scale: function (x, y, z) {
        var transformMatrix = new matrix();
        transformMatrix.m[0][0] = x;
        transformMatrix.m[1][1] = y;
        transformMatrix.m[2][2] = z;
        this.multiply(transformMatrix.m);
    },
    // Arguments are vectors
    transform: function(src, dst) {
        dst.x = (this.width / 2) + src.x * (this.width / 2);
        dst.y = (this.height / 2) - src.y * (this.width / 2);
        dst.z = (this.height / 2) - src.z * (this.width / 2);
        dst.w = (this.height / 2) - src.w * (this.width / 2);
    },
    perspective: function (p) {
        var transformMatrix = new matrix();
        transformMatrix.m[2][3] = p;
        this.multiply(transformMatrix.m);
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
    },
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
Sphere
================================================== */
function sphere() {
    this.v = [];
    this.e = [];
    var vertexEnum = 0;

    for (var i = 0; i < 20; i++) {
        for (var step = 0; step < 20; step++) {
            var u = 1 / 20 * step;
            var v = 1 / 20 * i;
            var theta = 2 * Math.PI * u;
            var varphi = Math.PI * v - Math.PI / 2;

            this.v[vertexEnum] = new Vector4(0, 0, 0, 1);
            this.v[vertexEnum].x = Math.cos(varphi) * Math.sin(theta);
            this.v[vertexEnum].y = Math.sin(varphi);
            this.v[vertexEnum].z = Math.cos(varphi) * Math.cos(theta);
            vertexEnum++;
        }
    }
    this.v[vertexEnum] = new Vector4(0, 0, 0, 1);
    this.v[vertexEnum].x = 0;
    this.v[vertexEnum].y = 1;
    this.v[vertexEnum].z = 0;
    vertexEnum++;

    var edgeEnum = 0;
    for (var i = 0; i < 20; i++) {
        for (var step = 0; step < 20; step++) {
            // Horizontal edges
            if (step < 19) {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = step + 1 + (i * 20);
                edgeEnum++;
            }
            else {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = (i * 20);
                edgeEnum++;
            }
            // Vertical edges
            if (i < 19) {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = step + 20 + (i * 20);
                edgeEnum++;
            }
            else {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = this.v.length - 1;
                edgeEnum++;
            }
        }
    }
}
sphere.prototype = {
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
            transformMatrix.transform(this.v[this.e[i][1]], transformedTo);

            g.moveTo(transformedFrom.x + xOff, transformedFrom.y + yOff);
            g.lineTo(transformedTo.x + xOff, transformedTo.y + yOff);
        }
        g.stroke();
    },
    drawEye: function (g, xOff, yOff, width, height) {
        var transformMatrix = new matrix(width, height);

        g.strokeStyle = 'snow';
        g.beginPath();
        for (var i = 0; i < this.e.length - 80; i++) {
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

        g.strokeStyle = 'blue';
        g.beginPath();
        for (var i = this.e.length - 80; i < this.e.length - 40; i++) {
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

        g.strokeStyle = 'black';
        g.beginPath();
        for (var i = this.e.length - 40; i < this.e.length; i++) {
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
    }
}

/* ==================================================
Cylinder
================================================== */
function cylinder() {
    this.v = [];
    this.e = [];

    var vertexEnum = 0;
    for (var i = 0; i < 20; i++) {
        for (var step = 0; step < 20; step++) {
            var u = 1 / 20 * step;
            var v = 1 / 20 * i;
            var theta = 2 * Math.PI * u;

            this.v[vertexEnum] = new Vector4(0, 0, 0, 1);
            this.v[vertexEnum].x = Math.sin(theta);
            this.v[vertexEnum].y = 2 * v - 1;
            this.v[vertexEnum].z = Math.cos(theta);
            vertexEnum++;
        }
    }
    this.v[vertexEnum] = new Vector4(0, 0, 0, 1);
    this.v[vertexEnum].x = 0;
    this.v[vertexEnum].y = -1;
    this.v[vertexEnum].z = 0;
    vertexEnum++;

    this.v[vertexEnum] = new Vector4(0, 0, 0, 1);
    this.v[vertexEnum].x = 0;
    this.v[vertexEnum].y = 2 * ((1 / 20) * 19) - 1;
    this.v[vertexEnum].z = 0;
    vertexEnum++;

    var edgeEnum = 0;
    for (var i = 0; i < 20; i++) {
        for (var step = 0; step < 20; step++) {
            // Horizontal edges
            if (step < 19) {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = step + 1 + (i * 20);
                edgeEnum++;
            }
            else {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = (i * 20);
                edgeEnum++;    
            }
            // Vertical edges
            if (i == 0) {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = this.v.length - 2;
                edgeEnum++;
            }
            if (i < 19) {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = step + 20 + (i * 20);
                edgeEnum++;
            }
            else {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = this.v.length - 1;
                edgeEnum++;
            }
        }
    }
}
cylinder.prototype = {
    init2: function (vNum) {
        var vertexEnum = 0;
        for (var i = 0; i < 20; i++) {
            for (var step = 0; step < 20; step++) {
                var u = 1 / 20 * step;
                var v = 1 / 20 * i;
                var theta = 2 * Math.PI * u;

                this.v[vertexEnum] = new Vector4(0, 0, 0, 1);
                this.v[vertexEnum].x = Math.sin(theta);
                this.v[vertexEnum].y = 2 * v - 1;
                this.v[vertexEnum].z = Math.cos(theta);
                vertexEnum++;
            }
        }

        var edgeEnum = 0;
        for (var i = 0; i < 19; i++) {
            for (var step = 0; step < 19; step++) {
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = step + 1 + (i * 20);
                edgeEnum++;
                this.e[edgeEnum] = [];
                this.e[edgeEnum][0] = step + (i * 20);
                this.e[edgeEnum][1] = step + 10 + (i * 20);
                edgeEnum++;
            }
        }
    },
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
            transformMatrix.transform(this.v[this.e[i][1]], transformedTo);

            g.moveTo(transformedFrom.x + xOff, transformedFrom.y + yOff);
            g.lineTo(transformedTo.x + xOff, transformedTo.y + yOff);
        }
        g.stroke();
    },
    makeCopy: function () {
        var copy = new cylinder();
        for (var i = 0; i < this.v.length; i++) {
            copy.v[i] = new Vector4(0, 0, 0, 1);
            copy.v[i].copy(this.v[i]);
        }
        return copy;
    }
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

    this.v[0] = new Vector4(-1, -1, -1, 1);
    this.v[1] = new Vector4(1, -1, -1, 1);
    this.v[2] = new Vector4(-1, 1, -1, 1);
    this.v[3] = new Vector4(1, 1, -1, 1);
    this.v[4] = new Vector4(-1, -1, 1, 1);
    this.v[5] = new Vector4(1, -1, 1, 1);
    this.v[6] = new Vector4(-1, 1, 1, 1);
    this.v[7] = new Vector4(1, 1, 1, 1);

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

    // Car 1
    this.v[0] = new Vector4(.55, 0, -.15, 1);
    this.v[1] = new Vector4(.85, 0, -.15, 1);
    this.v[2] = new Vector4(.55, .35, -.15, 1);
    this.v[3] = new Vector4(.85, .25, -.15, 1);
    this.v[4] = new Vector4(.55, 0, .15, 1);
    this.v[5] = new Vector4(.85, 0, .15, 1);
    this.v[6] = new Vector4(.55, .35, .15, 1);
    this.v[7] = new Vector4(.85, .25, .15, 1);
    // Car 2
    this.v[8] = new Vector4(-.05, 0, -.20, 1);
    this.v[9] = new Vector4(.5, 0, -.20, 1);
    this.v[10] = new Vector4(-.05, .45, -.20, 1);
    this.v[11] = new Vector4(.5, .45, -.20, 1);
    this.v[12] = new Vector4(-.05, 0, .20, 1);
    this.v[13] = new Vector4(.5, 0, .20, 1);
    this.v[14] = new Vector4(-.05, .45, .20, 1);
    this.v[15] = new Vector4(.5, .45, .20, 1);
    // Car 3
    this.v[16] = new Vector4(-.75, 0, -.20, 1);
    this.v[17] = new Vector4(-.1, 0, -.20, 1);
    this.v[18] = new Vector4(-.75, .45, -.20, 1);
    this.v[19] = new Vector4(-.1, .45, -.20, 1);
    this.v[20] = new Vector4(-.75, 0, .20, 1);
    this.v[21] = new Vector4(-.1, 0, .20, 1);
    this.v[22] = new Vector4(-.75, .45, .20, 1);
    this.v[23] = new Vector4(-.1, .45, .20, 1);
    // Connect 1
    this.v[24] = new Vector4(.5, 0, -.05, 1);
    this.v[25] = new Vector4(.55, 0, -.05, 1);
    this.v[26] = new Vector4(.5, 0, .05, 1);
    this.v[27] = new Vector4(.55, 0, .05, 1);
    // Connect 2
    this.v[28] = new Vector4(-.1, 0, -.05, 1);
    this.v[29] = new Vector4(-.05, 0, -.05, 1);
    this.v[30] = new Vector4(-.1, 0, .05, 1);
    this.v[31] = new Vector4(-.05, 0, .05, 1);
    // Car 1 Door
    this.v[32] = new Vector4(.6, .01, .15, 1);
    this.v[33] = new Vector4(.7, .01, .15, 1);
    this.v[34] = new Vector4(.6, .2, .15, 1);
    this.v[35] = new Vector4(.7, .2, .15, 1);
    // Car 2 Door
    this.v[36] = new Vector4(.35, .01, .20, 1);
    this.v[37] = new Vector4(.45, .01, .20, 1);
    this.v[38] = new Vector4(.35, .2, .20, 1);
    this.v[39] = new Vector4(.45, .2, .20, 1);
    // Car 3 Door
    this.v[40] = new Vector4(-.25, .01, .20, 1);
    this.v[41] = new Vector4(-.15, .01, .20, 1);
    this.v[42] = new Vector4(-.25, .2, .20, 1);
    this.v[43] = new Vector4(-.15, .2, .20, 1);
    // Car 1 Window
    this.v[44] = new Vector4(.85, .1, -.12, 1);
    this.v[45] = new Vector4(.85, .2, -.12, 1);
    this.v[46] = new Vector4(.85, .1, .12, 1);
    this.v[47] = new Vector4(.85, .2, .12, 1);
    // Car 2 Windows
    this.v[48] = new Vector4(0, .1, -.20, 1);
    this.v[49] = new Vector4(.3, .1, -.20, 1);
    this.v[50] = new Vector4(0, .2, -.20, 1);
    this.v[51] = new Vector4(.3, .2, -.20, 1);
    this.v[52] = new Vector4(0, .1, .20, 1);
    this.v[53] = new Vector4(.3, .1, .20, 1);
    this.v[54] = new Vector4(0, .2, .20, 1);
    this.v[55] = new Vector4(.3, .2, .20, 1);
    // Car 3 Back Doors
    this.v[56] = new Vector4(-.75, .01, -.17, 1);
    this.v[57] = new Vector4(-.75, .4, -.17, 1);
    this.v[58] = new Vector4(-.75, .01, 0, 1);
    this.v[59] = new Vector4(-.75, .4, 0, 1);
    this.v[60] = new Vector4(-.75, .01, .17, 1);
    this.v[61] = new Vector4(-.75, .4, .17, 1);
    this.v[62] = new Vector4(-.75, .01, 0, 1);
    this.v[63] = new Vector4(-.75, .4, 0, 1);

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
    },
}

loadScript('drawlib1.js', drawDrawings);