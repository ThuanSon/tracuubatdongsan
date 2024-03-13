import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type User = {
    name: string;
    email: string;
    mobile: string;
    id: string;
    create_at: string;
    updated_at: string;
};

export const EditUser = () => {
    const [inputs, setInputs] = useState<User>({
        name: "",
        email: "",
        mobile: "",
        id: "",
        create_at: "",
        updated_at: ""
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost/api/user/${id}/edit`, inputs);
            navigate('/');
        } catch (error: any) {
            setError(error.response?.data.message || "An error occurred");
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(`http://localhost/api/user/${id}`);
            setInputs(response.data);
        } catch (error: any) {
            setError(error.response?.data.message || "An error occurred");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    return (
        <>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing={10}>
                    <tbody>
                        <tr>
                            <th>
                                <label htmlFor="name">Name: </label>
                            </th>
                            <td>
                                <input type="text" value={inputs.name} name="name" onChange={handleChange} /> <br />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor="email">Email: </label>
                            </th>
                            <td>
                                <input type="text" value={inputs.email} name="email" onChange={handleChange} /> <br />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor="mobile">Mobile: </label>
                            </th>
                            <td>
                                <input type="text" value={inputs.mobile} name="mobile" onChange={handleChange} /> <br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
};
