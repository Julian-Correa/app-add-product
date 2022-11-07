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
        document.getElementById('product-form').reset();
    }



    deleteProduct(element) {
        if (element.name ==='delete') {
            element.parentElement.parentElement.parentElement.remove()
        }

     
         

    };

    showMessage(message, cssClass) {
        const div= document.createElement('div');
        div.className= 'alert alert-'+ cssClass ; 'mt-4';
        div.appendChild(document.createTextNode(message));
        //show in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
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
   ui.deleteProduct();
   ui.showMessage('producto agregado correctamente', 'bg-success');

   

 evento.preventDefault();
});

document.getElementById('product-list').addEventListener('click',function(e){
   const ui =new UI();
   ui.deleteProduct(e.target)
});




