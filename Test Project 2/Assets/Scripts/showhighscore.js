#pragma strict
public var obj : TextMesh;
function Start () {
	obj.text = "HighScore: " + PlayerPrefs.GetInt("High Score").ToString();
}

function Update () {
	
}