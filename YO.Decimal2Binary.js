/*
Yoshiaki Onishi
July 22, 2020

YO.Decimal2Binary

Binary Constructor; takes a decimal number, then converts it to a binary number
in the list form. 

Input: a decimal integer (e.g. 45)

Output:
  Left: Input's binary number (e.g. 101101)
  Right Input's binary number with space in between (e.g. 1 0 1 1 0 1)
    NB - for a value below 0, its absolute value is returned to the 
    right outlet, so: -45 ---> 1 0 1 1 0 1



*/

inlets = 1;
outlets = 2;

var v = [];
v[0] = 0;
var num = 0;
var numlist = 0;

function msg_int(i)
{
	v[inlet] = i;
	if (inlet == 0)
		{
		num = v[0];
		numlist = v[0];
		binarifynospace();
		binarifylist();

		}

}

function binarifynospace()
{
var binnum = [];
var calc = 0;
var quotient = 0;

if (num == 0)
{
outlet(0,0);
init();	
}
binnum = [];

while (num > 0) 		// obtains binary numbers by divide-by-2 method
	{
	calc = (num % 2)|0; 
	binnum=calc+binnum;
	num = (num / 2)|0;
	}

while (num < 0)
{
	while (num < 0)
	{
		calc = (num % 2)|0; 
		binnum=Math.abs(calc)+binnum;
		num = (num / 2)|0;
	}
	
binnum = '-'+binnum;
}
outlet(0,eval(binnum));

}

function binarifylist()
{
var binnumlist = [];
var calclist = 0;
var quotientlist = 0;

if (numlist == 0)
{
outlet(1,0);	
}
while (numlist > 0) 		// obtains binary numbers by divide-by-2 method
	{
	calclist = numlist % 2; 
	binnumlist.unshift(calclist);
		if (numlist == 0)
		{
		calclist = 0;
		binnumlist.unshift(calclist);
		}
	numlist = (numlist / 2) >> 0;
	}
	
while (numlist < 0) 		// obtains binary numbers by divide-by-2 method
	{
	quotientlist = Math.abs((numlist / 2) >> 0);
	calclist = Math.abs(numlist % 2); 
	binnumlist.unshift(calclist);
		if (numlist == 0)
		{
		calc = 0;
		binnumlist.unshift(calclist);
		}
	numlist = (numlist / 2) >> 0;
	}
outlet(1,binnumlist);
init();
}
function init()
{
	v[0] = 0;
}
