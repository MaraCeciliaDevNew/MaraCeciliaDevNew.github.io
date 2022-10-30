
const URL= CART_INFO_URL+"25801"+EXT_TYPE;

let product = {};
let subTotalF=0;
let costoEnvio=0;
let totalF=0;
let formaDePago = "";

document.addEventListener("DOMContentLoaded", ()=> {
    async function fetchCarrito(){
        const resp = await fetch(URL);
        const data = await resp.json();

        product=data;
        updateArticlesList(product);
        showArticle();
        calcularSubTotal();
        const porcentaje = 0.05;
        calcEnvio(porcentaje);
        total();
    }
    fetchCarrito();
});

function updateArticlesList(product) {
    let listaArticulos = JSON.parse(
        localStorage.getItem('listaArticulos')
    );

    if (!listaArticulos) {
        listaArticulos = [product.articles[0]];
    }
    const selectedArticle = JSON.parse(
        localStorage.getItem('selectedArticle')
    );
        
    if (selectedArticle) {
        if (selectedArticle.currency !== 'USD') {
            console.log(selectedArticle.unitCost)
            selectedArticle.unitCost = selectedArticle.unitCost * 40;
            console.log(selectedArticle.unitCost)
        }
        listaArticulos.push(selectedArticle);
        localStorage.removeItem('selectedArticle');
    }

    /*const deleteId = localStorage.getItem('deleteId')
    if (deleteId){
        localStorage.removeItem('deleteId')
        listaArticulos = listaArticulos.filter((articulo) => {
            return articulo.id.toString() !== deleteId
        })
    }*/
        
    localStorage.setItem('listaArticulos', JSON.stringify(listaArticulos));
};


function showArticle(){
    let listaArticulos = JSON.parse(
        localStorage.getItem('listaArticulos')
    );
    listaArticulos.forEach(element => {
        let rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        
        let divImg = document.createElement('div');
        divImg.className = 'col';
        let img = document.createElement('img');
        img.src = element.image;
        img.style.width = '100px'
        divImg.appendChild(img);

        let divName = document.createElement('div');
        divName.className = 'col';
        let name = document.createTextNode(element.name);
        divName.appendChild(name);

        let divUnitCost = document.createElement('div');
        divUnitCost.className = 'col';
        const text = element.currency + " " + element.unitCost;
        let unitCost = document.createTextNode(text);
        divUnitCost.appendChild(unitCost);

        let divCount = document.createElement('div');
        divCount.className = 'col';
        let input = document.createElement('input');
        input.type = "text";
        input.value = element.count;
        input.id = element.id;
        input.className = "cantidades"
        const self = this;
        // cuando el usuario presione una tecla se ejecuta esta funcion
        input.onkeyup = function (event) {
           const cantidad = event.target.value;
           
           // validamos que sea mayor que cero para poder modificar el valor 
           // de subtotal
           if (cantidad > 0) {
             listaArticulos.forEach((articulo) => {
                if (articulo.id === element.id) {
                    articulo.count = cantidad;
                }
             });
             localStorage.setItem('listaArticulos', JSON.stringify(listaArticulos));
             document.getElementById("subtotal"+ element.id).innerHTML = element.currency + " " + element.unitCost * cantidad;
             calcularSubTotal();
             total();
            } else {
                listaArticulos.forEach((articulo) => {
                    if (articulo.id === element.id) {
                        articulo.count = 1;
                    }
                 });
                localStorage.setItem('listaArticulos', JSON.stringify(listaArticulos));
                document.getElementById("subtotal" + element.id).innerHTML = "";
                calcularSubTotal();
                total();
           };
        } 

        divCount.appendChild(input);

        let divSubtotal = document.createElement('div');
        divSubtotal.className = 'col subtotal-articulo';
        divSubtotal.id = 'subtotal' + element.id;
        let subTotalText = "USD" + " " + element.unitCost * element.count;
        
        let subTotal = document.createTextNode(subTotalText);
        divSubtotal.appendChild(subTotal);

        rowDiv.appendChild(divImg);
        rowDiv.appendChild(divName);
        rowDiv.appendChild(divUnitCost);
        rowDiv.appendChild(divCount);
        rowDiv.append(divSubtotal);

        document.getElementById('listaCompras').appendChild(rowDiv);
    });
};

function calcularSubTotal() {
    subTotalF = 0;
    const listaArticulos = JSON.parse(localStorage.getItem('listaArticulos'));
    listaArticulos.forEach((articulo) => {
        subTotalF += articulo.unitCost * articulo.count;
    });
    document.getElementById("subT").textContent= "USD "+ subTotalF;
}



function calcEnvio(porcentaje){
    porcentaje = parseFloat(porcentaje);
    costoEnvio = subTotalF * porcentaje ;
    document.getElementById("costE").textContent= "USD " + costoEnvio;
    total();
}


function total(){
    totalF = subTotalF + costoEnvio;
    document.getElementById("tot").textContent= "USD " + totalF;
    
}

function eliminarId () {
    localStorage.setItem('deleteId', 50921);
    updateArticlesList();
    showArticle();
}
    
//agregar USD  a subtotal, costo de envio y total


document.getElementById("input-tarjeta-de-credito").addEventListener("change",function(e){

   // document.getElementById("numero-de-cuenta").innerHTML= " ";

    document.getElementById("numero-de-tarjeta").disabled = false;
    document.getElementById("codigo-de-seguridad").disabled = false;
    document.getElementById("vencimiento").disabled = false;
    document.getElementById("numero-de-cuenta").disabled = true;
    formaDePago =  e.target.id;
    console.log(formaDePago)
});

document.getElementById("input-transferencia-bancaria").addEventListener("change",function(e){

    //document.getElementById("numero-de-tarjeta").innerHTML= " ";
   // document.getElementById("codigo-de-seguridad").innerHTML= " ";
    //document.getElementById("vencimiento").innerHTML= " ";

    document.getElementById("numero-de-tarjeta").disabled = true;
    document.getElementById("codigo-de-seguridad").disabled = true;
    document.getElementById("vencimiento").disabled = true;
    document.getElementById("numero-de-cuenta").disabled = false;
    formaDePago =  e.target.id;
    console.log(formaDePago)
});

function validarForm(evento) {
    let clase = 'is-valid';
    if (evento.target.value === "") {
        clase = 'is-invalid';
    }
    document.getElementById(evento.target.id).className = 'form-control ' + clase;
}
    

function validar() {

    let calle = document.getElementById("calleid").value;
    let esquina = document.getElementById("esquinaid").value;
    let numeroDePuerta = document.getElementById("numero-de-puertaid").value;
    
    if ( calle === "" || esquina === "" || numeroDePuerta === "") {
        if (calle === "") {
            document.getElementById("calleid").className = 'form-control is-invalid'
        } else {
            document.getElementById("calleid").className = 'form-control'
        }
        if (esquina === "") {
            document.getElementById("esquinaid").className = 'form-control is-invalid'
        } else {
            document.getElementById("esquinaid").className = 'form-control'
        }
        if (numeroDePuerta === "") {
            document.getElementById("numero-de-puertaid").className = 'form-control is-invalid'
        } else {
            document.getElementById("numero-de-puertaid").className = 'form-control'
        }
        alert("¡Todos los campos son obligatorios!");
        return;
    } 
    else if (formaDePago === "") {
        alert("Debes seleccionar una forma de pago.") ;
        return;
    }
    
    const cantidades = document.getElementsByClassName("cantidades");
    let error = false;
    for (let cantidad of cantidades) {
        if (cantidad.value < 1) {
            error = true;
        }
    }
    if (error) {
        alert("Las cantidades debe tener un valor mayor a cero");
        return;
    }

    alert("¡Has completado la compra con éxito!") ;
};


function borrarArticle(article){
if (article){

}else{
    
}
}

  