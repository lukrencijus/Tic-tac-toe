const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function makeMove(turn, board) {
  while (true) {
    const row = parseInt(await ask("Enter \x1b[33mrow\x1b[0m (1-3): "));
    const col = parseInt(await ask("Enter col (1-3): "));

    if (isNaN(row) || row < 1 || row > 3) console.log("❌Invalid row");
    else if (isNaN(col) || col < 1 || col > 3) console.log("❌Invalid column");
    else if (board[row - 1][col - 1] !== " ") console.log("❌Invalid position");
    else {
      board[row - 1][col - 1] = turn;
      break;
    }
  }
}

function printBoard(board) {
  console.log("\n   1   2   3");
  board.forEach((row, i) => {
    console.log(
      i + 1,
      " " + row.map((cell) => (cell === " " ? "_" : cell)).join(" | ")
    );
    if (i < board.length - 1) console.log("  -----------");
  });
  console.log();
}

function checkWin(board, turn) {
    const lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ]
    for (let line of lines) {
        let win = true;
        for (let pos of line) {
            const [row, col] = pos
            if (board[row][col] !== turn) {
                win = false
                break
            }
        }
        if (win) return true
    }
    return false
}

async function main() {
  const board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  let turn = "X";
  let turnCount = 0;
  let win = false;

  printBoard(board)
  console.log()
  while (turnCount < 9) {
    console.log(`👉 ${turn}'s turn`);
    await makeMove(turn, board);
    printBoard(board);
    console.log()
    win = checkWin(board, turn)
    if (win) {
        console.log(`🎉 ${turn} has won!`);
        break
    }

    turn = turn === "X" ? "O" : "X";
    turnCount++;
  }
  if (!win) console.log("🤝 It's a tie!");
  rl.close();
}

main();