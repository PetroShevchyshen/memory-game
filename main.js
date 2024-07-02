let cardsCollection = [];

const url = "./images/Back-design.png";
const board = document.querySelector('.board');
const selectElement = document.querySelector('.chooseSelector');
const resetBtn = document.querySelector('.resetBtn');
const chooseWrapper = document.querySelector('.chooseSection');

function createContent(count) {
  cardsCollection = [];
  for (let index = 0; index < count; index++) {
    const divElement = document.createElement('div');
    const imgElement = document.createElement('img');
    divElement.className = 'card'
    imgElement.src = url;
    divElement.append(imgElement);
    cardsCollection.push(divElement);
  }
  return cardsCollection;
}

function initGame(count) {
  const cards = createContent(count);

  if (board.childElementCount > 0)
    resetBoard(board);

  board.append(...cards);
}

function resetBoard(board) {
  board.innerHTML = '';
  chooseWrapper.removeAttribute("style");
}

selectElement.addEventListener("click", event => {
  if (+event.currentTarget.value !== 0) {
    initGame(event.target.value);
    chooseWrapper.style.display = "none";
  }
  event.target.value = 0;
})

resetBtn.addEventListener("click", () => {
  resetBoard(board);
})