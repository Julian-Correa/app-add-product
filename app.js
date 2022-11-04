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
            </div>
      </div>
      `;
        productList.appendChild(element);
        
    };

    resetForm(){
        document.getElementById('product-form').reset();
    }



    delateProduct() {

    };
    showMessage() {

    };
}

//DOM Events
document.getElementById('product-form')
.addEventListener('submit', function(evento){
   const name = document.getElementById('name').value;
   const price = document.getElementById('price').value;
   const year = document.getElementById('year').value;

   const product = new Product(name, price, year);

   const ui = new UI();
   ui.addProduct(product);
   ui.resetForm();

   

 evento.preventDefault();
});