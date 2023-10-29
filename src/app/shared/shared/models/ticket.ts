export interface ticket {
    ticketId: number
    ticketIdView: string
    summary: string
    description: string
    assignedToId: number
    assignedTo: string
    raisedDate: string
    expectedDate: string
    userId: number
    raisedBy: string
    productId: number
    product: Product2
    categoryId: number
    category: Category
    priorityId: number
    priority: Priority
    statusId: number
    status: Status
    attachments: any
    attachmentViews: AttachmentView[]
    isExpired : boolean | null
  }
  
  export interface Product2 {
    productId: number
    productName: string
  }
  
  export interface Category {
    categoryId: number
    categoryName: string
  }
  
  export interface Priority {
    priorityId: number
    priorityName: string
    expectedLimit: number
  }
  
  export interface Status {
    statusId: number
    name: string
    statusGroupId: number
  }
  
  export interface AttachmentView {
    attachmentId: number
    filename: string
    serverFileName: string;
    fileSize: number;
    dateAdded: string
    ticketId: number
  }
  
  export interface User {
    userId: number
    name: string
    Email: string
    password: string
    roleid: string
  }