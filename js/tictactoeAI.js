var Move = function(x,y)
{
	this.x = x;
	this.y = y;
}


var AI = {

	EvaluateBoard: function(pureBoard, aiCharacter)
	{
		for(var row = 0; row < 3; row++)
		{
			if(pureBoard[row][0] == pureBoard[row][1] && pureBoard[row][1] == pureBoard[row][2])
			{
				if(pureBoard[row][0] == aiCharacter){return 1;}
				else{return -1;}
			}
		}
		for(var col = 0; col < 3; col++)
		{
			if(pureBoard[0][col] == pureBoard[1][col] && pureBoard[1][col] == pureBoard[2][col])
			{
				if(pureBoard[0][col] == aiCharacter){return 1;}
				else{return -1;}
			}
		}
		
		if(pureBoard[0][0] == pureBoard[1][1] && pureBoard[1][1] == pureBoard[2][2])
		{
			if(pureBoard[1][1] == aiCharacter){return 1;}
			else{return -1;}
		}
		if(pureBoard[2][0] == pureBoard[1][1] && pureBoard[1][1] == pureBoard[0][2])
		{
			if(pureBoard[1][1] == aiCharacter){return 1;}
			else{return -1;}
		}
		return 0;
	},
	
	MovesLeft: function(pureBoard)
	{
		for(var y = 0; y < 3; y++)
		{
			for(var x = 0; x < 3; x++)
			{
				if(pureBoard[y][x] == "")
				{
					return true;
				}
			}
		}
		return false;
	},

	MoveValue: function(x,y, pureBoard, aiCharacter, playerCharacter, isAITurn, depth)
	{
		if(this.MovesLeft() == false){return 0;}
		if(pureBoard[y][x] !== ""){return 0;}
		
		if(isAITurn)
		{
			pureBoard[y][x] == aiCharacter;
		}
		else
		{
			pureBoard[y][x] = playerCharacter;
		}
		
		var moveValue = this.EvaluateBoard(pureBoard);
		if(moveValue != 0){return moveValue;}
		
		for(var y = 0; y < 3; y++)
		{
			for(var x = 0; x < 3; x++)
			{
				if(pureBoard[y][x] == "")
				{
					if(isAITurn)
					{
						moveValue = Math.max(this.MoveValue(x,y, pureBoard, aiCharacter, playerCharacter, !isAITurn, depth+1) );
					}
					else
					{
						moveValue = Math.max(this.MoveValue(x,y, pureBoard, aiCharacter, playerCharacter, !isAITurn, depth+1) );
					}
				}
			}
		}
		
		return moveValue;
	},
	
	GetAIMove: function(pureBoard)
	{
		var move = {x:0,y:0}
		return move;
	},



}
