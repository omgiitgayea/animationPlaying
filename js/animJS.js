/**
 * Created by GodaiYuusaku on 9/29/16.
 */
$(document).ready(function()
{
    startTween();
});

function startTween() {
    TweenMax.to($("#aCircle"), 2, {x: 50});
}

var array1 = [[1,1],[2,2],[3,3]];
var array2 = [[1,0],[0,1]];
// var array3 = [[],[]];
function dotProduct(matrixA, matrixB)
{
    var matrixC = [ ];
    if (matrixB.length === matrixA[0].length)
    {
        console.log("Approved!")
        for(var i = 0; i < matrixA.length; i++)
        {
            matrixC[i] = [ ];
            for(var j = 0; j < matrixB[0].length; j++)
            {
                var pushVal = 0;
                for(var k = 0; k < matrixA[0].length; k++)
                {
                    pushVal += matrixA[i][k] * matrixB[k][j];
                }
                matrixC[i][j] = pushVal;
            }
        }
    }
    else
    {
        console.log("Denied!");
    }
    return matrixC;
}

var array3 = dotProduct(array1, array2);
console.log(array3);