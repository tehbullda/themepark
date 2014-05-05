#pragma strict

var textureArray : Texture2D[]; 
var current : int = 0;
function Start() {
	renderer.material.mainTexture = textureArray[current];
}

function Update () {
	if (current != Melee.current_misses) {
		renderer.material.mainTexture = textureArray[Melee.current_misses];
		current = Melee.current_misses;	
	}
}