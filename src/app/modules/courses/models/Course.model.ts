export interface CourseModel {
  id?: number;
  title: string;
  description: string;
  price: number;
  publicKey?: string;
  genre?: string;
  downloadURL?: string;
  statusForCheckIfUserHasThisCourse?: number;
}
