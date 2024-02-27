import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Block from "../../components/Block/Block";
import { socket, isSocketConnected } from "../../socketConnection";
import { X, O } from "../../ColorConstants";
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
    const [winnerSide, setWinnerSide] = useState();
    const refMe = useRef();
    const opponentRef = useRef();

    const showGameResult = (data) => {
        if (data.tie) {
            setResultMessage("Its A Tie.");
        }
        if (data.winner) {
            setWinnerBlocks(data.blocks);
            setWinnerSide(data.side);
            const mySide = refMe.current.innerHTML.split(':')[1].trim();
            const opponentPlayer = opponentRef.current.innerHTML.split(':');
            if (data.side === mySide) {
                setResultMessage("You Won");
            }
            else if (data.side === opponentPlayer[1].trim()) {
                setResultMessage(`${opponentPlayer[0]} Won.`);
            }
        }
        setHasGameResult(true);
        setMyChance(false);
    }

    const handleOpponentDisconnection = () => {
        setHasGameResult(true);
        setMyChance(false);
        setResultMessage("Opponent Disconnected. You Won");
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
        if (isSocketConnected) {
            socket.on("game-result", data => showGameResult(data));
            socket.on("opponent-disconnected", handleOpponentDisconnection);
        }
    }, []);

    return (
        <div className="game">
            <div className="game--players">
                <p
                    id="me"
                    ref={refMe}
                    style={myChance && !hasGameResult ? me?.side === "x" ? { backgroundColor: X } : me?.side === "o" ? { backgroundColor: O } : {} : {}}
                >{me?.username} : {me?.side}</p>
                <p
                    id="opponent"
                    ref={opponentRef}
                    style={!myChance && !hasGameResult ? opponent?.side === "x" ? { backgroundColor: X } : opponent?.side === "o" ? { backgroundColor: O } : {} : {}}
                >{opponent?.username} : {opponent?.side}</p>
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
                        hasGameResult={hasGameResult}
                        winnerSide={winnerSide}
                    />
                )}
            </div>
            {hasGameResult && <h1
                className="game--resultMessage"
                style={winnerSide === "x" ? { color: X } : winnerSide === "o" ? { color: O } : {}}
            >{resultMessage}</h1>}
        </div>
    )
}

export default Game;