export interface NotebookModel {
  id?: number;
  title: string;
  description: string;
  price: number;
  imageURL?: string;
  screen_diagonal: number;
  processor: string;
  ram: number;
  storage_capacity: number;
  graphics_card: string;
  type_of_goods: string;
}
