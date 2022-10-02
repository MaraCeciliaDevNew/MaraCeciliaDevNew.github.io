function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function comprobarClave() {
    let clave1 = document.getElementById("password1").value;
    let clave2 = document.getElementById("password2").value;
    let email = document.getElementById("email").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;

   if(clave1 === clave2 && clave1 !== '' && email !== '' && nombre !== '' && apellido !== '' && clave1.length >5) { 
    showAlertSuccess();
   }else{
    showAlertError();
   }
  }




