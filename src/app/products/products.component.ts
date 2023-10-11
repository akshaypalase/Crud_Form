import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   productData:FormGroup
   updateButton='+ ADD'
  constructor(private formbuilder:FormBuilder,private apiService:ApiService,private dialogref:MatDialogRef<ProductsComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit() {
    this.productData=this.formbuilder.group({
      productName:new FormControl('',[Validators.required]),
      productPrice:new FormControl('',[Validators.required]),
      productColor:new FormControl('',[Validators.required]),
      productQuantity:new FormControl('',[Validators.required])
    })
    if(this.editData){
      this.updateButton='Update'
      this.productData.controls['productName'].setValue(this.editData.productName);
      this.productData.controls['productPrice'].setValue(this.editData.productPrice);
      this.productData.controls['productColor'].setValue(this.editData.productColor);
      this.productData.controls['productQuantity'].setValue(this.editData.productQuantity);

    }
    
  }

  onSubmit(product){
    if(!this.editData){
      this.apiService.addProduct(product).subscribe(res=>{
        this.productData.reset()
        this.dialogref.close('add')
      })  
    }else{
      this.updateData(this.editData.id,product)
    }
   
  }
    updateData(id,data){
     this.apiService.updateProduct(id,data).subscribe((res)=>{
      console.log(res);
      
     })
    }
}
