import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Vendor } from '../../../shared/models/vendor';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getCurrentVendor, getVendors, getError } from '../../../shared/state/vendors/vendor.reducer';
import { VendorPageActions } from '../../actions';

@Component({
  selector: 'pm-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  pageTitle = 'Vendors';
  errorMessage$: Observable<string>;

  vendors$: Observable<Vendor[]>;
  // Used to highlight the selected vendor in the list
  selectedVendor$: Observable<Vendor>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    this.vendors$ = this.store.select(getVendors);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(VendorPageActions.loadVendors());

    this.selectedVendor$ = this.store.select(getCurrentVendor);
  }

  vendorSelected(vendor: Vendor): void {
    this.store.dispatch(VendorPageActions.setCurrentVendor({ currentVendorId: vendor.id }));
  }

}
