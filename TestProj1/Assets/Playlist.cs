using UnityEngine;
using System.Collections;

public class Playlist : MonoBehaviour {
	public AudioClip [] myMusic;
	public float volume;

	int currentSong = 0;
	float timeLeft = 0.0f;

	void Update () {
		if(timeLeft < 0.5f) {
			playNextSong();
			currentSong = ++currentSong % myMusic.Length;
		}
		timeLeft -= Time.deltaTime;
		Debug.Log(myMusic[currentSong].GetHashCode());
	}
	void playNextSong() {
		audio.clip = myMusic[currentSong];
		audio.Play();
		timeLeft = audio.clip.length;
        audio.volume = volume;
	}
}
