import {CardModel} from './Card.model';

export interface UserInfo {
  username: string;
  name_surname: string;
  age: number;
  sex: string;
  lvl: string;
  id: number;
  stripe_card_id: string;
  stripe_customer_id: string;
  token_stripe: string;
  card?: CardModel;
  photoURL: string;
  mail?: string;
}
