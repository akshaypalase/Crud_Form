import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){
    this.dialog.open(ProductsComponent,{
    width:"70%"
    });
  }
}


