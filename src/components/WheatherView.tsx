import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
    latitude: number;
    longtitude: number;
};

const getWheatherData = async (props: Props) => {
    const { data } = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${props.latitude}&longitude=${props.longtitude}&current_weather=true`
    );
    return data;
};

export function WheatherView(props: Props) {
    const weatherQuery = useQuery(
        [{ latitude: props.latitude, longitude: props.longtitude }],
        () => getWheatherData(props)
    );

    if (weatherQuery.isError) return <div>Ошибка Загрузки</div>;
    if (weatherQuery.isLoading) return <div>Загрузка</div>;
    return <div>weather{JSON.stringify(weatherQuery.data)}</div>;
}
