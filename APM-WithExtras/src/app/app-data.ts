import { InMemoryDbService } from 'angular-in-memory-web-api';

import { productData } from './shared/models/product-data';
import { vendorData } from './shared/models/vendor-data';

export class AppData implements InMemoryDbService {

    createDb() {
        return { products: productData, vendors: vendorData };
    }
}
