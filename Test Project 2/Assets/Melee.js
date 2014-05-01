#pragma strict

static var player_speed = 0.0f;
var speed : float;
var display_strength : float;
var space_pressed : boolean = false;
static var score : int = 0;
var display_score : int;

var lost_splash : Texture;
static var player_lost : boolean = false;
var display_lost : boolean;

var lance_range : float = 0.15f;
var hit_percition : float;

var lance_pos_x : float;
var lance_pos_y : float;
var lance_pos_z : float;

function Update() {
	if (player_lost) {
		display_lost = player_lost;
		GUI.DrawTexture(Rect(10,10,60,60), lost_splash, ScaleMode.ScaleToFit, true, 10.0f);
	}
	
	lance_pos_x = transform.position.x;
	lance_pos_y = transform.position.y;
	lance_pos_z = transform.position.z;
	
	if (Input.GetKeyDown("space")/* && !space_pressed*/) {
		player_speed += 5.0f;
		space_pressed = true;
	}
	/*else if (nput.GetKeyUp("space")) {
		space_pressed = false;
	}*/
	player_speed = (player_speed - 5 * Time.deltaTime) * 0.995f;
	if (player_speed < 0) {
		player_speed = 0;
	}
	speed = player_speed;
	display_score = score;
	display_strength = SpawnTarget.target_strength;
	
	var lance_hit : RaycastHit;
	
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), lance_hit)) {
		hit_percition = lance_hit.distance;
		if (hit_percition < lance_range) {
			lance_hit.transform.SendMessage("Hit", SendMessageOptions.DontRequireReceiver);
		}
	}
}