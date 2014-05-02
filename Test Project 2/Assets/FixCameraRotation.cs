﻿using UnityEngine;
using System.Collections;

public class FixCameraRotation : MonoBehaviour {

	Quaternion rotation;
	
	void Awake()
	{
		rotation = transform.rotation;
	}
	
	void LateUpdate()
	{
		transform.rotation = rotation;
	}
}
