#pragma strict
var percentage : float;
function Start () {

}

function Update () {
    // starts at 0.05, ends at 1 scale
    //-3.2 X start
    //0 X end
    percentage = SpawnTarget.target_strength / Speedometer.indicator_max_speed;
    var nextpos : float = 3.2f * percentage;
    nextpos -= 3.2f;
    var nextscale : float = percentage;
    if (nextscale < 0.05) {
        nextscale = 0.05;
    }
    transform.localScale = Vector3(nextscale,transform.localScale.y,transform.localScale.z);
    transform.localPosition = Vector3(nextpos, transform.localPosition.y, transform.localPosition.z);
}