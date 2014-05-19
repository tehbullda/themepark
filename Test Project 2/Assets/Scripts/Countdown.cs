using UnityEngine;
using System.Collections;

public class Countdown : MonoBehaviour {

	public TextMesh obj;
	private int countdown;
	
	void Update () {
		if (ZigImageViewer.waitTime >= 0.0f) {
			countdown = (int)ZigImageViewer.waitTime + 1;
			obj.text = countdown.ToString();
		}
		else {
			obj.text = "";
		}
	}
}
