export interface UserInterface {
    id:           number | null;
    name:         string | null;
    lastname:     string | null;
    email:        string | null;
    profile:      string | null;
    password:     string | null;
    phone:        string | null;
    status:       string | null;
    suspended:    boolean | null;
    confirmToken: string|null;
    createdAt:    Date | null;
    updatedAt:    Date | null;
    token:        string | null;
}