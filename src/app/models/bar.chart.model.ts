


export interface DataSet {
    color: string;
    data: number[];
    vendor: string;
}

export interface ChartModel {
    data: DataSet[];
    label: string[];
}

export interface BarChartModel {
    total_amount: ChartModel;
    total_amount_subtotal: ChartModel;
    total_tax: ChartModel;
}

export interface BarChartData {
    type: string;
    label: string;
    backgroundColor: string;
    data: number[];
}