export interface EventsInterface {
    id:          number;
    title:       string;
    price:       string;
    site:        string|null;
    country:     string;
    city:        string;
    description: string;
    saleIn:      string|null;
    category:    string;
    dateEvent:   Date;
    storeId:     number;
    suspended:   boolean;
    createdAt:   Date;
    updatedAt:   Date;
}
