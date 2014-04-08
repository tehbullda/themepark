
var myMusic : AudioClip[];
 
function Update()
{
    if(!audio.isPlaying)
        playRandomMusic();
}
 
function playRandomMusic()
{
    audio.clip = myMusic[Random.Range(0, myMusic.length)];
    audio.Play();
}