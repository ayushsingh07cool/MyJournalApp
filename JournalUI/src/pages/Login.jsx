import './Login.css';
import { useContext, useState } from 'react';
import API from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/public/login', {
                userName: username,
                password: password
            });

            login(response.data);

            navigate('/journal-dashboard');

        } catch (error) {
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="login-container">

            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;