document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
   
    document.getElementById("user-email").innerHTML=sessionStorage.getItem("userEmail");
});

  function ShowDropdown(){
    let nombreDeUsuario = sessionStorage.getItem("userEmail");
    let buttonDropDown = document.getElementById("user-email");

    if (!nombreDeUsuario){
        buttonDropDown.disabled = true;
        alert ("Registrese para acceder");
    }else{
        buttonDropDown.disabled = false;
   }
   
  };






