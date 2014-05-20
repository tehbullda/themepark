#pragma strict


public var obj : TextMesh;
static var score : int;
static var highscore : int;


function Start () {
    //highscore = PlayerPrefs.GetInt("High Score");
	//obj.transform.localPosition = Vector3(-13.5,4,obj.transform.localPosition.z);
	score = 0;
}
function Update () {
    obj.text = "Speed Needed: " + SpawnTarget.target_strength.ToString() + "\nSpeed: " + Melee.player_speed.ToString();
}