// import "./App.css";
// import { GeocodingView } from "./routes/GeocodingView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GeocodingView } from "./routes/GeocodingView";
import { WeatherView, loader as loaderWV } from "./routes/WeatherView";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/Error-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GeocodingView />,
        errorElement: <ErrorPage />,
    },
    {
        path: "WeatherView/:cityName/:latitude/:longitude",
        element: <WeatherView />,
        loader: loaderWV,
    },
]);

const queryClient = new QueryClient();

function App() {
    return (
        <div id="root">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
