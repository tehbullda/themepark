#pragma strict

var bonus_speed : float = 5.0f;

function Update() {
	transform.Translate(Vector3(0, 0, -1) * (Melee.player_speed + bonus_speed) * Time.deltaTime);
	
	if (transform.localPosition.z <= -30) {
		Destroy (gameObject);
	}
}

function OnCollisionEnter(collision : Collision) {
	if (collision.transform.name == "Collision") {
		animation.Play("Explode");
		Melee.score++;
	}
}