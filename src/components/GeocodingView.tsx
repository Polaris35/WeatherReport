import { useState } from "react";

import useSWRMutation from "swr/mutation";
type Args = {
    arg: {
        name: string;
        count: string;
    };
};

async function sendRequest(url: string, { arg }: Args) {
    return fetch(url + "?" + new URLSearchParams(arg), {
        method: "GET",
    }).then((res) => res.json());
}

export function GeocodingView() {
    const [name, setName] = useState("");
    const { trigger, data, isMutating } = useSWRMutation(
        "https://geocoding-api.open-meteo.com/v1/search",
        sendRequest
    );

    return (
        <div>
            <input
                placeholder="city name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                onClick={() => {
                    trigger({ name: name, count: "1" });
                }}
            >
                lets Find!
            </button>
            {!isMutating && <div>{JSON.stringify(data)}</div>}
        </div>
    );
}
