#pragma strict

var speed : float = 5.0f;

function Update() {
	transform.Translate(Vector3(0, 1, 0) * Time.deltaTime * speed);
	
	if (transform.localPosition.z <= -30) {
		transform.localPosition.z += 60;
	}
}

function Hit () {
	transform.localPosition.z += 60;
}