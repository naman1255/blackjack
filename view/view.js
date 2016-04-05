// clean/empty out for new round or such
function view_clean() {
    $('#winner').empty();
    $('#dealer').empty();
    $('#player').empty();
}

// refresh the cards view for both player and dealer
function refreshCardsView(blackjack) {
    view_clean();

    // add cards and text to player and dealer
    for (p = 0; p < blackjack.players.length; p++) {
        var player = blackjack.players[p];
        var cards = player.cards;
        // add images
        for (k = 0; k < cards.length; k++) {
            var img = document.createElement("img");

            // setting card PNG
            var card_Value = cards[k] % 13 == 0 ? 13 : cards[k] % 13;
            var card_Suit = Math.floor(cards[k] / 13);

            // setting 1, 10, 11, 12, 13 to A, 0, J, Q, K
            if (card_Value == 1) {
                card_Value = "A";
            } else if (card_Value == 10) {
                card_Value = 0;
            } else if (card_Value == 11) {
                card_Value = "J";
            } else if (card_Value == 12) {
                card_Value = "Q";
            } else if (card_Value == 13) {
                card_Value = "K";
            }

            // setting suit
            if (card_Suit == 0) {
                card_Suit = "S";
            } else if (card_Suit == 1) {
                card_Suit = "H";
            } else if (card_Suit == 2) {
                card_Suit = "C";
            } else if (card_Suit == 3 || card_Suit == 4) {
                card_Suit = "D";
            }

            var cardPNG = "http://deckofcardsapi.com/static/img/" + card_Value + card_Suit + ".png";
            img.setAttribute("src", cardPNG);
            // default size 226*314
            img.setAttribute("width", 113);
            img.setAttribute("height", 157);
            img.setAttribute("class", "cards");

            if (player == blackjack.players[blackjack.players.length - 1]) {
                if (k != 0 && blackjack.winner == "") {
                    // back cover pattern
                    cardPNG = "https://upload.wikimedia.org/wikipedia/commons/3/30/Card_back_05a.svg";
                    img.setAttribute("src", cardPNG);
                }
                document.getElementById("dealer").appendChild(img);
            } else {
                document.getElementById("player").appendChild(img);
            }
        }

        // add texts
        var txt = document.createElement("p");
        if (player.name == blackjack.players[blackjack.players.length - 1].name) {
            if (blackjack.winner != "") {
                // if game ended
                txt.innerHTML = "Dealer: " + player.sum;
                document.getElementById("dealer").appendChild(txt);
            }
        } else {
            if (blackjack.winner != "" || player.sum_Ace == 0 || player.sum_Ace > 21) {
                // if game ended
                txt.innerHTML = "Player: " + player.sum;
            } else {
                txt.innerHTML = "Player: " + player.sum_Ace + "/" + player.sum;
            }
            document.getElementById("player").appendChild(txt);
        }
    }

    // add winner
    var txt = document.createElement("p");
    if (blackjack.winner == "player0") {
        txt.innerHTML = "You WIN !!!!!";
    } else if (blackjack.winner == "dealer") {
        txt.innerHTML = "You LOSE !!!!";
    } else if (blackjack.winner == "DRAW") {
        txt.innerHTML = "DRAW sigh-_-!";
    }
    if (blackjack.winner != "") {
        document.getElementById("winner").appendChild(txt);
    }
    return txt.innerHTML;
}

// disable button when needed or not
function lockButtons(v) {
    if (v == 1) {
        document.getElementById("hit").disabled = true;
        document.getElementById("stand").disabled = true;
    }
    if (v == 0) {
        document.getElementById("hit").disabled = false;
        document.getElementById("stand").disabled = false;
    }
}
