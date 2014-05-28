#pragma strict

public var apple_bonus : GameObject;
public var pumpkin_bonus : GameObject;
public var watermelon_bonus : GameObject;
static var bonus_spawn_time : float = 0.0f;
public var minimum_bonus_spawn_time = 2000.0f;
public var maximum_bonus_spawn_time = 2200.0f;
static var bonus_count : int = 0;
public var AllowedBonusCount : int = 10;

function Start() { 
	bonus_count = 0;
	bonus_spawn_time = 0f;
}

function Update () {
	bonus_spawn_time += Time.deltaTime + Melee.player_speed;
	
	if (bonus_spawn_time > minimum_bonus_spawn_time && bonus_count < AllowedBonusCount) {
		bonus_spawn_time -= Random.Range(minimum_bonus_spawn_time, maximum_bonus_spawn_time);
		
		var tmp : int = Random.Range(0, 3);
		var newBonus : GameObject;
		if (tmp == 0) {
			newBonus = Instantiate(apple_bonus, Vector3(Random.Range(-3.0f, 3.0f), Random.Range(4f, 5f), 100), transform.rotation);
		}
		else if (tmp == 1) {
			newBonus = Instantiate(pumpkin_bonus, Vector3(Random.Range(-3.0f, 3.0f), Random.Range(4f, 5f), 100), transform.rotation);
		}
		else {
			newBonus = Instantiate(watermelon_bonus, Vector3(Random.Range(-3.0f, 3.0f), Random.Range(4f, 5f), 100), transform.rotation);
		}
		bonus_count++;
	}
}