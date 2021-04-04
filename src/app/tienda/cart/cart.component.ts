import { Component, Input, OnInit } from '@angular/core';
import { estado } from 'src/app/model/Enums';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input()
  cartProducts: any[];

  total:number;
  cantidad:number;
  constructor() {

  }

  ngOnInit() {
    let cartData = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    this.cartProducts=cartData;
  }
  emptyCart(uuid) {
    let cartData = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    for(var i = cartData.length - 1; i >= 0; i--) {
      if(cartData[i].uuid==uuid ) {
        cartData.splice(cartData[i],1);
      }
  }
    this.cartProducts=cartData;
    localStorage.setItem('cart', JSON.stringify(cartData));

  }
  checkout() {
    var state = document.getElementById("state");
    state.style.backgroundColor="green"
    let cartData = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    this.total=0;

    for(var i = cartData.length - 1; i >= 0; i--) {
    
      if (cartData[i].state==="Completado") {
        break;
      }else{
        for(var j = this.cartProducts.length - 1; j >= 0; j--) {
  
          this.cantidad=this.cartProducts[j].quantity;
           }
        cartData[i].quantity=this.cantidad;
        cartData[i].state=estado.Completado;
  
        this.total=this.total+Number(cartData[i].price)* this.cantidad;
          console.log(this.total);
      }
 
     
  }

    this.cartProducts=cartData;
    localStorage.setItem('cart', JSON.stringify(cartData));

  }
  
}
