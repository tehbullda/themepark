#pragma strict
import System.IO;

public var obj : TextMesh;
var filePath = "Assets/HighScore.txt";

function Start () {
 	var sr = new File.OpenText(filePath);
    var input = sr.ReadLine();

	obj.text = "HighScore: " + input;
	
	sr.Close();

}

function Update () {
	
}