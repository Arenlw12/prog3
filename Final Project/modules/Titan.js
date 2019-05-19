var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Titan extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 40;
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
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 5) {
            this.die();
        }
    }
    eat() {
        let emptyCells1 = this.chooseCell(1);
        let emptyCells2 = this.chooseCell(2);
        let emptyCells3 = this.chooseCell(3);
        let emptyCells4 = this.chooseCell(4);
        let emptyCells = emptyCells4.concat(emptyCells1,emptyCells3,emptyCells2)
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            for (let i in eatArr) {
                if (eatArr[i].x == x && eatArr[i].y == y) {
                    eatArr.splice(i, 1)
                }
            }
            for (let i in huntArr) {
                if (huntArr[i].x == x && huntArr[i].y == y) {
                    huntArr.splice(i, 1)
                }
            }
            for (let i in termArr) {
                if (termArr[i].x == x && termArr[i].y == y) {
                    termArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 100) {
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
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let titn = new Titan(x, y);
            titanArr.push(titn);
            this.life = 10;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in titanArr) {
            if (titanArr[i].x == this.x && titanArr[i].y == this.y) {
                titanArr.splice(i, 1)
            }
        }
    }
}