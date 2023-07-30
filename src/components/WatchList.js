
export default function WatchList({allCoins, watchListCoins, onWatchListCoinAdded, onWatchListCoinDeleted}) {
  return (
    <div>
        <div className="section-header">WatchList</div>
        <div className="watchlist-select-container">
            <select onChange={(e) => onWatchListCoinAdded(e.target.value)}>
                <option key="default" value="default">Add coin</option>
                {allCoins.map(coin => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>)}
            </select>
        </div>
        <div>
            {watchListCoins.map(coin => 
            <div className="watchlist-coin">
                <span className="watchlist-coin-symbol">{coin.symbol}</span>
                <span className="watchlist-coin-del" onClick={() => onWatchListCoinDeleted(coin.id)}>x</span>
            </div>)}
        </div>
    </div>
  )
}
