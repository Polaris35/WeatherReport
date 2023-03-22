type Props = {
    countryCode: string;
    cityName: string;
    latitude: number;
    longtitude: number;
    elevation: number;
    population: number;
    location: string;
};

export function CityCard(props: Props) {
    return (
        <div className="card card-compact w-96 bg-base-100 p-3 shadow-xl">
            <figure>
                <img
                    className="card"
                    src={
                        "https://flagcdn.com/h240/" +
                        props.countryCode.toLowerCase() +
                        ".png"
                    }
                    height="240"
                    alt={"country code " + props.countryCode}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.cityName}</h2>
                <div>
                    Longtitude: {props.longtitude} Latitude: {props.latitude}
                </div>
                <div>Elevetion above sea level: {props.elevation} m.</div>
                <div>Population: {props.population}</div>
                <div>Location: {props.location}</div>
            </div>
        </div>
    );
}
