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
                <div className="grid gap-3 grid-cols-3">
                    <CityCard
                        cityName={"Berlin"}
                        latitude={1.5555}
                        longtitude={54.2323}
                        countryCode={"DE"}
                        elevation={34}
                        population={3426354}
                        location={"Land Berlin, Berlin, Stadt Berlin"}
                    />
                    <CityCard
                        cityName={"Berlin"}
                        latitude={1.5555}
                        longtitude={54.2323}
                        countryCode={"DE"}
                        elevation={34}
                        population={3426354}
                        location={"Land Berlin, Berlin, Stadt Berlin"}
                    />
                    <CityCard
                        cityName={"Berlin"}
                        latitude={1.5555}
                        longtitude={54.2323}
                        countryCode={"DE"}
                        elevation={34}
                        population={3426354}
                        location={"Land Berlin, Berlin, Stadt Berlin"}
                    />
                </div>
            </QueryClientProvider>
        </div>
    );
}

export default App;
