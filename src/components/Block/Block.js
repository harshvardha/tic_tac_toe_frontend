import { useState, useRef, useEffect } from "react";
import { socket, isSocketConnected } from "../../socketConnection";
import "./Block.css";

const Block = ({
    side,
    blockNo,
    playerNo,
    myChance,
    setMyChance,
    winnerBlocks
}) => {
    const [blockValue, setBlockValue] = useState("");
    const ref = useRef();

    const sendMove = () => {
        try {
            console.log(myChance);
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
        <div>
            <button
                className="block"
                onClick={sendMove}
                ref={ref}
                style={
                    {
                        backgroundColor: (
                            winnerBlocks &&
                                (
                                    blockNo === winnerBlocks[0] ||
                                    blockNo === winnerBlocks[1] ||
                                    blockNo === winnerBlocks[2]
                                ) ? "black" : "white"
                        )
                    }
                }
            >{blockValue}</button>
        </div>
    )
}

export default Block;