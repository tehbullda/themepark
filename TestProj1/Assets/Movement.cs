
using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CharacterController))]

public class Movement : MonoBehaviour {

	// Use this for initialization
	void Start () {
        
	}
    float horizontalSpeed = 2.0f;
    float verticalSpeed = 2.0f;
    float speed = 10.0f;
	void Update () {
		// Get the horizontal and vertical axis
		// By default they are mapped to the arrow keys
		// The value is in the range -1 to 1
		//float translation = Input.GetAxis ("Vertical") * speed
		
		// Make it move 10 meters per second instead of 10 meters per frame
		//translation *= Time.deltaTime;
		
		// Move translation along the object's z-axis
		//transform.Translate (0, 0, translation);
		// Rotate around our y-axis
		float h = horizontalSpeed * Input.GetAxis ("Mouse X");
		float v = verticalSpeed * Input.GetAxis ("Mouse Y");
		transform.Rotate (v, h, 0);
	}
}
