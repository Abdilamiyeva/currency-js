let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const swapCurrency = document.getElementById("swap-currency");

    //Valyutalar menusi 
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
});

    //Xuddi shu menuni boshqa ochiladigan ro'yxat uchun yozish 
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
});

//default  qiymatlari 
fromDropDown.value = "USD";
toDropDown.value = "UZS";

let convertCurrency = () => {
//Ma'lumotnomalar yaratish
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

// summani kiritish maydoni bo'sh bo'lmasa
    if (amount.length != 0) {
        fetch(api)
        .then((resp) => resp.json())
        .then((data) => {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
            2
            )} ${toCurrency}`;
        });
    } else {
        alert("Iltimos summa kiriting ");
    }
};

//Kiritilgan raqam bo'yicha va veb-sahifa yuklangandan keyin & ni bosish va tanlash/ochiladigan menyu qiymatini o'zgartirish orqali valyutani aylantirish  
document.querySelector("#convert-button").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
document.querySelector("#amount").addEventListener("input",convertCurrency);
document.querySelector("#from-currency-select").addEventListener("change",convertCurrency);
document.querySelector("#to-currency-select").addEventListener("change",convertCurrency);

//Valyuta almashinuvi
swapCurrency.addEventListener("click", () => {
    let temp = fromDropDown.value;
    fromDropDown.value = toDropDown.value;
    toDropDown.value = temp;
    convertCurrency();
})