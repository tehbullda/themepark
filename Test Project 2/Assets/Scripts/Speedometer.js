﻿#pragma strict

private var speed_indicator : GameObject;
public static var indicator_max_speed : float = 120.0f;
// Use this for initialization
function Start () {
    for (var i = 0; i < transform.childCount; i++) {
        if (transform.GetChild(i).name == "Speed_indicator") {
            speed_indicator = transform.GetChild(i).gameObject;
        }
    }
}
	
// Update is called once per frame
//float volume = m_slider.getPosition().x - m_sprite.getPosition().x;
//volume /= (float)m_sprite.getTextureRect().width;
//volume *=  1.2048192771084337349397590361446f;
//volume -= 0.04;
	
//-3.15 begin/minimum
//-1.8 red->orange
//1 orange>green
//3.15 end/maximum

function Update () {
    var speed : float = Melee.player_speed;
    var speedneeded : float = SpawnTarget.target_strength;
		
    var percentage : float = speed / indicator_max_speed;
    var nextpos : float = 6.3f * percentage;
    nextpos -= 3.15f;

    if (percentage > 1.0f) {
        nextpos = 3.15f;    
    }
    speed_indicator.transform.localPosition = new Vector3(nextpos, speed_indicator.transform.localPosition.y,speed_indicator.transform.localPosition.z);
}
