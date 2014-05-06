#pragma strict

var textureArray : Texture2D[]; 
var current : int = 0;
function Start() {
	renderer.material.mainTexture = textureArray[current];
	renderer.material.shader = Shader.Find("Transparent/Diffuse");
	renderer.material.color.a = 1;

}

function Update () {
	if (current != Melee.current_misses) {
		renderer.material.mainTexture = textureArray[Melee.current_misses];
		renderer.material.shader = Shader.Find("Transparent/Diffuse");
		renderer.material.color.a = 1.0f;
		current = Melee.current_misses;	
	}
}