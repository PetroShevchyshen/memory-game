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
const pairsCollection = new Map();

function createContent(count) {
  cardsCollection = [];
  indexCollection = [];

  for (let index = 0; index < count / 2; index++) {
    indexCollection.push(iconsValues[index]);
    indexCollection.push(iconsValues[index]);
  }

  const shuffledCollection = shuffle(indexCollection);

  for (let index = 0; index < count; index++) {
    const mainDivElement = document.createElement('div');
    const imgElementBack = document.createElement('img');
    const imgElementFront = document.createElement('img');

    mainDivElement.className = 'card';
    mainDivElement.setAttribute("value", index);

    imgElementBack.src = url;
    imgElementBack.className = 'back';

    imgElementFront.src = shuffledCollection[index];
    imgElementFront.className = 'front';

    mainDivElement.append(imgElementBack, imgElementFront);
    cardsCollection.push(mainDivElement);
  }
  return cardsCollection;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

  if (!card)
    return;

  const cardId = +card.getAttribute('value');
  card.classList.toggle("show");

  const img = card.lastChild;
  const src = img.getAttribute('src');

  pairsCollection.set(cardId, src);

  if (pairsCollection.size === 2) {
    checkPairs();
  }
}

function checkPairs() {
  const [first, second] = pairsCollection.values();

  if (first === second) {
    for (let item of pairsCollection) {
      const card = board.querySelector(`[value="${item[0]}"]`);
      setTimeout(() => {
        card.style.display = "none";
      }, 1000);
    }
  } else {
    for (let item of pairsCollection) {
      const card = board.querySelector(`[value="${item[0]}"]`);
      setTimeout(() => {
        card.classList.toggle("show");
      }, 800);
    }
  }
  pairsCollection.clear();

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