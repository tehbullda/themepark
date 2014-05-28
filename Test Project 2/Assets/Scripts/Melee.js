#pragma strict
import System;
import System.IO;


@script RequireComponent (AudioSource);
//if true a menu will apear ingame with all the microphones
var SelectIngame:boolean=false;
//if false the below will override and set the mic selected in the editor
//Select the microphone you want to use (supported up to 6 to choose from). If the device has number 1 in the console, you should select default as it is the first defice to be found.
//enum Devices {DefaultDevice, Second, Third, Fourth, Fifth, Sixth}
 
var InputDevice : Devices;
private var selectedDevice:String;
 
 
var HasBeenLow:boolean = true;
 
var audioSource:AudioSource;
//The maximum amount of sample data that gets loaded in, best is to leave it on 256, unless you know what you are doing. A higher number gives more accuracy but 
//lowers performance allot, it is best to leave it at 256.
var amountSamples:float=256;
var loudness:float;
var sensitivity:float=0.4;
var sourceVolume:float=100;
private var minFreq: int;
private var maxFreq: int;
 
var Mute:boolean=true;
var debug:boolean=false;
var ShowDeviceName:boolean=false;
private var micSelected:boolean=false; 

private var mTimer:float=0;
private var mRefTime:float=10; 
private var recording:boolean=true; 


static var player_speed = 0.0f;
var speed : float;
var retardation : float = 0.995f;
var display_strength : float;
var space_pressed : boolean = false;
// static var score : int = 0;
var display_score : int;

private var killscreen_duration : float = 3.0f;
private var killscreen_currenttime : float = 0.0f;

var lost_splash : Texture;
static var player_missed : boolean = false;
static var player_lost : boolean = false;
var display_lost : boolean;

public var AllowedMisses : int = 3;
static var current_misses : int = 0;

var lance_range : float = 0.15f;
var hit_percition : float;

var lance_pos_x : float;
var lance_pos_y : float;
var lance_pos_z : float;

function Start() { 
	player_lost = false;
	killscreen_currenttime = 0.0f;
	display_lost = false;
	player_missed = false;
	current_misses = 0;
	mTimer = 0.0f;
	recording = true;

	if(!audioSource){
	    audioSource = GetComponent(AudioSource);
	} 
 
	var i=0;
    //count amount of devices connected
	for(device in Microphone.devices){
	    i++;
	    if(ShowDeviceName){
	        Debug.Log ("Devices number "+i+" Name"+"="+device);
 
	    }
	}


	if(SelectIngame==false){
	    //select the device if possible else give error
	    if(InputDevice==Devices.DefaultDevice){
	        if(i>=1){
	            selectedDevice= Microphone.devices[0];
	        }
	        else{
	            Debug.LogError ("No device detected on this slot. Check input connection");
	        }
 
	    }
 
 
	    if(InputDevice==Devices.Second){
	        if(i>=2){
	            selectedDevice= Microphone.devices[1];
	        }
	        else{
	            Debug.LogError ("No device detected on this slot. Check input connection");
	        }
 
	    }
 
 
 
	    if(InputDevice==Devices.Third){
	        if(i>=3){
	            selectedDevice= Microphone.devices[2];
	        }
	        else{
	            Debug.LogError ("No device detected on this slot. Check input connection");
	            return;
	        }
	    }
 
 
	    if(InputDevice==Devices.Fourth){
	        if(i>=4){
	            selectedDevice= Microphone.devices[2];
	        }
	        else{
	            Debug.LogError ("No device detected on this slot. Check input connection");
	            return;
	        }
	    }
	    if(InputDevice==Devices.Fifth){
	        if(i>=5){
	            selectedDevice= Microphone.devices[2];
	        }
	        else{
	            Debug.LogError ("No device detected on this slot. Check input connection");
	            return;
	        }
	    }
 
	    if(InputDevice==Devices.Sixth){
	        if(i>=6){
	            selectedDevice= Microphone.devices[2];
	        }
	        else{
	            Debug.LogError ("No device detected on this slot. Check input connection");
	            return;
	        }
	    }
 
	}



    //detect the selected microphone
	audio.clip = Microphone.Start(selectedDevice, true, 10, 44100);
    //loop the playing of the recording so it will be realtime
	audio.loop = true;
    //if you only need the data stream values  check Mute, if you want to hear yourself ingame don't check Mute. 
	audio.mute = Mute;

    //don't do anything until the microphone started up
	while (!(Microphone.GetPosition(selectedDevice) > 0)){
	    if(debug){
	        Debug.Log("Awaiting connection");
	    }
	}
	if(debug){
	    Debug.Log("Connected");
	}
 
    //Put the clip on play so the data stream gets ingame on realtime
	audio.Play();
	recording=true; 

}


function FixedUpdate () {
			

    if(Microphone.IsRecording(selectedDevice)){
        loudness = GetDataStream()*sensitivity*(sourceVolume/10);

    }
    if(debug){
        Debug.Log(loudness);
    }
  
    //the source volume
    if (sourceVolume > 100){
        sourceVolume = 100;
    }
 
    if (sourceVolume < 0){
        sourceVolume = 0;
    }
    audio.volume = (sourceVolume/100);

    //data lag prevention
 
    //set timer for refreshing memory. this prevents data overload and crashing of memory
    mTimer += Time.deltaTime;
    //refresh the memory
    if (micSelected == true && recording){
        if (mTimer >= mRefTime) {
            StopMicrophone();
            StartMicrophone();
            mTimer = 0;
        }
			  
    }
	 

}
 
 
function GetDataStream(){
    if(Microphone.IsRecording(selectedDevice)){
 
        var dataStream: float[]  = new float[amountSamples];
        var audioValue: float = 0;
        audio.GetOutputData(dataStream,0);
 
        for(var i in dataStream){
            audioValue += Mathf.Abs(i);
        }
        return audioValue/amountSamples;
    }
 
 
  
}
 
//for the above control the mic start or stop
 

public function StartMicrophone () {
    audio.clip = Microphone.Start(selectedDevice, true, 10, maxFreq);//Starts recording
    while (!(Microphone.GetPosition(selectedDevice) > 0)){} // Wait until the recording has started
    audio.Play(); // Play the audio source!
 
}
 
 
 
public function StopMicrophone () {
    audio.Stop();//Stops the audio
    Microphone.End(selectedDevice);//Stops the recording of the device  
 
}
 
 
function GetMicCaps () {
    Microphone.GetDeviceCaps(selectedDevice,  minFreq,  maxFreq);//Gets the frequency of the device
    if ((minFreq + maxFreq) == 0)//These 2 lines of code are mainly for windows computers
        maxFreq = 44100;
 
}
    
    
   
    
   
    
//Create a gui button in another script that calls to this script
public function MicDeviceGUI (left:float , top:float, width:float, height:float, buttonSpaceTop:float, buttonSpaceLeft:float) {
    if (Microphone.devices.Length > 1 && micSelected == false)//If there is more than one device, choose one.
        for (var i:int=0; i < Microphone.devices.Length; ++i)
			if (GUI.Button(new Rect(left + (buttonSpaceLeft * i), top + (buttonSpaceTop * i), width, height), Microphone.devices[i].ToString())) {
				StopMicrophone();
				selectedDevice = Microphone.devices[i].ToString();
				GetMicCaps();
				StartMicrophone();
				micSelected = true;
        }
    if (Microphone.devices.Length < 2 && micSelected == false) {//If there is only 1 decive make it default
        selectedDevice = Microphone.devices[0].ToString();
        GetMicCaps();
        micSelected = true;
    }
}

public var miss_feedback:GameObject;
public var speed_feedback:GameObject;

function Update() {
    if (!player_lost) {
    if (player_missed) {
       	current_misses++;
       	var new_target : GameObject = Instantiate(miss_feedback, Vector3(0.5f, 0.6f, 0), transform.rotation);
       	if (current_misses >= AllowedMisses) {
       		player_lost = true;
       	}
       	player_missed = false;
    }
    if (SpawnTarget.target_strength > player_speed) {
       	var newer_target : GameObject = Instantiate(speed_feedback, Vector3(0.5f, 0.8f, 0), transform.rotation);
    }
        lance_pos_x = transform.position.x;
        lance_pos_y = transform.position.y;
        lance_pos_z = transform.position.z;
	
        if (/*Input.GetKeyDown("space") || Input.GetMouseButtonDown(0) ||*/ (loudness > 0.50f && HasBeenLow)/* && !space_pressed*/) {
            player_speed += 5.0f;
            space_pressed = true;
            retardation = 0.995f;
            HasBeenLow = false; 
    }
    if (loudness <= 0.50f && HasBeenLow == false) {
        HasBeenLow = true;

    }
        /*else if (nput.GetKeyUp("space")) {
            space_pressed = false;
        }*/
        player_speed = (player_speed - 5 * Time.deltaTime) * retardation;
    
        // makes the slowdown when you stop mashing space "exponential".
        //retardation -= 0.001f;
	
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
            var  fileName = "Assets/HighScore.txt";
	        var sr = File.CreateText(fileName);
	        sr.WriteLine ("{0}", ScoreJS.score);
	        sr.Close(); 
	        PlayerPrefs.SetInt("High Score", ScoreJS.score);
        }
    }
}