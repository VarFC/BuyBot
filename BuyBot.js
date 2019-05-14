//https://github.com/VarFC/BuyBot/

const Poloniex = require('poloniex-api-node');
require('console-stamp')(console);
let apiKey="your-key-here";
let apiSecret="your-secret-here"
let currencyPair="USDC_BTC";
let amountUSD=1000;
let SECONDS=1000;
let MINUTES=60*SECONDS;
let HOURS=60*MINUTES;
let delay=30*MINUTES;
let poloniex = new Poloniex(apiKey,apiSecret,{ socketTimeout: 15000 });
let buy=function(){
  poloniex.returnTicker((err, ticker) => {
    if (err) {
      console.log(err.message);
    } else {

      let pair_data=ticker[currencyPair]
      let price=pair_data.lowestAsk;
      let amountBTC=(amountUSD/price).toFixed(8);
      poloniex.buy(currencyPair,price,amountBTC,false,false,false,(err,order) => {
        if (err) {
          console.log("BUY FAILED: "+err.message);
        } else {
          if(order.amount>0){
            let amountExecuted=amountBTC-order.amount;
            console.log("Order partially filled: bought "+amountExecuted+ " BTC @ "+price);
          }
          else{
            console.log("Order filled: bought "+amountBTC+ " BTC @ "+price+ "for "+amountUSD+ " USD");
          }
        }
      });
    }
  });
};
buy();
setInterval(buy,delay);
