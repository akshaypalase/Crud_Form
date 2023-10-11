import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  baseUrl:string='http://localhost:3000/product/'
  //add data to json server
  addProduct(product:any){
   return this.http.post(this.baseUrl,product)
  }

  //get product from json server
  getAllProduct(){
    return this.http.get(this.baseUrl)
  }

  //delete product from json server
  deleteProduct(productId:any){
   return this.http.delete(this.baseUrl+productId)
  }

  //edit or update existing data using put method
  updateProduct(productId:any,product:any){
    return this.http.put(this.baseUrl+productId,product)
  }
}
