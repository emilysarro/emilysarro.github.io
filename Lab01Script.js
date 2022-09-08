function arrayf()
{
var array = [];
total = 0;
for (var i = 0; i<=5; i++)
 {var val = math.floor(100*math.random());
 array.push(val);
 total += val;
 }

 mean = total/array.length;
 
 var outarray = [];
 
 for (var i = 0; i<=5; i++)
 {
 if (array[i]>mean)
 {outarray.push(array[i])
	}	
 }
document.querySelector("#arrayOut").innerHTML="The array is:"+array+"<br>The mean is:"+mean+"<br>Greater:"+outarray;
}
