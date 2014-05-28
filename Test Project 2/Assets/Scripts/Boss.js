#pragma strict

var target_speed : float = 6.25f;
var is_dead : boolean = false;
var player_missed : boolean = false;

var cheer_sounds : AudioClip[];
var boo_sounds : AudioClip[];
private var source : AudioSource;

function Start() {
	source = gameObject.GetComponent(typeof(AudioSource));
	source.clip = boo_sounds[Random.Range(0, boo_sounds.length)];
	is_dead = false;
	player_missed = false;
}

function Update() {
    if (!Melee.player_lost) {
        transform.Translate(Vector3(0, 0, -1) * (Melee.player_speed + target_speed) * Time.deltaTime);
    }

	if (transform.localPosition.z <= -18 && !is_dead && !player_missed) {
		Melee.player_missed = true;
		player_missed = true;
		source.clip = boo_sounds[Random.Range(0, boo_sounds.length)];
		source.Play();
	}
	
	if (transform.localPosition.z <= -100 && !audio.isPlaying) {
		source.clip = boo_sounds[Random.Range(0, boo_sounds.length)];
		source.Play();
		Destroy (gameObject);
		SpawnTarget.CurrentTargetCount--;
	}
}

function OnCollisionEnter(collision : Collision) {
	if (collision.gameObject.name == "Collision") {
		if (SpawnTarget.target_strength <= Melee.player_speed) {
		source.clip = cheer_sounds[Random.Range(0, cheer_sounds.length)];
		source.Play();
			if (SpawnTarget.target_strength + 25 <= Melee.player_speed) {
				transform.GetChild(0).animation.Play("Explode");
			}
			else {
				transform.GetChild(0).animation.Play("Fall");
			}
			//animation.Play("Fall");
			is_dead = true;
			ScoreJS.score += Mathf.Floor(Melee.player_speed);
		}
	}
}