/*
Yoshiaki Onishi
July 22, 2020

YO.binary-constructor

Binary Constructor; takes a number, then converts it to a binary number
in the list form. 

FOR x >= 0 ONLY

*/

inlets = 1;
outlets = 1;

var v = [];
v[0] = 0;
var num = 0;

function msg_int(i)
{
	v[inlet] = i;
	if (inlet == 0)
		{
		num = v[0];
		if (num >= 0)
		{
		binarify();
		}
		}

}

function binarify()
{
var binnum = [];
var calc = 0;
var quotient = 0;

if (num == 0)
{
outlet(0,0);	
}
else while (num > 0) 		// obtains binary numbers by divide-by-2 method
	{
	quotient = (num / 2) >> 0;
	calc = num % 2; 
	binnum.unshift(calc);
		if (num == 0)
		{
		calc = 0;
		binnum.unshift(calc);
		}
	num = (num / 2) >> 0;
	}

outlet(0,binnum);
init();
}

function init()
{
	v[0] = 0;
}
