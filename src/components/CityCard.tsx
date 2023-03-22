export type Props = {
    countryCode: string;
    cityName: string;
    latitude: number;
    longitude: number;
    elevation: number;
    population: number;
    location: string;
};

export function CityCard(props: Props) {
    return (
        <div className="card card-compact w-96 bg-base-200 p-3 drop-shadow-xl">
            <figure>
                <img
                    className="m-w-360 w-auto h-auto rounded-2xl"
                    src={
                        "https://flagcdn.com/h240/" +
                        props.countryCode.toLowerCase() +
                        ".png"
                    }
                    // height="240"
                    alt={"country code " + props.countryCode}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.cityName}</h2>
                <div>
                    Longitude: {props.longitude} Latitude: {props.latitude}
                </div>
                <div>Elevetion above sea level: {props.elevation} m.</div>
                <div>Population: {props.population}</div>
                <div>Location: {props.location}</div>
            </div>
        </div>
    );
}
