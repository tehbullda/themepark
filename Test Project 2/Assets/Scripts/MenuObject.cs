using UnityEngine;
using System.Collections;

public class MenuObject : MonoBehaviour 
{
	public bool Quit = false; 
	void OnMouseEnter()
	{
		renderer.material.color = Color.white;
	}

	void OnMouseExit()
	{
		renderer.material.color = Color.black;
	}

	void OnMouseDown()
	{
		if (Quit) 
		{
				Application.Quit();
		}
		else
		{
			if (Application.loadedLevel == 0) {
				Application.LoadLevel(1); 
			}
			else if (Application.loadedLevel == 2) {
				Application.LoadLevel(0);
			}
		}
	}
}
