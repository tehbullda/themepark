#pragma strict

var frames : Texture[];
var timeperFrame : float[];
var currentTime : float = 0.0f;
private var currentFrame : int = 0;

function Start () {
	renderer.material.mainTexture = frames[0];
	renderer.material.shader = Shader.Find("Transparent/Diffuse");
	renderer.material.color.a = 1.0f;
}

function Update () {
	currentTime += Time.deltaTime;
	if (currentTime > timeperFrame[currentFrame]) {
		currentFrame = ++currentFrame % frames.Length;
		currentTime = 0.0f;
	}
	renderer.material.mainTexture = frames[currentFrame];
	renderer.material.shader = Shader.Find("Transparent/Diffuse");
	renderer.material.color.a = 1.0f;
}