
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type VoteOption = 'white' | 'draw' | 'black'

export default function ChessVote() {
  const [votes, setVotes] = useState({
    white: 120,
    draw: 51,
    black: 55,
  })
  const [userVote, setUserVote] = useState<VoteOption | null>(null)

  useEffect(() => {
    // Load votes from local storage
    const storedVotes = localStorage.getItem('chessVotes')
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes))
    }

    // Load user's vote from local storage
    const storedUserVote = localStorage.getItem('userChessVote') as VoteOption | null
    if (storedUserVote) {
      setUserVote(storedUserVote)
    }
  }, [])

  const handleVote = (option: VoteOption) => {
    let newVotes = { ...votes }

    if (userVote) {
      // Remove the previous vote
      newVotes[userVote]--
    }

    // Add the new vote
    newVotes[option]++

    setVotes(newVotes)
    setUserVote(option)

    // Save to local storage
    localStorage.setItem('chessVotes', JSON.stringify(newVotes))
    localStorage.setItem('userChessVote', option)
  }

  const totalVotes = votes.white + votes.draw + votes.black
  const getPercentage = (option: VoteOption) => 
    totalVotes > 0 ? (votes[option] / totalVotes) * 100 : 0

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Chess Match Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500" 
            style={{ width: `${getPercentage('white')}%` }}
          />
          <div 
            className="h-full bg-gray-500" 
            style={{ width: `${getPercentage('draw')}%`, marginTop: '-0.5rem' }}
          />
          <div 
            className="h-full bg-black" 
            style={{ width: `${getPercentage('black')}%`, marginTop: '-0.5rem' }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(['white', 'draw', 'black'] as const).map((option) => (
            <div key={option} className="flex flex-col items-center">
              <Button 
                onClick={() => handleVote(option)}
                className={`w-full mb-2 capitalize ${userVote === option ? 'ring-2 ring-primary' : ''}`}
                variant={option === 'draw' ? 'outline' : 'default'}
              >
                {option}
              </Button>
              <span className="text-sm font-semibold">
                {votes[option]} {votes[option] === 1 ? 'vote' : 'votes'}
              </span>
              <span className="text-xs text-muted-foreground">
                {getPercentage(option).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Total Votes: {totalVotes}
        </div>
        {userVote && (
          <div className="mt-4 text-center text-sm font-medium text-primary">
            Your vote: {userVote}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

