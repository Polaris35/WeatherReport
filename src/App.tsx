// import "./App.css";
import { GeocodingView } from "./routes/GeocodingView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
                <GeocodingView />
            </QueryClientProvider>
        </div>
    );
}

export default App;
