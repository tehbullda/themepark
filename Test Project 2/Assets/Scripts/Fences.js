#pragma strict

public var fence_object : GameObject;

function Start () {
	for (var i = 0; i < 32; i++) {
		var new_fence : GameObject = Instantiate(fence_object, transform.position + Vector3(0, 0, 7.5f * i), transform.rotation);
	}
}