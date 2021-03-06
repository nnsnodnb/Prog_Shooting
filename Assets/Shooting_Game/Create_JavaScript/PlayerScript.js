#pragma strict

var explosion : Transform ;
var customLabel : GUIStyle ;

function Update ()
{
  var x : float = Input.GetAxis("Horizontal") ;
  var y : float = Input.GetAxis("Vertical") ;

  transform.Translate(x * 0.15 , 0 , 0) ;
  transform.Translate(0 , 0 , y * 0.15) ;

  /* 移動制限 */
  if (transform.position.x <= -10.16566 || transform.position.x >= 10.0684 ||
    transform.position.z <= -15.10404 || transform.position.z >= 10.09297)
  {
    var xPos : float ;
    var zPos : float ;
    xPos = Mathf.Clamp(transform.position.x , -18.16566 , 18.0684) ;
    zPos = Mathf.Clamp(transform.position.z , -15.10404 , 10.09297) ;
    transform.position = Vector3(xPos , 0 , zPos) ;
  }
}

var SE : AudioClip ;
var Health : AudioClip ;
var hp : int = 15 ;

function OnCollisionEnter(col:Collision) {
  if(col.gameObject.CompareTag('Enemy') || col.gameObject.CompareTag('Stone'))
  {
    hp -= 1 ;
    Instantiate(explosion , transform.position , transform.rotation) ;
  }

  if(col.gameObject.CompareTag('Health'))
  {
    hp += 2 ;
    Destroy(col.gameObject) ;
    AudioSource.PlayClipAtPoint(Health , transform.position) ;
  }

  if(hp == 0)
  {
    if(Application.loadedLevelName == "Main" || Application.loadedLevelName == "PreBoss" || Application.loadedLevelName == "LastBoss")
    {
      Destroy(gameObject) ;
      AudioSource.PlayClipAtPoint(SE , transform.position) ;
      Instantiate(explosion , transform.position , transform.rotation) ;
      Application.LoadLevel("GameOver") ;
    }
    if(Application.loadedLevelName == "Survival")
    {
      Destroy(gameObject) ;
      AudioSource.PlayClipAtPoint(SE , transform.position) ;
      Instantiate(explosion , transform.position , transform.rotation) ;
      Application.LoadLevel("Survival_GameOver") ;
    }
  }
}

function OnGUI () {
  GUI.Label(Rect(Screen.width / 2 + 270 , Screen.height / 2 + 300, 200 , 50) , "HP : " + hp , customLabel) ;
}
