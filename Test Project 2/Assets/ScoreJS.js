#pragma strict


public var obj : TextMesh;
static var score : int;
static var highscore : int;


function Start () {
    highscore = PlayerPrefs.GetInt("High Score");
}

function Update () {
    obj.text = "Score: " + score.ToString() + "\nHighscore: " + highscore.ToString();
}