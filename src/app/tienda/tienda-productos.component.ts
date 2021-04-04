import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/Product';
import { HttpClientService } from '../service/http-client.service';
import { tipoProducto } from '../model/Enums';
import { estado } from '../model/Enums';

@Component({
  selector: 'app-tienda-productos',
  templateUrl: './tienda-productos.component.html',
  styleUrls: ['./tienda-productos.component.css']
})
export class TiendaProductosComponent implements OnInit {
  products: Array<Product>;
  productsRecieved: Array<Product>;

  cartProducts: any[];

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    let data = localStorage.getItem('cart');
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
    } else {
      this.cartProducts = [];
    }
  }
  handleSuccessfulResponse(response) {
    this.products = new Array<Product>();
    this.productsRecieved = response;
    for (const product of this.productsRecieved) {

      const productwithRetrievedImageField = new Product();
      productwithRetrievedImageField.uuid = product.uuid;
      productwithRetrievedImageField.name = product.name;
      productwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + product.picByte;
      productwithRetrievedImageField.sku = product.sku;
      productwithRetrievedImageField.description = product.description;
      productwithRetrievedImageField.quantity=1;
      if(product.productType.match(tipoProducto.Descuento)){
        productwithRetrievedImageField.discountPrice = product.price/2;
      }else{
        productwithRetrievedImageField.discountPrice = product.price;

      }
      productwithRetrievedImageField.state = estado.Pendiente;
      productwithRetrievedImageField.total = 0;
      productwithRetrievedImageField.productType = product.productType;
      productwithRetrievedImageField.price = product.price;

      productwithRetrievedImageField.picByte = product.picByte;
      this.products.push(productwithRetrievedImageField);
    }
  }

  addToCart(productId) {
    let product = this.products.find(product => {
        return product.uuid === productId;
    });
    if (product.isAdded ) {
      for(var i = this.cartProducts.length - 1; i >= 0; i--) {
        if (this.cartProducts[i].uuid==product.uuid) {
          this.cartProducts[i].quantity=+product.quantity;
        }
            }
      return;
    }else{
      let cartData = [];
      let data = localStorage.getItem('cart');
      if (data !== null) {
        cartData = JSON.parse(data);
      }
   
      cartData.push(product);
      this.updateCartData(cartData);
      localStorage.setItem('cart', JSON.stringify(cartData));
      product.isAdded = true;
    }
  }
  updateCartData(cartData) {
    this.cartProducts = cartData;
    }
  goToCart(cartProducts) {
    this.router.navigate(['shop', 'cart'], { queryParams: {cartProducts, action: 'view' } });
  }
  emptyCart() {
    this.cartProducts = [];
    localStorage.clear();
    this.ngOnInit();

  }
  descuento(productId):boolean {
    let product = this.products.find(product => {
      return product.uuid === productId;
  });
    if (product.productType==="1") {
      return true;
    }else{
      return false;
    }

    }
}



