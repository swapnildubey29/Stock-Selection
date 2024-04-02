const express = require('express')
const axios = require('axios')
const app = express()

const API_KEY = 'eb27a22-a6fa-478f-8df6-066183004091';
const API_SECRET = 'o2ex8m7hno';

app.use(express.json())
app.use(express.static('client'))

//Function to fetch data from Upstox API
async function fetchData(Ikey, interval, toDate, fromDate) {
  const baseURL = 'https://api.upstox.com/v2/historical-candle/';

  try{
    const response = await axios.get(`${baseURL}${Ikey}/${interval}/${toDate}/${fromDate}`, {
      headers: {
        'x-api-key': API_KEY,
        'x-api-secret': API_SECRET,
      },
    });

    return response.data
  } catch (error){
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

app.get('/historical-candle/:Ikey/:interval/:toDate/:fromDate', async (req, res) => {
  const {Ikey, interval, toDate, fromDate } = req.params

  try{
    const data = await fetchData(Ikey, interval, toDate, fromDate)
    console.log(data)
    res.json(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})


app.listen(8000)
