"use strict";
exports.__esModule = true;
exports.Point = void 0;
var Checker = /** @class */ (function () {
    function Checker(checkerColour, checkerX, checkerY, has_promoted) {
        if (has_promoted === void 0) { has_promoted = false; }
        this.colour = checkerColour;
        this.x = checkerX;
        this.y = checkerY;
        this.char = this.colour == "Red" ? "r" : "b";
        this.has_promoted = has_promoted;
    }
    Checker.prototype.get_copy = function () {
        return new Checker(this.colour, this.x, this.y, this.has_promoted);
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
exports.Point = Point;
var Board = /** @class */ (function () {
    function Board() {
        this.grid = new Map();
        this.grid.set(new Point(1, 0), new Checker("Black", 1, 0));
        this.grid.set(new Point(3, 0), new Checker("Black", 3, 0));
    }
    Board.prototype.display = function () {
        var _a;
        for (var i = 0; i < 8; i++) {
            var st = "";
            for (var j = 0; j < 8; j++) {
                if (this.grid.has(new Point(i, j))) {
                    pt = new Point(i, j);
                    st = st + " " + ((_a = this.grid.get(pt)) === null || _a === void 0 ? void 0 : _a.char);
                }
                else {
                    st = st + " - ";
                }
            }
            console.log(st);
        }
    };
    return Board;
}());
//Test that check object is valid
var check = new Checker("Red", 1, 0);
console.log(check.char);
// //Test that point is valid
var pt = new Point(6, 6);
console.log(pt.x);
console.log(pt.y);
