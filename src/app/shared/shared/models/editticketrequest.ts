export interface editticketrequest {
    ticketId: number;
    assignedToId: number | null;
    productId: number;
    categoryId: number;
    priorityId: number;
    statusId: number;
}