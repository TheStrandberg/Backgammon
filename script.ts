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
  } 
  else {
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
  
  const playerTurnButton = document.getElementById("playerturn")! as HTMLButtonElement; 

//   playerTurnButton.addEventListener("click", (event) => {
//       if (turn === true){
//           turn = false;
//       }
//       else {
//           turn = true
//       }
//   })
  let playerTurn = document.getElementById("playerturn") as HTMLElement;
    if (turn === true) {
        playerTurn.textContent = "Player Turn: White"; 
        playerTurn.style.color = "white"; 
    }   
    else {
        playerTurn.textContent = "Player Turn: Black";  
        playerTurn.style.color = "black";
    }
});

for (var i = 0; i < draggables.length; i++) {
  if (i < 15) {
    whiteTileArray.push[i];
  } else {
    blackTileArray.push[i];
  }
}

diceButton.onclick = (event) => {
  let diceOne = document.getElementById("dicerollOne") as HTMLElement;
  let numberOne: number = Math.floor(Math.random() * (7 - 1) + 1);
  diceOne.textContent = "" + numberOne;

  let diceTwo = document.getElementById("dicerollTwo") as HTMLElement;
  let numberTwo: number = Math.floor(Math.random() * (7 - 1) + 1);
  diceTwo.textContent = "" + numberTwo;
};

const whiteDropZone = document.getElementById("white-dropzone") as HTMLElement;
{
  whiteDropZone.addEventListener("dragenter", (event) => {
    draggables.forEach((draggable: Element) => {
      // draggable.id;
      draggable.classList.add("dragstop");
    });
  });
}

whiteDropZone.addEventListener("dragleave", (event) => {
  draggables.forEach((draggable: Element) => {
    draggable.classList.remove("dragstop");
  });
});

draggables.forEach((draggable: Element) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container: Element) => {
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
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
