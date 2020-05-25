export interface EditUserInfo {
  name_surname: string;
  password?: string;
  duplicate_password?: string;
  age: number;
  sex: string;
  id?: number;
  photoURL?: string;
}
