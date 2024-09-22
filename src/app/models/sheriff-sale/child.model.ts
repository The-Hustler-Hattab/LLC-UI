import { PropertySherifSale } from "./properties.model";

export interface ChildSherifSale {
    id: number;
    sherif_sale_master_id: number;
    file_hash: string;
    file_path: string;
    file_name: string;
    created_at: string; // ISO date string
    created_by: string;
    sheriff_sale_date: string; // ISO date string
    sherif_sale_properties: PropertySherifSale[];
}