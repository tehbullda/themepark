#pragma strict

public var target : GameObject;

function Start () {

}

function Update () {
    transform.LookAt(target.transform);
}