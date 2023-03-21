import { useState } from "react";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { WheatherView } from "./WheatherView";
import axios, { AxiosRequestConfig } from "axios";

const getgeoData = async (name: string) => {
    const { data } = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`
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

    if (geoRequest.isSuccess) {
        const requestResult = geoRequest.data.results[0];
        return (
            <WheatherView
                latitude={requestResult.longitude}
                longtitude={requestResult.longitude}
            />
        );
    }

    return (
        <div>
            <input
                placeholder="city name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                onClick={() => {
                    geoRequest.refetch();
                }}
            >
                lets Find!
            </button>
        </div>
    );
}
