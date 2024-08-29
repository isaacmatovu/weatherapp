
const input=document.getElementById('getweather');
const weatherbtn=document.getElementById('weatherbtn')
const img=document.getElementById('image');
const p=document.getElementById('temp')
const header=document.getElementById('name')
const conditions=document.getElementById('conditions')
const datetime=document.getElementById('datetime')
const div=document.getElementById('display')





weatherbtn.addEventListener('click',async function(){
   const searchterm = input.value.trim().toLowerCase()
   if(searchterm){
      await weatherdata(searchterm);
   } else{
      console.log('enter a location')
   }
})




async function weatherdata(searchterm){
   try{
   const response= await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchterm}/today?include=fcst%2Cobs%2Chistfcst%2Cstats%2Ccurrent&key=DL9TKYC7PQZNP4EUVMQWSLM99&contentType=json&unitGroup=metric`,{mode: 'cors'})

   const weatherdata=await response.json()
   
   

   const tempcelcius =weatherdata.currentConditions.temp
   const roundedtemp=tempcelcius.toFixed(1);
   p.textContent=`${roundedtemp} °C`
   header.textContent=weatherdata.resolvedAddress;
   conditions.textContent=weatherdata.description
   datetime.textContent=weatherdata.currentConditions.icon

   // Fetch a weather-related GIF
   const weatherCondition = weatherdata.currentConditions.icon;
   const gifUrl = await fetchWeatherGif(weatherCondition);
   img.classList.add('img-display')
   img.src = gifUrl;
   img.alt = `${weatherCondition} weather`;

   
   
   div.appendChild(header)
   div.appendChild(conditions)
   div.appendChild(datetime)
   div.appendChild(p)
   div.appendChild(img)

   
   } catch(err){
      console.log(`error cant find data ${err}`)
      div.innerHTML = 'Error fetching weather data. Please try again.';
   }
input='';
}

async function fetchWeatherGif(weatherCondition) {
   try {
       const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=wCY7MVhpmwdp8Y76cNCpLn3i4et0s3Yo&s=${weatherCondition} weather`, {mode: 'cors'});
       const giphyData = await response.json();
       return giphyData.data.images.original.url;
   } catch(err) {
       console.log(`Error fetching GIF: ${err}`);
       return ''; // Return an empty string or a default image URL if the fetch fails
   }
}




