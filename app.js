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
  const deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 3; j <= 13; j++) {
      deck.push(makeCard(suits[i], j));
    }
  }

  // Add wild cards
  // create a double deck
  // and assign an id to each card
  const doubleDeck = deck.concat(deck);
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
const deck = makeDeck();

console.log(deck.length);
console.log(JSON.stringify(deck, null, 2));
// Shuffle the deck
// and assign an id to each card
// and add 6 wild cards
// and assign an id to each card
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
const sDeck = shuffleDeck(deck);

const players = [];
// Create players
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
function dealCards(deck, players, round) {
  for (let i = 0; i < players.length; i++) {
    players[i].hand = deck.splice(0, round);
  }
}
// Add players
addPlayer("Alice");
addPlayer("Bob");
addPlayer("Charlie");
addPlayer("David");

// deal cards
// dealCards(sDeck, players, 7);

console.log(players);
console.log(sDeck.length);
//}
// main();
function test() {
  const deck = makeDeck();
  console.log(deck.length);
  console.log(JSON.stringify(deck, null, 2));
  const sDeck = shuffleDeck(deck);
  console.log(sDeck.length);
  console.log(JSON.stringify(sDeck, null, 2));
  console.log("test");
}
