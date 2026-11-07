/* DARYA demo checkout. Uses cart, money, save, FREE_DELIVERY and PAY from script.js */
(() => {
  const box = document.getElementById("summary"), form = document.getElementById("co");
  let promo = false;
  const sub = () => cart.reduce((t, i) => t + i.price * i.qty, 0);
  const ship = () => form.elements.ship.value === "express" ? 6.99 : (sub() >= FREE_DELIVERY ? 0 : 3.99);

  function render() {
    const s = sub(), d = promo ? s * 0.1 : 0, sh = cart.length ? ship() : 0;
    box.innerHTML = `<h2>Order summary</h2>
      ${cart.map(i => `<div class="line"><img src="images/${i.img}" alt=""><div><h4>${i.name}</h4><p>Qty ${i.qty}</p></div><span>${money(i.price * i.qty)}</span></div>`).join("") || '<p>Your bag is empty. <a href="shop.html">Keep shopping</a></p>'}
      <div class="promo"><input id="code" placeholder="Discount code" aria-label="Discount code"><button type="button" id="apply" class="button dark">Apply</button></div>
      <p id="promomsg">${promo ? "" : ""}</p>
      <div class="row"><span>Subtotal</span><span>${money(s)}</span></div>
      ${d ? `<div class="row"><span>Discount (DARYA10)</span><span>-${money(d)}</span></div>` : ""}
      <div class="row"><span>Delivery</span><span>${sh ? money(sh) : "Free"}</span></div>
      <div class="row total"><span>Total</span><span>${money(s - d + sh)}</span></div>
      ${PAY}`;
  }

  box.addEventListener("click", e => {
    if (e.target.id !== "apply") return;
    if (document.getElementById("code").value.trim().toUpperCase() === "DARYA10") { promo = true; render(); }
    else document.getElementById("promomsg").textContent = "That code is not valid.";
  });
  form.addEventListener("change", render);
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!cart.length) return;
    const n = "DAR-" + Math.floor(100000 + Math.random() * 900000);
    const email = form.elements.email.value.replace(/[<>&"]/g, "");
    document.querySelector(".checkout-wrap").innerHTML = `<div class="thanks"><i class="fa-regular fa-circle-check"></i><h1>Thank you for your order</h1><p>Your order number is ${n}. A confirmation would be sent to ${email}.</p><p>This is a demo store, so no payment was taken.</p><a class="button dark" href="shop.html">Continue shopping</a></div>`;
    cart.length = 0; save();
  });
  render();
})();
