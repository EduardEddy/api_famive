export interface ProductsInterface {
    id:          number;
    name:        string;
    price:       string;
    description: string;
    storeId:     number;
    category:    string;
    suspended:   boolean;
    createdAt:   Date;
    updatedAt:   Date;
}
