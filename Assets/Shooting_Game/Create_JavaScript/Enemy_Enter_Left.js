#pragma strict

var explosion : Transform ;

function Update () {

  transform.position.x += 0.1 ;
  transform.Rotate(1 , 1 , 1) ;

  if(transform.position.x > 19.4)
  {
    Destroy(gameObject) ;
  }
}

var SE : AudioClip ;

function OnCollisionEnter () {
  Instantiate(explosion , transform.position , transform.rotation) ;

  AudioSource.PlayClipAtPoint(SE , transform.position) ;

}