#pragma strict

var distance : float;
var maxDistance : float = 0.15f;

var PositionX : float;
var PositionY : float;
var PositionZ : float;

function Update() {
	PositionX = transform.position.x;
	PositionY = transform.position.y;
	PositionZ = transform.position.z;
	
	var hit : RaycastHit;
	
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), hit)) {
		distance = hit.distance;
		if (distance < maxDistance) {
			hit.transform.SendMessage("Hit", SendMessageOptions.DontRequireReceiver);
		}
	}
}