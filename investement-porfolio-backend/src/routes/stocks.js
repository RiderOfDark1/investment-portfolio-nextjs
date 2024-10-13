const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/stocks', async (req, res) => {
    const { symbols } = req.query;
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    if(!symbols) {
        return res.status(400).json({ error: 'Stock symbols are required!' });
    }

    try {
        const symbolArray = symbols.split(',');
       
        // const promises = symbolArray.map((symbol) => {
        //     const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
        //     console.log(url);
        //     return fetch(url)
        //         .then(response => response.json())
        //         .then(data => {
        //             if(data['Error Message']) {
        //                 throw new Error(`Error fetching data for ${symbol}`);
        //             }

        //             const timeSeries = data['Time Series (5min)'];
        //             const latestTime = Object.keys(timeSeries)[0];
        //             const latestData = timeSeries[latestTime];
        //             console.log(timeSeries);
        //             return {
        //                 symbol,
        //                 price: latestData['1. open'],
        //                 time: latestTime,
        //             };
        //         });
        // });

        // const stockData = await Promise.all(promises);
        
        const currentDate = new Date();
        // Example: "Mon Oct 13 2024"
        const formattedDate = currentDate.toDateString(); 

        const stockData = [
            {
                symbol: "AAPL",
                price: "242.41",
                time: formattedDate
            },
            {
                symbol: "GOOGL",
                price: "432.41",
                time: formattedDate
            }
        ];
        res.status(200).json({ data: stockData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock data', message: error.message});
    }
});

module.exports = router;