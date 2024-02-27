import { useState, useRef, useEffect } from "react";
import { socket, isSocketConnected } from "../../socketConnection";
import { X, O } from "../../ColorConstants";
import "./Block.css";

const Block = ({
    side,
    blockNo,
    playerNo,
    myChance,
    setMyChance,
    winnerBlocks,
    hasGameResult,
    winnerSide
}) => {
    const [blockValue, setBlockValue] = useState("");
    const ref = useRef();

    const sendMove = () => {
        try {
            if (isSocketConnected && myChance) {
                socket.emit("move", {
                    side,
                    blockNo,
                    playerNo
                });
                setBlockValue(side);
                ref.current.disabled = true;
                setMyChance(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setOpponentMove = (data) => {
        if (data.blockNo === blockNo && !myChance) {
            setBlockValue(data.side);
            ref.current.disabled = true;
            setMyChance(true);
        }
    }

    useEffect(() => {
        if (isSocketConnected) {
            socket.on("opponent-move", data => setOpponentMove(data));
        }
    }, [])

    return (
        <>
            <button
                className="block"
                onClick={sendMove}
                ref={ref}
                disabled={hasGameResult ? true : false}
                style={
                    winnerBlocks && (
                        blockNo === winnerBlocks[0] ||
                        blockNo === winnerBlocks[1] ||
                        blockNo === winnerBlocks[2]
                    ) ? winnerSide === "x" ? {
                        backgroundColor: X,
                        color: "white"
                    } : winnerSide === "o" ? {
                        backgroundColor: O,
                        color: "white"
                    } : {} : blockValue === "x" ? {
                        color: X,
                        backgroundColor: "white"
                    } : blockValue === "o" ? {
                        color: O,
                        backgroundColor: "white"
                    } : {}
                }
            >{blockValue}</button>
        </>
    )
}

export default Block;