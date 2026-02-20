class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;

    }
}

class UI {
    addProduct(product) {
      const productList = document.getElementById('product-list');
      const element = document.createElement('div')
      element.innerHTML = `
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
            <div class="card-body producto-agregado">
                <strong> Producto : ${product.name} </strong>

                <strong> Precio : ${product.price} </strong>

                 <strong> Año : ${product.year}</strong>

                 <a href="#" class="btn btn-danger"  name="delete">Borrar</a>
            </div>
      </div>
      `;
        productList.appendChild(element);
        
    };

    resetForm(){
        document.getElementById("product-form").reset();
    }



    deleteProduct(element) {
        if (element.name === "delete") {
          const productItem = element.closest(".card");
          const productName = productItem.querySelector("strong:nth-of-type(1)").textContent.replace("Producto : ", "").trim();
          const productPrice = productItem.querySelector("strong:nth-of-type(2)").textContent.replace("Precio : ", "").trim();
          const productYear = productItem.querySelector("strong:nth-of-type(3)").textContent.replace("Año : ", "").trim();
          removeProductFromStorage(productName, productPrice, productYear);
          element.parentElement.parentElement.remove();
          this.showMessage('Producto eliminado correctamente', 'warning')
        }
    };



    showMessage(message, cssClass) {
        const div= document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //show in DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#app");
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    };
}

const getProductsFromStorage = () => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

const addProductToStorage = (product) => {
  const products = getProductsFromStorage();
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
};

const removeProductFromStorage = (name, price, year) => {
  const products = getProductsFromStorage();
  const updatedProducts = products.filter(
    (product) =>
      product.name !== name ||
      product.price !== price ||
      product.year !== year
  );
  localStorage.setItem("products", JSON.stringify(updatedProducts));
};

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  getProductsFromStorage().forEach((product) => ui.addProduct(product));
});

//DOM Events
document.getElementById('product-form')
.addEventListener('submit', function(evento){
  evento.preventDefault();
   const name = document.getElementById('name').value;
   const price = document.getElementById('price').value;
   const year = document.getElementById('year').value;
  

   const product = new Product(name, price, year);

   const ui = new UI();

   if (name === ''|| price === ''|| year ==='') {
    return ui.showMessage('Todos los campos son obligatorios','danger')
   }
   ui.addProduct(product);
   addProductToStorage(product);
   ui.resetForm();   
   ui.showMessage("Producto agregado correctamente", "success");

});

document.getElementById('product-list').addEventListener('click',function(e){
   const ui =new UI();
   ui.deleteProduct(e.target)
});



