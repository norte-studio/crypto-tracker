
export default function WatchList({allCoins, watchListCoins, onWatchListCoinAdded, onWatchListCoinDeleted}) {
  return (
    <div>
        <div>WatchList</div>
        <div>
            <select onChange={(e) => onWatchListCoinAdded(e.target.value)}>
                <option key="default" value="default">Add coin to watchlist</option>
                {allCoins.map(coin => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>)}
            </select>
        </div>
        <div>
            {watchListCoins.map(coin => <div>
                <span>{coin.symbol}</span>
                <span style={{'margin-left': '20px'}} onClick={() => onWatchListCoinDeleted(coin.id)}>x</span>
            </div>)}
        </div>
    </div>
  )
}
