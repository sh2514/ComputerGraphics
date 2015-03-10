/* 
References used:
http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
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
    drawOnCanvas1();
    drawOnCanvas2();
    drawOnCanvas3();
    drawOnCanvas4();
    drawOnCanvas5();
    drawOnCanvas6();
}

function drawOnCanvas1() {
    var canvas1 = initCanvas('canvas1');
    canvas1.update = function (g) {
        //drawSquare(g, 50, 30);
        //drawExample(g, this.cursor.x, this.cursor.y, this.cursor.z);
        drawClock(g, 10, 10, 450, 450, this.cursor.z);
    }
}

/* Cube1 */
var cube1V = [
    [-1, -1, -1, 1],
    [1, -1, -1, 1],
    [-1, 1, -1, 1],
    [1, 1, -1, 1],
    [-1, -1, 1, 1],
    [1, -1, 1, 1],
    [-1, 1, 1, 1],
    [1, 1, 1, 1]
]

// From back to front, bottom to top, left to right
var cube1E = [
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
    [6, 7] ];

function drawOnCanvas2() {
    var canvas2 = initCanvas('canvas2');
    canvas2.update = function (g) {
        //drawExample(g, this.cursor.x, this.cursor.y, this.cursor.z);
        var tcube1V = cube1V.slice(0);
        for (var i = 0; i < cube1V.length; i++) {
            tcube1V[i] = cube1V[i].slice(0);
        }
        tcube1V = performTransformation(tcube1V, 0, Math.sin(time));
        drawCube(g, tcube1V, cube1E, 100, 100, 200, 200, 250);
    }
}

function drawOnCanvas3() {
    var canvas3 = initCanvas('canvas3');
    canvas3.update = function (g) {
        var tcube1V = cube1V.slice(0);
        for (var i = 0; i < cube1V.length; i++) {
            tcube1V[i] = cube1V[i].slice(0);
        }
        tcube1V = performTransformation(tcube1V, 1, time);
        drawCube(g, tcube1V, cube1E, 100, 100, 200, 200, 250);
    }
}

function drawOnCanvas4() {
    var canvas3 = initCanvas('canvas4');
    canvas3.update = function (g) {
        var tcube1V = cube1V.slice(0);
        for (var i = 0; i < cube1V.length; i++) {
            tcube1V[i] = cube1V[i].slice(0);
        }
        tcube1V = performTransformation(tcube1V, 2, time);
        drawCube(g, tcube1V, cube1E, 100, 100, 200, 200, 250);
    }
}

function drawOnCanvas5() {
    var canvas3 = initCanvas('canvas5');
    canvas3.update = function (g) {
        var tcube1V = cube1V.slice(0);
        for (var i = 0; i < cube1V.length; i++) {
            tcube1V[i] = cube1V[i].slice(0);
        }
        tcube1V = performTransformation(tcube1V, 3, time);
        drawCube(g, tcube1V, cube1E, 100, 100, 200, 200, 250);
    }
}

function drawOnCanvas6() {
    var canvas3 = initCanvas('canvas6');
    canvas3.update = function (g) {
        var tcube1V = cube1V.slice(0);
        for (var i = 0; i < cube1V.length; i++) {
            tcube1V[i] = cube1V[i].slice(0);
        }
        tcube1V = performTransformation(tcube1V, 4, time);
        drawCube(g, tcube1V, cube1E, 100, 100, 200, 200, 250);
    }
}

function performTransformation(argV, option, argT) {
    for (var i = 0; i < argV.length; i++) {
        switch (option) {
            case 0:
                argV[i] = translate(argV[i], argT, argT, argT);
                break;
            case 1:
                argV[i] = rotateX(argV[i], argT);
                break;
            case 2:
                argV[i] = rotateY(argV[i], argT);
                break;
            case 3:
                argV[i] = rotateZ(argV[i], argT);
                break;
            case 4:
                argV[i] = rotateX(argV[i], argT);
                argV[i] = rotateY(argV[i], argT);
                argV[i] = rotateZ(argV[i], argT);
                break;
            case 5:

                break;
            case 6:

                break;
            default:
                console.log('ERROR in performTransformation');
                break;
        }
        
    }
    return argV;
}

function dot(left, right) {
    var product = [0, 0, 0, 0];
    var currentSum = 0;
    for (var i = 0; i < left.length; i++) {
        for (var j = 0; j < left[i].length; j++) {
            product[i] += left[i][j] * right[j];
        }
    }
    return product;
}

function identity() {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];
}

function translate(v, x, y, z) {
    var i = identity();
    i[0][3] = x;
    i[1][3] = y;
    i[2][3] = z;
    return dot(i, v);
}

function rotateX(v, theta) {
    var i = identity();
    i[1][1] = Math.cos(theta);
    i[1][2] = -Math.sin(theta);
    i[2][1] = Math.sin(theta);
    i[2][2] = Math.cos(theta);
    return dot(i, v);
}

function rotateY(v, theta) {
    var i = identity();
    i[0][0] = Math.cos(theta);
    i[2][0] = Math.sin(theta);
    i[0][2] = -Math.sin(theta);
    i[2][2] = Math.cos(theta);
    return dot(i, v);
}

function rotateZ(v, theta) {
    var i = identity();
    i[0][0] = Math.cos(theta);
    i[0][1] = -Math.sin(theta);
    i[1][0] = Math.sin(theta);
    i[1][1] = Math.cos(theta);
    return dot(i, v);
}

function scale(v, x, y, z) {

}

// arguments are vectors
function transform(v, src, dst) {

}

function drawCube(g, V, E, xOffset, yOffset, width, height, sideLength) {
    if (E.length === 0) {
        return;
    }
    g.strokeStyle = 'black';
    g.beginPath();
    for (var i = 0; i < E.length; i++) {
        var fromX = xOffset + xModelToPixel(V[E[i][0]][0], width, width);
        var fromY = yOffset + yModelToPixel(V[E[i][0]][1], height, width);
        var toX = xOffset + xModelToPixel(V[E[i][1]][0], width, width);
        var toY = yOffset + yModelToPixel(V[E[i][1]][1], height, width);
        g.moveTo(fromX, fromY);
        g.lineTo(toX, toY);
    }
    g.stroke();
}

function xModelToPixel(x, width, width) {
    return (width / 2) + x * (width) / 2;
}

function yModelToPixel(y, height, width) {
    return (height / 2) - y * (width) / 2;
}

function drawSquare(g, x, y) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x, y + 100);
    g.lineTo(x + 100, y + 100);
    g.lineTo(x + 100, y + 0);
    g.lineTo(x, y);
    g.stroke();
}

function drawExample(g, x, y, z, width, height) {
    g.fillStyle = z ? 'red' : 'rgb(255,255,128)';
    g.beginPath();
    var x = x, y = y;
    g.moveTo(x - 50, y - 50);
    g.lineTo(x + 50, y - 50);
    g.lineTo(x + 50, y + 50);
    g.lineTo(x - 50, y + 50);
    g.fill();

    g.strokeStyle = 'blue';
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(width, 0);
    g.lineTo(width, height);
    g.lineTo(0, height);
    g.lineTo(0, 0);
    g.stroke();
}

function drawClock(g, x, y, width, height, clicked) {
    g.fillStyle = 'lightgreen';
    if (clicked) {
        g.fillStyle = '#FFFF99';
    }
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + width, y);
    g.lineTo(x + width, y + height);
    g.lineTo(x, y + height);
    g.lineTo(x, y);
    g.fill();
   
    // Position and draw numbers
    for (var i = 1; i <= 12; i++) {
        var angle = (-Math.PI / 3) + (i - 1) * (Math.PI / 6);
        var numX = ((width / 2) + Math.cos(angle) * (width / 2)) * .9; 
        var numY = ((width / 2) + Math.sin(angle) * (width / 2)) * .9;
        drawNumber(g, i, (width / 50) + numX + x, (width / 50) + numY + y, width);
    }

    // Position and draw hands
    var current = new Date();
    var hour = current.getHours();
    var minute = current.getMinutes();
    var second = current.getSeconds();
    //console.log(hour + ":" + minute + ":" + second);
    drawSecondHand(g, x, y, second, width);
    drawMinuteHand(g, x, y, minute, width);
    drawHourHand(g, x, y, hour, width);
}

function drawSecondHand(g, ax, ay, second, width) {
    var angle = -1 * (-Math.PI / 60) + (second) * (Math.PI / 30) - (Math.PI / 2);
    var handLength = width / 2 * .7;
    var x = (width/2) + handLength * Math.cos(angle) + ax;
    var y = (width/2) + handLength * Math.sin(angle) + ay;

    g.strokeStyle = 'gray';
    g.beginPath();
    g.moveTo(width / 50 + width / 2 + ax, width / 50 + width / 2 + ay);
    g.lineTo(x, y);
    g.stroke();
}

function drawMinuteHand(g, ax, ay, minute, width) {
    var angle = -1 * (-Math.PI / 60) + (minute - 1) * (Math.PI / 30) - (Math.PI / 2);
    var handLength = width / 2 * .6;
    var x = (width / 2) + handLength * Math.cos(angle) + ax;
    var y = (width / 2) + handLength * Math.sin(angle) + ay;

    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(width / 50 + width / 2 + ax, width / 50 + width / 2 + ay);
    g.lineTo(x, y);
    g.stroke();
}

function drawHourHand(g, ax, ay, hour, width) {
    hour = hour % 12;
    var angle = (-Math.PI / 3) + (hour - 1) * (Math.PI / 6);
    var handLength = width / 2 * .4;
    var x = (width / 2) + handLength * Math.cos(angle) + ax;
    var y = (width / 2) + handLength * Math.sin(angle) + ay;

    g.strokeStyle = 'red';
    g.beginPath();
    g.moveTo(width / 50 + width / 2 + ax, width / 50 + width / 2 + ay);
    g.lineTo(x, y);
    g.stroke();
}

function drawNumber(g, n, x, y, width) {
    width = width / 15;
    switch (n) {
        case 0:
            drawZero(g, x, y, width);
            break;
        case 1:
            drawOne(g, x, y, width);
            break;
        case 2:
            drawTwo(g, x, y, width);
            break;
        case 3:
            drawThree(g, x, y, width);
            break;
        case 4:
            drawFour(g, x, y, width);
            break;
        case 5:
            drawFive(g, x, y, width);
            break;
        case 6:
            drawSix(g, x, y, width);
            break;
        case 7:
            drawSeven(g, x, y, width);
            break;
        case 8:
            drawEight(g, x, y, width);
            break;
        case 9:
            drawNine(g, x, y, width);
            break;
        case 10:
            drawTen(g, x, y, width);
            break;
        case 11:
            drawEleven(g, x, y, width);
            break;
        case 12:
            drawTwelve(g, x, y, width);
            break;
        default:
            console.log("ERROR in drawNumber");
            break;
    }
}

function drawZero(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + width, y);
    g.lineTo(x + width, y + width);
    g.lineTo(x, y + width);
    g.lineTo(x, y);
    g.stroke();
}

function drawOne(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x, y + width, width);
    g.stroke();
}

function drawTwo(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + width, y);
    g.lineTo(x + width, y + width / 3);
    g.lineTo(x, y + width / 3);
    g.lineTo(x, y + width);
    g.lineTo(x + width, y + width);
    g.stroke();
}

function drawThree(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + width, y);
    g.lineTo(x + width, y + width / 2);
    g.lineTo(x, y + width / 2);
    g.moveTo(x + width, y + width / 2);
    g.lineTo(x + width, y + width);
    g.lineTo(x, y + width);
    g.stroke();
}

function drawFour(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x, y + width /2 );
    g.lineTo(x + width, y + width / 2);

    g.moveTo(x + width / 2, y);
    g.lineTo(x + width / 2, y + width);
    g.stroke();
}

function drawFive(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x + width, y);
    g.lineTo(x, y);
    g.lineTo(x, y + width / 3);
    g.lineTo(x + width, y + width / 3);
    g.lineTo(x + width, y + width);
    g.lineTo(x, y + width);
    g.stroke();
}

function drawSix(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x + width, y);
    g.lineTo(x, y);
    g.lineTo(x, y + width);
    g.lineTo(x + width, y + width);
    g.lineTo(x + width, y + width / 2);
    g.lineTo(x, y + width / 2);
    g.stroke();
}

function drawSeven(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + width, y);
    g.lineTo(x + width / 2, y + width);
    g.stroke();
}

function drawEight(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + width, y);
    g.lineTo(x + width, y + width);
    g.lineTo(x, y + width);
    g.lineTo(x, y);
    g.moveTo(x, y + width / 2);
    g.lineTo(x + width, y + width / 2);
    g.stroke();
}

function drawNine(g, x, y, width) {
    g.strokeStyle = 'black';
    g.beginPath();
    g.moveTo(x, y + width);
    g.lineTo(x + width, y + width);
    g.lineTo(x + width, y);
    g.lineTo(x, y);
    g.lineTo(x, y + width / 2);
    g.lineTo(x + width, y + width / 2);
    g.stroke();
}

function drawTen(g, x, y, width) {
    drawOne(g, x - width / 2, y, width);
    drawZero(g, x + width / 10, y, width);
}

function drawEleven(g, x, y, width) {
    drawOne(g, x - width, y, width);
    drawOne(g, x + width / 10, y, width);
}

function drawTwelve(g, x, y, width) {
    drawOne(g, x - width / 2, y, width);
    drawTwo(g, x + width / 10, y, width);
}

var Vector4 = function (x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    //this.set(x, y, z, w);
}
Vector4.prototype = {
    set: function (x, y, z, w) {
        if (x !== undefined) this.x = x;
        if (y !== undefined) this.y = y;
        if (z !== undefined) this.z = z;
        if (w !== undefined) this.w = w;
    },
}

loadScript('drawlib1.js', drawDrawings);