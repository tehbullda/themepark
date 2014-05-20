#pragma strict

public var time_remaining:float = 1.2f;

function Start () {

}

function Update () {
	time_remaining -= 0.01f;
	guiTexture.color.a = time_remaining;
	if (time_remaining <= 1) {
		guiTexture.transform.position.y += 0.002f;
	}
	if (time_remaining <= 0) {
		Destroy (gameObject);
	}
}