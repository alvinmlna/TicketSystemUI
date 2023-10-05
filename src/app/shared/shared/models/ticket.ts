  export interface ticket {
    summary: string
    description: string
    assignedTo: string
    userId: number
    productId: number
    product: Product
    categoryId: number
    category: Category
    priorityId: number
    priority: Priority
    statusId: number
    status: Status
    attachments: any
    attachmentViews: AttachmentView[]
  }
  
  export interface Product {
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
    dateAdded: string
    ticketId: number
  }
  