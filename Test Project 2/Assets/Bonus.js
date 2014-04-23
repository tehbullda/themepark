#pragma strict

var speed : float = 5.0f;

function Update() {
	transform.Translate(Vector3(0, 0, -1) * Time.deltaTime * speed);
}

function Hit () {
	Destroy (gameObject);
}