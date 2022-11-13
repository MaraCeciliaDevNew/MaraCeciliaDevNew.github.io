document.addEventListener("DOMContentLoaded", function(){ 
    const userEmailProfile = sessionStorage.getItem("userEmail");

    function showDataProfile (){
        const dataProfile = localStorage.getItem("dataProfileUser");
        let userInfo;
        if (dataProfile) {
            userInfo = JSON.parse(dataProfile);
        }
        let photo = './js/default.jpg';
        document.getElementById("validationServer05").value = userEmailProfile;
        if (userInfo){
            document.getElementById("validationServer01").value = userInfo[0]
            document.getElementById("validationServer03").value = userInfo[1]
            document.getElementById("validationServer02").value = userInfo[2]
            document.getElementById("validationServer04").value = userInfo[3]
            document.getElementById("validationServer06").value = userInfo[4]
            
            if(userInfo[5]) {
                photo = userInfo[5];
            }
        };
        document.getElementById("profileImg").src = photo;

    };
    showDataProfile();

});

function saveDataProfile (){
    const nameUser = document.getElementById("validationServer01").value;
    const lastNameUser = document.getElementById("validationServer03").value;
    const secondNameUser = document.getElementById("validationServer02").value;
    const secondLastNameUser = document.getElementById("validationServer04").value;
    const phoneUser = document.getElementById("validationServer06").value;

    const photo = document.getElementById("profileImg").src;
    const infoUser = [nameUser,lastNameUser,secondNameUser,secondLastNameUser,phoneUser, photo];
    localStorage.setItem("dataProfileUser", JSON.stringify(infoUser));   
};


//metodo para manipular archivos FileReader () con metodo propio reader 
//con propiedad result  reader.result accede al resultado en el metodo 
// del event extraigo el primer elemento de array files y con readAsDataURL 
// dispara el evento load
//

function subirArchivo(e) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const foto = reader.result;
        document.getElementById("profileImg").src = foto;
    });
    reader.readAsDataURL(e.target.files[0]);
};
