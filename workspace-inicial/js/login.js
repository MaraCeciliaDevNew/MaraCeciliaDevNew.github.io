document.getElementById("ok").addEventListener("click",function(){
    const email=document.getElementById("email").value;
    const password=document.getElementById("passw").value;

    if (email&&password){
        window.location.href ="main.html";
    }else{
        alert("datos incompletos");
    }

})

