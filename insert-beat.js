// Yoshiaki Onishi
// July 22, 2020

// YO.insert-beat

// Single-use beat inserter



inlets = 3;
outlets = 1;

var l1 = [];
var l2 = [];
var l3 = [];
var originallist = [];
var newlist = [];
var i = 0;
var timepoint = 0;
var valueinsert = 0;




function list() //Takes list and/or numbers for input 0, only numbers for input 1
{
  var l1 = arrayfromargs(messagename, arguments);
  var l2 = arrayfromargs(messagename, arguments);
  var l3 = arrayfromargs(messagename, arguments);
	if (inlet == 0)			//Left Inlet
	{
		originallist = l1;
		beatinsert();
	}
	else if (inlet == 1)  	//Middle Inlet
	{
		valueinsert = l2[0];	//regardless of the type, int or list, it takes the first item
	}
	else 					//Right Inlet
	{
		timepoint = l3[0];		//regardless of the type, int or list, it takes the first item

	}

}

function beatinsert() //inserts beat (specified by the middle inlet; default should be 1
{
	newlist = originallist;
	newlist.splice(timepoint, 0, valueinsert);
	outlet(0, newlist);	
}