/**
 * Created by GodaiYuusaku on 10/18/16.
 */
/** Create an async function that reverses each string in an array
    - cannot use string.reverse()
    - must return a promise
    - must set a timeout to simulate async behavior
    - must render the resulting array after it has been modified

    go to https://github.com/MountainlandWEB/TeachingMaterials to find in class promise code */
var desiredGoal = "Make a ham sandwich for me";
var startingArray = desiredGoal.split(" ");
var endingArray = [];
var spell = document.getElementById("zatannaSpell");
var disclaimer = document.getElementById("disclaimer");

function asyncZatannaSpell(stringArray)
{
    promise = new Promise(execute);
    return promise;

    function execute(resolve, reject) {
        setTimeout(function ()
        {
            if (stringArray.length <= 0)
            {
                reject("How can she say a spell with no words!?")
            }
            zatanna(stringArray);
            resolve();
        }, 3000);
    }
}

var zatannaPromise = asyncZatannaSpell(startingArray);
zatannaPromise.then(success, failure);

function success ()
{
    spell.innerHTML = printWords(endingArray) + " *";
    spell.style.display = "inline-block";
    TweenMax.from(spell, 2, {opacity: 0, ease:Circ.easeInOut, y: 0});
    setTimeout(function () {
        disclaimer.innerHTML = "* Note: Zatana says &quot;" + printWords(startingArray) + "&quot; instead of &quot;Make me a ham sandwich&quot; because magic is very literal...";
        TweenMax.from(disclaimer, 1, {opacity: 0, ease:Power2.easeInOut, y: 0});
    }, 3000);
}
function failure ()
{
    document.getElementById("zatannaSpell").innerHTML = "How can she say a spell with no words!?";
}

function zatanna(stringArray) {
    for (var j = 0; j < stringArray.length; j++) {
        var backwards = "";
        for (var i = (stringArray[j].length - 1); i >= 0; i--) {
            if (j === 0 && i === (stringArray[j].length - 1))
            {
                backwards += stringArray[j][i].toUpperCase();
            }
            else {
                backwards += stringArray[j][i].toLowerCase();
            }
        }
        endingArray.push(backwards);
    }
}

function printWords(wordsArray)
{
    var printString = "";
    for (var i = 0; i < (wordsArray.length - 1); i++)
    {
        printString += wordsArray[i] + " ";
    }
    printString += wordsArray[wordsArray.length - 1] + "!";
    return printString;
}