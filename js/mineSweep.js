/**
 * Created by Godai Yuusaku on 10/4/2016.
 */
var Minesweep = function ()
{
    this.startGame = function (){
        document.getElementById('gameInit').style.display = 'none';
        document.getElementById('restart').style.display = 'block';
        document.getElementById('statusBar').style.display = 'block';

        var BOMB_RATE = 0.1;
        var BOX_SIZE = 30; //in pixels
        var BOX_BORDER = 1; //in pixels

        var size = getSize();
        var bombsArray = [];
        var numCorrect = 0;
        var flagged = 0;
        var numBombs = Math.round(size * size * BOMB_RATE);
        var gameOver = false;

        buildBoard();
        setBombs();
        var boxes = document.getElementsByClassName('baseSquare');
        document.getElementById('bombValue').innerHTML = numBombs;
        document.getElementById('squaresValue').innerHTML = size * size;

        function getSize() {
            var radios = document.getElementsByName('boardSize');
            var i = 0;

            while (!radios[i].checked)
            {
                i++;
            }

            var userSize = radios[i].value;
            return Number(userSize);
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
                    block.style.width = BOX_SIZE + 'px';
                    block.style.height = BOX_SIZE + 'px';
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
            document.getElementById('gameBoard').style.display = 'block';
            document.getElementById('gameBoard').style.width = size * (BOX_SIZE + 2 * BOX_BORDER) + 'px';
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
                    obj.clicked = true;
                }
                else {
                    obj.style.backgroundColor = 'dimgray';
                    obj.clicked = false;
                    obj.innerHTML = '?';
                    flagged--;
                }
                document.getElementById('bombValue').innerHTML = numBombs - flagged;
                document.getElementById('squaresValue').innerHTML = size * size - numCorrect - flagged;
            }
        }

        function checkBombs(obj) {
            if (!obj.clicked) {
                //identify which box was clicked
                var boxNo = 0;
                for (var i = 0; i < boxes.length; i++) {
                    if (obj === document.getElementsByClassName('baseSquare')[i]) {
                        boxNo = i;
                        break;
                    }
                }

                // if the first box clicked is a bomb, move that bomb to another square
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

                // behavior for if a box is a bomb or not
                if (isBomb(boxNo)) {
                    revealField('lost');
                }
                else {
                    surroundingBombs(boxNo);
                    document.getElementById('squaresValue').innerHTML = size * size - numCorrect - flagged;
                    // puzzle solved
                    if (numCorrect === (size * size - numBombs)) {
                        revealField('won');
                    }
                }
            }

            function isBomb(box) {
                return (bombsArray.indexOf(box) != -1);
            }

            function revealField(gameCondition) {
                //display game over text
                if (gameCondition === 'won')
                {
                    document.getElementById('silly').innerHTML = 'Yay! You won!';
                }
                else {
                    document.getElementById('silly').innerHTML = 'Awww, you lost :(';
                }

                // reveal the field
                var field = document.getElementsByClassName('baseSquare');
                gameOver = true;
                for (var i = 0; i < size * size; i++) {
                    if (!field[i].clicked) {
                        if (isBomb(i)) {
                            field[i].style.backgroundColor = 'red';
                            field[i].innerHTML = '';
                        }
                        else {
                            field[i].style.backgroundColor = 'blue';
                            checkArea(i);
                        }
                        field[i].clicked = true;
                    }
                }
            }

            //find number of bombs surrounding clicked box
            function surroundingBombs(box) {
                if (box >=0 && box < (size * size)) {           // check if box is actually part of the grid
                    var thisBox = document.getElementsByClassName('baseSquare')[box];
                    if (!thisBox.clicked) {         // skip all squares that have already been searched
                        var nearBombs = checkArea(box);
                        thisBox.style.backgroundColor = 'blue';
                        thisBox.clicked = true;
                        numCorrect++;
                        if (nearBombs === 0) {
                            surroundingBombs(box - size);
                            surroundingBombs(box + size);
                            if ((box % size) >= 0 && (box % size) < (size - 1))         // check if the box is not on the right side
                            {
                                surroundingBombs(box + 1);
                                surroundingBombs(box - size + 1);
                                surroundingBombs(box + size + 1);
                            }
                            if ((box % size) > 0 && (box % size) <= (size - 1))         /// check if the box is not on the left side
                            {
                                surroundingBombs(box - 1);
                                surroundingBombs(box - size - 1);
                                surroundingBombs(box + size - 1);
                            }
                        }
                    }
                }
            }

            function checkArea(box)
            {
                var num = 0;
                num += checkSides(box);
                if (box >= size)
                {
                    num += checkAbove(box);
                }
                if ((box + size) < (size * size))
                {
                    num += checkBelow(box);
                }

                var thisBox = document.getElementsByClassName('baseSquare')[box];
                if (num != 0) {
                    thisBox.innerHTML = num;
                }
                else {
                    thisBox.innerHTML = '';
                }
                return num;
            }

            function checkAbove(box)
            {
                var num = 0;
                if (isBomb(box - size))
                {
                    num++;
                }
                num += checkSides(box - size);
                return num;
            }

            function checkBelow(box)
            {
                var num = 0;
                if (isBomb(box + size))
                {
                    num++;
                }
                num+= checkSides(box + size);
                return num;
            }

            function checkSides(box)
            {
                var num = 0;
                if (box % size != 0)
                {
                    if (isBomb(box - 1))
                    {
                        num++;
                    }
                }
                if ((box % size) != (size -1))
                {
                    if (isBomb(box + 1))
                    {
                        num++;
                    }
                }
                return num;
            }
        }
    }

    this.restartGame = function() {
        document.getElementById('gameInit').style.display = 'block';
        document.getElementById('restart').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'none';
        document.getElementById('gameBoard').innerHTML = '';
        document.getElementById('statusBar').style.display = 'none';
    }
};

var myGame = new Minesweep();
