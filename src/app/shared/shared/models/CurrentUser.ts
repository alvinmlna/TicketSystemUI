export interface CurrentUser {
    userId :  number | null;
    email: string | null;
    displayName : | null;
    imagePath : string | null;
    token : string;
    roleId : string | null;
}