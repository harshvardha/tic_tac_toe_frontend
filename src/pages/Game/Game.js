import { useState } from "react";
import "./Game.css";

const Game = () => {
    const [token, setToken] = useState("o")

    return (
        <div className="game">
            <div className="game--players">
                <p id="player1">DRAWNZER</p>
                <p id="player2">JAYDEV</p>
            </div>
            <div className="game--board">
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
                <input
                    id="element"
                    type="text"
                    onClick={(event) => {
                        if (event.target.value === "")
                            event.target.value = token
                    }}
                    readOnly
                />
            </div>
        </div>
    )
}

export default Game;