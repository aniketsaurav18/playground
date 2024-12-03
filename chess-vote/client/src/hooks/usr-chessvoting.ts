import { useState } from 'react'

export interface Move {
  id: string
  notation: string
  votes: number
}

export default function useChessVoting(initialMoves: Move[]) {
  const [moves, setMoves] = useState<Move[]>(initialMoves)
  const [userVote, setUserVote] = useState<string | null>(null)
  const [showVotes, setShowVotes] = useState(false)

  const vote = (moveId: string) => {
    setMoves(prevMoves =>
      prevMoves.map(move =>
        move.id === moveId
          ? { ...move, votes: userVote === moveId ? move.votes - 1 : move.votes + 1 }
          : userVote === move.id
          ? { ...move, votes: move.votes - 1 }
          : move
      )
    )
    setUserVote(prevVote => (prevVote === moveId ? null : moveId))
    setShowVotes(true)
  }

  return { moves, userVote, showVotes, vote }
}

