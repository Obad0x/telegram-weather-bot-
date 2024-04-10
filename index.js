require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');



let userCity = ''; // Variable to store the user's city

const bot = new Telegraf(process.env.BOT_TOKEN)



bot.on('text', (ctx) => {
    const text = ctx.message.text;
    if (text.startsWith('/setcity ')) {
        // Extract city name from the message
        const city = text.replace('/setcity ', '');
        userCity = city;
        ctx.reply(`City set to ${city}`);
    } else if (text === '/getweather') {
        // You can implement the functionality to get weather data here


        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=3&appid=${process.env.OPEN_WEATHER_TOKEN}`)
        .then(function (response) {
          // handle success


          const lat = response.data[0].lat
          const lon = response.data[0].lon
          
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_TOKEN}`)
          .then(function (response) {
            // handle success
           const  temp = response.data.main.temp;
           const feels_like = response.data.main.feels_like;
           const temp_min = response.data.main.temp_min;
           const temp_max = response.data.main.temp_max;
           const pressure = response.data.main.pressure;
           const humidity = response.data.main.humidity;
           

            ctx.reply(` the weather is \n\ a temperature of ${Math.round(temp - 273)} degrees celcius, \n\ and it feels like a ${Math.round(feels_like - 273)}, \n\ with a minimum temperature of ${Math.round(temp_min -273)}degrees celcius \n\ with a maximum temperature of ${Math.round(temp_max -273)}degreees celcius \n\ and pressure of ${pressure} \n\ and humidity of ${humidity} `)
            console.log(response.data.main.temp);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
         



          console.log(response.data[0].name);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
       
      



        if (userCity) {
            ctx.reply(`Fetching weather for ${userCity}`);
            // Call function to fetch weather based on user's city (implementation required)
        } else {
            ctx.reply('Please set a city using /setcity command');
        }
    }
});




bot.launch(()=>{ console.log('hello world')})