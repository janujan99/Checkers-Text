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
  is_valid_coordinate(coordinate: number[]) {
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
        [this.x + 1, this.y + 1],
        [this.x - 1, this.y + 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y - 1],
      ];
    }
    let filtered_moves: number[][] = [];
    for (let i = 0; i < moves.length; i++) {
      if (
        this.is_valid_coordinate(moves[i]) &&
        grid[moves[i][1]][moves[i][0]] == null
      ) {
        filtered_moves.push(moves[i]);
      }
    }
    return filtered_moves;
  }
  get_capture_moves(grid: (Checker | null)[][]) {
    let moves: number[][];
    if (!this.has_promoted) {
      moves = [
        [this.x + 2, this.y + 2 * this.direction_factor],
        [this.x - 2, this.y + 2 * this.direction_factor],
      ];
    } else {
      moves = [
        [this.x + 2, this.y + 2],
        [this.x - 2, this.y + 2],
        [this.x + 2, this.y - 2],
        [this.x - 2, this.y - 2],
      ];
    }

    let filtered_moves: number[][] = [];

    for (let i = 0; i < moves.length; i++) {
      let y: number = moves[i][0];
      let x: number = moves[i][1];

      if (
        this.is_valid_coordinate(moves[i]) &&
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
  legal_moves_exist(grid: (Checker | null)[][]) {
    return (
      this.get_capture_moves(grid).length ||
      this.get_non_capture_moves(grid).length
    );
  }
}
export class Board {
  grid: (Checker | null)[][];
  constructor() {
    this.grid = [
      [
        null,
        new Checker("Black", 1, 0),
        null,
        new Checker("Black", 3, 0),
        null,
        new Checker("Black", 5, 0),
        null,
        new Checker("Black", 7, 0),
      ],
      [
        new Checker("Black", 0, 1),
        null,
        new Checker("Black", 2, 1),
        null,
        new Checker("Black", 4, 1),
        null,
        new Checker("Black", 6, 1),
        null,
      ],
      [
        null,
        new Checker("Black", 1, 2),
        null,
        new Checker("Black", 3, 2),
        null,
        new Checker("Black", 5, 2),
        null,
        new Checker("Black", 7, 2),
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Checker("Red", 0, 5),
        null,
        new Checker("Red", 2, 5),
        null,
        new Checker("Red", 4, 5),
        null,
        new Checker("Red", 6, 5),
        null,
      ],
      [
        null,
        new Checker("Red", 1, 6),
        null,
        new Checker("Red", 3, 6),
        null,
        new Checker("Red", 5, 6),
        null,
        new Checker("Red", 7, 6),
      ],
      [
        new Checker("Red", 0, 7),
        null,
        new Checker("Red", 2, 7),
        null,
        new Checker("Red", 4, 7),
        null,
        new Checker("Red", 6, 7),
        null,
      ],
    ];
  }
  display() {
    for (let i = 0; i < 8; i++) {
      let st = "";
      for (let j = 0; j < 8; j++) {
        if (this.grid[i][j] == null) {
          st = st + " -";
        } else {
          st = st + " " + this.grid[i][j]?.char;
        }
      }
      console.log(st);
    }
  }
  move(initial: number[], final: number[]) {
    //make copy of the checker at initial
    let moving_checker: Checker | null = this.grid[initial[1]][initial[0]];
    if (moving_checker == null) {
      return;
    }

    let new_checker: Checker = new Checker(
      moving_checker.colour,
      final[0],
      final[1],
      moving_checker!.has_promoted
    );

    //delete piece at initial
    this.grid[initial[1]][initial[0]] = null;
    //set grid element at final to the deepcopy of the checker
    this.grid[final[1]][final[0]] = new_checker;

    // if move was a capture (initial[0] - final[0] is two), then delete the piece in between
    if (Math.abs(initial[0] - final[0]) == 2) {
      this.grid[(final[1] + initial[1]) / 2][(final[0] + initial[0]) / 2] =
        null;
    }
    //promote if piece reaches other side
    let rank: number = final[1];
    if (
      (rank == 0 && this.grid[final[1]][final[0]]?.colour == "Red") ||
      (rank == 7 && this.grid[final[1]][final[0]]?.colour == "Black")
    ) {
      this.grid[final[1]][final[0]]?.promote();
    }
  }
  game_over(colour: string) {
    //If no pieces of colour exist, then return True
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        console.log(this.grid[i][j] != null);
        if (this.grid[i][j] != null && this.grid[i][j]!.colour == colour) {
        }
        if (
          this.grid[i][j] != null &&
          this.grid[i][j]!.colour == colour &&
          this.grid[i][j]!.legal_moves_exist(this.grid)
        ) {
          return false;
        }
      }
    }
    return true;
  }
}
let board: Board = new Board();
board.grid = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, new Checker("Black", 7, 5)],
  [null, null, null, null, null, null, new Checker("Red", 6, 6), null],
  [null, null, null, null, null, new Checker("Red", 5, 7), null, null],
];
