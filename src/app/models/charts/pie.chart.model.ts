export interface PieChartDataItem {
    backgroundColor: string[];
    data: number[];
    hoverBackgroundColor: string[];
    label: string[];
}

export interface PieData {
    total_amount: PieChartDataItem;
    total_amount_subtotal: PieChartDataItem;
    total_tax: PieChartDataItem;
}
