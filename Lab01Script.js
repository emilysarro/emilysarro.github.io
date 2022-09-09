function arrayf()
{
var array = [];
total = 0;
for (var i = 0; i<=5; i++)
 {
 var val = math.floor(math.random()*100);
 total += val
 array.push(val);
 
 }

 var mean = total/array.length;
 
 var outarray = [];
 
 for (var i = 0; i<=5; i++)
 {
 if (array[i]>mean)
 {outarray.push(array[i])
	}	
 }
document.querySelector("#arrayOut").innerHTML="The array is:"+array+"<br>The mean is:"+mean+"<br>Greater:"+outarray;
}
