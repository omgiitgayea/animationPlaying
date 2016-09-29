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