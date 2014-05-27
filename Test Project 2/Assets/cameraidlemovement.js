#pragma strict


var speed : float = 1f;
var timeInEachDir : float = 2.5f;

private var direction : float = 0.1f;
private var currentTime : float = 0.0f;
function Start () {

}

function FixedUpdate () {
	currentTime += Time.deltaTime;
	if (currentTime > timeInEachDir) {
		direction *= -1f;
		currentTime = 0.0f;
	}
    transform.Translate(Vector3(direction * speed,0,0));
}