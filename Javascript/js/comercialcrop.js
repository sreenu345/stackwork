var fs=require('fs');
var data = fs.readFileSync('../csv/Agriproduction.csv', {encoding:'utf8'}).toString();
var lines=data.split("\r\n");
var particulars;
var year=["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014"];
var agvalue1=[],agvalue2=[],agvalue3=[],agvalue4=[],agvalue5=[],agvalue6=[],agvalue7=[],agvalue8=[],agvalue9=[],agvalue10=[],agvalue11=[],agvalue12=[],agvalue13=[],agvalue14=[];
var j=0;
var sum1=0,sum2=0,sum3=0,sum4=0,sum5=0,sum6=0,sum7=0,sum8=0,sum9=0,sum10=0,sum11=0,sum12=0;
var tempData={};
var output=[];
var j=0;

//remove the comma in Frequency column
for(var i=1;i<lines.length;i++)
{
    lines[i]=lines[i].replace("Annual,","Annual");
}

//Take all production data
for(var i=0;i<lines.length-1;i++)
{
  var line=lines[i].split(",");
  if(line[0].includes("Commercial"))
  {
 		agvalue1[j]=line[13];
 		agvalue2[j]=line[14];
 		agvalue3[j]=line[15];
 		agvalue4[j]=line[16];
 		agvalue5[j]=line[17];
 		agvalue6[j]=line[18];
 		agvalue7[j]=line[19];
 		agvalue8[j]=line[20];
 		agvalue9[j]=line[21];
 		agvalue10[j]=line[22];
 		agvalue11[j]=line[23];
 		agvalue12[j]=line[24];
  		j++;
  }
}

//calculate sum of each individual year aggregate value
for(var i=0;i<agvalue12.length;i++)
{
	if(agvalue1[i]=="NA")
	{
		agvalue1[i]=0;
	}
	if(agvalue2[i]=="NA")
	{
		agvalue2[i]=0;
	}
	if(agvalue3[i]=="NA")
	{
		agvalue3[i]=0;
	}
	if(agvalue4[i]=="NA")
	{
		agvalue4[i]=0;
	}
	if(agvalue5[i]=="NA")
	{
		agvalue5[i]=0;
	}
	if(agvalue6[i]=="NA")
	{
		agvalue6[i]=0;
	}
	if(agvalue7[i]=="NA")
	{
		agvalue7[i]=0;
	}
	if(agvalue8[i]=="NA")
	{
		agvalue8[i]=0;
	}
	if(agvalue9[i]=="NA")
	{
		agvalue9[i]=0;
	}
	if(agvalue10[i]=="NA")
	{
		agvalue10[i]=0;
	}
	if(agvalue11[i]=="NA")
	{
		agvalue11[i]=0;
	}
	if(agvalue12[i]=="NA")
	{
		agvalue12[i]=0;
	}
	sum1=sum1+parseFloat(agvalue1[i]);
	sum2=sum2+parseFloat(agvalue2[i]);
	sum3=sum3+parseFloat(agvalue3[i]);
	sum4=sum4+parseFloat(agvalue4[i]);
	sum5=sum5+parseFloat(agvalue5[i]);
	sum6=sum6+parseFloat(agvalue6[i]);
	sum7=sum7+parseFloat(agvalue7[i]);
	sum8=sum8+parseFloat(agvalue8[i]);
	sum9=sum9+parseFloat(agvalue9[i]);
	sum10=sum10+parseFloat(agvalue10[i]);
	sum11=sum11+parseFloat(agvalue11[i]);
	sum12=sum12+parseFloat(agvalue12[i]);
}
var value=[sum1/5,sum2/5,sum3/5,sum4/5,sum5/5,sum6/5,sum7/5,sum8/5,sum9/5,sum10/5,sum11/5,sum12/5];


//Stotre in array
for(var k=0;k<year.length;k++)
{
  tempData["Year"]=year[k];
  tempData["aggregatevalue"]=value[k];
  output.push(tempData);
  tempData={};
}
 fs.writeFileSync("../json/commercialcrops.json",JSON.stringify(output),encoding="utf8");
