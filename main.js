let cardsCollection = [];

const icons = {
  cherry: "./images/icons/Image=Cherry.png",
  dog: "./images/icons/Image=Dog.png",
  dolphin: "./images/icons/Image=Dolphin.png",
  fire: "./images/icons/Image=Fire.png",
  globe: "./images/icons/Image=Globe.png",
  lion: "./images/icons/Image=Lion.png",
  lock: "./images/icons/Image=Lock.png",
  party: "./images/icons/Image=Party.png",
  piano: "./images/icons/Image=Piano.png",
  pizza: "./images/icons/Image=Pizza.png",
  present: "./images/icons/Image=Present.png",
  silly: "./images/icons/Image=Silly.png",
  sunflower: "./images/icons/Image=Sunflower.png",
  target: "./images/icons/Image=Target.png",
  topHat: "./images/icons/Image=TopHat.png",
  umbrella: "./images/icons/Image=Umbrella.png",
}
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
    resetBoard();

  board.append(...cards);
}

function resetBoard() {
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

resetBtn.addEventListener("click", resetBoard);