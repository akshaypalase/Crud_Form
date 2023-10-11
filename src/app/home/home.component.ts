import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApiService } from '../services/api.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'productName', 'productPrice', 'productColor','productQuantity','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{static:false}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort!: MatSort;
  constructor(private apiservice:ApiService,private dialog:MatDialog) { }

  ngOnInit() {
    this.fetchData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchData(){
      this.apiservice.getAllProduct().subscribe((res:any)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);

      })
  }

  onDelete(productid){
    this.apiservice.deleteProduct(productid).subscribe((res)=>{
        this.fetchData()
    })
  }

  openEditDialog(data:any){
    this.dialog.open(ProductsComponent,{
      width:"70%",
      data:data
    })
  }
}
