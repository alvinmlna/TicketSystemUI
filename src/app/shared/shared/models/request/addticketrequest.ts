export interface addticketrequest {
    userId: number;
    productId: number;
    categoryId: number;
    priorityId: number;
    summary: string;
    description: string;
    attachments: any[];
}