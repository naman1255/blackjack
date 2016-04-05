// linked to models hit() and refresh cards view
function cHit() {
    hit();
    refreshCardsView(game);
}

// linked to models stand() and refresh cards view
function cStand() {
    stand();
    refreshCardsView(game);
}

// new round
function newRound() {
    lockButtons(0);
    console.clear();
    model_clean();
    view_clean();
    startGame();
    refreshCardsView(game);
}
