#pragma strict

public var bonus_object : GameObject;
private var bonus_spawn_time : float = 0.0f;
public var minimum_bonus_spawn_time = 1.0f;
public var maximum_bonus_spawn_time = 1.0f;
static var bonus_count : int = 0;
public var AllowedBonusCount : int = 10;

function Start() { 
}

function Update () {
	bonus_spawn_time += Time.deltaTime;
	
	if (bonus_spawn_time > minimum_bonus_spawn_time && bonus_count < AllowedBonusCount) {
		bonus_spawn_time -= minimum_bonus_spawn_time;
		var newBonus : GameObject = Instantiate(bonus_object, Vector3(Random.Range(-3.0f, 3.0f), Random.Range(-3.5f, 0.5f), 100), transform.rotation);
		bonus_count++;
	}
}