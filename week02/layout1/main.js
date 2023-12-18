const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const number = 4030.4;
const data = [
  {
    date: "18-06-2017 12:38:42",
    market: "ETH/USDT",
    side: "Buy",
    price: 3582.18,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Open",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Buy",
    price: number.toFixed(2),
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Open",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "ETH/USDT",
    side: "Buy",
    price: 3582.18,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "100%",
    status: "Filled",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Buy",
    price: 54332.31,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Open",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: 54332.31,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Canceled",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: number.toFixed(2),
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Open",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: number.toFixed(2),
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Canceled",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: 3582.18,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Open",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: 3582.18,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Canceled",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: 3582.18,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Open",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: 3582.18,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Canceled",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: 3582.18,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Open",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: 54332.31,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Canceled",
  },
  {
    date: "18-06-2017 12:38:42",
    market: "BTC/USDT",
    side: "Sell",
    price: 54332.31,
    amount: number.toFixed(2),
    value: number.toFixed(2),
    filled: "0%",
    status: "Open",
  },
];

const tbody = $("table tbody");

function renderData() {
  const rows = data.map(
    (item) =>
      `<tr>
            <td>${item.date}</td>
            <td style="color: var(--txtContent);">${item.market}</td>
            <td>
              <p class="${item.side === "Buy" ? "buy" : "sell"}">
                ${item.side}
              </p>
            </td>
            <td style="color: var(--txtContent);">${item.price}</td>
            <td style="color: var(--txtContent);">${item.amount}</td>
            <td style="color: var(--txtContent);">${item.value}</td>
            <td style="color: var(--txtContent);">${item.filled}</td>
            <td>
                <p class="stt txt-center border-rad-4-px
                ${
                  item.status === "Open"
                    ? "openStt"
                    : item.status === "Filled"
                    ? "filledStt"
                    : "canceledStt"
                }">${item.status}</p>
            </td>
            ${
              item.status === "Open"
                ? `<td class="">
                <div class="d-flex flex-row align-items-center">
                  
                    <button class="btnCancel border-none bg-none font-family-Inter hoverBtnCancel">Cancel</button>
                    <img src="imgs/cancel.png" alt="" />
                </div>
            </td>`
                : ""
            }
            
        </tr>`
  );
  tbody.innerHTML = rows.join("\n");
}

window.document.addEventListener("DOMContentLoaded", renderData);
