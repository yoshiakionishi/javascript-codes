/*
Yoshiaki Onishi
July 22, 2020

YO.bach-loop-sub

This takes a list of binary numbers, and does the following:
(1) 0 --> -1 (e.g. 0 0 1 0 --> -1 -1 1 -1)
(2) 1 stays as is 
(3) each number is given a denominator 16 (for 16th-notes for bach.score to read)
   (e.g. -1 -1 1 -1 --> -1/16 -1/16 1/16 -1/16)
(4) forms the time siguature, according the formula: [x-bit (of incoming binary numbers)]/16
   (e.g. if the incoming binary number is 0 0 1 0, then 4/16)

Input: list (of binary numbers)
Outputs:
  left: time signature (use "bach.wrap 1" before connecting to bach.score)
  right: durations that bach.score reads (use "bach.collect @inwrap 1 @outwrap 1" 
         before connecting to bach.score)

*/

inlets = 1;
outlets = 2;

var l1 = [];
var len = 0;
var len2 = 0;
var cntr = 0;
var newlist = [];
var fractlist = [];
var rawfract = 0;
var timesig = [];


function list() 
{
	var l1 = arrayfromargs(messagename, arguments);
	len = l1.length;
	while (cntr < len)
		if (l1[cntr] == 1)
		{
			newlist.push(1);
			cntr++;
		}
		else if (l1[cntr] == 0)
		{
			newlist.push(-1);
			cntr++;
		}
divisifier();

}

function divisifier()
{
cntr = 0;
len2 = newlist.length;

	while (cntr < len2)
		if (newlist[cntr] == 1)
		{
			fractlist.push("1/"+16);
			cntr++;
		}
		else if (newlist[cntr] == -1)
		{
			fractlist.push("-1/"+16);
			cntr++;
		}	

timesig.push(len2, 16);	// Creates time signature
outlet(1,fractlist);
outlet(0,timesig);
init();
}


function init()
{
		l1 = [];
		newlist = [];
		fractlist = [];
		cntr = 0;
		timesig = [];
}