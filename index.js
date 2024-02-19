//Create a Card Class: Each card will have a suit (Hearts, Diamonds, Clubs, Spades) and a rank (Ace, 2, 3, 4...).
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
}


//Create a Deck Class: The deck will contain 52 cards. Methods to include shuffling the deck and dealing cards.

class Deck {
    constructor() {
        this.cards = [];
        this.populateDeck();
        this.shuffle();
    }

    populateDeck() {
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

        //for of loop 1
        for (let suit of suits) {
//    console.log("for of loop 1");
            //for of loop 2
            for (let rank of ranks) {
                // console.log("for of loop 2");
                // console.log("This is my suit:", suit,"This is my rank:", rank);
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            // console.log("code?!?!", i > 0);

            // declares a variable j, it randomizes a number between 1-52
            const j = Math.floor(Math.random() * (i + 1));
            // console.log("What is j?", j,  this.cards[j]);

            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal(player1, player2) {
        const numCards = this.cards.length / 2;
        for (let i = 0; i < numCards; i++) {
            player1.addToHand(this.cards.shift());
            player2.addToHand(this.cards.shift());
        }
    }
}

//Create a Player Class: Each player will have a name and a hand of cards. Methods to include adding cards to the hand, playing a card, and checking if the player has any cards left.

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

    addToHand(card) {
        this.hand.push(card);
    }

    playCard() {
        return this.hand.shift();
    }

    updateScore(score) {
        this.score += score;
    }
}

//Create a Game Class: This class will manage the flow of the game. It will contain instances of the Deck and two Players.
//Methods to include starting the game, playing rounds, comparing cards, handling ties, and a winner.
//Start the game loop: Each player plays a card. Compare the ranks of the cards played.The player with the higher-ranked card wins the round and takes both cards. In the case of a tie, no cards are won, and the next round begins. The game continues until one player runs out of cards.
//Winner is who has cards left in their hand or who has collected all the cards.

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    
    play() {
        const deck = new Deck();
        deck.deal(this.player1, this.player2);

        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            const card1 = this.player1.playCard();
            const card2 = this.player2.playCard();

            console.log(`${this.player1.name} plays: ${card1.rank} of ${card1.suit}`);
            console.log(`${this.player2.name} plays: ${card2.rank} of ${card2.suit}`);

            if (card1.rank > card2.rank) {
                console.log(`${this.player1.name} wins the round!`);
                this.player1.updateScore(1);
            } else if (card1.rank < card2.rank) {
                console.log(`${this.player2.name} wins the round!`);
                this.player2.updateScore(1);
            } else {
                console.log("It's a tie!");
            }
        }

        console.log(`Game over! Final scores:`);
        console.log(`${this.player1.name}: ${this.player1.score}`);
        console.log(`${this.player2.name}: ${this.player2.score}`);

        if (this.player1.score > this.player2.score) {
            console.log(`${this.player1.name} wins the game!`);
        } else if (this.player1.score < this.player2.score) {
            console.log(`${this.player2.name} wins the game!`);
        } else {
            console.log("It's a tie!");
        }
    }
}

// Initialize players
const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

// Initialize the game
const game = new Game(player1, player2);

// Start the game
game.play();

//Console Output: Print relevant information to the console to visualize the game progress.This includes which cards are played in each round, who wins each round, and the final winner of the game.

//Testing: Test each class and method individually to ensure they work as expected.

(function() {
    console.log("Testing Deck class:");
    const deck = new Deck();
    console.log(deck.cards.length === 52); // should output true
    deck.shuffle();
    console.log("Deck shuffled successfully"); // should output message indicating successful shuffle

    // Test Player class
    console.log("\nTesting Player class:");
    const player = new Player("Test Player");
    player.addToHand(new Card("Hearts", "Ace"));
    console.log(player.hand.length === 1); // should output true
    const cardPlayed = player.playCard();
    console.log(cardPlayed.rank === "Ace"); // should output true

    // Test Game class
    console.log("\nTesting Game class:");
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");
    const game = new Game(player1, player2);
    game.play(); // should output game progress and final scores
})();
