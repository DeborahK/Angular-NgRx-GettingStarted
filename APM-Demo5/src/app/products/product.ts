/* Defines the product entity */
export interface Product {
    id: number | null;
    productName: string;
    productCode: string;
    category: string;
    tags?: string[];
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
}

