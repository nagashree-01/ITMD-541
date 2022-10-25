let btn = document.getElementById('btn');
const total_bill = document.querySelector("#bill-total");
const slider = document.querySelector("#tip");
const tip_percentage = document.querySelector("#tip-percentage");
const tip_amount = document.querySelector("#tip-amount");
const total = document.querySelector("#total");


total_bill.addEventListener("change", calculateTip);
slider.addEventListener("input", calculateTip);

function calculateTip() 

 {
    if (isNaN(total_bill.value)) {
        alert("Please Enter a Number")
    }
    total_bill.value = parseFloat(total_bill.value).toFixed(2);
    let bill = parseFloat(document.getElementById("bill-total").value);
    let tip = document.getElementById("tip").value;

    tip_percentage.value = tip;

    let total_tip = parseFloat(((tip * bill) / 100).toFixed(2));

    tip_amount.value = total_tip;

    total.value = parseFloat(bill + total_tip).toFixed(2);
}