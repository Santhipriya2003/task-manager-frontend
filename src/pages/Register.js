import { useState } from "react";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("MEMBER");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch("http://localhost:8080/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                })
            });

            console.log(response);

            if (response.status === 200) {

                alert("Registration Successful");

            } else {

                alert("Registration Failed");
            }

        } catch (error) {

            console.log("ERROR:", error);

            alert("Server Error");
        }
    };

    return (

        <div>

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <br />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="MEMBER">MEMBER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <br />
                <br />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;
            