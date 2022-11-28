const URL= PRODUCT_INFO_URL + localStorage.getItem('ProdId')+ EXT_TYPE;
const URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('ProdId')+ EXT_TYPE;

let products = {};

document.addEventListener("DOMContentLoaded", ()=> {
     async function fetchProductInfo(){
        const resp = await fetch(URL);
        const data = await resp.json();

        products = data;
     
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
};
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
        };

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
};


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
};

async function fetchProducts (){
    const resp = await fetch(URL);
    const data = await resp.json();

  mostrarRelatedProducts(data.relatedProducts);
};

fetchProducts();

function mostrarProductoDos(id){ 
    localStorage.setItem('ProdId',id); 
    window.location.href= "product-info.html";
};
  
function mostrarRelatedProducts(relatedProducts){
    console.log(relatedProducts);
    

    relatedProducts.forEach((element, index)=> {
        
      let catName= element.name;
      let catID = element.id;
      let divNodo = document.getElementById("productosRelacionados");
      let imgNodo = document.createElement("img");

      let divImgItem = document.createElement("div");
      let divStyles = "carousel-item";
      if (index === 0) {
        divStyles += " active";
      }
      divImgItem.className = divStyles;
      imgNodo.className = "d-block w-50 img-tamaño";
      imgNodo.src = element.image;

      imgNodo.onclick= mostrarProductoDos.bind(this, catID);
      divImgItem.appendChild(imgNodo);
      divNodo.appendChild(divImgItem);
      
      let spanNodo = document.createElement("span");
      let textNode = document.createTextNode(catName);

      divNodo.appendChild(spanNodo);
      spanNodo.appendChild(textNode);
    
    });
};
  
let userEmail = sessionStorage.getItem("userEmail");

document.getElementById("comprar").onclick = function agregarArticulo () {
   const selectedArticle = {
    id: products.id,
    count: 1,
    image: products.images[0],
    unitCost: products.cost,
    currency: products.currency,
    name: products.name,
   };
   if (userEmail){
    localStorage.setItem('selectedArticle', JSON.stringify(selectedArticle));
    location.href = "../workspace-inicial/cart.html";
   }else{
    alert ("Debe registrarse para poder realizar compras")
   }

};
