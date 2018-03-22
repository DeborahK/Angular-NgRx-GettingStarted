import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
    pageTitle: string = 'Products';

    constructor() { }

  ngOnInit() {
  }
}
