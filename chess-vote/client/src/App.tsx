import './App.css'
import { ChessBoard } from './components/ChessBoard'
import {ChessMoveVoting} from './components/ChessMoveVoting'
import ChessVote from './components/Vote'

const initialMoves = [
  { id: '1', notation: 'e4', votes: 10 },
  { id: '2', notation: 'd4', votes: 8 },
  { id: '3', notation: 'c4', votes: 5 },
  { id: '4', notation: 'Nf3', votes: 7 },
  { id: '5', notation: 'g3', votes: 3 },
  { id: '6', notation: 'b3', votes: 2 },
  { id: '7', notation: 'f4', votes: 4 },
  { id: '8', notation: 'Nc3', votes: 6 },
]

function App() {



  return (
    <>
      <ChessBoard />
      <ChessVote/>
      <ChessMoveVoting initialMoves={initialMoves}/>
    </>
  )
}

export default App
