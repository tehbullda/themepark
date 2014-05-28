#pragma strict

static var target_strength = 0.0f;
public var display_strength : float = 0.0f;

public var target_dummy : GameObject;
public var target_windmill : GameObject;
public var target_knight : GameObject;
public var target_knight_two : GameObject;
public var target_black_knight : GameObject;
public var target_tengil : GameObject;
public var target_headless_horseman : GameObject;
public var target_threeheaded_knight : GameObject;
public var target_dragon : GameObject;
private var target_spawn_time : float = 0.0f;
public var minimum_target_spawn_time = 0.0f;
public var maximum_target_spawn_time = 1.0f;
public var current_target:int = 0;

public var MaximumAllowedTargets : int = 1;
static var CurrentTargetCount : int = 0;

function Start () {
	CurrentTargetCount = 0;
	target_spawn_time = Random.Range(minimum_target_spawn_time, maximum_target_spawn_time);
	target_strength = 1.0f;
}

function Update () {
    if (CurrentTargetCount <= 0) {
	    target_spawn_time -= Time.deltaTime;
    }
	//target_strength += Time.deltaTime * 3;
	display_strength = target_strength;
	
	if (target_spawn_time <= 0 && CurrentTargetCount < MaximumAllowedTargets) {
		var new_target : GameObject;
		if (current_target <= 2) {
			new_target = Instantiate(target_dummy, Vector3(-3.5f, 0.35f, 240.0f), transform.rotation);
			current_target++;
			target_strength += 3;
		}
		else if (current_target == 3) {
			new_target = Instantiate(target_windmill, Vector3(3.3f, 0.35f, 240.0f), transform.rotation);
			current_target++;
			target_strength += 10;
		}
		else if (current_target == 4) {
			new_target = Instantiate(target_knight, Vector3(-2.8f, 0.35f, 240.0f), transform.rotation);
			current_target++;
			target_strength += 10;
		}
		else if (current_target == 5) {
			new_target = Instantiate(target_knight_two, Vector3(-2.8f, 0.35f, 240.0f), transform.rotation);
			current_target++;
			target_strength += 10;
		}
		else if (current_target == 6) {
			new_target = Instantiate(target_black_knight, Vector3(1.0f, 0.35f, 240.0f), transform.rotation);
			current_target++;
			target_strength += 10;
		}
		else if (current_target == 7) {
			new_target = Instantiate(target_tengil, Vector3(-3.5f, 0.35f, 240.0f), transform.rotation);
			current_target++;
			target_strength += 10;
		}
		else if (current_target == 8) {
			new_target = Instantiate(target_headless_horseman, Vector3(-5.0f, 0.35f, 240.0f), transform.rotation);
			current_target++;
			target_strength += 10;
		}
		else if (current_target == 9) {
			new_target = Instantiate(target_threeheaded_knight, Vector3(1.8f, 0.35f, 240.0f), transform.rotation);
			current_target++;
			target_strength += 10;
		}
		else if (current_target == 10) {
			new_target = Instantiate(target_dragon, Vector3(-1.1f, 0.35f, 240.0f), transform.rotation);
			current_target = 3;
			target_strength += 10;
		}
		target_spawn_time = Random.Range(minimum_target_spawn_time, maximum_target_spawn_time);
		CurrentTargetCount++;
	}
}