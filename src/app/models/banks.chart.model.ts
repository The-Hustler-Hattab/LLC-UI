export interface Bank {
    id: number;
    institution_id: string;
    institution_name: string;
    accounts: Account[];
    created_by: string;
    created_at: string;
  }
  
  export interface Account {
    id: number;
    account_id: string;
    mask: string;
    name: string;
    type: string;
    subtype: string;
    created_at: string;
  }


    export interface Transaction {
        account_id: string;
        transaction_id: string;
        account_owner: string;
        amount: number;
        authorized_date: string;
        category: string[];
        date: string;
        name: string;
        merchant_name: string;
        payment_channel: string;
        pending: boolean;
        website: string;
    }
    export interface Balance{
        account_id: string;
        balances_available: number;
        balances_current: number;
        mask: string;
        name: string;
        official_name: string;
        subtype: string;
        type: string;
        
    }