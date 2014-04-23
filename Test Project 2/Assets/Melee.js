#pragma strict

var distance : float;
var maxDistance : float = 0.15f;

function Update() {
	var hit : RaycastHit;
	
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), hit)) {
		distance = hit.distance;
		if (distance < maxDistance) {
			hit.transform.SendMessage("Hit", SendMessageOptions.DontRequireReceiver);
		}
	}
}