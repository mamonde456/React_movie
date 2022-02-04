import {useState,useEffect} from "react";

function App() {
  const [loading,setLoading] = useState(true);
  const[coins, setCoins]=useState([])
  const [dallars, setDallars]=useState(20);
  const [takeCoins, setTakeCoins]=useState(0);
  const onSubmit=(event)=>event.preventDefault();
  const onChange=(event)=>setDallars(event.target.value)
  const needCoins=(event)=>setTakeCoins(event.target.value)
  // console.log(takeCoins,dallars)

  // console.log(dallars)
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response)=>response.json())
    .then((json)=>{
      setCoins(json);
      setLoading(false);
    })
  },[])

  return (
   <div>
     <h1>The Coins! ({coins.length})</h1>
     <h2>Enter your dallars.</h2>
     <form onSubmit={onSubmit}>
     <input onChange={onChange} value={dallars} type="number" placeholder="Enter is here" />
     <button>click me</button>
     </form>
     {loading ? <strong>Loading...</strong> : 
     <select onChange={needCoins}>{coins.map((coin)=><option value={coin.quotes.USD.price}>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}</option>)}</select>}
     <h2>you can get  {takeCoins/dallars}</h2>
    </div>
  );
}

export default App;
