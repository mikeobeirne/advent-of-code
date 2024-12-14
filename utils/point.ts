export enum Direction {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
}

export class Point {
  row: number;
  col: number;
  dir: Direction | null;

  constructor(r: number, c: number, dir: Direction | null = null) {
    this.row = r;
    this.col = c;
    this.dir = dir;
  }

  move(dir: Direction): Point {
    let newCol = this.col + { up: 0, down: 0, left: -1, right: 1 }[dir];
    let newRow = this.row + { up: -1, down: 1, left: 0, right: 0 }[dir];

    return new Point(newRow, newCol, dir);
  }

  // Moves relative to where we're facing
  moveRelative(dir: Direction): Point {
    let newDir;
    if (dir === Direction.up) {
      newDir = this.dir;
    }
    if (dir === Direction.down) {
      newDir = {
        up: Direction.down,
        down: Direction.up,
        left: Direction.right,
        right: Direction.left,
      }[this.dir!];
    }
    if (dir === Direction.right) {
      newDir = {
        up: Direction.right,
        down: Direction.left,
        left: Direction.up,
        right: Direction.down,
      }[this.dir!];
    }
    if (dir === Direction.left) {
      newDir = {
        up: Direction.left,
        down: Direction.right,
        left: Direction.down,
        right: Direction.up,
      }[this.dir!];
    }
    return this.move(newDir!);
  }

  toString(): string {
    return this.row + " " + this.col;
  }
}
