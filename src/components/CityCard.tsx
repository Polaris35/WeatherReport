type Props = {
    countryCode: string;
    cityName: string;
    latitude: number;
    longtitude: number;
};

export function CityCard(props: Props) {
    return (
        <div className="p-3 flex flex-col">
            <img
                className="w-256px h-192px"
                src={
                    "https://flagcdn.com/256x192/" +
                    props.countryCode.toLowerCase() +
                    ".png"
                }
                alt={"country code " + props.countryCode}
            />
            <div className="">123</div>
        </div>
    );
}
