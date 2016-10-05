/**
 * Created by Godai Yuusaku on 10/4/2016.
 */
// var myGame = (function ()
// {
function startGame() {
    document.getElementById('gameInit').style.display = 'none';
    document.getElementById('restart').style.display = 'block';


    var size = getSize();
    var bombsArray = [];
    var BOMB_RATE = 0.2;
    var numCorrect = 0;
    var flagged = 0;
    var numBombs = Math.round(size * size * BOMB_RATE);
    var gameOver = false;

    buildBoard();
    setBombs();
    var boxes = document.getElementsByClassName('baseSquare');
    document.getElementById('silly').innerHTML = 'There are ' + numBombs + ' bombs here.';

    function getSize() {
        var size = 0;
        var radios = document.getElementsByName('boardSize');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                size = radios[i].value;
                break;
            }
        }
        return Number(size);
    }

    function buildBoard() {
        for (var j = 0; j < size; j++) {
            var row = document.createElement('div');
            row.className = 'baseRow';
            for (var i = 0; i < size; i++) {
                var block = document.createElement('div');
                block.className = 'baseSquare';
                block.clicked = false;
                block.innerHTML = "";
                block.onclick = function () {
                    checkBombs(this);
                };
                block.oncontextmenu = function (event) {
                    event.preventDefault();
                    flagBox(this);
                }
                row.appendChild(block);
            }
            document.getElementById('gameBoard').appendChild(row);
        }
    }

    function setBombs() {
        while (bombsArray.length < numBombs) {
            var newBomb = Math.floor(Math.random() * size * size + 0);
            if (bombsArray.indexOf(newBomb) == -1) {
                bombsArray.push(newBomb);
            }
        }
    }

    function flagBox(obj) {
        if (!gameOver) {
            if (!obj.clicked) {
                obj.innerHTML = '';
                obj.style.backgroundColor = 'yellow';
                flagged++;
                document.getElementById('flags').innerHTML = 'You have flagged ' + flagged + ' spaces.';
                obj.clicked = true;
            }
            else {
                obj.style.backgroundColor = 'dimgray';
                obj.clicked = false;
                obj.innerHTML = '?';
                flagged--;
                document.getElementById('flags').innerHTML = 'You have flagged ' + flagged + ' spaces.';
            }
        }
    }

    function checkBombs(obj) {
        if (!obj.clicked) {
            var boxNo = 0;
            for (var i = 0; i < boxes.length; i++) {
                if (obj === document.getElementsByClassName('baseSquare')[i]) {
                    boxNo = i;
                    break;
                }
            }

            if (numCorrect === 0 && isBomb(boxNo)) {
                var n = bombsArray.indexOf(boxNo);
                bombsArray.splice(n, 1);
                while (bombsArray.length < numBombs) {
                    var newBomb = Math.floor(Math.random() * size * size + 0);
                    if (bombsArray.indexOf(newBomb) == -1 && newBomb != boxNo) {
                        bombsArray.push(newBomb);
                    }
                }
            }

            if (isBomb(boxNo)) {
                obj.style.backgroundColor = 'red';
                for (var i = 0; i < document.getElementsByClassName('baseSquare').length; i++) {
                    document.getElementsByClassName('baseSquare')[i].clicked = true;
                }
                document.getElementById('silly').innerHTML = 'Awww, you lost :(';
                revealField();
            }
            else {
                obj.style.backgroundColor = 'blue';
                var bombs = surroundingBombs(boxNo);
                if (bombs != 0) {
                    obj.innerHTML = bombs;
                }
                else {
                    obj.innerHTML = '';
                }
                numCorrect++;
                if (numCorrect === (size * size - numBombs)) {
                    for (var i = 0; i < document.getElementsByClassName('baseSquare').length; i++) {
                        document.getElementsByClassName('baseSquare')[i].clicked = true;
                    }
                    document.getElementById('silly').innerHTML = 'Yay! You won!';
                    revealField();
                }
            }
            obj.clicked = true;
        }

        function isBomb(box) {
            return (bombsArray.indexOf(box) != -1);
        }

        function revealField() {
            var field = document.getElementsByClassName('baseSquare');
            gameOver = true;
            for (var i = 0; i < size * size; i++) {
                field[i].clicked = true;
                if (isBomb(i)) {
                    field[i].style.backgroundColor = 'red';
                }
                else {
                    field[i].style.backgroundColor = 'blue';
                    var bombs = surroundingBombs(i);
                    if (bombs != 0) {
                        field[i].innerHTML = bombs;
                    }
                }
            }
        }

        function surroundingBombs(box) {
            var num = 0;
            var searchArea = [];

            // if not on the right side
            if ((box % size) != (size - 1)) {
                searchArea.push(box + 1);
            }
            // if not on the left side
            if ((box % size) != 0) {
                searchArea.push(box - 1);
            }
            // if not on the bottom
            if (box >= size) {
                searchArea.push(box - size);
                if ((box % size) != (size - 1)) {
                    searchArea.push(box - size + 1);
                }
                if ((box % size) != 0) {
                    searchArea.push(box - size - 1);
                }
            }
            // if not on the top
            if ((box + size) < (size * size)) {
                searchArea.push(box + size);
                if ((box % size) != 0) {
                    searchArea.push(box + size - 1);
                }
                if ((box % size) != (size - 1)) {
                    searchArea.push(box + size + 1);
                }
            }

            for (var i = 0; i < searchArea.length; i++) {
                if (isBomb(searchArea[i])) {
                    num++;
                }
            }
            return num;
        }
    }
}

function restartGame() {
    document.getElementById('gameInit').style.display = 'block';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('gameBoard').innerHTML = '';
    document.getElementById('silly').innerHTML = '';
    document.getElementById('flags').innerHTML = '';
}
// })()
// function begin ()
// {
//     myGame.startGame();
// }
// function end() {
//     myGame.restartGame();
// }