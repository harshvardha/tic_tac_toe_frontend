import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Block from "../../components/Block/Block";
import { socket, isSocketConnected } from "../../socketConnection";
import "./Game.css";

const Game = () => {
    const location = useLocation();
    const [me, setMe] = useState();
    const [opponent, setOpponent] = useState();
    const [myChance, setMyChance] = useState(false);
    const [playerNo, setPlayerNo] = useState();
    const [hasGameResult, setHasGameResult] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [winnerBlocks, setWinnerBlocks] = useState();
    const refMe = useRef();
    const opponentRef = useRef();

    const showGameResult = (data) => {
        console.log(data);
        if (data.tie) {
            setResultMessage("Its A Tie.");
        }
        if (data.winner) {
            setWinnerBlocks(data.blocks);
            const mySide = refMe.current.innerHTML.split(':')[1].trim();
            const opponentPlayer = opponentRef.current.innerHTML.split(':');
            console.log(mySide);
            console.log(opponentPlayer);
            if (data.side === mySide) {
                console.log("You won");
                setResultMessage("You Won");
            }
            else if (data.side === opponentPlayer[1].trim()) {
                console.log(`${opponentPlayer[0]} Won.`);
                setResultMessage(`${opponentPlayer[0]} Won.`);
            }
        }
        setHasGameResult(true);
        setMyChance(false);
    }

    useEffect(() => {
        const players = location.state.players;
        const playerNo = location.state.playerNo;
        setPlayerNo(playerNo);
        if (playerNo === 1) {
            setMe(players[1]);
            setOpponent(players[2]);
            setMyChance(true);
        }
        else if (playerNo === 2) {
            setMe(players[2]);
            setOpponent(players[1]);
        }
        if (isSocketConnected)
            socket.on("game-result", data => showGameResult(data));
    }, []);

    return (
        <div className="game">
            <div className="game--players">
                <p id="me" ref={refMe}>{me?.username} : {me?.side}</p>
                <p id="opponent" ref={opponentRef}>{opponent?.username} : {opponent?.side}</p>
            </div>
            <div className="game--board">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(blockNo =>
                    <Block
                        side={me?.side}
                        blockNo={blockNo}
                        playerNo={playerNo}
                        myChance={myChance}
                        setMyChance={setMyChance}
                        winnerBlocks={winnerBlocks}
                    />
                )}
            </div>
            {hasGameResult && <h1>{resultMessage}</h1>}
        </div>
    )
}

export default Game;