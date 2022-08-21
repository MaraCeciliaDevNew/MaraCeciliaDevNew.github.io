
const URL= "https://japceibal.github.io/emercado-api/cats_products/101.json";

  fetch(URL)
  .then(respuesta => respuesta.json())
  .then(data => {
    console.log(data);
    mostrarLista(data);
  })

  function mostrarLista(data){
  
    let content = '';
    data.products.forEach((element) => {
      let carName= element.name;
      let carCurrency= element.currency;
      let carCost= element.cost;
      let carDescription= element.description;
      let carSoldCount= element.soldCount;

      let tdImage= "<td><img src='"+element.image+"' class='autos-img' /></td>";
      let tdContent ="<td>"+
        "<span>"+ carName + " " + carCurrency +" "+ carCost + "</span>"  + "<br>" +
        "<span>"+ carDescription+ "</span>";
      "</td>";
      
      let tdCant = "<td><span>" + carSoldCount + "</span></td>";
      content +=  "t<r>" + tdImage + tdContent + tdCant + "</tr>";
    
    });

  
 document.getElementById("tabla").innerHTML = content;

}


