function sum(array) {
    var o = 0;
    for (var i = 0; i < array.length; i++) {
        o += array[i];
    }
    return o;
}

function setScore(id, array) {
    const sc = document.getElementById(id);
    const ul = sc.getElementsByClassName("running")[0].children[0];

    sc.getElementsByClassName("total")[0].innerHTML = sum(array);

    ul.innerHTML = "";
    for (var i = 0; i < Math.min(array.length, 6); i++) {
        var item = document.createElement("li");

        item.innerHTML = array[array.length - i - 1];

        ul.appendChild(item);
    }
}

function updateScores(dict = scores) {
    for (let [key, value] of Object.entries(dict)) {
        setScore(key, value);
    }
}

function pushScoreActive(dict, key, id = "input") {
    const value = parseInt(document.getElementById(id).value);

    if (value > 0) {
        dict[key].push(value);
        updateScores(dict);
    }

    document.getElementById(id).value = null;
}

function addScore(dict = scores) {
    const key = getActivePlayerKey(dict);
    pushScoreActive(dict, key);
    checkForWinner();
}

function popScoreActive(dict, key) {
    dict[key].pop();
    updateScores(dict);
}

function undoScore(dict = scores) {
    const key = getActivePlayerKey(dict);
    popScoreActive(dict, key);
    checkForWinner();
}

function getActivePlayerKey(dict = scores) {
    return Object.entries(dict)[active][0];
}
function getOtherPlayerKey(dict = scores) {
    var n = active;
    n += 1;
    n %= 2;
    return Object.entries(dict)[n][0];
}

function switchPlayer(dict = scores) {
    // Remove active class from active player
    var key = getActivePlayerKey(dict);
    document
        .getElementById(key)
        .getElementsByClassName("total")[0]
        .classList.remove("active");

    active += 1;
    active %= 2;

    key = getActivePlayerKey(dict);

    document
        .getElementById(key)
        .getElementsByClassName("total")[0]
        .classList.add("active");
}

function switchToPlayer(id, dict = scores) {
    var key = getActivePlayerKey(dict);
    if (key !== id) {
        switchPlayer(dict);
    }
}

function checkForWinner(dict = scores) {
    var max = ["", 0];

    for (let [key, value] of Object.entries(dict)) {
        if (sum(value) > max[1]) {
            max = [key, sum(value)];
        }
    }

    if (max[1] > 120) {
        winner = 1;
    } else {
        winner = 0;
    }

    if (winner == 1) {
        if (max[0] == "player1") {
            active = 0;
        } else {
            active = 1;
        }

        document
            .getElementById(getActivePlayerKey(dict))
            .getElementsByClassName("total")[0]
            .classList.add("winner");
        document
            .getElementById(getOtherPlayerKey(dict))
            .getElementsByClassName("total")[0]
            .classList.remove("winner");

        document.getElementById("btn-undo").innerHTML = null;
        document.getElementById("btn-switch").innerHTML = null;
        document.getElementById("btn-add").innerHTML = "New game?";
    } else {
        document
            .getElementById(getActivePlayerKey(dict))
            .getElementsByClassName("total")[0]
            .classList.remove("winner");
        document
            .getElementById(getOtherPlayerKey(dict))
            .getElementsByClassName("total")[0]
            .classList.remove("winner");

        document.getElementById("btn-undo").innerHTML = "Undo";
        document.getElementById("btn-switch").innerHTML = "Switch";
        document.getElementById("btn-add").innerHTML = "Add";
    }
}

function startNewGame(dict = scores) {
    dict["player1"] = [];
    dict["player2"] = [];

    active = 0;
    winner = 0;

    document.getElementById("btn-undo").innerHTML = "Undo";
    document.getElementById("btn-switch").innerHTML = "Switch";
    document.getElementById("btn-add").innerHTML = "Add";

    updateScores(dict);
    checkForWinner(dict);
}

var scores = {
    player1: [],
    player2: [],
};
var active = 0;
var winner = 0;

document.getElementById("input").value = null;
document.getElementById("input").focus();

updateScores();

function handleKeyDown(evt) {
    switch (evt.key) {
        case "Enter":
            if (winner == 0) {
                addScore();
            } else {
                startNewGame();
            }
            break;

        case "ArrowUp":
            if (winner == 0) {
                addScore();
            } else {
                startNewGame();
            }
            break;

        case "SoftRight":
            switchPlayer();
            break;
        case "ArrowLeft":
            switchToPlayer("player1");
            break;
        case "ArrowRight":
            switchToPlayer("player2");
            break;

        case "SoftLeft":
            undoScore();
            break;
        case "ArrowDown":
            undoScore();
            break;

        default:
            if (winner == 0) {
                if (document.getElementById("input").value == "0") {
                    document.getElementById("input").value = null;
                }
            }

            break;
    }
}

document.addEventListener("keydown", handleKeyDown);
