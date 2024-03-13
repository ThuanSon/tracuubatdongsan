import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type User = {
    name: string;
    email: string;
    mobile: string;
    id: string;
    create_at: string;
    updated_at: string;
};

export const ListUser = () => {
    const [users, setUsers] = useState<User[]>([]); // Initialize as an empty array
    const [error, setError] = useState<string | null>(null); // State for error handling

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost/api/users/');
            setUsers(response.data);
        } catch (error: any) {
            setError(error.response?.data.message || "An error occurred");
        }
    }

    return (
        <>
            <h1>List User</h1>
            {error && <p>{error}</p>} {/* Display error message if there's an error */}
            <table>
                <thead>
                    <tr>
                        <td>Tên</td>
                        <td>Email</td>
                        <td>Điện thoại</td>
                        <td>ID</td>
                        <td>Create_at</td>
                        <td>Update_at</td>
                        <td>Edit</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.id}</td>
                            <td>{user.create_at}</td>
                            <td>{user.updated_at}</td>
                            <td>
                                <Link to={`user/${user.id}/edit`}>edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
