export interface discussion {
    discussionId: number | null
    dateSending: string | null
    message: string
    userId: number
    ticketId: number,
    name : string | null,
    imagePath : string | null,
    attachments: any[];
    attachmentViews: DiscussionAttachmentView[] | null
  }
  
  export interface DiscussionAttachmentView {
    attachmentId: number;
    filename: string;
    serverFileName: string;
    fileSize: number;
    dateAdded: string;
    discussionId: number;
}