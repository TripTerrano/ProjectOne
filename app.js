// state of ggame play

let deck = [];
const players = [];
let currentRound = 3;
let currentPlayer = 0;
const discardPile = [];
const scoreBoard = [];
let playMode = "play";
let isGameOver = false;

//function main() {
// This is a simple card game setup in JavaScript.
// The game involves creating a deck of cards, shuffling it, and dealing cards to players.
function makeCard(suit, value) {
  let rank = `${value}`;
  if (value === 11) rank = "J";
  if (value === 12) rank = "Q";
  if (value === 13) rank = "K";
  if (suit === "wild") rank = "W";
  return {
    suit: suit,
    value: value,
    rank: rank,
  };
}

// Create a deck of cards
function makeDeck() {
  const suits = ["blue", "green", "red", "yellow", "pink"];
  const d = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 3; j <= 13; j++) {
      d.push(makeCard(suits[i], j));
    }
  }

  // Add wild cards
  // create a double deck
  // and assign an id to each card
  const doubleDeck = d.concat(d);
  const wildCard = makeCard("wild", 0);
  for (let i = 0; i < 6; i++) {
    doubleDeck.push(wildCard);
  }

  return doubleDeck.map((card, index) => {
    return {
      ...card,
      id: index + 1,
    };
  });
}

// Shuffle the deck
// and assign an id to each card
// and add 6 wild cards
// and assign an id to each card
function shuffleDeck(d) {
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }

  return d;
}

function setPlayerScore(playerIdx, score) {
  if (scoreBoard[playerIdx]) {
    scoreBoard[playerIdx].push(score);
  } else {
    scoreBoard[playerIdx] = [score];
  }
}
function getPlayerTotal(playerIdx) {
  let total = 0;
  if (scoreBoard[playerIdx]) {
    for (let i = 0; i < scoreBoard[playerIdx].length; i++) {
      total += scoreBoard[playerIdx][i];
    }
  }
  return total;
}

// Create playersc
function makePlayer(name) {
  return {
    name: name,
    hand: [],
  };
}
// Add players
function addPlayer(name) {
  const player = makePlayer(name);
  players.push(player);
}
function dealCards() {
  for (let i = 0; i < players.length; i++) {
    players[i].hand = deck.splice(0, currentRound);
  }
}
function checkGameOver() {}
// Check if the game is over

function checkRoundEnd() {}
// Check if the round has ended
function drawCard(deck) {}
function discard(player, card) {}
function initGame() {
  // Initialize the game
  deck = makeDeck();
  shuffleDeck(deck);
  players.length = 0;
  discardPile.length = 0;
  scoreBoard.length = 0;
  currentRound = 3;
  currentPlayer = 0;
  playMode = "play";
  isGameOver = false;

  // Add players
  addPlayer("Player1");
  addPlayer("Player2");
  addPlayer("Player3");
  addPlayer("Player4");

  // Deal cards to players
  dealCards();
  const c = deck.pop();
  discardPile.push(c);
}

const myCards = ["red", "green", "blue", "yellow"];
const myBooks = [[0, 1], [3]];

function validateRunTest(bookCards) {
  let isValid = true;
  if (bookCards.length < 3) {
    return false;
  }
  const sortedCards = bookCards.sort((a, b) => {
    return a.value - b.value;
  });
  let testSuit = sortedCards[0].suit;
  sortedCards.forEach((card, idx) => {
    if (isValid === false) return;
    const isWildCard = card.suit === "wild" || card.value === currentRound;
    if (!isWildCard) {
      testSuit = card.suit;
    }

    if (card.suit !== testSuit) {
      isValid = false;
      return;
    }

    if (idx > 0) {
      const prevCard = sortedCards[idx - 1];
      if (card.value !== prevCard.value + 1) {
        isValid = false;
        return;
      }
    }

    return isValid;
  });
}

function validateBookTest(bookCards) {
  let isValid = true;
  if (bookCards.length < 3) {
    return false;
  }

  let testValue = bookCards[0].value;
  let hasSeenWildCard = false;
  bookCards.forEach((card, idx) => {
    if (isValid === false) return;
    const isWildCard = card.suit === "wild" || card.value === currentRound;
    if (!isWildCard && !hasSeenWildCard) {
      testValue = card.value;
    }
    if (isWildCard) {
      hasSeenWildCard = true;
    }

    console.log("testValue", testValue);
    console.log("card", card);

    console.log("isWildCard", isWildCard);

    if (card.value !== testValue && !isWildCard) {
      isValid = false;
      console.log("isValid", isValid);
      return;
    }
  });
  return isValid;
}

initGame();

const t1 = validateBookTest([
  { suit: "red", value: 3 },
  { suit: "red", value: 3 },
  { suit: "red", value: 3 },
  { suit: "wild", value: 0 },
]);
const t2 = validateBookTest([
  { suit: "red", value: 3 },
  { suit: "red", value: 3 },
  { suit: "red", value: 4 },
  { suit: "wild", value: 0 },
]);
console.log("t1", t1);
console.log("t2", t2);
