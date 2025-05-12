// state of game play

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
    books: [[], [], [], [], [], []],
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
function drawCard(d) {
  const player = players[currentPlayer];
  if (player.hand.length > currentRound) {
    return;
  }
  const card = d.pop();
  if (card) {
    player.hand.push(card);
  }
}
function discardCard(cardId) {
  const player = players[currentPlayer];
  if (player.hand.length > currentRound) {
    return;
  }
  const cardIdx = player.hand.findIndex((card) => card.id === cardId);
  const card = player.hand[cardIdx];
  players.books.map((book) => {
    book
      .filter((idx) => idx === cardIdx)
      .map((idx) => {
        if (idx < cardIdx) {
          return idx;
        }
        return idx - 1;
      });
  });
  if (card) {
    player.hand.splice(cardIdx, 1);
    discardPile.push(card);
  }
}

function initRound(r) {
  // Initialize the round
  currentRound = r;
  currentPlayer = 0;
  playMode = "play";
  isGameOver = false;

  // Deal cards to players
  dealCards();
  const c = deck.pop();
  discardPile.push(c);
}

function initGame() {
  // Initialize the game
  deck = makeDeck();
  shuffleDeck(deck);
  players.length = 0;
  discardPile.length = 0;
  scoreBoard.length = 0;

  currentPlayer = 0;
  playMode = "play";
  isGameOver = false;

  initRound(3);
}

// POTENTIAL book validation
function validateBook(bookCards, wildValue = currentRound) {
  if (bookCards.length < 3) return false;

  let targetValue = null;
  for (const card of bookCards) {
    if (!isWildCard(card, wildValue)) {
      if (!targetValue) {
        targetValue = card.value;
      } else if (card.value !== targetValue) {
        return false;
      }
    }
  }
  return true;
}

// POTENTIAL run validation
function validateRun(runCards, wildValue = currentRound) {
  if (runCards.length < 3) return false;

  const sorted = [...runCards]
    .filter((card) => !isWildCard(card, wildValue))
    .sort((a, b) => a.value - b.value);
  let suit = null;
  let expectedValue = null;
  let wildCount = runCards.length - sorted.length;

  for (let i = 0; i < sorted.length; i++) {
    const card = sorted[i];

    if (suit === null) {
      suit = card.suit;
    }
    if (expectedValue === null) {
      expectedValue = card.value;
    }
    if (card.suit !== suit) {
      return false;
    }

    if (card.value !== expectedValue) {
      if (wildCount > 0) {
        wildCount--;
        expectedValue++;
      } else {
        return false;
      }
    }
    expectedValue++;
  }
  return true;
}

function isWildCard(card, wildValue) {
  return card.suit === "wild" || card.value === wildValue;
}

function movePlayerCards(player, cardIds, destination) {
  const cardsIdx = cardIds.map((id) =>
    player.hand.findIndex((card) => card.id === id)
  );

  player.books = player.books.map((book, bookIdx) => {
    if (destination === bookIdx) {
      cardsIdx.forEach((idx) => {
        if (!book.includes(idx)) {
          book.push(idx);
        }
      });
      return book;
    }
    return book.filter((idx) => !cardsIdx.includes(idx));
  });
}
