import { Checker, Board } from "./checker_and_board";

function is_valid_coordinate(coordinate: number[]) {
  return (
    coordinate[0] >= 0 &&
    coordinate[0] < 8 &&
    coordinate[1] >= 0 &&
    coordinate[1] < 8
  );
}

let game_over: boolean = false;
let reds_turn: boolean = true;
var prompt_sync = require("prompt-sync")();
let board: Board = new Board();

while (!game_over) {
  board.display();
  let valid_piece: boolean = false;
  let x: number = -1;
  let y: number = -1;
  while (!valid_piece) {
    x = parseInt(prompt_sync("Enter column of piece: "));
    y = parseInt(prompt_sync("Enter row of piece: "));
    if (
      is_valid_coordinate([x, y]) &&
      board.grid[y][x] != null &&
      ((board.grid[y][x]!.colour == "Red" && reds_turn) ||
        (board.grid[y][x]!.colour == "Black" && !reds_turn)) &&
      (board.grid[y][x]!.get_capture_moves(board.grid).length ||
        board.grid[y][x]!.get_non_capture_moves(board.grid).length)
    ) {
      valid_piece = true;
    } else {
      console.log("Invalid piece location. Try again");
    }
  }
  let capture_moves: number[][] = board.grid[y][x]!.get_capture_moves(
    board.grid
  );
  let non_capture_moves: number[][] = board.grid[y][x]!.get_non_capture_moves(
    board.grid
  );
  let all_moves: number[][] = capture_moves.concat(non_capture_moves);

  console.log(all_moves);

  let valid_move: boolean = false;
  let index: number = -1;
  while (!valid_move) {
    index = parseInt(prompt_sync("Enter index in moves array: ")!);
    if (index >= 0 && index < all_moves.length) {
      valid_move = true;
    } else {
      console.log("Invalid move index. Try again");
    }
  }
  board.move([x, y], all_moves[index]);

  let keep_moving: boolean = false;
  let piece_location: number[] = all_moves[index];
  //if move is a capture, then keep moving the same piece until you can't anymore
  if (capture_moves.includes(piece_location)) {
    keep_moving = true;
  }

  while (
    keep_moving &&
    board.grid[piece_location[1]][piece_location[0]]?.get_capture_moves(
      board.grid
    ).length
  ) {
    board.display();
    capture_moves = board.grid[piece_location[1]][
      piece_location[0]
    ]!.get_capture_moves(board.grid);
    let valid_capture: boolean = false;
    let capture_index: number = 0;
    while (!valid_capture) {
      console.log(capture_moves);
      capture_index = parseInt(
        prompt_sync("Enter index in capture moves array: ")
      );
      if (capture_index >= 0 && capture_index < capture_moves.length) {
        valid_capture = true;
      } else {
        console.log("Invalid move index. Try again");
      }
      board.move(piece_location, capture_moves[capture_index]);
      piece_location = capture_moves[capture_index];
    }
  }
  let colour: string = reds_turn ? "Black" : "Red";
  if (board.game_over(colour)) {
    game_over = true;
  }

  reds_turn = !reds_turn;
}
board.display();
let winner = reds_turn ? "Black wins!" : "Red wins!";
console.log(winner);
