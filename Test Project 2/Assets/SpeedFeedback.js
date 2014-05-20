#pragma strict

function Start () {

}

public var dir:float = -0.001;

function Update () {
	guiTexture.color.a += dir;
	if (guiTexture.color.a <= 0.5f) {
		dir = 0.001;
	}
	else if (guiTexture.color.a >= 1.0f) {
		dir = -0.001;
	}
	if (SpawnTarget.target_strength <= Melee.player_speed) {
		Destroy (gameObject);
	}
}