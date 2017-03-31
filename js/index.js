var gameInfo =
{
	//If playerCount is 1, then player2 is considered the AI
	player1Shape: "X",
	player2Shape: "O",
	player1Score: 0,
	player2Score: 0,
	playerCount: 1,
	currentPlayer: 1,
	
	SetPlayerCount: function(count)
	{
		if(count < 1 || count > 2)
		{
			count = 1;
		}
		playerCount = count;
	},
	SetPlayerShape: function(shape)
	{
		if(shape != "X" && shape != "O")
		{
			shape = "X";
		}
		if(shape == "X"){player2Shape = "O";}
		else if(shape == "O"){player2Shape = "X";}
		player1Shape = shape;
	},
	Reset: function()
	{
		player1Shape = "X";
		player2Shape = "O";
		player1Score = 0;
		player2Score = 0;
		playerCount = 1;
		currentPlayer = 1;
	}
}
var screens =
{
	startScreen: undefined,
	countScreen: undefined,
	shapeScreen: undefined,
	playScreen: undefined,
	
	InitializeScreens: function()
	{
		startScreen = document.getElementById("StartScreen");
		countScreen = document.getElementById("CountScreen");
		shapeScreen = document.getElementById("ShapeScreen");
		playScreen = document.getElementById("PlayScreen");
	},
	DisableAll: function()
	{		
		startScreen.style.display = "none";
		countScreen.style.display = "none";
		shapeScreen.style.display = "none";
		playScreen.style.display = "none";
	},
	EnableStartScreen: function()
	{
		this.DisableAll();
		startScreen.style.display = "block";
	},
	EnableCountScreen: function()
	{
		this.DisableAll();
		countScreen.style.display = "block";
	},
	EnableShapeScreen: function()
	{
		this.DisableAll();
		shapeScreen.style.display = "block";
	},
	EnablePlayScreen: function()
	{
		this.DisableAll();
		playScreen.style.display = "block";
	},
	Reset: function()
	{
		this.DisableAll();
		this.EnableStartScreen();
	}
}
var gameBoard = (new function(){
	
	this.board = [[],[],[]];
	
	this.InitializeBoard = function() 
	{
		this.board = [[],[],[]];
		
		var trNodes = document.getElementById("PlayScreen").getElementsByTagName("table")[0].getElementsByTagName("tr");
		var tdNodes = [];
		
		tdNodes.push(trNodes[0].getElementsByTagName("td"));
		tdNodes.push(trNodes[1].getElementsByTagName("td"));
		tdNodes.push(trNodes[2].getElementsByTagName("td"));
		
		for(var i = 0; i < 3; i++)
		{
			for(var x = 0; x < 3; x++)
			{
				this.board[i].push(tdNodes[i][x].firstChild);
			}
		}
		
		console.log(this.GetPureBoard() );
	}
	
	this.MakeMove = function(moveX, moveY, moveShape)
	{
		if(moveX >= 3 || moveY >= 3){return;}
		this.board[moveY, moveX].textContent = moveShape;
	}
	
	this.GetPureBoard = function() 
	{
		var pureBoard = [[], [], []];
		
		for(var y = 0; y < 3; y++)
		{
			for(var x = 0; x < 3; x++)
			{
				pureBoard[y].push(this.board[y][x].textContent);
			}
		}
		
		return pureBoard;
	}
	
	this.MovesLeft = function()
	{
		var pureBoard = this.GetPureBoard();
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
	}
	
	this.GetWinningShape = function()
	{
		var pureBoard = this.GetPureBoard();
		
		for(var row = 0; row < 3; row++)
		{
			if(pureBoard[row][0] == pureBoard[row][1] && pureBoard[row][1] == pureBoard[row][2])
			{
				return pureBoard[row][0];
			}
		}
		for(var col = 0; col < 3; col++)
		{
			if(pureBoard[0][col] == pureBoard[1][col] && pureBoard[1][col] == pureBoard[2][col])
			{
				return pureBoard[0][col];
			}
		}
		
		if(pureBoard[0][0] == pureBoard[1][1] && pureBoard[1][1] == pureBoard[2][2])
		{
			return pureBoard[1][1]
		}
		if(pureBoard[2][0] == pureBoard[1][1] && pureBoard[1][1] == pureBoard[0][2])
		{
			return pureBoard[1][1];
		}
		return "";
	}
	
	this.Reset = function()
	{
		for(var y = 0; y < 3; y++)
		{
			for(var x = 0; x < 3; x++)
			{
				this.board[y][x].textContent = "";
			}
		}
	}
	
	
});

//------------------------------------------------------------------
//------------------------------------------------------------------
function Reset()
{
	gameInfo.Reset();
	screens.Reset();
	gameBoard.Reset();
	
}
function UpdateScoreUI()
{
	var player1Label = document.getElementById("Player1ScoreLabel");
	var player2Label = document.getElementById("Player2ScoreLabel");
	
	var player1Score1 = document.getElementById("Player1Score");
	var player2Score = document.getElementById("Player2Score");
	
	if(playerCount == 1)
	{
		player1Label.firstChild.textContent = "Player: ";
		player2Label.firstChild.textContent = "AI: ";
	}
	else
	{
		player1Label.firstChild.textContent = "Player 1: ";
		player2Label.firstChild.textContent = "Player 2: ";
	}
	
	player1Score1.textContent = gameInfo.player1Score;
	player2Score.textContent = gameInfo.player2Score;
}

function EnableEndGameMessage(endGameMessage)
{
	var endGameContainer = document.getElementById("EndGameMessage");
	var endGameMessage = endGameContainer.getElementsByTagName("p")[0];
	endGameMessage.innerText = endGameMessage;
}

function GameWinCheck()
{
	var winningShape = gameBoard.GetWinningShape();
	if(winningShape == player1Shape)
	{
		gameInfo.player1Score += 1;
		UpdateScoreUI();
		EnableEndGameMessage("Player 1 Has Won");
	}
	else if(winningShape == player2Shape)
	{
		gameInfo.player2Score += 1;
		UpdateScoreUI();
		if(playerCount == 1)
		{
			EnableEndGameMessage("The AI Has Won");
		}
		else
		{
			EnableEndGameMessage("Player 2 Has Won");
		}
	}
	else
	{
		EnableEndGameMessage("Draw");
	}
}

function PlayBoxClick(boxNode)
{
	if(boxNode.textContent == "")
	{
		if(gameInfo.currentPlayer == 1)	//Player 1 has made a move
		{
			boxNode.textContent = gameInfo.player1Shape;
			if(gameInfo.playerCount == 1)	//Now allow AI to make a move
			{
				if(GameWinCheck()){return;}
				var aiMove = AI.GetAIMove(gameBoard.GetPureBoard() );
				gameBoard.MakeMove(aiMove.x, aiMove.y);
			}
			else{gameInfo.currentPlayer = 2;}
		}
		else	//Player 2 has made a move
		{
			boxNode.textContent = gameInfo.player2Shape;
			gameInfo.currentPlayer = 1;
		}
	}
	GameWinCheck();
	
	
}

window.onload = GeneralSetup;
function GeneralSetup()
{
	screens.InitializeScreens();
	gameBoard.InitializeBoard();
}




