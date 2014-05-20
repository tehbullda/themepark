#pragma strict

var target_speed : float = 6.25f;
var is_dead : boolean = false;
var player_missed : boolean = false;

function Update() {
    if (!Melee.player_lost) {
        transform.Translate(Vector3(0, 0, -1) * (Melee.player_speed + target_speed) * Time.deltaTime);
    }

	if (transform.localPosition.z <= -18 && !is_dead && !player_missed) {
		Melee.player_missed = true;
		player_missed = true;
	}
	
	if (transform.localPosition.z <= -100) {
		Destroy (gameObject);
		SpawnTarget.CurrentTargetCount--;
	}
}

function OnCollisionEnter(collision : Collision) {
	if (collision.gameObject.name == "Collision") {
		if (SpawnTarget.target_strength <= Melee.player_speed) {
			if (SpawnTarget.target_strength + 25 <= Melee.player_speed) {
				transform.GetChild(0).animation.Play("Explode");
			}
			else {
				transform.GetChild(0).animation.Play("Fall");
			}
			//animation.Play("Fall");
			is_dead = true;
			ScoreJS.score += 5;
			SpawnTarget.CurrentTargetCount--;
		}
	}
}