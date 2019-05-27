//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Hunter = require("./modules/Hunter.js")
var Terminator = require("./modules/Terminator.js")
var Titan = require("./modules/Titan.js")
let random = require('./modules/random');
//! Requiring modules  --  END

grassArr = [];
eatArr = [];
huntArr = [];
termArr = [];
titanArr = [];
matrix = [];

grassHashiv = 0;
eatHashiv = 0;
huntHashiv = 0;
termHashiv = 0;
titanHashiv = 0;
time =  0;
// time = 0
//! Creating MATRIX -- START

function matrixGenerator(matrixSize, grass, eat, hunt, term, titan) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < eat; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < hunt; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < term; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < titan; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 25,20,15,10,2);
//! Creating MATRIX -- END

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                eatArr.push(grassEater);
                eatHashiv++
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++
            }
            else if (matrix[y][x] == 3) {
                var hunt = new Hunter(x, y);
                huntArr.push(hunt);
                huntHashiv++
            }
            else if (matrix[y][x] == 4) {
                var term = new Terminator(x, y);
                termArr.push(term);
                termHashiv++
            }
            else if (matrix[y][x] == 5) {
                var titan = new Titan(x, y);
                titanArr.push(titan);
                titanHashiv++
            }
        }
    }

}

creatingObjects();


function game() {
    time++
    if (time <= 20) {
        b = 2
    }
    else if (time <= 25) {
        b = 8
    }
    else if  (time <= 35) {
        b = 4
    }
    else if (time >= 36){
        time = 0
    }
    console.log(b)
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul(b);
            }
    }
    if (eatArr[0] !== undefined) {
        for (var i in eatArr) {
            eatArr[i].eat();
        }
        if (huntArr[0] !== undefined) {
            for (var i in huntArr) {
                huntArr[i].eat();
            }
        }
        if (termArr[0] !== undefined) {
            for (var i in termArr) {
                termArr[i].eat();
            }
        }
        if (titanArr[0] !== undefined) {
            for (var i in titanArr) {
                titanArr[i].eat();
            }
        }
    }
    if (time >= 0) {
        let b = 2
    }
    if (time >= 4) {
        let b = 6
    }
    if (time >= 8) {
        let b = 9
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        eatCounter: eatHashiv,
        huntCounter: huntHashiv,
        termCounter: termHashiv,
        titanCounter: titanHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)