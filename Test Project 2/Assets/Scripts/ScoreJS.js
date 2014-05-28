#pragma strict


public var obj : TextMesh;
static var score : int;
static var highscore : int;
var filePath = "Assets/HighScore.txt";

function Start () {
 	var sr = new File.OpenText(filePath);
    highscore = parseInt(sr.ReadLine());
    
	//obj.transform.localPosition = Vector3(-13.5,4,obj.transform.localPosition.z);
	score = 0;
}
function Update () {
    obj.text = "Score: " + SpawnBonuses.bonus_spawn_time.ToString() + "\nHigh Score: " + highscore.ToString();
}