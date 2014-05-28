#pragma strict

function Start () {

}

function Update () {
	 if (fadetext.gameStage != 0) {
	 	if (transform.position.y <= 15) {
	 		transform.position.y += 0.08f;
	 	}
	 }
}