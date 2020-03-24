
// Developed my Elton Sampaio
let myMap;
let canvas;
let l1;
let l2;
const mappa = new Mappa('Leaflet');
p5.disableFriendlyErrors = true;



let table;


function preload()
{
    table = loadTable('countries.csv', 'csv', 'header');
  
}
// Lets put all our map options in a single object
  let options = {
  lat: 0,
  lng: 0,
  zoom: 3,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

  
function setup(){
  canvas = createCanvas(windowWidth, windowHeight); 
 
  

 
  
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
 // myMap.onChange(CovidCountries);
  



 
 

}



function draw(){


 CovidCountries();
 CountriesInfo();
 TotalCases();
 //Searching();
  

   
}


document.ontouchmove = function(event) {
    event.preventDefault();
};

// Draws an ellipse in all infected countries
function CovidCountries() {
  // Clear the canvas
  clear();

  for (let i = 0; i < table.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(table.getString(i, 'Lat'));
    const longitude = Number(table.getString(i, 'Long_'));

    // if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
       const pos = myMap.latLngToPixel(latitude, longitude);
       ///const redalertcolor = table.Get(i,3)

      if(table.get(i,7) >= 100  && table.get(i,7) <= 199)
      {

       //noStroke();
       fill(255,255,0);
       ellipse(pos.x,pos.y,15,15); 

      }
       
       else if (table.get(i,7) >= 200 && table.get(i,7) <= 499)
       {
         
       fill(255,127,80);
       ellipse(pos.x,pos.y,20,20); 
       
       }
       else if (table.get(i,7) >= 500)
     {
     
       fill(255,0,0);
       ellipse(pos.x,pos.y,25,25); 
     
     }
    
     else if (table.get(i,7) > 1 && table.get(i,7) < 100)
    {
    
       fill(0,255,0);
       ellipse(pos.x,pos.y,10,10); 
    }
    
    
     }}



function CountriesInfo()
{
 
for (let i = 0; i < table.getRowCount(); i++) {
    
    // Get the lat/lng of each meteorite 
    let latitude =  Number(table.getString(i, 'Lat'));
    let longitude = Number(table.getString(i, 'Long_'));
        
       // if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
     
       let pos = myMap.latLngToPixel(latitude, longitude);

       if(dist(mouseX,mouseY,pos.x,pos.y) <= 15 )
       {
         
        // Acts like a tab, where the info is drawn
        fill(50);
        rect(pos.x-100,pos.y,350,200);

        // Shows the states infected
        textSize(12);
        fill(255,255,255);
        text("PROVINCE/STATE : " , pos.x -100 ,pos.y + 30 ); 
        textSize(15);
        fill(255,255,255);
        text(table.get(i,2), pos.x + 20 , pos.y + 30 )


        //Countries names  
        textSize(12);
        fill(255,255,255);
        text("COUNTRY/REGION : " ,pos.x -100 ,pos.y + 60 ); 
        textSize(15);
        fill(255,255,255);
        text(table.get(i,3), pos.x + 20 , pos.y + 60 );

        // Shows how many people are infected
        textSize(12);
        fill(0,255,0);
        text("CONFIRMED : " , pos.x - 100 ,pos.y + 100 ); 
        textSize(12);
        fill(255,255,255);
        text(table.get(i,7), pos.x + 20 , pos.y + 100 );

       // Shows the deaths in each country
        textSize(12);
        fill(255,255,255);
        text("DEATHS : " , pos.x -100 ,pos.y + 140 ); 
        textSize(12);
        fill(255,0,8);
        text(table.get(i,8), pos.x + 20 , pos.y + 140 );

        // Shows how many people recovered
        textSize(12);
        fill(255,255,255);
        text("RECOVERED :  " , pos.x -100 ,pos.y + 170 ); 
        textSize(12);
        fill(255,255,255);
        text(table.get(i,9), pos.x + 20 , pos.y + 170 ); 

      }}}

// does the sum os total deaths and cases
function TotalCases()
{

  fill(50);    
  rect(5, height - 100, 300, 100);    
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  
for (let i = 0; i < table.getRowCount(); i++)
    {
        
        const total = Number(table.getString(i, 'Confirmed'));
        sum1 += total;
      
              const total2 = Number(table.getString(i, 'Deaths'));
        sum2 += total2;
      
                    const total3 = Number(table.getString(i, 'Recovered'));
        sum3 += total3;
        
    }
  
    // Total confirmed cases
    fill(255,255,255);
    textSize(20);
    text("Total Cases : ", 5 , height - 80);
    text(sum1,200, height - 80);
    //console.log(sum1);
  
    // Total  Deaths
    fill(255,255,255);
    textSize(20);
    fill(255,0,0);
    text("Total Deaths : ", 5 , height - 50);
    text(sum2,200, height - 50);
   // console.log(sum2);
  
  // total recovered
    fill(255,255,255);
    textSize(20);
    fill(0,255,0);
    text("Total Recovered : ", 5 , height - 22);
    text(sum3,200, height - 22);
   
}


// Search Input by countries
 /* function Searching()
  {

  for (let i = 0; i < table.getRowCount(); i++) {
    
   let s = table.get(i,1);
   let u = s.toUpperCase(); 
   //console.log(u);
    
   let searchInput = input.value();
   let searchIntoUpper = searchInput.toUpperCase();
  
   const s3 = table.get(i,3);
 
    
    if( searchIntoUpper == u)
    {
      
   
        fill(50);
        rect(width / 2 -100, height / 2 -100, 350,200);

        // Shows the states infected
        textSize(12);
        fill(255,255,255);
        text("PROVINCE/STATE : " , width / 2 - 100 / height /  2 -100); 
        textSize(15);
        fill(255,255,255);
        text(table.get(i,0), width / 2   , height / 2 )

/*
        //Countries names  
        textSize(12);
        fill(255,255,255);
        text("COUNTRY/REGION : " ,pos.x -100 ,pos.y + 60 ); 
        textSize(15);
        fill(255,255,255);
        text(table.get(i,1), pos.x + 20 , pos.y + 60 );

        // Shows how many people are infected
        textSize(12);
        fill(0,255,0);
        text("CONFIRMED : " , pos.x - 100 ,pos.y + 100 ); 
        textSize(12);
        fill(255,255,255);
        text(table.get(i,3), pos.x + 20 , pos.y + 100 );

       // Shows the deaths in each country
        textSize(12);
        fill(255,255,255);
        text("DEATHS : " , pos.x -100 ,pos.y + 140 ); 
        textSize(12);
        fill(255,0,0);
        text(table.get(i,4), pos.x + 20 , pos.y + 140 );

        // Shows how many people recovered
        textSize(12);
        fill(255,255,255);
        text("RECOVERED :  " , pos.x -100 ,pos.y + 170 ); 
        textSize(12);
        fill(255,255,255);
        text(table.get(i,5), pos.x + 20 , pos.y + 170 ); 


 

}
         
  }


  }
*/


