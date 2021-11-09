"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var checker_and_board_1 = require("./checker_and_board");
function is_valid_coordinate(coordinate) {
    return (coordinate[0] >= 0 &&
        coordinate[0] < 8 &&
        coordinate[1] >= 0 &&
        coordinate[1] < 8);
}
var game_over = false;
var reds_turn = true;
var prompt_sync = require("prompt-sync")();
var board = new checker_and_board_1.Board();
while (!game_over) {
    board.display();
    var valid_piece = false;
    var x = -1;
    var y = -1;
    while (!valid_piece) {
        x = parseInt(prompt_sync("Enter column of piece: "));
        y = parseInt(prompt_sync("Enter row of piece: "));
        if (is_valid_coordinate([x, y]) &&
            board.grid[y][x] != null &&
            ((board.grid[y][x].colour == "Red" && reds_turn) ||
                (board.grid[y][x].colour == "Black" && !reds_turn)) &&
            (board.grid[y][x].get_capture_moves(board.grid).length ||
                board.grid[y][x].get_non_capture_moves(board.grid).length)) {
            valid_piece = true;
        }
        else {
            console.log("Invalid piece location. Try again");
        }
    }
    var capture_moves = board.grid[y][x].get_capture_moves(board.grid);
    var non_capture_moves = board.grid[y][x].get_non_capture_moves(board.grid);
    var all_moves = capture_moves.concat(non_capture_moves);
    console.log(all_moves);
    var valid_move = false;
    var index = -1;
    while (!valid_move) {
        index = parseInt(prompt_sync("Enter index in moves array: "));
        if (index >= 0 && index < all_moves.length) {
            valid_move = true;
        }
        else {
            console.log("Invalid move index. Try again");
        }
    }
    board.move([x, y], all_moves[index]);
    var keep_moving = false;
    var piece_location = all_moves[index];
    //if move is a capture, then keep moving the same piece until you can't anymore
    if (capture_moves.includes(piece_location)) {
        keep_moving = true;
    }
    while (keep_moving &&
        ((_a = board.grid[piece_location[1]][piece_location[0]]) === null || _a === void 0 ? void 0 : _a.get_capture_moves(board.grid).length)) {
        board.display();
        capture_moves = board.grid[piece_location[1]][piece_location[0]].get_capture_moves(board.grid);
        var valid_capture = false;
        var capture_index = 0;
        while (!valid_capture) {
            console.log(capture_moves);
            capture_index = parseInt(prompt_sync("Enter index in capture moves array: "));
            if (capture_index >= 0 && capture_index < capture_moves.length) {
                valid_capture = true;
            }
            else {
                console.log("Invalid move index. Try again");
            }
            board.move(piece_location, capture_moves[capture_index]);
            piece_location = capture_moves[capture_index];
        }
    }
    var colour = reds_turn ? "Black" : "Red";
    if (board.game_over(colour)) {
        game_over = true;
    }
    reds_turn = !reds_turn;
}
board.display();
var winner = reds_turn ? "Black wins!" : "Red wins!";
console.log(winner);
