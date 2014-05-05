#pragma strict


	public var obj : TextMesh;
	// Use this for initialization
	function Start () {
	
	}
	
	// Update is called once per frame
	function Update () {
		var speed : float = Melee.player_speed;
		var speedneeded : float = SpawnTarget.target_strength;
		if (speed > speedneeded) {
			obj.color = Color.green;
		}
		else { 
			obj.color = Color.red;
		}
		obj.text = "Speed: " + speed.ToString();
	}
