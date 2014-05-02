#pragma strict

static var player_speed = 0.0f;
var speed : float;
var retardation : float = 0.995f;
var display_strength : float;
var space_pressed : boolean = false;
// static var score : int = 0;
var display_score : int;

var killscreen_duration : float = 3.0f;
private var killscreen_currenttime : float = 0.0f;

var lost_splash : Texture;
static var player_lost : boolean = false;
var display_lost : boolean;

var lance_range : float = 0.15f;
var hit_percition : float;

var lance_pos_x : float;
var lance_pos_y : float;
var lance_pos_z : float;


function Update() {
    if (!player_lost) {
        lance_pos_x = transform.position.x;
        lance_pos_y = transform.position.y;
        lance_pos_z = transform.position.z;
	
        if (Input.GetKeyDown("space")/* && !space_pressed*/) {
            player_speed += 5.0f;
            space_pressed = true;
            retardation = 0.995f;
        }
        /*else if (nput.GetKeyUp("space")) {
            space_pressed = false;
        }*/
        player_speed = (player_speed - 5 * Time.deltaTime) * retardation;
    
        // makes the slowdown when you stop mashing space "exponential".
        retardation -= 0.001f;
	
        if (player_speed < 0) {
            player_speed = 0;
        }
        speed = player_speed;
        //display_score = score;
        display_strength = SpawnTarget.target_strength;
	
        var lance_hit : RaycastHit;
	
        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), lance_hit)) {
            hit_percition = lance_hit.distance;
            if (hit_percition < lance_range) {
                lance_hit.transform.SendMessage("Hit", SendMessageOptions.DontRequireReceiver);
            }
        }
    }
    else {
    	killscreen_currenttime += Time.deltaTime;
        player_speed = 0;
        speed = player_speed;
        if (killscreen_currenttime >= killscreen_duration) { 
        	// If highscore has been beat, go to the highscorescene
        	if (ScoreJS.score > ScoreJS.highscore) {
        		Application.LoadLevel(2);
        	}
        	//otherwise return to main menu
        	else { 
        		Application.LoadLevel(0);
        	}
        }
    }
}

function OnGUI() { 
    if (player_lost) {
        display_lost = player_lost;
        GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), lost_splash, ScaleMode.ScaleToFit);
        if (ScoreJS.score > ScoreJS.highscore) {
        	PlayerPrefs.SetInt("High Score", ScoreJS.score);
        }
    }
}