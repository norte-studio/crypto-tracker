import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

 // input
    // coinPrices: [
    //     {
    //         coinId: 'bitcoin',
    //         prices: [
    //             [1682913627610, 30000],
    //             [1682917219120, 30100],
    //             [1682917219125, 29000]
    //         ]
    //     },
    //     {
    //         coinId: 'etherum',
    //         prices: [
    //             [1682913627610, 1200],
    //             [1682917219120, 1100],
    //             [1682917219125, 1000]
    //         ]
    //     }
    // ]

export default function Chart ({coinPrices}) {
    let timeMap = {};
    for(let coin of coinPrices) {
        for(let [time, price] of coin.prices) {
            const formatedTime =  moment(time).format('l');
            timeMap[formatedTime] = timeMap[formatedTime] ? 
                {...timeMap[formatedTime], [coin.coinId]: price} :
                {[coin.coinId]: price}
        }
    }
    console.log(coinPrices);
    // interm
    // {
    //     1682913627610: {bitcon: 30000, eth: 1200},
    //     1682913627610: {bitcon: 30100, eth: 1100},
    //     1682917219125: {bitcon: 29000, eth: 1000}
    // }
    let data = Object.keys(timeMap).map(time => ({time, ...timeMap[time]}))
    // final
    //     [
    //         {time: 1682913627610, bitcoin: 30000, etherum: 1200},
    //         {time: 1682917219120, bitcoin: 30100, etherum: 1100},
    //         {time: 1682917219125, bitcoin: 29000, etherum: 1000}
    //     ]

    let percentageData = data.map(point => {
      let newPoint = {time: point.time};
      Object.keys(point).filter(key => key !== 'time').forEach(coinId => {
        const coinVal = point[coinId];
        const initialVal = data[0][coinId]
        const diff = coinVal - initialVal;
        const percentage = Math.round(diff/initialVal * 100, 1);
        newPoint[coinId] = percentage;
      });
      return newPoint;
    });
     // percentage
    //     [
    //         {time: 1682913627610, bitcoin: 0, etherum: 0},
    //         {time: 1682917219120, bitcoin: 5, etherum: 10},
    //         {time: 1682917219125, bitcoin: 3, etherum: 2}
    //     ]
    
    return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={percentageData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {coinPrices.map((coin, id) => <Line type="monotone" dataKey={coin.coinId} stroke="#82ca9d" />)}
        </LineChart>
      </ResponsiveContainer>
    );
  }

