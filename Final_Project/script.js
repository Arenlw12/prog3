let varkyan = 0;
function setup() {
    var socket = io();
    var side = 30;
    var matrix = [];
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let huntCountElement = document.getElementById('huntCount');
    let terminatorCountElement = document.getElementById('termCount');
    let titanCountElement = document.getElementById('titanCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
    socket.on("data", drawCreatures);
    function plus() {
        varkyan++
    }
    setInterval(plus, 1000)
    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.eatCounter;
        huntCountElement.innerText = data.huntCounter;
        terminatorCountElement.innerText = data.termCounter;
        titanCountElement.innerText = data.titanCounter;
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {

                        if (varkyan <= 20) {
                            fill("green")
                        }
                        else if (varkyan <= 35) {
                            fill("white");
                        }
                        else if (varkyan <= 60) {
                            fill("orange")
                        }
                        else if (varkyan >= 61){
                            varkyan = 0
                        }
                        // if (varkyan >= 85) {
                        //     fill("green")
                        // }
                        // if (varkyan >= 105) {
                        //     fill("white");
                        // }
                        // if (varkyan >= 130) {
                        //     fill("orange")
                        // }
                        // if (varkyan >= 150) {
                        //     fill("green")
                        // }

                    
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('black');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}