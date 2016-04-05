// This is the basic model
var game = {
    "deck": 52,
    "avaliable_Cards": 52,
    "current_player_index": 0,
    "players": [],
    "winner": "",
    "usedCards": []
};

// print out the model
function print() {
    var jsonString = JSON.stringify(game);
    console.log(jsonString);
}

// start the games logic
function startGame() {
    iniPlayers(2);
    print();
}

// when game ended
function EndGame() {
    print();
    console.log("Winner is " + game.winner);
    lockButtons(1);
}

// check who wins and end the game
function checkEndGame() {
    var player = game.players[0];
    var dealer = game.players[1];
    if (player.sum_Ace <= 21 && player.sum_Ace > player.sum) {
        player.sum = player.sum_Ace;
    }
    if (dealer.sum_Ace <= 21 && dealer.sum_Ace > dealer.sum) {
        dealer.sum = dealer.sum_Ace;
    }

    if (player.sum <= 21 && dealer.sum <= 21) {
        if (player.sum > dealer.sum) {
            game.winner = player.name;
        }
        if (player.sum < dealer.sum) {
            game.winner = dealer.name;
        }
        if (player.sum == dealer.sum) {
            game.winner = "DRAW";
        }
    } else if (player.sum <= 21 && dealer.sum > 21) {
        game.winner = player.name;
    } else if (dealer.sum <= 21 && player.sum > 21) {
        game.winner = dealer.name;
    } else {
        game.winner = "DRAW";
    }
    EndGame();
}

// dealer needed to draw cards
function dealerPlay() {
    var dealer = game.players[game.current_player_index];
    for (; dealer.sum < 17 && dealer.sum_Ace < 17;) {
        hit();
    }
    for (; dealer.sum < 17 && dealer.sum_Ace > 17;) {
        hit();
    }
}

// hit
function hit() {
    game.players[game.current_player_index].cards.push(generateRandomCard());
    refreshSum();
    checkBusted();
    print();
}

// must sure the sum won't go over 21 or blackjack
function checkBusted() {
    var player = game.players[game.current_player_index];
    var dealer = game.players[game.players.length - 1];
    // check blackjack on the first hand
    if (player.cards.length == 2 && player.sum == 11 && player.sum_Ace == 21) {
        checkEndGame();
        return;
    }
    // normal check
    if (player.sum > 21) {
        checkEndGame();
        return;
    }
    if (player.sum == 21 || player.sum_Ace == 21) {
        stand();
    }
}

// if the current player is dealer then dealer needed to play too
function stand() {
    game.current_player_index++;
    if (game.current_player_index == game.players.length - 1) {
        dealerPlay();
        checkEndGame();
        return;
    } else {
        print();
    }
}

// initialize player cards and dealer cards
function iniPlayers(numOfPlayers) {
    /*
    {
        "deck": 52,
        "current_player_index": 0,
        "players": [
            {
                "name": "player0",
                "cards": [1, 2],
                "sum": 3
            },
            {
                "name": "dealer",
                "cards": [1, 2],
                "sum": 3
            }
        ],
        "winner": ""
        "usedCards": []
    }
    */
    var i;
    for (i = 0; i < numOfPlayers; i++) {
        var name = i == numOfPlayers - 1 ? "dealer" : "player" + i;
        var cards = [];
        cards.push(generateRandomCard());
        cards.push(generateRandomCard());
        var player = {
            "name": name,
            "cards": cards,
            "sum": 0,
            "sum_Ace": 0
        };
        game.players.push(player);
    }
    refreshSum();
    checkBusted();
}

// loop through all players and dealer sums and refresh them
function refreshSum() {
    var x;
    for (x = 0; x < game.players.length; x++) {
        var player = game.players[x];
        var cards = player.cards;
        player.sum = 0;

        var i = cards.length;
        var flag_Ace = 0;
        while (i--) {
            var card = cards[i] % 13 == 0 ? 13 : cards[i] % 13;
            if (card > 10) {
                player.sum += 10;
            } else {
                player.sum += card;
            }
            if (card == 1) {
                flag_Ace = 1;
            }
        }

        if (flag_Ace == 1) {
            player.sum_Ace = player.sum + 10;
        }
    }
}

// generate a random card that are not drew
function generateRandomCard() {
    var randomNum = (Math.floor(Math.random() * game.deck) + 1);
    for (; game.usedCards.indexOf(randomNum) != -1;) {
        randomNum = (Math.floor(Math.random() * game.deck) + 1);
    }
    game.usedCards.push(randomNum);
    game.avaliable_Cards--;
    return randomNum;
}

// clean model prepare for next round
function model_clean() {
    game = {
        "deck": 52,
        "avaliable_Cards": 52,
        "current_player_index": 0,
        "players": [],
        "winner": "",
        "usedCards": []
    };
}
