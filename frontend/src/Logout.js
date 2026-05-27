import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate("/login");
    }, []);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
}