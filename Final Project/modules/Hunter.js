var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Hunter extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
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
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    eat() {
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in eatArr) {
                if (eatArr[i].x == x && eatArr[i].y == y) {
                    eatArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 15) {
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
            matrix[y][x] = 3;
            let huNter = new Hunter(x, y);
            huntArr.push(huNter);
            this.life = 5;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in huntArr) {
            if (huntArr[i].x == this.x && huntArr[i].y == this.y) {
                huntArr.splice(i, 1)
            }
        }
    }
}