using UnityEngine;
using System;

public class ZigFollowHandPoint : MonoBehaviour
{
	public Vector3 Scale = new Vector3(0.02f, 0.02f, -0.02f);
	public Vector3 bias;
	public float damping = 5;
    public Vector3 bounds = new Vector3(10, 10, 10);

    Vector3 focusPoint;
	Vector3 desiredPos;
	
    private int screenshotCount = 0;


	void Start() {
		desiredPos = transform.localPosition;
	}
	
	void Update() {
        foreach (ZigTrackedUser currentUser in ZigInput.Instance.TrackedUsers.Values)
        {
            Vector3 pos = ClampVector(Vector3.Scale(desiredPos - currentUser.Position, Scale) + bias, -0.5f * bounds, 0.5f * bounds);
            //pos.y = 0;
            transform.Translate(pos  * Time.deltaTime);

            desiredPos = currentUser.Position;
        }
        //if (Input.GetKeyDown("f9"))
        //{
        //    string screenshotFilename;
        //    do
        //    {
        //        screenshotCount++;
        //        screenshotFilename = "screenshot" + screenshotCount + ".png";

        //    } while (System.IO.File.Exists(screenshotFilename));

        //    Application.CaptureScreenshot(screenshotFilename);
        //}
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