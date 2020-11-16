/*

YO.Euclid.GCD JavaScript Code
Yoshiaki Onishi
ver. 1.0
July 22, 2020

Inputs:
	int, int (e.g.:  8 and 5)
Outputs:
	Left: a list of 2 numbers working their ways to producing GCD 
	in the fashion of the Euclidean Algorithm. 
	(e.g.: 8 5 5 3 3 2 2 1 1 0)
	Right: Inputs' GCD (e.g.: 1)

*/

inlets = 2;
outlets = 2;

var v = [];
v[0] = v[1] = 0;
var nonbeats = 0;
var beats = 0;


function msg_int(i)
{
	v[inlet] = i;
	if (inlet >= 0) 
		{
		beats = v[0];
		nonbeats = v[1];
		calculation();
		}
}

function calculation()
{
var mod = 0;
var out = []; 		//output (left outlet)
var outind = 0;		//output index

out.push(beats);
out.push(nonbeats);

if (beats > nonbeats) // ex 8 5  || 8 4
	{
	var nb = nonbeats;	
	var b = beats;

	mod = beats % nonbeats; // 3 = 8/5  ||  0 = 8/4
	if (mod == 0)
		{
		out.push(nb); // 4 
		out.push(mod); // 0
		outlet(0,out); // 8 4 4 0
		outlet(1,nb);  // 4
		}	
	while (mod > 0)	
		{
		out.push(nb);
		out.push(mod); 
		b = nb; 		// beat (previously 8 now becomes 5
		nb = mod;		// nonbeat (previously 5, now becomes 3)	  
		mod = b % nb;	// mod is computed anew, looping so long as the new mod is > 0
		if (mod == 0)
			{
			out.push(nb);
			out.push(mod);
			outlet(0,out);
			outlet(1,nb);
			}	
		}
	}
else if (beats < nonbeats) // ex 5 8  || 4 8
	{
	var nb = nonbeats;	
	var b = beats;
	mod = nonbeats % beats; // 3 = 8/5  ||  0 = 8/4
	if (mod == 0)
		{
		out.push(b); // 4 
		out.push(mod); // 0		
		outlet(0,out);  // 4 8 4 0
		outlet(1,b); // 4
		}	
	while (mod > 0)	
		{
		out.push(b);
		out.push(mod); 
		nb = b;
		b = mod;
		mod = nb % b;
		if (mod == 0)
			{
			out.push(b);
			out.push(mod);
			outlet(0,out);
			outlet(1,nb);

			}
		}			
	}
else // 4 4
	{
	mod = beats % nonbeats; // 0 = 4/4
	out.push(beats);
	out.push(mod);
	outlet(0,out); // 4 0
	outlet(1,beats); // 4
	}

}

