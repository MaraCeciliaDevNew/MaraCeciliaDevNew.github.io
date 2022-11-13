const formulario = document.getElementById('myForm');
const inputs = document.querySelectorAll('#myForm input');

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
})()
  
//Validacion Contraseña
const validarpass = () =>{
  var pass1 = document.getElementById("password1");
  var pass2 = document.getElementById("password2");
    
  if(pass1.value !== pass2.value || pass1.value == "" ){
   pass2.setCustomValidity('no coincide');
  } else {
    pass2.setCustomValidity('');
  }
};

const validarFormulario = (e) => {
  console.log("valida")
	switch (e.target.name) {
		case "password2":
			validarpass();
		break;
	}
};

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

// Validacion checkbox

var form =document.querySelector("form");

function goLogin(){
  const email=document.getElementById("email").value;
  const password=document.getElementById("password1").value;

  if (email&&password){
      sessionStorage.setItem("userEmail",email);
      const newLocal = window.location.href = '../workspace-inicial/login.html';
      //email= sessionStorage.getItem("userEmail");
  }
};

form.addEventListener("submit", (event) => {
  var checkboxCheck = document.getElementById("terminos").checked;
  event.preventDefault();
  
  if(checkboxCheck && form.checkValidity()){
    alert("¡Te has registrado con éxito!") ;
    goLogin(); 
  };

  var nuevoBotonDeTerminos = `<button type="button" class="btn btn-link ps-0" id="btn-modal-terminos" data-bs-toggle="modal" data-bs-target="#modalTerminos" style="color:red ;">Términos del servicio</button>`
  var labelInvalido = `<label class="form-check-label" for="terminos" style="color: red;">Acepto los términos y condiciones del servicio.</label>`
  var cartelCheckInvalido = `<label for="boton" class="form-label" style="padding:10px; color:red;">Debe aceptar los términos del servicio</label>`
  
  if(!checkboxCheck){
    document.getElementById("botonTerminos").innerHTML = nuevoBotonDeTerminos;
    document.getElementById("labelTerminos").innerHTML = labelInvalido;
    document.getElementById("cartelCheckbox").innerHTML = cartelCheckInvalido;
  };
});

//Checkbox en tiempo real
 document.getElementById("terminos").addEventListener('click', ()=> {

  var nuevoBotonChekeado = ` <button type="button" class="btn btn-link ps-0" id="btn-modal-terminos" data-bs-toggle="modal" data-bs-target="#modalTerminos">Términos del servicio</button>`;
  var labelValido = `<label class="form-check-label" for="terminos" style="color:darkgreen">Acepto los términos y condiciones del servicio.</label>`
  var borrarMensajeCheckbox = ``;

  var checkboxCheck = document.getElementById("terminos").checked;

  if(checkboxCheck){
    document.getElementById("botonTerminos").innerHTML = nuevoBotonChekeado;
    document.getElementById("labelTerminos").innerHTML = labelValido;
    document.getElementById("cartelCheckbox").innerHTML = borrarMensajeCheckbox;
  };

});


