#pragma strict

private var spawnTime : float = 0.0f;

public var bonus : GameObject;
public var TimeBetweenSpawns = 1;

function Update () {
	spawnTime += Time.deltaTime;
	
	if (spawnTime > TimeBetweenSpawns) {
		spawnTime -= TimeBetweenSpawns;
		var newBonus : GameObject = Instantiate(bonus, Vector3(Random.Range(-5, 5), Random.Range(3, 7), 0), transform.rotation);
	}
}