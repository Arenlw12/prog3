var side = 5;
var xotArr = [];
var eatArr = [];
var huntArr = [];
var termArr = [];
var titanArr = [];


let matrix = []; // Մատրիցի ստեղծում
let rows = 100; // Տողերի քանակ
let columns = 100; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
for (let x = 0; x < columns; x++) {
let a = Math.floor(Math.random()*100);
if (a >= 0 && a < 30) {
matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
} 
if (a >= 30 && a < 70) {
matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
} 
else if (a >= 70 && a < 85) {
matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
} 
else if (a >= 85 && a < 97) {
matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
} 
else if(a >= 97 && a < 99) {
matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
} 
else if(a >= 99 && a < 100) {
matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
} 
}
}


function setup() {
    frameRate(100);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var hunter = new Hunter(x, y);
                huntArr.push(hunter);
            }
            else if (matrix[y][x] == 4) {
                var term = new Terminator(x, y);
                termArr.push(term);
            }
            else if (matrix[y][x] == 5) {
                var titan = new Titan(x, y);
                titanArr.push(titan);
            }
        }
    }
}


function draw() {
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("blue");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill("black");
                rect(j * side, i * side, side, side);
            }
        }




    }
    for (var i in xotArr) {
        xotArr[i].mul();
    }


    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (var i in huntArr) {
        huntArr[i].eat();
    }
    for (var i in termArr) {
        termArr[i].eat();
    }
    for (var i in titanArr) {
        titanArr[i].eat();
    }
}
