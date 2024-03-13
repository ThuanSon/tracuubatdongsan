import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
    name: string;
    email: string;
    mobile: string;
    id: string;
    create_at: string;
    updated_at: string;
};

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data when component mounts
        // getUsers();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost/api/auth.php', formData);
            const validUser = response.data; // Assuming the response contains user data
            if (validUser) {
                sessionStorage.setItem('username', validUser.username);
                // console.log(validUser.email);
                navigate('/dashboard');
            } else {
                alert('Sai thông tin đăng nhập');
            }
        } catch (error: any) {
            console.error("An error occurred:", error);
            setError(error.response?.data.message || "An error occurred");
        }
    };

    const handleClickSignUp = () => {
        navigate('/user/create');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <h1 className="Auth-form-title">Đăng nhập</h1>
            <form className="Auth-form" onSubmit={handleSubmit}>
                <table cellSpacing={10}>
                    <tbody>
                        <tr>
                            <th>
                                <label htmlFor="email">Email: </label>
                            </th>
                            <td>
                                <input className="form-control" type="text" name="email" value={formData.email} onChange={handleChange} /> <br />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor="password">Password: </label>
                            </th>
                            <td>
                                <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} /> <br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" className="btn btn-primary"> Đăng nhập</button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={handleClickSignUp}> Đăng ký</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
};
