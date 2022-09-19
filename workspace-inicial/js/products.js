

  let jsonData;
  let listaFiltrada = [];
  fetch(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE)
  .then(respuesta => respuesta.json())
  .then(data => {
   
    jsonData = data
    console.log(data);

    mostrarLista(jsonData.products);
  

  });

 
  function mostrarProducto(id){ 
    localStorage.setItem('ProdId',id);
    window.location.href= "product-info.html";
  }


  function mostrarLista(products){
    let content = '';
    products.forEach((element) => {
      let carName= element.name;
      let carCurrency= element.currency;
      let carCost= element.cost;
      let carDescription= element.description;
      let carSoldCount= element.soldCount;
      let carId = element.id;

    

      let tdImage= "<td>" +
      "<img src='"+element.image+"' class='autos-img' onclick='mostrarProducto("+carId+")' /></td>";
      let tdContent ="<td>"+
        "<span>"+ carName + " " + carCurrency +" "+ carCost + "</span>"  + "<br>" +
        "<span>"+ carDescription+ "</span>";
      "</td>";
      
      let tdCant = "<td><span>" + carSoldCount + "</span></td>";
      content +=  "<tr>" + tdImage + tdContent + tdCant + "</tr>";

    
     });
    
    document.getElementById("cat-name").innerHTML = jsonData.catName
    document.getElementById("tabla").innerHTML = content;

  }

  function filtrarProductosPorPrecio(){
    let precioMenor = document.getElementById("rangeFilterCountMin").value;
    let precioMayor = document.getElementById("rangeFilterCountMax").value;

    listaFiltrada = [];
    jsonData.products.forEach((element) => {
      if (precioMenor && precioMayor) {
        if(precioMenor <= element.cost && precioMayor >= element.cost ) {
              listaFiltrada.push(element);
        }
      }
      else if(precioMenor <= element.cost && !precioMayor){
        listaFiltrada.push(element); 
      }
      else if(!precioMenor && precioMayor >= element.cost){
        listaFiltrada.push(element); 
      }
    });
    console.log(listaFiltrada);
    mostrarLista(listaFiltrada);

  }

  


   function ordenarPorVendidos(){
    if (listaFiltrada.length>0){
    listaFiltrada.sort((a,b) => {
      return b.soldCount - a.soldCount
    });
    mostrarLista(listaFiltrada);
  } else{
    jsonData.products.sort((a,b) => {
      return b.soldCount - a.soldCount
    });
    mostrarLista(jsonData.products);
  }
  
   
  }


   function ordenarPorAsc (){
    if (listaFiltrada.length>0){
      listaFiltrada.sort ((obj1,obj2)=> {
        if (obj1.name<obj2.name){
          return -1
        }
        if (obj1.name>obj2.name){
          return 1
        }else{
          return 0
        }
      });
      mostrarLista(listaFiltrada);
    }else{
      jsonData.products.sort ((obj1,obj2)=> {
        if (obj1.name<obj2.name){
          return -1
        }
        if (obj1.name>obj2.name){
          return 1
        }else{
          return 0
        }
      });
      mostrarLista(jsonData.products);
    }
   
   }


   function ordenarPorDesc (){
    if (listaFiltrada.length>0){
      listaFiltrada.sort ((obj1,obj2)=> {
        if (obj1.name>obj2.name){
          return -1
        }
        if (obj1.name<obj2.name){
          return 1
        }else{
          return 0
        }
      });
      mostrarLista(listaFiltrada);
    }else{
      jsonData.products.sort ((obj1,obj2)=> {
        if (obj1.name>obj2.name){
          return -1
        }
        if (obj1.name<obj2.name){
          return 1
        }else{
          return 0
        }
      });
      mostrarLista(jsonData.products);
    }
   
   } 

   function limpiarFiltros(){
    listaFiltrada = [];
    document.getElementById("rangeFilterCountMin").value= "";
    document.getElementById("rangeFilterCountMax").value= "";

    mostrarLista(jsonData.products);
   }

  
