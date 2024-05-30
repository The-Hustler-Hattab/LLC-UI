
export interface Reciept {
    company_name: string;
    created_at: string;
    created_by: string;
    customer_name: string;
    file_path: string;
    id: string;
    invoice_id: string;
    purchased_at: string;
    sub_total: number;
    tax: number;
    total: number;
    vendor: string;
    vendor_address: string;
    spend_type: string;
    sha256: string;
  }