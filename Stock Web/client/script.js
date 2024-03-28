async function fetchData() {
    const Ikey = document.getElementById('instrumentKey').value;
    const interval = document.getElementById('interval').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;

    try {
      const response = await fetch(`/historical-candle/${Ikey}/${interval}/${toDate}/${fromDate}`);
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      //  displayError('Failed to fetch data. Please try again.');
    }
  }

  function displayData(data) {
    const dataDisplay = document.getElementById('dataDisplay');
    const candles = data.data.candles;

    // Extracting required values from each candle array
    const candleData = candles.map(candle => ({
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5],
      openInterest: candle[6]
    }));

    // Displaying candle data
    const html = `
      <h2 class="mt-4">Historical Candle Data</h2>
      <ul class="list-group">
        ${candleData.map(candle => `
          <li class="list-group-item">
            <strong>Open:</strong> ${candle.open}, 
            <strong>High:</strong> ${candle.high}, 
            <strong>Low:</strong> ${candle.low}, 
            <strong>Close:</strong> ${candle.close}
          </li>
        `).join('')}
      </ul>
    `;
    dataDisplay.innerHTML = html;
  }