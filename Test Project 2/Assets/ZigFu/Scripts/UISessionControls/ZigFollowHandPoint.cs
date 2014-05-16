using UnityEngine;
using System;

public class ZigFollowHandPoint : MonoBehaviour
{
	public Vector3 Scale = new Vector3(0.02f, 0.02f, -0.02f);
	public Vector3 bias;
	public float damping = 5;
	public Vector3 bounds = new Vector3(10, 10, 10);
	
	Vector3 focusPoint;
	Vector3 startPos;
	Vector3 desiredPos;
	
	private float rotationX;
	private float rotationY;

	public float minimumX = 0.0F;
	public float maximumX = 0.0F;
	
	public float minimumY = 0.0F;
	public float maximumY = 0.0F;

	private Vector3 objectStartPos;

	[HideInInspector] private bool tracked = false;

	void Start() {
		//desiredPos = transform.position;
		objectStartPos = transform.position;
		//startPos = transform.localPosition;
	}
	
	void Update() {

		foreach (ZigTrackedUser currentUser in ZigInput.Instance.TrackedUsers.Values) {
			if (!tracked) {
				startPos = currentUser.Position;
				tracked = true;
			}
			//Vector3 pos = ClampVector(Vector3.Scale(desiredPos - currentUser.Position, Scale) + bias, -0.5f * bounds, 0.5f * bounds);
			//pos.y = 0;
		
			//transform.Translate(-pos  * Time.deltaTime);

			rotationX = startPos.x - desiredPos.x;
//			rotationX = Mathf.Clamp (rotationX, minimumX, maximumX);
//			if (rotationX < 7) {
//			rotationX /= 10;
//			}
//
			rotationY = startPos.y - desiredPos.y;
//			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
//			if (rotationY < 10) {
//			rotationY /= 10;
//			}
			//float distance = (float)Math.Sqrt(Math.Pow(currentUser.Position.x - desiredPos.x, 2) + Math.Pow(currentUser.Position.y - desiredPos.y, 2));

			//if (distance > 5f) {
			//transform.localEulerAngles = new Vector3(-rotationY, -rotationX, 0);
			//}
            //float distance = Math.Abs((currentUser.Position.x - desiredPos.x) / (currentUser.Position.y - desiredPos.y));

			Vector2 s, d;
			s.x = startPos.x * Scale.x;
			s.y = startPos.y * Scale.y;

			d.x = desiredPos.x * Scale.x;
			d.y = desiredPos.y * Scale.y;

			float disX = s.x / (float)Math.Sqrt(Math.Pow(s.x - d.x, 2) + (float)Math.Pow(s.y - d.y, 2));
			float disY = s.y / (float)Math.Sqrt(Math.Pow(s.x - d.x, 2) + (float)Math.Pow(s.y - d.y, 2));
			rotationX = Mathf.Clamp(rotationX, minimumX, maximumX);
			rotationY = Mathf.Clamp(rotationY, minimumY, maximumY);

			rotationX /= 10;
			rotationY /= 10;

			transform.position = new Vector3(rotationX,rotationY,transform.position.z);

            desiredPos = currentUser.Position;
            
		}
		if (ZigInput.Instance.TrackedUsers.Count == 0) {
			tracked = false;
		}
	}
	
	void Session_Start(Vector3 focusPoint) {
		this.focusPoint = focusPoint;
	}
	
	void Session_Update(Vector3 handPoint) {
		Vector3 pos = handPoint - focusPoint;
		desiredPos = ClampVector(Vector3.Scale(pos, Scale) + bias, -0.5f * bounds, 0.5f * bounds);
	}
	
	void Session_End() {
		desiredPos = Vector3.zero;
	}
	
	Vector3 ClampVector(Vector3 vec, Vector3 min, Vector3 max) {
		return new Vector3(Mathf.Clamp(vec.x, min.x, max.x),
		                   Mathf.Clamp(vec.y, min.y, max.y),
		                   Mathf.Clamp(vec.z, min.z, max.z));
	}
}