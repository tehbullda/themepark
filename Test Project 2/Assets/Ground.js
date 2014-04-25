#pragma strict

var speed : float = 5.0f;

function Update() {
	transform.Translate(Vector3(0, 0, -1) * Time.deltaTime * speed);
	
	if (transform.localPosition.z <= -60) {
		transform.localPosition.z += 120;
	}
}