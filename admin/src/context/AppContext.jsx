import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currency = '$';

    // Set backendUrl to the backend server URL and port
    const backendUrl = "http://localhost:4000";

    const calculateAge = (dob) => {
        if (!dob) return "";
        const today = new Date();
        const birthDate = new Date(dob);
        if (isNaN(birthDate.getTime())) return "";

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 0 ? age : "";
    };

    const slotDateFormat = (dateString) => {
        if (!dateString) return "";
        // Handle custom format "DD_MM_YYYY" with underscores
        const parts = dateString.split('_');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // month is 0-based
            const year = parseInt(parts[2], 10);
            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
            }
        }
        // fallback to default parsing
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const value = {
        calculateAge,
        slotDateFormat,
        currency,
        backendUrl
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
