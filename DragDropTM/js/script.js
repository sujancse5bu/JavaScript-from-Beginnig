const fill = document.querySelector('.fill'),
      empties = document.querySelectorAll('.empty');

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

function dragStart() {
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    this.className = 'fill';
}




function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}
function dragLeave() {
    if (this.classList.contains('active')) this.className = 'empty active';
    else this.className = 'empty';
}
function dragDrop() {
    for (const emp of empties) {
//        if (emp.classList.contains('active')){
            emp.classList.remove('active');
            while (emp.firstChild) {
                emp.removeChild(emp.firstChild);
            }
//        }
    }
    setTimeout(() => {
        this.className = 'empty active';
        this.append(fill);
    }, 0);
}
