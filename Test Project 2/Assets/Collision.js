#pragma strict

var hit : boolean = false;

function OnCollisionEnter(collision : Collision) {
	hit = true;
}