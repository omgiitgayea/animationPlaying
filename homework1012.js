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

var numbers = '1, 2, 3, 4, 5, 6, cookie monster';
var arrayNumbers = numbers.split(", ");
console.log(arrayNumbers.length);
if (arrayNumbers.length != 5)
{
    console.log('Hey, I wanted 5 so give me 5!');
}
for (var i = 0; i < arrayNumbers.length; i++)
{
    if (!Number(arrayNumbers[i]))
    {
        console.log(arrayNumbers[i] + ' is not a number! Try again!');
        break;
    }
}
console.log(arrayNumbers[4]);
console.log(Number(arrayNumbers[4]));

