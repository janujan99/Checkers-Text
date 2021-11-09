import { Checker, Board } from "./checker_and_board";

test("test_create_checker", () => {
  let checker: Checker = new Checker("Red", 1, 2);
  expect(checker.colour).toBe("Red");
  expect(checker.x).toBe(1);
  expect(checker.y).toBe(2);
});

test("test_create_board", () => {
  let board: Board = new Board();
  expect(board.grid[0][7]!.colour).toBe("Black");
});

test("test_get_non_capture_move", () => {
  let board: Board = new Board();

  expect(board.grid[0][7]?.get_non_capture_moves(board.grid)).toStrictEqual([]);
});

test("test_get_capture_move", () => {
  let move_test_board = new Board();
  move_test_board.move([0, 5], [1, 4]);
  move_test_board.move([1, 2], [0, 3]);
  move_test_board.move([2, 5], [3, 4]);
  expect(
    new Set(move_test_board.grid[3][0]?.get_capture_moves(move_test_board.grid))
  ).toStrictEqual(new Set([[2, 5]]));
});

test("test_moving_promoted_piece", () => {
  let board = new Board();
  board.move([0, 5], [1, 4]);
  board.move([1, 2], [0, 3]);
  board.move([2, 5], [3, 4]);
  board.move([0, 3], [2, 5]);
  board.move([1, 6], [0, 5]);
  board.move([7, 2], [6, 3]);
  board.move([0, 7], [1, 6]);
  board.move([2, 5], [0, 7]);
  board.move([2, 7], [1, 6]);

  expect(board.grid[7][0]!.get_capture_moves(board.grid)).toStrictEqual([
    [2, 5],
  ]);
});
test("test_check_if_game_over", () => {
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
  expect(board.game_over("Black")).toBe(true);
  expect(board.game_over("Red")).toBe(false);
});
