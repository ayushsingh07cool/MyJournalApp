import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import JournalDashboard  from '../pages/JournalDashboard';
import LandingPage from '../pages/LandingPage';

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>

                <Route 
                path="/" 
                element={<LandingPage />} />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/journal-dashboard"
                    element={<JournalDashboard />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;