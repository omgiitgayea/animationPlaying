/**
 * Created by GodaiYuusaku on 10/10/16.
 */

/**
 * Create a Javascript program that continuously asks a user for 5 numbers (look at prompt in Javascript) that are comma separated
 * The program should show the same numbers but sorted. If user inputs 'done', then stop program
 * - Cannot use array.sort()
 * - Must use an array, a loop, a conditional
 *
 * Optional
 * - check if there are actually 5 numbers
 * - check if they are actually numbers
 *
 * Things to consider:
 * - convert string to an array of numbers (since I'm checking that they elements are all numbers)
 **/

var done = false;

while (!done) {
    var valid = false;
    while (!valid) {
        var numbers = prompt("Please enter 5 numbers separated by commas (eg '2, 5, 51, 56, 3). Type 'done' when done.", "done");
        if (numbers === "done") {
            done = true;
            valid = true;
        }
        else {
            var arrayNumbers = numbers.split(",");
            if (arrayNumbers.length != 5) {
                alert("Hey, I wanted 5 so give me 5!");
            }
            else {
                valid = true;
            }
            if (valid) {
                for (var i = 0; i < arrayNumbers.length; i++) {
                    if (!Number(arrayNumbers[i])) {
                        alert(arrayNumbers[i] + " is not a number! Try again!");
                        valid = false;
                        break;
                    }
                    else {
                        arrayNumbers[i] = Number(arrayNumbers[i]);
                    }
                }
            }

            if(valid) {
                combSort(arrayNumbers);
                var sortedNumbers = "";
                for (var i = 0; i < (arrayNumbers.length - 1); i++)
                {
                    sortedNumbers += arrayNumbers[i] + ", "
                }
                sortedNumbers += arrayNumbers[arrayNumbers.length - 1];
                alert(numbers + " sorted numerically is " + sortedNumbers);
            }
        }
    }
}

function combSort(myArray) {
    var gap = myArray.length;
    var shrink = 1.3;
    var sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            sorted = true;
        }
        for (var i = 0; (i + gap) < myArray.length; i++) {
            if (myArray[i] > myArray[i + gap]) {
                var temp = myArray[i + gap];
                myArray[i + gap] = myArray[i];
                myArray[i] = temp;
            }
        }
    }
    return myArray;
}

document.getElementById("irrelevantText").innerHTML = "And now we're done!";