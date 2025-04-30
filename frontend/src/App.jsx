import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import AppRoutes from "./routes";
import AdminRoutes from "./routes/admin";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <AppRoutes />
                <AdminRoutes/>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
