// import "./App.css";
// import { GeocodingView } from "./components/GeocodingView";
import { CityCard } from "./components/CityCard";

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <div id="root">
            <QueryClientProvider client={queryClient}>
                <CityCard
                    cityName={"Berlin"}
                    latitude={1.5555}
                    longtitude={54.2323}
                    countryCode={"DE"}
                />
            </QueryClientProvider>
        </div>
    );
}

export default App;
