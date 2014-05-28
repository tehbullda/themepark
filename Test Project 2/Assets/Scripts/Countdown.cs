using UnityEngine;
using System.Collections;

public class Countdown : MonoBehaviour {

	public TextMesh obj;
	private int countdownToPic;
	private float countdownToMain = 4;
	
	void Update () {
		if (countdownToMain <= 0.0f) {
			Application.LoadLevel(0);		
		}
		if (ZigImageViewer.waitTime >= 0.0f) {
			countdownToPic = (int)ZigImageViewer.waitTime + 1;
			obj.text = countdownToPic.ToString();
		}
		else {
			obj.text = "";
			countdownToMain -= Time.deltaTime;
			obj.text = countdownToMain.ToString();
		}
	}
}
