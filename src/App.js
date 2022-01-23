import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollars, setdollars] = useState("");
  const [currentCoin, setcurrentCoin] = useState("");
  const onChange = (e) => {
    setdollars(e.target.value);
  };
  const selectCoin = (e) => {
    setcurrentCoin(e.target.value);
  };
  console.log(currentCoin);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>달러-코인 환율({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <select value={currentCoin} onChange={selectCoin}>
        <option value="">---코인 리스트---</option>
        {coins.map((coin,index) => (
          <option key={index}value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="dollars">달러 → 코인</label>
        <input
          onChange={onChange}
          id="dollars"
          type="number"
          placeholder="달러 얼마 갖고 있음?"
        ></input>
      </div>
        <strong>{dollars / currentCoin}개 살 수 있음</strong>
    </div>
  );
}

export default App;
