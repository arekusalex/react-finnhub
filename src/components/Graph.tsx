import {Typography} from "antd";

interface GraphProps {
    stockValues: number[];
}

const { Title } = Typography;

const Graph = (props: GraphProps) => {
    const {stockValues} = props;

    return(
        <>
            <Title>Graph</Title>
        </>
    )
}

export default Graph;