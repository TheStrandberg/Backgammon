const section = document.querySelector("section") as HTMLAreaElement;
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const diceButton = document.getElementById(
  "roll-dice-button"
)! as HTMLButtonElement;
const whiteTileArray = [];
const blackTileArray = [];
var turn: boolean = true;

let start = document.getElementById("start") as HTMLElement;
start.textContent = "Begin!";

const startGameButton = document.getElementById(
  "start-game"
)! as HTMLButtonElement;
startGameButton.addEventListener("click", (event) => {
  let randomizer: number = Math.floor(Math.random() * (3 - 1) + 1);
  if (randomizer === 1) {
    start.textContent = "White Starts";
    turn = true;
  } else {
    start.textContent = "Black Starts";
    turn = false;
  }
  setTimeout(() => {
    startGameButton.style.display = "none";
  }, 3000);
  let countdown = document.getElementById("countdown") as HTMLElement;
  setTimeout(() => {
    countdown.textContent = "3";
  }, 3000);
  setTimeout(() => {
    countdown.textContent = "2";
  }, 4000);
  setTimeout(() => {
    countdown.textContent = "1";
  }, 5000);
  setTimeout(() => {
    section.style.display = "flex";
    countdown.style.display = "none";
    playerTurn.style.display = "inline";
  }, 6000);
});


const playerTurnButton = document.getElementById("passturn")! as HTMLButtonElement;
const playerTurn = document.getElementById("playerturn") as HTMLElement;
  
let randomizer: number = Math.floor(Math.random() * (3 - 1) + 1);
if (randomizer === 1) {
  playerTurn.textContent = "White Starts";
  turn = true;
} else {
  playerTurn.textContent = "Black Starts";
  turn = false;
}

playerTurnButton.addEventListener("click", (event) => {
  turn = !turn;  
  if (turn === true) {
    playerTurn.textContent = "Player Turn: White";
    playerTurn.style.color = "white";
  } else {
    playerTurn.textContent = "Player Turn: Black";
    playerTurn.style.color = "black";
  }
  let diceOne = document.getElementById("dicerollOne") as HTMLElement;
  let diceTwo = document.getElementById("dicerollTwo") as HTMLElement;
  diceOne.textContent = "";
  diceTwo.textContent = "";
  diceButton.disabled = false;
})

for (var i = 0; i < draggables.length; i++) {
  if (i < 15) {
    whiteTileArray.push[i];
  } else {
    blackTileArray.push[i];
  }
}

diceButton.onclick = (event) => {
  diceButton.disabled = true;
  let diceOne = document.getElementById("dicerollOne") as HTMLElement;
  let numberOne: number = Math.floor(Math.random() * (7 - 1) + 1);
  diceOne.textContent = "" + numberOne;

  let diceTwo = document.getElementById("dicerollTwo") as HTMLElement;
  let numberTwo: number = Math.floor(Math.random() * (7 - 1) + 1);
  diceTwo.textContent = "" + numberTwo;
};

const whiteDropZone = document.getElementById(
  "white-dropzone"
) as HTMLAreaElement;

whiteDropZone.addEventListener("dragenter", (event) => {
  var item = event.target.id;
  var hej = event.target.getAttribute(item);
  console.log(hej);
});

whiteDropZone.addEventListener("dragleave", (event) => {
  draggables.forEach((draggable: Element) => {
    draggable.classList.remove("dragstop");
  });
});

let startingContainer = 0;
draggables.forEach((draggable: Element) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    let currentPiece = document.querySelector(".dragging");
    startingContainer = parseInt(currentPiece.parentElement.id);
    // console.log(startingContainer);
  });
  draggable.addEventListener("dragend", () => {
    let currentPiece = document.querySelector(".dragging");
    let endContainer = parseInt(currentPiece.parentElement.id);
    // console.log(endContainer);
    if (
      (turn == false && startingContainer > endContainer) ||
      (turn == true && startingContainer < endContainer)
    ) {
      let moveBackTo = document.getElementById(startingContainer);
      moveBackTo.appendChild(currentPiece);
    }
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container: Element) => {
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY);
    const currentPiece = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(currentPiece);
    } else {
      container.insertBefore(currentPiece, afterElement);
    }
  });
});

function getDragAfterElement(container: any, y: number) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}