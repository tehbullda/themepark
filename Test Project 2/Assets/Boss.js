#pragma strict

var target_speed : float = 6.25f;
var is_dead : boolean = false;

function Update() {
	transform.Translate(Vector3(0, 1, 0) * (Melee.player_speed + target_speed) * Time.deltaTime);
	
	if (transform.localPosition.z <= -18 && !is_dead) {
		Melee.player_lost = true;
	}
	
	if (transform.localPosition.z <= -100) {
		Destroy (gameObject);
	}
}

function OnCollisionEnter(collision : Collision) {
	if (collision.transform.name == "Collision") {
		if (SpawnTarget.target_strength <= Melee.player_speed) {
			animation.Play("Explode");
			is_dead = true;
			Melee.score += 5;
		}
	}
}