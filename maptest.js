var Checker = /** @class */ (function () {
    function Checker(checkerColour, checkerX, checkerY) {
        this.colour = checkerColour;
        this.x = checkerX;
        this.y = checkerY;
        this.char = this.colour == "Red" ? "r" : "b";
    }
    return Checker;
}());
var myMap = new Map();
console.log(myMap.size);
