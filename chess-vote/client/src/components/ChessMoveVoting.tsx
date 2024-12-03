import { Move } from '@/hooks/usr-chessvoting'
import useChessVoting from '@/hooks/usr-chessvoting'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface MoveOptionProps {
  move: Move
  isVoted: boolean
  showVotes: boolean
  onVote: () => void
}

const MoveOption: React.FC<MoveOptionProps> = ({ move, isVoted, showVotes, onVote }) => (
  <Button
    variant={isVoted ? "default" : "outline"}
    className="relative w-full h-12 text-lg font-bold flex items-center justify-between px-4"
    onClick={onVote}
  >
    <span>{move.notation}</span>
    <div className="flex items-center">
      {isVoted && (
        <Check className="w-5 h-5 text-green-500 mr-2" />
      )}
      {showVotes && (
        <span className="text-sm font-normal">
          {move.votes} votes
        </span>
      )}
    </div>
  </Button>
)

interface ChessVotingProps {
  initialMoves: Move[]
}

export const ChessMoveVoting = ({ initialMoves }: ChessVotingProps) => {
  const { moves, userVote, showVotes, vote } = useChessVoting(initialMoves)

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Vote for the Next Move</h2>
        <div className="space-y-2">
          {moves.map((move) => (
            <MoveOption
              key={move.id}
              move={move}
              isVoted={userVote === move.id}
              showVotes={showVotes}
              onVote={() => vote(move.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

