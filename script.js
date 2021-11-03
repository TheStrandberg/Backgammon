var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var section = document.querySelector("section");
var draggables = document.querySelectorAll(".draggable");
var containers = document.querySelectorAll(".container");
var diceButton = document.getElementById("roll-dice-button");
var whiteTileArray = [];
var blackTileArray = [];
var turn = true;
var start = document.getElementById("start");
start.textContent = "Begin!";
var startGameButton = document.getElementById("start-game");
startGameButton.addEventListener("click", function (event) {
    var randomizer = Math.floor(Math.random() * (3 - 1) + 1);
    if (randomizer === 1) {
        start.textContent = "White Starts";
        turn = true;
    }
    else {
        start.textContent = "Black Starts";
        turn = false;
    }
    setTimeout(function () {
        startGameButton.style.display = "none";
    }, 3000);
    var countdown = document.getElementById("countdown");
    setTimeout(function () {
        countdown.textContent = "3";
    }, 3000);
    setTimeout(function () {
        countdown.textContent = "2";
    }, 4000);
    setTimeout(function () {
        countdown.textContent = "1";
    }, 5000);
    setTimeout(function () {
        section.style.display = "flex";
        countdown.style.display = "none";
        playerTurn.style.display = "inline";
    }, 6000);
    var playerTurnButton = document.getElementById("playerturn");
    //   playerTurnButton.addEventListener("click", (event) => {
    //       if (turn === true){
    //           turn = false;
    //       }
    //       else {
    //           turn = true
    //       }
    //   })
    var playerTurn = document.getElementById("playerturn");
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
    }
    else {
        blackTileArray.push[i];
    }
}
diceButton.onclick = function (event) {
    var diceOne = document.getElementById("dicerollOne");
    var numberOne = Math.floor(Math.random() * (7 - 1) + 1);
    diceOne.textContent = "" + numberOne;
    var diceTwo = document.getElementById("dicerollTwo");
    var numberTwo = Math.floor(Math.random() * (7 - 1) + 1);
    diceTwo.textContent = "" + numberTwo;
};
var whiteDropZone = document.getElementById("white-dropzone");
{
    whiteDropZone.addEventListener("dragenter", function (event) {
        draggables.forEach(function (draggable) {
            // draggable.id;
            draggable.classList.add("dragstop");
        });
    });
}
whiteDropZone.addEventListener("dragleave", function (event) {
    draggables.forEach(function (draggable) {
        draggable.classList.remove("dragstop");
    });
});
draggables.forEach(function (draggable) {
    draggable.addEventListener("dragstart", function () {
        draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", function () {
        draggable.classList.remove("dragging");
    });
});
containers.forEach(function (container) {
    container.addEventListener("dragover", function (event) {
        event.preventDefault();
        var afterElement = getDragAfterElement(container, event.clientY);
        var draggable = document.querySelector(".dragging");
        if (afterElement == null) {
            container.appendChild(draggable);
        }
        else {
            container.insertBefore(draggable, afterElement);
        }
    });
});
function getDragAfterElement(container, y) {
    var draggableElements = __spreadArray([], container.querySelectorAll(".draggable:not(.dragging)"), true);
    return draggableElements.reduce(function (closest, child) {
        var box = child.getBoundingClientRect();
        var offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        }
        else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
