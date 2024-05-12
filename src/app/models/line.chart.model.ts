
export interface LineHorizantalChartDataItem {
    borderColor: string;
    data: number[];
    label: string[];
}

export interface LineHorizantalChartData {
    total_amount: LineHorizantalChartDataItem;
    total_amount_subtotal: LineHorizantalChartDataItem;
    total_tax: LineHorizantalChartDataItem;
}
