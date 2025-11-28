const puzzle = document.getElementById("puzzle");
const full_image = document.getElementById("fullImageContainer");
const hidden_button = document.getElementById("ultra-tajny-link");

let board = [1, 2, 3,
             4, 5, 6,
             7, 8, 0];

let solved_board = [1, 2, 3,
                    4, 5, 6,
                    7, 8, 0];


// stworzenie tabelki
function render() {
    puzzle.innerHTML = "";

    board.forEach((value, index) => {
        const tile = document.createElement("div");
        tile.id = value;
        tile.className = value === 0 ? "tile empty" : "tile";
        tile.style = "background-image: url(./images/"+(value+1)+".gif)"

        tile.onclick = () => tileClick(index);
        puzzle.appendChild(tile);
    });
}

// sprawdzenie czy kafelek jest obok
function isAdjacent(i, j) {
    const rowA = Math.floor(i / 3), colA = i % 3;
    const rowB = Math.floor(j / 3), colB = j % 3;
    return (Math.abs(rowA - rowB) + Math.abs(colA - colB)) === 1;
}

//nacisniecie kafelka
function tileClick(index) {
    const emptyIndex = board.indexOf(0);
    if (isAdjacent(index, emptyIndex)) {
        //zamiana kafelka pustego z klinietym
        [board[index], board[emptyIndex]] = [board[emptyIndex], board[index]];
        render();
    }
    
    // wygrana
    if (arraysAreEqual(board, solved_board)){
        document.querySelectorAll(".tile").forEach(tile => {
        tile.classList.add("victory");
        });

        
        setTimeout(showFullImage, 1500);
    }
}

function showFullImage(){
    puzzle.innerHTML = "";
    puzzle.style.display = "none";
    hidden_button.style.display = "block"
    full_image.style.display = "block";

}

// mieszanie kafelkow
function shuffle() {
    for (let i = 0; i < 1000; i++) {
        const empty = board.indexOf(0);
        const moves = [];

        // liczenie dobrych ruchow
        [empty - 3, empty + 3, empty - 1, empty + 1].forEach(pos => {
            if (pos >= 0 && pos < 9 && isAdjacent(empty, pos)) {
                moves.push(pos);
            }
        });

        // losowanie 
        const move = moves[Math.floor(Math.random() * moves.length)];
        [board[empty], board[move]] = [board[move], board[empty]];
    }
}

//funkcja porównująca tablice
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

shuffle();
render();
