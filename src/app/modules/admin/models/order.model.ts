export interface OrderModel {
  id: number;
  user_id: number;
  good_type: string;
  good_id: number;
  count: number;
  price: number;
  where_send: string;
  sending_status: number;
  orderedAt: number;
}
