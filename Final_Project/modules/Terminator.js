var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Terminator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 20;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    move() {
        this.life--;
        let emptyCells1 = this.chooseCell(0);
        let emptyCells2 = this.chooseCell(1);
        let emptyCells = emptyCells1.concat(emptyCells2)
        let newCell = random(emptyCells);
        
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    eat() {
        let emptyCells = this.chooseCell(3);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in huntArr) {
                if (huntArr[i].x == x && huntArr[i].y == y) {
                    huntArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 40) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    mul() {
        //փնտրում է դատարկ տարածք
        
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            termHashiv++
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let term = new Terminator(x, y);
            termArr.push(term);
            this.life = 10;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in termArr) {
            if (termArr[i].x == this.x && termArr[i].y == this.y) {
                termArr.splice(i, 1)
            }
        }
    }
}