var amount = 5
var donateButton
document.addEventListener('DOMContentLoaded', function() {
    donateButton = document.getElementById("donate-btn")
    donateButton.innerHTML = "Donate $" + amount + " with Paypal";
    document.getElementById("slider").value = amount
    sliderUpdate(amount)
});

function donate(value) {
    window.location.href = "process.php?paypal=checkout&donateAmount=" + amount;
}

function sliderUpdate(value) {
    donateButton.innerHTML = "Donate $" + value + " with Paypal"
    if (value >= 5) {
        document.querySelectorAll(".more").forEach(i => {
            i.classList.remove("hidden")
        })
    } else {
        document.querySelectorAll(".more").forEach(i => {
            i.classList.add("hidden")
        })
    }
    amount = value
}