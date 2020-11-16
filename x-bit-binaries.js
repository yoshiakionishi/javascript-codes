/*
Yoshiaki Onishi
July 22, 2020

YO.xbitBinaries

X-bit binary Constructor
FOR x >= 0 ONLY

*/

inlets = 1;
outlets = 1;

var bit = 0;

setinletassist(0,"binary list");

if (jsarguments.length>1)
	bit = jsarguments[1];


function list()
{
	var list = arrayfromargs(messagename,arguments);
	
	var len = 0;
	var diff = 0;
	var bitlistfiller = [];
	len = arguments.length;
	diff = bit - len;

if (diff > 0)
{

	do 
	{
		bitlistfiller.push(0);
		diff -- ;
	}
	while (diff > 0)
	outlet(0,bitlistfiller,list);
}		
else
{
	outlet(0,list);
}
}