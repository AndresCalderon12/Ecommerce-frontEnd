import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';
import { tipoProducto } from 'src/app/model/Enums';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;
  selectedProduct: Product;
  action: string;
  productsReceieved: Array<Product>;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.refreshData();
    
    }
  

  addProduct() {
    this.selectedProduct = new Product();
    this.router.navigate(['admin', 'products'], { queryParams: { action: 'add' } });
  }
  refreshData() {
    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
	const uuid = params['uuid'];
        if (uuid) {
          this.selectedProduct = this.products.find(product => {
            return product.uuid === uuid;
          });
        }
      }
    );
}
handleSuccessfulResponse(response) {
  this.products = new Array<Product>();
  this.productsReceieved = response;
  for (const product of this.productsReceieved) {
  
    const productwithRetrievedImageField = new Product();
    productwithRetrievedImageField.uuid = product.uuid;
    productwithRetrievedImageField.name = product.name;
    productwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + product.picByte;
    productwithRetrievedImageField.price = product.price;
    if(product.productType.match(tipoProducto.Descuento)){
      productwithRetrievedImageField.productType = "Descuento";
    }else{
      productwithRetrievedImageField.productType = "Simple";

    }
    productwithRetrievedImageField.sku = product.sku;
    productwithRetrievedImageField.description = product.description;
    productwithRetrievedImageField.picByte=product.picByte;
    this.products.push(productwithRetrievedImageField);
  }
}
viewProduct(uuid: number) {
  this.router.navigate(['admin', 'products'], { queryParams: { uuid, action: 'view' } });
}
}
