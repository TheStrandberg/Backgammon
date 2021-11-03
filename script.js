var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var draggables = document.querySelectorAll(".draggable");
var containers = document.querySelectorAll(".container");
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
    var draggableElements = __spreadArray([], container.querySelectorAll('.draggable:not(.dragging)'), true);
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
