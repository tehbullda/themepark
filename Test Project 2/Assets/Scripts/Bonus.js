#pragma strict

var bonus_speed : float = 5.0f;
public var bonus_score : int = 1;
public var myClip : AudioClip[];

function Update() {
    if (!Melee.player_lost) {
        transform.Translate(Vector3(0, 0, -1) * (Melee.player_speed + bonus_speed) * Time.deltaTime);
    }
	if (transform.localPosition.z <= -30) {
		Destroy (gameObject);
		SpawnBonuses.bonus_count--;
	}
}

function OnCollisionEnter(collision : Collision) {
	if (collision.gameObject.name == "Collision") {
		animation.Play("Explode");
		audio.clip = myClip[0];
	    audio.Play();
		ScoreJS.score += bonus_score;
		SpawnBonuses.bonus_count--;
	
	}
     
}