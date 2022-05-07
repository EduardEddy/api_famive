export interface StoreInterface {
    id:        number;
    name:      string;
    phone:     string | null;
    address:   string | null;
    schedule:  string | null;
    country:   string | null;
    city:      string | null;
    image:     string | null;
    userId:    number;
    createdAt: Date;
    updatedAt: Date;
}