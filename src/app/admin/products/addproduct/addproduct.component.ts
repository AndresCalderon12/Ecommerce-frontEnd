import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  @Input()
  product: Product;

  @Output()
  productAddEvent = new EventEmitter();

  private selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }
  ngOnInit() {
  }
  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event2) => {
      this.imgURL = reader.result;
    };

  }
  saveProduct() {
    if (this.product.uuid == null) {
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;
    console.log(this.product);
    this.httpClient.post('http://localhost:8080/products/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log(this.product);
          this.httpClientService.addProduct(this.product).subscribe(
            (_product) => {
              this.productAddEvent.emit();
              this.router.navigate(['admin', 'products']);
            }
          );
          console.log('Image uploaded successfully');
        } else {
          console.log('Image not uploaded successfully');
        }
      }
      );
  } else{
    this.httpClientService.updateProduct(this.product).subscribe(
      (_product) => {
        this.productAddEvent.emit();
        this.router.navigate(['admin', 'products']);
      }
    );
  }
  }

}
