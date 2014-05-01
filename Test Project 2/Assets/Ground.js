#pragma strict

function Update() {
	transform.Translate(Vector3(0, 0, -1) * Time.deltaTime * Melee.player_speed, Space.World);
	
	if (transform.localPosition.z <= -60) {
		transform.localPosition.z += 240;
	}
}