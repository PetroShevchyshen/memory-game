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
const iconsValues = Object.values(icons);
const url = "./images/Back-design.png";
const board = document.querySelector('.board');
const selectElement = document.querySelector('.chooseSelector');
const resetBtn = document.querySelector('.resetBtn');
const chooseWrapper = document.querySelector('.chooseSection');

function createContent(count) {
  cardsCollection = [];
  indexCollection = [];

  for (let index = 0; index < count; index++) {
    let num = Math.random() * 10;
    indexCollection.push(iconsValues[Math.ceil(num)]);
  }

  for (let index = 0; index < count; index++) {
    const mainDivElement = document.createElement('div');
    const imgElementBack = document.createElement('img');
    const imgElementFront = document.createElement('img');

    mainDivElement.className = 'card';
    mainDivElement.setAttribute("value", index);

    imgElementBack.src = url;
    imgElementBack.className = 'back';

    imgElementFront.src = indexCollection[index];
    imgElementFront.className = 'front';

    mainDivElement.append(imgElementBack, imgElementFront);
    cardsCollection.push(mainDivElement);
  }
  return cardsCollection;
}

function initGame(count) {
  const cards = createContent(count);

  if (board.childElementCount > 0)
    resetBoard();

  board.append(...cards);

  board.addEventListener("click", checkCard);
}

function resetBoard() {
  board.innerHTML = '';
  chooseWrapper.removeAttribute("style");
}

function checkCard(event) {
  const card = event.target.closest('.card');
  if (card) {
    console.log(+card.getAttribute('value'));
    card.classList.toggle("show");
  }

}

selectElement.addEventListener("click", event => {
  if (+event.currentTarget.value !== 0) {
    initGame(event.target.value);
    chooseWrapper.style.display = "none";
  }
  event.target.value = 0;
})

resetBtn.addEventListener("click", resetBoard);

board.addEventListener('click', checkCard);