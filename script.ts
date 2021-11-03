const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const diceButton = document.getElementById("roll-dice-button")! as HTMLButtonElement;  

diceButton.onclick = event => {
    let diceOne = document.getElementById("dicerollOne") as HTMLElement; 
    let numberOne: number = Math.floor(Math.random() * (6 - 1) + 1);
    diceOne.textContent = "" + numberOne;

    let diceTwo = document.getElementById("dicerollTwo") as HTMLElement; 
    let numberTwo: number = Math.floor(Math.random() * (6 - 1) + 1);
    diceTwo.textContent = "" + numberTwo;
}

const whiteDropZone = document.getElementById("white-dropzone") as HTMLElement; 
whiteDropZone.addEventListener("dragenter", (event) => {
    if (draggables[name="white"]){
        alert("Hej");
    }
    draggables.forEach((draggable: Element) =>{
        let ID = draggable.id;
        console.log(ID);
        draggable.classList.add("dragstop")
    })
})
whiteDropZone.addEventListener("dragleave", (event) => {
    if (draggables[name="white"]){
        alert("Hej");
    }
    draggables.forEach((draggable: Element) =>{
        let ID = draggable.id;
        console.log(ID);
        draggable.classList.remove("dragstop")
    })
})

draggables.forEach((draggable: Element) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container:Element) => {
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY);    
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } 
    else {
      container.insertBefore(draggable, afterElement);
    }
  });
});



function getDragAfterElement(container: any, y: number) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } 
      else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }
