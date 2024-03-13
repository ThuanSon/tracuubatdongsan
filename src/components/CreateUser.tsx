import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./CreateUser.css"; // Import CSS file

export const CreateUser = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(inputs);
        axios.post(
            'http://localhost/api/user/save',
            inputs
        );
        navigate('/');
    }
    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleClickLogin = () => {
        navigate('/user/authentication')
    }
    return (
        <>
            <h1 className="Auth-form-title">Đăng ký</h1>
            <form className="Auth-form" onSubmit={handleSubmit}>
                <table cellSpacing={10}>
                    <tbody>
                        <tr>
                            <th>
                                <label htmlFor="name">Name: </label>
                            </th>
                            <td>
                                <input className="form-control" type="text" name="name" onChange={handleChange}/> <br />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor="email">Email: </label>
                            </th>
                            <td>
                                <input className="form-control" type="text" name="email" onChange={handleChange}/> <br />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor="mobile">Mobile: </label>

                            </th>
                            <td>
                                <input className="form-control" type="text" name="mobile" onChange={handleChange}/> <br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-primary"> Save</button>

                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={handleClickLogin}> Đăng nhập</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}
