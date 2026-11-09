const API_KEY = process.env.OPENWEATHER_API_KEY || process.argv[2];

if (!API_KEY) {
  console.error("Error: NO API KEY!");
  process.exit(1);
}

const CITY = "Jakarta";
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`;

async function getWeather() {
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    console.log("Weather Forecast:");

    const daily = {};

    for (const item of data.list) {
      const dateKey = item.dt_txt.split(" ")[0];

      // Take data
      if (!daily[dateKey] || item.dt_txt.includes("12:00:00")) {
        daily[dateKey] = {
          dt: new Date(item.dt * 1000),
          temp: item.main.temp
        };
      }
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // 5/6 hari ke depan
    const results = Object.values(daily).slice(0, 6);

    for (const f of results) {
      const dayName = days[f.dt.getDay()];
      const dayNum = String(f.dt.getDate()).padStart(2, "0");
      const monthName = months[f.dt.getMonth()];
      const year = f.dt.getFullYear();
      const temp = f.temp.toFixed(2);

      console.log(`${dayName}, ${dayNum} ${monthName} ${year}: ${temp}°C`);
    }
  } catch (err) {
    console.error("Failed Get Data:", err.message);
  }
}

getWeather();