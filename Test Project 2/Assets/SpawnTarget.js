#pragma strict

static var target_strength = 1.0f;
public var display_strength : float = 0.0f;

public var target_object : GameObject;
private var target_spawn_time : float = 0.0f;
public var minimum_target_spawn_time = 5.0f;
public var maximum_target_spawn_time = 5.0f;

public var MaximumAllowedTargets : int = 3;
static var CurrentTargetCount : int = 0;

function Update () {
	target_spawn_time += Time.deltaTime;
	target_strength += Time.deltaTime;
	display_strength = target_strength;
	
	if (target_spawn_time > minimum_target_spawn_time && CurrentTargetCount < MaximumAllowedTargets) {
		target_spawn_time -= minimum_target_spawn_time;
		var new_target : GameObject = Instantiate(target_object, Vector3(-4.5f, 0.35f, 240.0f), transform.rotation);
		CurrentTargetCount++;
	}
}