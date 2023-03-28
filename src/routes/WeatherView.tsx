import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
    cityName: string;
    latitude: number;
    longitude: number;
};

const getWheatherData = async (props: Props) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { data } = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${props.latitude}&longitude=${props.longitude}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&windspeed_unit=ms&timezone=${timezone}&current_weather=true`
    );
    return data;
};

export function WeatherView(props: Props) {
    const weatherQuery = useQuery(
        [{ latitude: props.latitude, longitude: props.longitude }],
        () => getWheatherData(props)
    );

    const weatherCode = new Map();
    weatherCode.set(0, "Clear sky");
    weatherCode.set(1, "Mainly clear");
    weatherCode.set(2, "partly cloudy");
    weatherCode.set(3, "overcast");
    weatherCode.set(45, "fog");
    weatherCode.set(48, "depositing rime fog");
    weatherCode.set(51, "Drizzle: Light");
    weatherCode.set(53, "Drizzle: moderate");
    weatherCode.set(55, "Drizzle: dense intensity");
    weatherCode.set(56, "Freezing Drizzle: Light");
    weatherCode.set(57, "Freezing Drizzle: dense intensity");
    weatherCode.set(61, "Rain: Slight");
    weatherCode.set(63, "Rain: moderate");
    weatherCode.set(65, "Rain: heavy intensity");
    weatherCode.set(66, "Freezing Rain: Light");
    weatherCode.set(67, "Freezing Rain: heavy intensity");
    weatherCode.set(71, "Snow fall: Slight");
    weatherCode.set(73, "Snow fall: moderate");
    weatherCode.set(75, "Snow fall: heavy intensity");
    weatherCode.set(77, "Snow grains");
    weatherCode.set(80, "Rain showers: Slight");
    weatherCode.set(81, "Rain showers: moderate");
    weatherCode.set(82, "Rain showers: violent");
    weatherCode.set(85, "Snow showers slight");
    weatherCode.set(86, "Snow showers heavy");
    weatherCode.set(95, "Thunderstorm: Slight or moderate");
    weatherCode.set(96, "Thunderstorm with slight");
    weatherCode.set(99, "Thunderstorm with heavy hail");

    if (weatherQuery.isError) {
        return (
            <div className="alert alert-error shadow-lg">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Error! {JSON.stringify(weatherQuery.error)}</span>
                </div>
            </div>
        );
    }

    if (weatherQuery.isLoading)
        return (
            <div className="flex justify-center align-center h-100vh">
                <button className="btn btn-square loading"></button>
            </div>
        );

    // return <div>weather{JSON.stringify(weatherQuery.data)}</div>;
    return (
        <div>
            <section className="mt-5 flex flex-col justify-center items-center gap-7 pb-20">
                <div className="text-4xl">{props.cityName}</div>
                <div className="text-6xl flex">
                    {weatherQuery.data.current_weather.temperature + " "}
                    <span className="text-2xl self-start">°C</span>
                </div>
                <div>
                    {`${weatherQuery.data.daily.temperature_2m_min[0]}`}
                    <span className="opacity-50">
                        {` / ${weatherQuery.data.daily.temperature_2m_max[0]}°C`}
                    </span>
                </div>

                <div>
                    {weatherCode.get(
                        weatherQuery.data.current_weather.weathercode
                    )}
                </div>
            </section>
            <section className="px-5">
                <ul className="flex gap-5 pb-5 overflow-x-scroll overflow-hidden scrollbar scrollbar-thumb-gray-100 scrollbar-track-transparent scrollbar-thumb-rounded-md">
                    {weatherQuery.data.hourly.time.map(
                        (item: string, ind: number) => {
                            return (
                                <li className="flex align-center flex-col gap-3 min-w-max text-center">
                                    <div>{item.slice(11)}</div>
                                    <div>
                                        {weatherCode.get(
                                            weatherQuery.data.hourly
                                                .weathercode[ind]
                                        )}
                                    </div>
                                    <div>
                                        {
                                            weatherQuery.data.hourly
                                                .temperature_2m[ind]
                                        }
                                        °C
                                    </div>
                                </li>
                            );
                        }
                    )}
                </ul>
            </section>
            <section className="py-5">
                <ul className="flex flex-col px-5">
                    <div className="divider"></div>
                    {weatherQuery.data.daily.time.map(
                        (item: string, ind: number) => {
                            const date = new Date(item);

                            return (
                                <>
                                    <li className="flex px-5 justify-between">
                                        <div>
                                            {date.getDate() +
                                                " " +
                                                date.toLocaleString("en-US", {
                                                    month: "short",
                                                })}
                                        </div>
                                        <div>
                                            {weatherCode.get(
                                                weatherQuery.data.daily
                                                    .weathercode[ind]
                                            )}
                                        </div>
                                        <div>
                                            {
                                                weatherQuery.data.daily
                                                    .temperature_2m_min[ind]
                                            }
                                            <span className="opacity-50">
                                                {`/${weatherQuery.data.daily.temperature_2m_max[ind]} °C`}
                                            </span>
                                        </div>
                                    </li>
                                    <div className="divider"></div>
                                </>
                            );
                        }
                    )}
                </ul>
            </section>
        </div>
    );
}
