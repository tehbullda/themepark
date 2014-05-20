#pragma strict

static var target_strength = 1.0f;
public var display_strength : float = 0.0f;

public var target_dummy : GameObject;
public var target_knight : GameObject;
public var target_windmill : GameObject;
public var target_black_knight : GameObject;
public var target_tengil : GameObject;
public var target_headless_horseman : GameObject;
public var target_threeheaded_knight : GameObject;
public var target_dragon : GameObject;
private var target_spawn_time : float = 0.0f;
public var minimum_target_spawn_time = 5.0f;
public var maximum_target_spawn_time = 8.0f;
public var current_target:int = 0;

public var MaximumAllowedTargets : int = 3;
static var CurrentTargetCount : int = 0;

function Start () {
	CurrentTargetCount = 0;
	target_spawn_time = Random.Range(minimum_target_spawn_time, maximum_target_spawn_time);
	target_strength = 1.0f;
}

function Update () {
	target_spawn_time -= Time.deltaTime;
	target_strength += Time.deltaTime * 3;
	display_strength = target_strength;
	
	if (target_spawn_time <= 0 && CurrentTargetCount < MaximumAllowedTargets) {
		var new_target : GameObject;
		if (current_target == 0) {
			new_target = Instantiate(target_dummy, Vector3(0, 0.35f, 240.0f), transform.rotation);
			current_target++;
		}
		else if (current_target == 1) {
			new_target = Instantiate(target_knight, Vector3(-0.0f, 0.35f, 240.0f), transform.rotation);
			current_target++;
		}
		else if (current_target == 2) {
			new_target = Instantiate(target_windmill, Vector3(-0.0f, 0.35f, 240.0f), transform.rotation);
			current_target++;
		}
		else if (current_target == 3) {
			new_target = Instantiate(target_black_knight, Vector3(-4.5f, 0.35f, 240.0f), transform.rotation);
			current_target++;
		}
		else if (current_target == 4) {
			new_target = Instantiate(target_tengil, Vector3(-4.5f, 0.35f, 240.0f), transform.rotation);
			current_target++;
		}
		else if (current_target == 5) {
			new_target = Instantiate(target_headless_horseman, Vector3(-4.5f, 0.35f, 240.0f), transform.rotation);
			current_target++;
		}
		else if (current_target == 6) {
			new_target = Instantiate(target_threeheaded_knight, Vector3(-4.5f, 0.35f, 240.0f), transform.rotation);
			current_target++;
		}
		else if (current_target == 7) {
			new_target = Instantiate(target_dragon, Vector3(-4.5f, 0.35f, 240.0f), transform.rotation);
			current_target++;
		}
		target_spawn_time = Random.Range(minimum_target_spawn_time, maximum_target_spawn_time);
		CurrentTargetCount++;
	}
}