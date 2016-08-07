var fs=require('fs');
var data = fs.readFileSync('../csv/Agriproduction.csv', {encoding:'utf8'}).toString();
var lines=data.split("\r\n");
var particulars=[];
var production=[];
var particulars1=[];
var production1=[];
var j=0;
var tempData={};
var output=[];

//Take all data for particulars and production
j=0;
for(var i=0;i<lines.length-1;i++)
{
  var line=lines[i].split(",");
  particulars[j]=line[0];
  production[j]=line[line.length-2];
  j++;
}

//for only oilseeds purpose
j=0;
for(var i=0;i<particulars.length;i++)
{
  if(particulars[i].includes("Agricultural Production Oilseeds"))
  {
    particulars1[j]=particulars[i];
    production1[j]=production[i];
    j++;
  }
}

//sorting the data by productionvalue
var i, k, pos, temp;
for (i = 0; i < particulars1.length-1; i++)
{
    
    for (k = i+1; k < particulars1.length; k++)
    {
       if (parseFloat(production1[i])<parseFloat(production1[k]))
        {
          pos = k;
          temp = particulars1[i];
          particulars1[i] = particulars1[pos];
          particulars1[pos]= temp;

          temp=production1[i];
          production1[i]=production1[pos];
          production1[pos]=temp;
        }
    }
}

//store in array
for(var k=0;k<particulars1.length;k++)
{
  tempData["croptype"]=particulars1[k];
  tempData["productionvalue"]=production1[k];
  output.push(tempData);
  tempData={};
}
 fs.writeFileSync("../json/oilseedcrop.json",JSON.stringify(output),encoding="utf8");

