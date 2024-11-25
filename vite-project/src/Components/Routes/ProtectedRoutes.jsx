import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

// see https://www.robinwieruch.de/react-router-private-routes/
function ProtectedRoute({ redirectPath = '/login', adminOnly = false, children }) {
    const { email, isAdmin } = useContext(UserContext);
    
    if (!email) {
        return <Navigate to={redirectPath} replace />;
        
    }
        // Redirect to home page (or any other page) if adminOnly and user is not an admin
        if (adminOnly && !isAdmin) {
            return <Navigate to="/" replace />;
        }

    return children ? children : <Outlet/>;
    /* return <div>{email}</div> */
}

export default ProtectedRoute