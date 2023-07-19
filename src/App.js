import logo from "./logo.svg";
import "./App.css";
import WatchlistChart from "./components/WatchlistChart";
import { useState, useEffect } from "react";
import WatchList from "./components/WatchList";
import Wallet from "./components/Wallet";
import WalletChart from "./components/WalletChart";

const defaultWatchList = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
  { id: "ethereum", symbol: "eth", name: "Ethereum" },
  { id: "binancecoin", symbol: "bnb", name: "BNB" },
];

function App() {
  const [allCoins, setAllCoins] = useState([]);
  const [watchListCoins, setWatchListCoins] = useState(defaultWatchList);
  const [coinPrices, setCoinPrices] = useState([]);
  // [
  //       { coindId: 'bitcoin', prices: [      ]},
  //       { coindId: 'etherum', prices: [      ]},
  //  ]
  
  const [walletCoins, setWalletCoins] = useState([]);
  const [walletTotal, setWalletTotal] = useState(0);
  const [walletCoinPrices, setWalletCoinPrices] = useState([])



  const fetchCoinPrices = async (coinId) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
    );
    const data = await res.json();
    setCoinPrices([...coinPrices, { coinId, prices: data.prices }]);
  };

  const fetchDefaultCoinsPrices = async() => {
    const result = await Promise.all(defaultWatchList.map(async (coin) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=30`
      );
      const data = await res.json();
      return {coinId: coin.id, prices: data.prices};
    }));
    setCoinPrices(result);
  }

  const fetchAllCoins = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en"
    );
    const data = await res.json();
    setAllCoins(data);
  };

  useEffect(() => {
    fetchAllCoins();
    fetchDefaultCoinsPrices();    
  }, []);

  const onWatchListCoinAdded = (coinId) => {
    setWatchListCoins([
      ...watchListCoins,
      allCoins.find((coin) => coin.id === coinId),
    ]);
    fetchCoinPrices(coinId);
  };

  const onWatchListCoinDeleted = (coinId) => {
    setWatchListCoins(watchListCoins.filter((coin) => coin.id !== coinId));
    setCoinPrices(coinPrices.filter(coin => coin.coinId !== coinId));
  };

  const fetchWalletCoinPrices = async (coinId) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
    );
    const data = await res.json();
    setWalletCoinPrices([...walletCoinPrices, { coinId, prices: data.prices }]);
  };

  const onWalletCoinAdded = (walletCoin) => {
    fetchWalletCoinPrices(walletCoin.coinId)
    //check if coin exists
    setWalletCoins([...walletCoins, walletCoin])
  };

  useEffect(() => {
    let total = 0;
     // walletCoinPrices: [
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
    for(let {coinId, quantity} of walletCoins) {
      const coin = walletCoinPrices.find(coin => coin.coinId === coinId);
      if (!coin) continue;

      const prices = coin.prices;
      const lastPrice = prices[prices.length-1][1];
      total += quantity*lastPrice;

    }
    setWalletTotal(total)
  }, [walletCoins, walletCoinPrices])
  

  return (
    <div className="App">
      <div className="left-panel">
        <WatchList
          allCoins={allCoins}
          watchListCoins={watchListCoins}
          onWatchListCoinAdded={onWatchListCoinAdded}
          onWatchListCoinDeleted={onWatchListCoinDeleted}
        />
        <Wallet 
          allCoins={allCoins}
          walletCoins={walletCoins}
          onWalletCoinAdded={onWalletCoinAdded}
          walletTotal={walletTotal}
        />
      </div>
      <div className="right-panel">
        <WatchlistChart coinPrices={coinPrices} />
        <WalletChart walletCoinPrices={walletCoinPrices} walletCoins={walletCoins} />
      </div>

      {/* <CoinList onCoinSelected={onCoinSelected}/> */}
    </div>
  );
}

export default App;
