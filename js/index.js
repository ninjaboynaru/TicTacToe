var gameInfo =
{
	player1Shape: "X",
	player2Shape: "O",
	player1Score: 0,
	player2Score: 0,
	playerCount: 1,
	
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
}
window.onload = screens.InitializeScreens;





