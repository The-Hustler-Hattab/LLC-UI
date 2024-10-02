

export interface LLCIncome {
    id: number;
    source: string;
    gross_revenue: number;
    tax: number;
    net_revenue: number;
    comment?: string; // Optional field
    proof_of_income_file_path?: string; // Optional field
    created_at: string;
    created_by: string;
    received_at: string;
  }
  