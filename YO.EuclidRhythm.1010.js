/*

YO.EuclidRhythm.1010 JavaScript Code
Yoshiaki Onishi
ver. 1.2.1
July 22, 2020

Inputs:
	intA (total number of beat-space (value 'n' in Euclidean Algorithm)), 
	intB (how many attacks (value 'k' in Euclidean Algorithm)) 
	(i.e. intB attacks in an intA-beat space)
	
	intC = rotation value (+ = clockwise, - = counterclockwise)
Outputs:
	E(intB, intA) in the forms of 1 and 0, 1 = attack, 0 = non-attack
	

Update: 

ver.1.2 (07/27/2020) Rotation is fixed for positive number, multiple of "totalvalue."

ver. 1.1 (07/27/2020) In cases of E(k,n) where in the Euclidean Algorithm process 
the value "m" becomes 1, m is simply appended, resulting in a more
accurate result. Tested for accuracy against Toussaient.

*/

///////// PREAMBLE /////////


inlets = 3;
outlets = 2; 
/*
first outlet for euclidean rhythm
two other outlets for testing purposes; will be deleted
*/
var v = [];
v[0] = v[1] = v[2] = 0;

var totaltime = 0;
var seriesa = [];
var seriesb = [];
var euclideanRhythm = [];
var rotavalue = 0;


///////// INPUT FUNCTION /////////
function msg_int(i)
{
var beats = 0;
var nonbeats = 0;

v[inlet] = i;
	if (v[0] >=0 && v[1] >=0) // Nothing works when either of the values are under 0.	
	{
		if (inlet==0) 
		{
		totaltime = v[0];
		beats = v[1];
		rotavalue = v[2];
		}
		if (inlet==1)
		{
		beats = v[1];
		rotavalue = v[2];
		}
		if (inlet==2) 
		{
		totaltime = v[0];
		beats = v[1];
		rotavalue = v[2];
		}
	nonbeats = totaltime - beats; // compute non-beat space 
///////// SAFETY MECHANISM /////////	
		if (nonbeats < 0) // This prevents nonbeat value from going under 0 and freeze.
		{
		init();	
		}
		
///////// INITIAL SWITCH /////////	
		if (nonbeats == 0) // 1/3 When the beatspace is completely filled with attacks.
		{
		push1only(totaltime,beats,nonbeats);
		init();
		}
		if (nonbeats == totaltime) // 2/3 When there is no attack.
		{
		push0only(totaltime,beats,nonbeats);
		init();	
		}
		if ((nonbeats > 0) && (nonbeats != totaltime)) // 3/3 Mix of 1's and 0's
		{
		pushout0and1(totaltime,beats,nonbeats);
		init();
		}
	}

}

function push1only(totaltime,beats,nonbeats) // (1/3)
{
	var push1onlycounter = 0;
	while (push1onlycounter < beats)
	{
		euclideanRhythm=euclideanRhythm+'a'; //easier to handle with letters a and b, then convert it into number later
		push1onlycounter++;
	}
//	outlet(2,euclideanRhythm);
	push1onlycounter = 0;
	transformer(euclideanRhythm); //Skip the rest, go directly to transformer

	init();
}

function push0only(totaltime,beats,nonbeats) // (2/3)
{
	var push0onlycounter = 0;
	while (push0onlycounter < totaltime)
	{
		euclideanRhythm=euclideanRhythm+'b'; //easier to handle with letters a and b, then convert it into number later
		push0onlycounter++;
	}
//	outlet(2,euclideanRhythm);
	push0onlycounter = 0;
	transformer(euclideanRhythm); //Skip the rest, go directly to transformer

	init();
}

function pushout0and1(totaltime,beats,nonbeats) // (3/3)
{
	while (beats > 0)
	{
	seriesa.push('a'); //easier to handle with letters a and b, then convert it into number later
	beats--;
	}
	while (nonbeats > 0)
	{
	seriesb.push('b'); //easier to handle with letters a and b, then convert it into number later
	nonbeats--;	
	}

coupler(seriesa,seriesb); //the arduous process of coupling starts
}




function coupler(seriesa,seriesb)
{
var lenA = 0;
var lenB = 0;

var phA = [];

var cntr = 0;
var operdiff = 0;


lenA = seriesa.length; //number of 5
lenB = seriesb.length; //number of 3



	if (lenA == lenB); // 1 1 1 1 0 0 0 0 
	{
		var finalcounter = 0;
		while (finalcounter < seriesb.length)
		{
		euclideanRhythm=euclideanRhythm+seriesa[finalcounter]+seriesb[finalcounter];
		finalcounter++
		}
		finalcounter=0;
//		outlet(2,"beats and nonbeats were identical ",euclideanRhythm);
	}
	
	if (lenA > 1 && lenB === 1) // 1 1 1 1 1 1 1 0
	{
		euclideanRhythm = [];
		while (cntr < lenA)
		{
		euclideanRhythm=euclideanRhythm+seriesa[cntr];
		cntr++;
		}
	cntr = 0;
	euclideanRhythm=euclideanRhythm+seriesb[cntr];
	}
	
	else
 	{ 
		if (lenA>lenB || lenB>lenA)
		{

		diff = Math.abs(lenA-lenB);		//1. 8 - 5 = 3
			while (diff > 0)				//2. diff =3
			{
				while ((cntr<lenA) && (cntr<lenB)) // 0<8, 0<5 (go to (3.)) ~~ 9. 0<5, 0<3 ~~ 16. 0<3, 0<2
				{
				phA.push(seriesa[cntr]+seriesb[cntr]); 
				cntr++;
				}
				if (cntr==lenB)					//3. while stops at: 5<8 and 5<5 ~~ 10. 3<5, 3<3 ~~ 17. 2<3, 2<2
				{
				operdiff = seriesa.length - cntr;	//4. 8-5 = 3   ~~ 11. 5-3 = 2 ~~ 18. 3-2 = 1
				seriesb = seriesa.splice(0,operdiff); 
						/* 5. series b is depleted and empty. so it is replaced with item in (): 
						(a a a) a a a a a  ~~ 12. seriesb = (ab ab) ab ab ab ~~ 19. (aba) aba aba */
				operdiff = 0; // (reset)
				seriesa = phA; /*6. seriesa is with joined part, ab ab ab ab ab and seriesb = a a a ~~ 
						13. aba aba aba and ab ab ~~ 20. abaab abaab aba */
				phA = []; // (resets for placeholder)
				cntr = 0;
				lenA = seriesa.length; //7. "5" ~~ 14. "3" ~~ 21. "2" 
				lenB = seriesb.length; //8. "3" ~~ 15.  "2" ~~ 22. "1"
				}
				if (cntr==lenA) // a a a b b b b b = aba aba aba b b 
				{
//				outlet(2,"lenB>lenA"); // aba aba
//				outlet(2,"phA",phA,"seriesa",seriesa,"seriesb",seriesb); 
				operdiff = seriesb.length - cntr;
				seriesb = seriesb.splice(0,operdiff);
				operdiff = 0; // (reset)
				seriesa = phA;
//				outlet(2,"phA",phA,"next we will do this as seriesA::",seriesa,"this as seriesb::",seriesb); 
				phA = [];
				cntr = 0;
				lenA = seriesa.length; //number of 5
				lenB = seriesb.length; //number of 3
				}

			diff = Math.abs(lenA-lenB); // 8b. "2" ~~ 15b. "1" ~~ 22b. "1" 
			
				if (lenB === 1) 
				{
				break;
				}
			}

			if (lenA > 1 && lenB === 1) // ab ab ab ab ab b
			{
			euclideanRhythm = [];
				while (cntr < lenA)
				{
				euclideanRhythm=euclideanRhythm+seriesa[cntr];
				cntr++;
				}
			cntr = 0;
			euclideanRhythm=euclideanRhythm+seriesb[cntr];
			}


			if (diff == 0 && lenA == 1 && lenB == 1) //for the pattern that ends up to be e.g. ab | aaaaaa
			{
//			outlet(2,"phA",phA,"final result seriesa::",seriesa,"this as seriesb::",seriesb); 
				euclideanRhythm = seriesa+seriesb;
//			outlet(2,"diff ",diff,"1|1 ending ",euclideanRhythm);
			}
	
			if (diff == 0 && lenB > 1) // for the pattern that ends up to be e.g. aba aba | a a
			{
			var finalcounter = 0
			euclideanRhythm=[];
				while (finalcounter < seriesb.length)
				{
				euclideanRhythm=euclideanRhythm+seriesa[finalcounter]+seriesb[finalcounter];
				finalcounter++
				}
			finalcounter=0;
//			outlet(2,"(2|2)+ ending ",euclideanRhythm);
			}
//			outlet(2,"if (lenA == lenB)",euclideanRhythm);
		}
	}
transformer(euclideanRhythm);
}



function transformer(euclideanRhythm)
{
var ERarray = euclideanRhythm;
var ERarraynum = [];
var numbercounter = 0;
var shiftnumber = 0;
ERarray = ERarray.toString();
ERarray = ERarray.split('');

////////// LETTERE TO NUMBER CONVERSION
	while (numbercounter < ERarray.length)
	{
		if (ERarray[numbercounter] == 'a') // a --> 1
		{
		ERarraynum.push(1);
		numbercounter++;
		}
	
		if (ERarray[numbercounter] == 'b') // b --> 0
		{
		ERarraynum.push(0);
		numbercounter++;
		}
	}
	
////////// ROTATION
var coeff = 0;
var shiftedarray = [];
	if (rotavalue > 0)
	{
	coeff = Math.floor(rotavalue/totaltime);
	shiftnumber = (rotavalue - (totaltime*coeff));
		if (shiftnumber != 0)
		{
		shiftedarray = ERarraynum.splice(0,Math.abs(shiftnumber));
		outlet(0,ERarraynum,shiftedarray);
		}
		else
		{
		outlet(0,ERarraynum);
		}
	}
	else
	{
	coeff = Math.ceil(rotavalue/totaltime);
	shiftnumber = (rotavalue - (totaltime*coeff));
		if (shiftnumber != 0)
		{
		shiftedarray = ERarraynum.splice(shiftnumber,Math.abs(shiftnumber));
		}
		outlet(0,shiftedarray,ERarraynum);
	}
// 	outlet(1,rotavalue,shiftnumber);
init();
}
	

function init()
{
cntr = 0;
diff = 0;
seriesb = [];
seriesa = [];
rotavalue = 0;
coeff = 0;
shiftedarray = [];
ERarray = [];
ERarraynum = [];
euclideanRhythm = [];
}