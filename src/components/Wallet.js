
import { useState } from "react";

export default function Wallet({className, allCoins, onWalletCoinAdded, walletCoins, walletTotal, onWalletCoinDeleted}) {

  const [walletCoinToAdd, setWalletCoinToAdd] = useState({coinId:'bitcoin', symbol: 'btc', quantity:1});

  const onWalletListCoinSelected = (coinId) => {
    const symbol = allCoins.find(el => el.id === coinId).symbol;
    setWalletCoinToAdd({...walletCoinToAdd, coinId, symbol})
  }
  
  const onWalletListCoinQuantityChanged = (quantity) => {
    setWalletCoinToAdd({...walletCoinToAdd, quantity})
  }

  return (
    <div className={className}>
      <div className="section-header">Wallet</div>
      <div className="coin-to-add">
          <select onChange={(e) => onWalletListCoinSelected(e.target.value)}>
                  {allCoins.map(coin => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>)}
          </select>
          <input 
              type="number" 
              placeholder="1"
              onChange={(e) => onWalletListCoinQuantityChanged(e.target.value)}
          />
          <button 
            onClick={() => onWalletCoinAdded(walletCoinToAdd)}>
              Add
          </button>
      </div>
      <div className="wallet-coins">
        {walletCoins.map(coin => {
          return <div className="wallet-coin" key={coin.coinId}>
            <div className="wallet-coin-symbol">{coin.symbol}</div>
            <div className="wallet-coin-quantity">{coin.quantity}</div>
            <div onClick={() => onWalletCoinDeleted(coin.coinId)} className="wallet-coin-del">x</div>
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
