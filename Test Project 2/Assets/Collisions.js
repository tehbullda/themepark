#pragma strict

var hit : boolean = false;
var objectToFollow : GameObject;


function Update() {
    transform.position = objectToFollow.transform.position;    
}

function OnCollisionEnter(col : Collision) {
	hit = true;
}