var myMusic : AudioClip[];
var volume : int;
 
private var currentSong : int = 0;
private var timeLeft : float = 0.0f;

  
 
function Update() {
    if(timeLeft < 0.5f) {
        playNextSong();
        currentSong = ++currentSong % myMusic.Length;
    }
    timeLeft -= Time.deltaTime;
    
}
 
function playNextSong() {
    audio.clip = myMusic[currentSong];
    audio.Play();
    timeLeft = audio.clip.length;
}