#pragma strict

var showStage : int = 2;
var hideOnOtherStages : boolean = true;
var TargetLayer : int = 8; //8 is GUI, 0 is Default

function Start () {

}

function Update () {
	 if (fadetext.gameStage == showStage) {
		 gameObject.layer = TargetLayer;
		for (var i = 0; i < transform.childCount; i++) {
	 		transform.GetChild(i).gameObject.layer = TargetLayer;
	 	}
	 }
	 else if (hideOnOtherStages && fadetext.gameStage != showStage) {
	 	gameObject.layer = 9;
		for (var j = 0; j < transform.childCount; j++) {
	 		transform.GetChild(j).gameObject.layer = 9;
	 	}
	 }
}