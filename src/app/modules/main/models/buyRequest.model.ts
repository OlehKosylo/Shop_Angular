export interface BuyRequestModel {
  user_id: number;
  good_type: string;
  good_id: number;
  count?: number;
  price: number;
  where_send: string;
  stripeTokenId?: string;
}
