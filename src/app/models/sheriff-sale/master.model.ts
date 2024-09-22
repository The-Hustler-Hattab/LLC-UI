import { ChildSherifSale } from "./child.model";

export interface MasterSherifSale {
    id: number;
    file_hash: string;
    file_path: string;
    file_name: string;
    pages_size: number;
    created_at: string; // ISO date string
    created_by: string;
    sheriff_sale_date: string; // ISO date string
    sherif_sale_children: ChildSherifSale[];
  }