#pragma strict

var hit : boolean = false;

function OnCollisionEnter(col : Collision) {
	hit = true;
}