// import "./App.css";
// import { GeocodingView } from "./routes/GeocodingView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherView } from "./routes/WeatherView";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <div>Hello world!</div>,
//     },
// ]);

const queryClient = new QueryClient();

function App() {
    return (
        <div id="root">
            <QueryClientProvider client={queryClient}>
                <WeatherView
                    latitude={52.52}
                    longitude={13.41}
                    cityName={"Berlin"}
                />
            </QueryClientProvider>
        </div>
    );
}

export default App;
