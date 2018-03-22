import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';

import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private productsUrl = 'api/products';
    private products: IProduct[];

    private _currentProduct: IProduct | null;
    get currentProduct(): IProduct | null {
      return this._currentProduct;
    }

    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
      // When getting all products, clear the current product
      this._currentProduct = null;
      if (this.products) {
          return of(this.products);
      }
      return this.http.get<IProduct[]>(this.productsUrl)
                      .pipe(
                          tap(data => console.log(JSON.stringify(data))),
                          tap(data => this.products = data),
                          catchError(this.handleError)
                      );
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
          this._currentProduct = this.initializeProduct();
          return of(this.currentProduct);
        }
        if (this.products) {
            const foundItem = this.products.find(item => item.id === id);
            if (foundItem) {
              this._currentProduct = foundItem;
              console.log(this._currentProduct);
              return of(this.currentProduct);
            }
        }
        // TODO: When handling a deep link, the products are not yet
        //       set and this code returns nothing. Need to fix.
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (product.id === 0) {
            return this.createProduct(product, headers);
        }
        return this.updateProduct(product, headers);
    }

    deleteProduct(id: number): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<IProduct>(url, { headers: headers} )
                        .pipe(
                            tap(data => console.log('deleteProduct: ' + id)),
                            tap(data => {
                                const foundIndex = this.products.findIndex(item => item.id === id);
                                if (foundIndex > -1) {
                                    this.products.splice(foundIndex, 1);
                                    this._currentProduct = null;
                                }
                            }),
                            catchError(this.handleError)
                        );
    }

    private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
      // Make a copy so changing the id does not affect change detection
      // id must be set to null for the in-memory web api
      const productToSave = Object.assign({}, product);
      productToSave.id = null;
      return this.http.post<IProduct>(this.productsUrl, productToSave,  { headers: headers} )
                      .pipe(
                          tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                          tap(data => {
                              this.products.push(data);
                              this._currentProduct = data;
                          }),
                          catchError(this.handleError)
                      );
    }

    private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<IProduct>(url, product, { headers: headers} )
                        .pipe(
                            tap(data => console.log('updateProduct: ' + product.id)),
                            catchError(this.handleError)
                        );
    }

    private initializeProduct(): IProduct {
        // Return an initialized object
        return {
            'id': 0,
            productName: '',
            productCode: '',
            category: '',
            tags: [],
            releaseDate: '',
            price: 0,
            description: '',
            starRating: 0,
            imageUrl: ''
        };
    }

    private handleError(err: HttpErrorResponse): ErrorObservable {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        console.error(err);
        return new ErrorObservable(errorMessage);
    }

}
