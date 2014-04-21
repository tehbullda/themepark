using UnityEngine;
using System.Collections;

public class Score : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	public static int score = 0;
		
	//could use: public static int score and lives if I only had one player so that you aren’t instantiating a new, separate instance of score/lives etc.
	
	void OnGUI()
		
	{
		
		GUI.Label(new Rect(10, 10, 70, 20), "Score: " + Score.score.ToString());
				
	}
	// Update is called once per frame
	void Update () {
		score++;
	}
}
