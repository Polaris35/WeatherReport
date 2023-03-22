import { useState } from "react";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { WheatherView } from "./WheatherView";
import axios, { AxiosRequestConfig } from "axios";
import { CityCard } from "../components/CityCard";

const getgeoData = async (name: string) => {
    const { data } = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}`
    );
    return data;
};

export function GeocodingView() {
    const [name, setName] = useState("");

    // Queries
    const geoRequest = useQuery({
        queryKey: ["geoData", { name: name }],
        queryFn: () => getgeoData(name),
        refetchOnWindowFocus: false,
        enabled: false,
    });

    // if (geoRequest.isSuccess) {
    //     const requestResult = geoRequest.data.results[0];
    //     return (
    //         <WheatherView
    //             latitude={requestResult.longitude}
    //             longtitude={requestResult.longitude}
    //         />
    //     );
    // }

    return (
        <>
            <div className="flex justify-center gap-2 mt-6">
                <input
                    type="text"
                    placeholder="Type city name here"
                    className="input input-bordered w-full max-w-xs"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    className="btn btn-circle btn-outline"
                    onClick={() => {
                        geoRequest.refetch();
                    }}
                >
                    <img src="public\search-icon.svg" className="w-6 h-6" />
                </button>
            </div>
            <div className="grid grid-cols-3 auto-rows-max place-items-center gap-3 p-3">
                {geoRequest.isSuccess ? (
                    geoRequest.data.results.map((item: any) => {
                        return (
                            <CityCard
                                countryCode={item.country_code}
                                cityName={item.name}
                                latitude={item.latitude}
                                longitude={item.longitude}
                                elevation={item.elevation}
                                population={item.population}
                                location={
                                    item.admin1 +
                                    ", " +
                                    (item.admin2 ?? "") +
                                    " " +
                                    (item.admin3 ?? "") +
                                    " " +
                                    (item.admin4 ?? "")
                                }
                            />
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
