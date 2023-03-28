import { useState } from "react";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { WeatherView } from "./WeatherView";
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
            <div className="form-control mt-6">
                <div className="input-group justify-center">
                    <input
                        type="text"
                        placeholder="Type city name here"
                        className="input input-bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className="btn btn-square"
                        onClick={() => {
                            if (name.length != 0) {
                                geoRequest.refetch();
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
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
