


export interface BarChartDataSet {
    color: string;
    data: number[];
    vendor: string;
}

export interface BarChartModelItem {
    data: BarChartDataSet[];
    label: string[];
}

export interface BarChartModel {
    total_amount: BarChartModelItem;
    total_amount_subtotal: BarChartModelItem;
    total_tax: BarChartModelItem;
}

export interface BarChartData {
    type: string;
    label: string;
    backgroundColor: string;
    data: number[];
}