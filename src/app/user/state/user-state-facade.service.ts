import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserPageActions } from './actions';
import { getMaskUserName } from './user.reducer';

@Injectable({
    providedIn: 'root',
})
export class UserStateFacadeService {
    maskUserName$: Observable<boolean> = this.store.select(getMaskUserName);

    constructor(private store: Store) {}

    maskUserName(): void {
        this.store.dispatch(UserPageActions.maskUserName());
    }
}
