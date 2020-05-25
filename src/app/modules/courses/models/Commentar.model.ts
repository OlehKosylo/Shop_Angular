export interface CommentModel {
  id?: number;
  userId?: number;
  text: string;
  ownerName: string;
  statusForDeleteView: number;
}
