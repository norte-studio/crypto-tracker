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
    
    // walletCoints
    // [
    //   {coinId: 'bitcoin', quantity: 10},  
    //   {coinId: 'etherum', quantity: 5},
    //]
export default function WalletChart ({walletCoins, walletCoinPrices}) {
    let timeMap = {};
    for(let coin of walletCoinPrices) {
        for(let [time, price] of coin.prices) {
            const formatedTime =  moment(time).format('l');
            timeMap[formatedTime] = timeMap[formatedTime] ? 
                {...timeMap[formatedTime], [coin.coinId]: price} :
                {[coin.coinId]: price}
        }
    }
    let data = Object.keys(timeMap).map(time => ({time, ...timeMap[time]}));
    // almost final
    //     [
    //         {time: 1682913627610, bitcoin: 30000, etherum: 1200},
    //         {time: 1682917219120, bitcoin: 30100, etherum: 1100},
    //         {time: 1682917219125, bitcoin: 29000, etherum: 1000}
    //     ]
   let totalData = data.map(el => {
        let res = {time: el.time};
        let total = walletCoins.reduce((total, {coinId, quantity}) => {
            return total + quantity * el[coinId];
        }, 0);
        // let total = 0;
        // for(const {coinId, quantity} of walletCoins) {
        //     total += quantity * el[coinId];
        // }
        res.total = total;
        return res;
   })
    // final
    //     [
    //         {time: 1682913627610, total: 30000},
    //         {time: 1682917219120, total: 30100},
    //         {time: 1682917219125, total: 29000}
    //     ]
    
    
    return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={totalData}
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
          <Line type="monotone" dataKey='total' stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }

