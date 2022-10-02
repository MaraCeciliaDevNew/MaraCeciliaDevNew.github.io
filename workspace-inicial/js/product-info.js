const URL= PRODUCT_INFO_URL + localStorage.getItem('ProdId')+ EXT_TYPE;
const URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('ProdId')+ EXT_TYPE;
let products = {};

document.addEventListener("DOMContentLoaded", ()=> {
     async function fetchProductInfo(){
     const resp = await fetch(URL);
     const data = await resp.json();

        products  = data;
     

        document.getElementById("productName").innerHTML= products.name;
        document.getElementById("productCost").innerHTML= products.cost;
        document.getElementById("productDescription").innerHTML= products.description;
        document.getElementById("productCategory").innerHTML= products.category;
        document.getElementById("productSoldCount").innerHTML= products.soldCount;

        let listaNodo = document.getElementById("product-list");
        
            products.images.forEach((imagen) => {
            let divNodo = document.createElement("div");
            divNodo.className = "imgContenedor";
            
            let imgNodo = document.createElement("img");
            imgNodo.src = imagen;
            imgNodo.className="imgClass";
            
            divNodo.appendChild(imgNodo);
            listaNodo.appendChild(divNodo);
        });
      }
      fetchProductInfo();
});

async function fetchComments(){
    const resp = await fetch(URL_COMMENTS);
    const comentarios = await resp.json();
    mostrarComentarios(comentarios);
}
fetchComments();

const mostrarComentarios = function(comentarios) {
    comentarios.forEach((comentario) => {

        const primerFila = document.createElement('div');
        

        const usuarioSpan = document.createElement('span');
        usuarioSpan.className = "usuario";
        const fechaSpan = document.createElement('span');
        const puntuacionSpan = document.createElement('span');
        const descripcionParrafo = document.createElement('p');
        
        const usuario = document.createTextNode(comentario.user);
        usuarioSpan.appendChild(usuario);

        const fecha = document.createTextNode(comentario.dateTime);
        fechaSpan.appendChild(fecha);
        
        
        for (let i = 0; i < 5; i++) {
            let estrella = document.createElement('span');
            estrella.className= 'fa fa-star';
            if(comentario.score > i) {
                estrella.className = 'fa fa-star checked';
            }
            puntuacionSpan.appendChild(estrella);
        }

        primerFila.appendChild(usuarioSpan);
        primerFila.appendChild(fechaSpan); 
        primerFila.appendChild(puntuacionSpan);


        const segundaFila = document.createElement('div');

        const descripcion = document.createTextNode(comentario.description);
        descripcionParrafo.appendChild(descripcion);

       
        segundaFila.appendChild(descripcionParrafo);

        document.getElementById("comments").appendChild(primerFila);
        document.getElementById("comments").appendChild(segundaFila);
    });
}

/*
dateTime: "2020-02-25 18:03:52"
description: "Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas"
product: 50921
score: 3
user: "juan_pedro"
*/

const agregarComentario = function () {
    const lista = [];
    const comentario = {
        score: document.getElementById("puntuacion").value,
        description: document.getElementById("descripcion").value,
        dateTime: new Date(),
        user: localStorage.getItem("userLog"),
    };
    lista.push(comentario);
    mostrarComentarios(lista);

}
     });
  };
  