#pragma strict

	private var speed_indicator : GameObject;
	// Use this for initialization
	function Start () {
	 	for (var i = 0; i < transform.childCount; i++) {
	 		if (transform.GetChild(i).name == "Speed_indicator") {
	 			speed_indicator = transform.GetChild(i).gameObject;
	 		}
	 	}
	}
	
	// Update is called once per frame
	function Update () {
		var speed : float = Melee.player_speed;
		var speedneeded : float = SpawnTarget.target_strength;
		speed_indicator.transform.Translate(Vector3(speed * Time.deltaTime, 0,0));
	}
