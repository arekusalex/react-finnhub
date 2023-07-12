import {Button, Checkbox, Form, Input, InputNumber, Select, SelectProps} from 'antd';
import {StockData} from "../interfaces/StockData";
import {useState} from "react";

interface LeftFormProps {
    stocks: StockData[];
    onStockChange: (stock: string) => void;
    onAlertChange: (alert: number) => void;
}


const LeftForm = (props: LeftFormProps) => {
    const {stocks, onStockChange, onAlertChange} = props;

    const [selectedStock, setSelectedStock] = useState<string>('');
    const [alertPrice, setAlertPrice] = useState<number>(0);

    const options: SelectProps['options'] = [];
    stocks.map(stock => {
        options.push({
            value: stock.symbol,
            label: `${stock.symbol} - ${stock.name}`,
        });
    });

    const handleStockChange = (value: string) => {
        setSelectedStock(value);
    };

    const handleAlertChange = (value: number | null) => {
        setAlertPrice(value!);
    };

    const onFinish = (values: any) => {
        const {alertPrice, selectedStock} = values;
        onStockChange(selectedStock);
        onAlertChange(alertPrice);
    };

    return(
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Stock"
                name="selectedStock"
                rules={[{ required: true, message: 'Please select a stock!' }]}
            >
                <Select
                    style={{ width: 360 }}
                    onChange={handleStockChange}
                    options={options}
                />
            </Form.Item>
            <Form.Item
                label="Alert Price"
                name="alertPrice"
                rules={[{ required: true, message: 'Please input the alert price!' }]}
            >
                <InputNumber onChange={handleAlertChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LeftForm;