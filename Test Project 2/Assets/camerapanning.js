#pragma strict
private var dir : float = 0.002f;
function Start () {
	dir = 0.002f;
}

function Update () {
	if (fadetext.gameStage == 0) {
		if (transform.rotation.y < -0.7 || transform.rotation.y > 0.7) {
			dir *= -1;
		}
		transform.rotation = Quaternion(transform.rotation.x, transform.rotation.y + dir, transform.rotation.z, transform.rotation.w);
	}
	else {
		transform.rotation = Quaternion(transform.rotation.x, 0, transform.rotation.z, transform.rotation.w);
		transform.position = Vector3(transform.position.x,transform.position.y,-20);
	}
}