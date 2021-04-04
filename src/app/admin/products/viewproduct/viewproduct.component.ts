import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  @Input()
  product: Product;

  @Output()
  productDeletedEvent = new EventEmitter();


  constructor(private httpClientService: HttpClientService, private router: Router
    ) { }

    ngOnInit() {
    }
    deleteProduct() {
      this.httpClientService.deleteProduct(this.product.uuid).subscribe(
        (_book) => {
          this.productDeletedEvent.emit();
          this.router.navigate(['admin', 'products']);
        }
      );
    }

    editProduct() {
      this.router.navigate(['admin', 'products'], { queryParams: { action: 'edit', id: this.product.uuid } });
    }
}
