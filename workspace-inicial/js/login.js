document.getElementById("ok").addEventListener("click",function(){
    const email=document.getElementById("email").value;
    const password=document.getElementById("passw").value;

    if (email&&password){
        localStorage.setItem("userEmail",email);
        window.location.href ="index.html";

    }else{
        alert("datos incompletos");
    }

})

