
import { useState } from "react";

export default function Wallet({allCoins, onWalletCoinAdded, walletCoins, walletTotal}) {

  const [walletCoinToAdd, setWalletCoinToAdd] = useState({coinId:'bitcoin', quantity:1});

  const onWalletListCoinSelected = (coinId) => {
    setWalletCoinToAdd({...walletCoinToAdd, coinId})
  }
  
  const onWalletListCoinQuantityChanged = (quantity) => {
    setWalletCoinToAdd({...walletCoinToAdd, quantity})
  }

  return (
    <>
    <div>Wallet</div>
    <div className="coin-to-add">
         <select onChange={(e) => onWalletListCoinSelected(e.target.value)}>
                <option key="default" value="default">Select coin</option>
                {allCoins.map(coin => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>)}
         </select>
         <input 
            type="number" 
            onChange={(e) => onWalletListCoinQuantityChanged(e.target.value)}
         />
         <button onClick={() => onWalletCoinAdded(walletCoinToAdd)}>Add</button>
    </div>
    <div className="wallet-coins">
      {walletCoins.map(coin => {
        return <div key={coin.coinId}>
          <span>{coin.coinId}</span>
          <input type="number" value={coin.quantity}/>
        </div>
      })}
    </div>
    <div className="total">{walletTotal}</div>

    </>
  )
}
