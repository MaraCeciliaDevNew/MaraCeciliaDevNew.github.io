
const URL= CART_INFO_URL+"25801"+EXT_TYPE;

let product = {};


document.addEventListener("DOMContentLoaded", ()=> {
    async function fetchCarrito(){
        const resp = await fetch(URL);
        const data = await resp.json();

        product=data;

        console.log(product);
        showArticle(product);
    }
    fetchCarrito();
});


function showArticle(){
    product.articles.forEach(element => {
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
        console.log(text)
        let unitCost = document.createTextNode(text);
        divUnitCost.appendChild(unitCost);

        let divCount = document.createElement('div');
        divCount.className = 'col';
        let input = document.createElement('input');
        input.type = "text";
        input.value = element.count;
        // cuando el usuario presione una tecla se ejecuta esta funcion
        input.onkeyup = function (event){
           const cantidad = event.target.value;
           
           // validamos que sea mayor que cero para poder modificar el valor 
           // de subtotal
           if (cantidad > 0) {
            document.getElementById("subtotal").innerHTML = element.unitCost * cantidad;
           } else{
            document.getElementById("subtotal").innerHTML = "";
           };
        } 

        divCount.appendChild(input);

        let divSubtotal = document.createElement('div');
        divSubtotal.className = 'col';
        divSubtotal.id = 'subtotal';
        let subTotalText = element.unitCost * element.count;
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
