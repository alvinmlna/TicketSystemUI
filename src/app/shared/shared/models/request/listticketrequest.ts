export interface ListTicketRequest {
    summary: string;
    productId: number[];
    categoryId: number[];
    priorityId: number[];
    statusId: number[];
    raisedBy: number[];
}