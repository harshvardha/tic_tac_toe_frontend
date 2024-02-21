import { useState } from "react";
import "./Home.css";

const Home = () => {
    const [username, setUsername] = useState("");

    return (
        <div className="home">
            <h1>Type Username</h1>
            <input
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
        </div>
    )
}

export default Home;