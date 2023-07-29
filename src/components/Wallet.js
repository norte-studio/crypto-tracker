
import { useState } from "react";

export default function Wallet({className, allCoins, onWalletCoinAdded, walletCoins, walletTotal}) {

  const [walletCoinToAdd, setWalletCoinToAdd] = useState({coinId:'bitcoin', quantity:1});

  const onWalletListCoinSelected = (coinId) => {
    setWalletCoinToAdd({...walletCoinToAdd, coinId})
  }
  
  const onWalletListCoinQuantityChanged = (quantity) => {
    setWalletCoinToAdd({...walletCoinToAdd, quantity})
  }

  return (
    <div className={className}>
      <div className="section-header">Wallet</div>
      <div className="coin-to-add">
          <select onChange={(e) => onWalletListCoinSelected(e.target.value)}>
                  <option key="default" value="default">Select coin</option>
                  {allCoins.map(coin => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>)}
          </select>
          <input 
              type="number" 
              placeholder="1"
              onChange={(e) => onWalletListCoinQuantityChanged(e.target.value)}
          />
          <button onClick={() => onWalletCoinAdded(walletCoinToAdd)}>Add</button>
      </div>
      <div className="wallet-coins">
        {walletCoins.map(coin => {
          return <div className="wallet-coin" key={coin.coinId}>
            <div className="wallet-coin-symbol">{coin.coinId}</div>
            <div className="wallet-coin-quantity">{coin.quantity}</div>
            <div className="wallet-coin-del">x</div>
          </div>
        })}
      </div>
      <div className="total">
        <div className="total-text">Total</div>
        <div className="total-amount">${walletTotal.toFixed(1)}</div> 
        </div>

    </div>
  )
}
