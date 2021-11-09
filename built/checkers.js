"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checker = void 0;
var Checker = /** @class */ (function () {
    function Checker(checkerColour, checkerX, checkerY, has_promoted) {
        if (has_promoted === void 0) { has_promoted = false; }
        this.colour = checkerColour;
        this.x = checkerX;
        this.y = checkerY;
        this.char = this.colour == "Red" ? "r" : "b";
        this.has_promoted = has_promoted;
        if (this.has_promoted) {
            this.char = this.char.charAt(0).toUpperCase();
        }
        this.direction_factor = this.colour == "Red" ? -1 : 1;
    }
    Checker.prototype.is_valid_coordinate = function (coordinate) {
        return (coordinate[0] >= 0 &&
            coordinate[0] < 8 &&
            coordinate[1] >= 0 &&
            coordinate[1] < 8);
    };
    Checker.prototype.get_non_capture_moves = function (grid) {
        var moves;
        if (!this.has_promoted) {
            moves = [
                [this.x + 1, this.y + this.direction_factor],
                [this.x - 1, this.y + this.direction_factor],
            ];
        }
        else {
            moves = [
                [this.x + 1, this.y + this.direction_factor],
                [this.x - 1, this.y + this.direction_factor],
                [this.x + 1, this.y - this.direction_factor],
                [this.x - 1, this.y - this.direction_factor],
            ];
        }
        var filtered_moves = [];
        for (var i = 0; i < moves.length; i++) {
            var y = moves[i][0];
            var x = moves[i][1];
            if (grid[x][y] == null && this.is_valid_coordinate(moves[i])) {
                filtered_moves.push(moves[i]);
            }
        }
        return filtered_moves;
    };
    Checker.prototype.get_capture_moves = function (grid) {
        var _a;
        //incomplete
        var moves;
        if (!this.has_promoted) {
            moves = [
                [this.x + 2, this.y + 2 * this.direction_factor],
                [this.x - 2, this.y + 2 * this.direction_factor],
            ];
        }
        else {
            moves = [
                [this.x + 2, this.y + 2 * this.direction_factor],
                [this.x - 2, this.y + 2 * this.direction_factor],
                [this.x + 2, this.y - 2 * this.direction_factor],
                [this.x - 2, this.y - 2 * this.direction_factor],
            ];
        }
        var on_board_moves = [];
        for (var i = 0; i < moves.length; i++) {
            // filter for all moves that are on the board
            if (this.is_valid_coordinate(moves[i])) {
                on_board_moves.push(moves[i]);
            }
        }
        var filtered_moves = [];
        for (var i = 0; i < on_board_moves.length; i++) {
            var y = on_board_moves[i][0];
            var x = on_board_moves[i][1];
            if (grid[x][y] == null &&
                grid[(this.y + x) / 2][(this.x + y) / 2] != null &&
                ((_a = grid[(this.y + x) / 2][(this.x + y) / 2]) === null || _a === void 0 ? void 0 : _a.colour) != this.colour) {
                filtered_moves.push(moves[i]);
            }
        }
        return filtered_moves;
    };
    Checker.prototype.promote = function () {
        this.has_promoted = true;
        this.char = this.char.charAt(0).toUpperCase();
    };
    Checker.prototype.no_captures_possible = function (grid) {
        return this.get_capture_moves(grid).length == 0;
    };
    Checker.prototype.legal_moves_exist = function (grid) {
        return (!this.no_captures_possible(grid) &&
            this.get_non_capture_moves(grid).length > 0);
    };
    return Checker;
}());
exports.Checker = Checker;
