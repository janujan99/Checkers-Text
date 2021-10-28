var Checker = /** @class */ (function () {
    function Checker(checkerColour, checkerX, checkerY) {
        this.colour = checkerColour;
        this.x = checkerX;
        this.y = checkerY;
        this.char = this.colour == "Red" ? "r" : "b";
        this.has_promoted = false;
    }
    Checker.prototype.get_copy = function () {
        return new Checker(this.colour, this.x, this.y);
    };
    return Checker;
}());
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Board = /** @class */ (function () {
    function Board() {
    }
    Board.prototype.display = function () { };
    return Board;
}());
//Test that check object is valid
var check = new Checker("Red", 1, 0);
console.log(check.char);
//Test that point is valid
var pt = new Point(6, 6);
console.log(pt.x);
console.log(pt.y);
