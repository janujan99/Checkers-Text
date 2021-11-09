export class Checker {
  char: string;
  colour: string;
  x: number;
  y: number;
  has_promoted: boolean;
  direction_factor: number;

  constructor(
    checkerColour: string,
    checkerX: number,
    checkerY: number,
    has_promoted = false
  ) {
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
  is_valid_coordinate(coordinate: Number[]) {
    return (
      coordinate[0] >= 0 &&
      coordinate[0] < 8 &&
      coordinate[1] >= 0 &&
      coordinate[1] < 8
    );
  }
  get_non_capture_moves(grid: (Checker | null)[][]) {
    let moves: number[][];
    if (!this.has_promoted) {
      moves = [
        [this.x + 1, this.y + this.direction_factor],
        [this.x - 1, this.y + this.direction_factor],
      ];
    } else {
      moves = [
        [this.x + 1, this.y + this.direction_factor],
        [this.x - 1, this.y + this.direction_factor],
        [this.x + 1, this.y - this.direction_factor],
        [this.x - 1, this.y - this.direction_factor],
      ];
    }

    let filtered_moves: number[][] = [];
    for (let i = 0; i < moves.length; i++) {
      let y: number = moves[i][0];
      let x: number = moves[i][1];
      if (grid[x][y] == null && this.is_valid_coordinate(moves[i])) {
        filtered_moves.push(moves[i]);
      }
    }
    return filtered_moves;
  }
  get_capture_moves(grid: (Checker | null)[][]) {
    //incomplete
    let moves: number[][];
    if (!this.has_promoted) {
      moves = [
        [this.x + 2, this.y + 2 * this.direction_factor],
        [this.x - 2, this.y + 2 * this.direction_factor],
      ];
    } else {
      moves = [
        [this.x + 2, this.y + 2 * this.direction_factor],
        [this.x - 2, this.y + 2 * this.direction_factor],
        [this.x + 2, this.y - 2 * this.direction_factor],
        [this.x - 2, this.y - 2 * this.direction_factor],
      ];
    }
    let on_board_moves: number[][] = [];
    for (let i = 0; i < moves.length; i++) {
      // filter for all moves that are on the board
      if (this.is_valid_coordinate(moves[i])) {
        on_board_moves.push(moves[i]);
      }
    }
    let filtered_moves: number[][] = [];

    for (let i = 0; i < on_board_moves.length; i++) {
      let y: number = on_board_moves[i][0];
      let x: number = on_board_moves[i][1];

      if (
        grid[x][y] == null &&
        grid[(this.y + x) / 2][(this.x + y) / 2] != null &&
        grid[(this.y + x) / 2][(this.x + y) / 2]?.colour != this.colour
      ) {
        filtered_moves.push(moves[i]);
      }
    }
    return filtered_moves;
  }
  promote() {
    this.has_promoted = true;
    this.char = this.char.charAt(0).toUpperCase();
  }
  no_captures_possible(grid: (Checker | null)[][]) {
    return this.get_capture_moves(grid).length == 0;
  }
  legal_moves_exist(grid: (Checker | null)[][]) {
    return (
      !this.no_captures_possible(grid) &&
      this.get_non_capture_moves(grid).length > 0
    );
  }
}
