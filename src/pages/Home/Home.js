import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket, isSocketConnected } from "../../socketConnection";
import "./Home.css";

const Home = () => {
    const [username, setUsername] = useState("");
    const [searchingForOpponent, setSearchingForOpponent] = useState(false);
    const navigateTo = useNavigate();

    const searchForOpponent = async () => {
        try {
            if (isSocketConnected) {

                // emit event `ready_to_play` with username to server
                socket.emit("ready_to_play", {
                    username: username
                });

                // 'created-room' event is recieved if no empty lobby was present so server creates on for you and waits for someone to join
                socket.on("created-room", data => {
                    if (data.message === "waiting for opponent") {
                        setSearchingForOpponent(true);
                    }
                });

                // 'game-starting' event is recieved when someone joins the lobby user created
                socket.on("game-starting", data => {
                    setSearchingForOpponent(false);
                    navigateTo("/game", {
                        state: {
                            players: data,
                            playerNo: 1
                        }
                    });
                });

                // 'joined-room' event is recieved when user joins lobby created by some other user who is waiting for a player to join
                socket.on("joined-room", data => {
                    setSearchingForOpponent(false);
                    navigateTo("/game", {
                        state: {
                            players: data,
                            playerNo: 2
                        }
                    })
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="home">
            <h1 id="title">TIC-TAC-TOE</h1>
            <div className="home--username">
                <h1 style={{ color: "red" }}>Type Username</h1>
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                {searchingForOpponent ? <p>Waiting for opponent...</p> : <button type="button" id="search_game_button" onClick={searchForOpponent}>search for game</button>}
            </div>
        </div>
    )
}

export default Home;