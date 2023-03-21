import "./App.css";
import { GeocodingView } from "./components/GeocodingView";

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
                <GeocodingView />
            </QueryClientProvider>
        </div>
    );
}

export default App;
