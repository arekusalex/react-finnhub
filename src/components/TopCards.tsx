import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

interface TopCardsProps {
    stockName: string;
    stockValue: number;
    marginChange: number;
    alertPrice: number;
}

const TopCards = (props: TopCardsProps) => {
    const {stockName, stockValue, marginChange, alertPrice} = props;
    const cardStyle = stockValue < alertPrice ? { color: '#3f8600' } : { color: '#3f8600' };
    const arrowDirection = stockValue < alertPrice ? <ArrowDownOutlined /> : <ArrowUpOutlined />

    return(
        <Row gutter={16}>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title={stockName}
                        value={marginChange}
                        precision={2}
                        valueStyle={cardStyle}
                        prefix={arrowDirection}
                        suffix="%"
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default TopCards;