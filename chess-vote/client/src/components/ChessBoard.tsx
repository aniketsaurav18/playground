import { Chessboard } from "react-chessboard";
import { Card } from "./ui/card";


export const ChessBoard = () => {
    return (
        <Card className="w-96 h-96 bg-red-400">
            <Chessboard />
        </Card>
    )
}