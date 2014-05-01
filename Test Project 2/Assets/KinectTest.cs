using UnityEngine;
using System.Collections;

public class KinectTest : MonoBehaviour {
    
    float rotationX = 0F;
    float rotationY = 0F;

    public float sensitivityX = 0.0F;
    public float sensitivityY = 0.0F;

    public float minimumX = 0.0F;
    public float maximumX = 0.0F;

    public float minimumY = 0.0F;
    public float maximumY = 0.0F;

    void Start()
    {
        if (rigidbody)
            rigidbody.freezeRotation = true;
    }
	
	// Update is called once per frame
	void Update () {
        rotationX += Input.GetAxis("Mouse X") * sensitivityX;
        rotationX = Mathf.Clamp(rotationX, minimumX, maximumX);

        rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
        rotationY = Mathf.Clamp(rotationY, minimumY, maximumY);

        transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
	}
}
