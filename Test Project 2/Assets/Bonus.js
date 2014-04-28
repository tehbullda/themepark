#pragma strict

var speed : float = 5.0f;

function Update() {
	transform.Translate(Vector3(0, 0, -1) * Time.deltaTime * speed);
	
	if (transform.localPosition.z <= -30) {
		Destroy (gameObject);
	}
}

function Hit () {
	animation.Play("Explode");
}