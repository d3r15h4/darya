/* DARYA - shared header, footer and product list */

// Edit products here once; the homepage and shop both use this list.
const PRODUCTS = [
  { name: "The Amina Abaya",   price: 74.99, img: "image1.jpg",        cat: "abayas" },
  { name: "The Hajara Set",    price: 84.99, img: "image2.jpg",        cat: "sets" },
  { name: "The Noor Dress",    price: 64.99, img: "image3.jpg",        cat: "dresses" },
  { name: "The Mehreen Abaya", price: 44.99, img: "image4.jpg",        cat: "abayas" },
  { name: "The Layla Set",     price: 72.99, img: "laylaset.jpg",      cat: "sets" },
  { name: "The Amal Dress",    price: 38.99, img: "amaldress.jpg",     cat: "dresses" },
  { name: "The Safiya Hijab",  price: 19.99, img: "safiyah.jpg",   cat: "accessories" },
  { name: "The Zainab Shawl",  price: 29.99, img: "zainab.jpg",   cat: "accessories" }
];
const slug = n => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");
PRODUCTS.forEach(p => p.slug = slug(p.name));
const SIZES = ["XS", "S", "M", "L", "XL"];
const DESC = {
  abayas: "A flowing, floor-length abaya with clean lines and a relaxed, modest fit. Designed to move beautifully and layer easily.",
  dresses: "A modest dress with a graceful silhouette, designed for comfort from day to evening.",
  sets: "A coordinated set made to be worn together or mixed and matched across your wardrobe.",
  accessories: "A finishing touch in soft, premium fabric, designed to pair with every piece in the collection."
};
let wish = [];
try { wish = JSON.parse(localStorage.getItem("darya-wish")) || []; } catch (e) {}
const wishPage = document.body.hasAttribute("data-wishlist");
const EMPTY = '<p class="empty">' + (wishPage ? "Nothing saved yet. Tap the heart on any product to save it here." : "No products match your search.") + "</p>";
const NAV = [["Home", "index"], ["Shop", "shop"], ["About", "about"], ["Contact", "contact"]];
const page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
const solid = document.body.hasAttribute("data-solid");

// Header + footer (one place to edit for every page)
const links = cls => NAV.map(([l, p]) => `<a href="${p}.html"${p === page ? ' class="active"' : ""}>${l}</a>`).join("");
document.body.insertAdjacentHTML("afterbegin", `
<div class="announcement">Complimentary UK Delivery on Orders Over £75</div>
<header class="${solid ? "solid" : ""}">
  <a href="index.html" class="logo"><img src="images/logo.png" alt="Darya" class="logo-image"></a>
  <nav>${links()}</nav>
  <div class="header-icons">
    <a href="wishlist.html" aria-label="Wishlist"><i class="fa-regular fa-heart"></i><span id="wcount"></span></a>
    <a href="#" id="bag" aria-label="Open bag"><i class="fa-solid fa-bag-shopping"></i><span id="count"></span></a>
  </div>
</header>`);
document.body.insertAdjacentHTML("beforeend", `
<footer>
  <h2>DARYA</h2><p class="footer-sig">by Derisha</p>
  <div class="footer-links">${links()}</div>
  <p class="copyright">© ${new Date().getFullYear()} Darya by Derisha</p>
</footer>`);

// Header changes on scroll
const header = document.querySelector("header");
const onScroll = () => header.classList.toggle("scrolled", scrollY > 60);
addEventListener("scroll", onScroll);
onScroll();

// Products (home = first 4, shop = all, with search + sort)
if (document.body.hasAttribute("data-product")) {
  const p = PRODUCTS.find(x => x.slug === new URLSearchParams(location.search).get("p"));
  if (p) document.title = `${p.name} | DARYA by Derisha`;
  header.insertAdjacentHTML("afterend", p ? `<section class="section pdp">
    <img src="images/${p.img}" alt="${p.name}">
    <div>
      <a class="back" href="${p.cat}.html">&larr; Back to ${p.cat}</a>
      <h1>${p.name}</h1>
      <p class="price">£${p.price.toFixed(2)}</p>
      <p class="desc">${DESC[p.cat]}</p>
      ${p.cat === "accessories" ? "" : `<fieldset class="sizes"><legend>Size</legend>${SIZES.map(z => `<label><input type="radio" name="size" value="${z}"><span>${z}</span></label>`).join("")}</fieldset>`}
      <div class="pdp-actions">
        <button class="button dark" data-add="${p.name}">Add to bag</button>
        <button class="wish pdp-wish" data-wish="${p.name}" aria-label="Save to wishlist"><i class="${wish.includes(p.name) ? "fa-solid" : "fa-regular"} fa-heart"></i></button>
      </div>
    </div></section>` : '<section class="section pdp"><p>We could not find that product. <a href="shop.html">Back to the shop</a></p></section>');
}
const CATS = [["All", "shop"], ["Abayas", "abayas"], ["Dresses", "dresses"], ["Sets", "sets"], ["Accessories", "accessories"]];
const cat = document.body.dataset.category;
if (cat) header.insertAdjacentHTML("afterend", `<section class="page-hero"><h1>${document.body.dataset.title}</h1><p>${document.body.dataset.blurb}</p></section><section class="shop-toolbar"><input type="search" id="search" placeholder="Search ${document.body.dataset.title.toLowerCase()}..." aria-label="Search products"><select id="sort" aria-label="Sort products"><option value="new">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></section><section class="section white"><div class="product-grid" data-products=""></div></section>`);
document.querySelector(".shop-toolbar")?.insertAdjacentHTML("beforebegin", `<div class="cats">${CATS.map(([l, p]) => `<a href="${p}.html"${p === page ? ' class="active"' : ""}>${l}</a>`).join("")}</div>`);
const grid = document.querySelector("[data-products]");
if (grid) {
  const card = p => `<article class="product-card"><div class="thumb"><a href="product.html?p=${p.slug}"><img src="images/${p.img}" alt="${p.name}" loading="lazy"></a><button class="wish" data-wish="${p.name}" aria-label="Save ${p.name} to wishlist"><i class="${wish.includes(p.name) ? "fa-solid" : "fa-regular"} fa-heart"></i></button></div><h3><a href="product.html?p=${p.slug}">${p.name}</a></h3><p>£${p.price.toFixed(2)}</p>${p.cat === "accessories" ? `<button class="add" data-add="${p.name}">Add to bag</button>` : `<a class="add" href="product.html?p=${p.slug}">Choose size</a>`}</article>`;
  const draw = l => grid.innerHTML = l.length ? l.map(card).join("") : EMPTY;
  const base = PRODUCTS.filter(p => wishPage ? wish.includes(p.name) : !cat || p.cat === cat);
  draw(base.slice(0, +grid.dataset.products || base.length));


  const search = document.getElementById("search"), sort = document.getElementById("sort");
  if (search && sort) {
    const update = () => {
      const q = search.value.toLowerCase().trim();
      const l = base.filter(p => p.name.toLowerCase().includes(q));
      if (sort.value === "low") l.sort((a, b) => a.price - b.price);
      if (sort.value === "high") l.sort((a, b) => b.price - a.price);
      draw(l);
    };
    search.addEventListener("input", update);
    sort.addEventListener("change", update);
  }
}

// Contact form (no backend yet, so it just confirms)
document.querySelector(".contact-form")?.addEventListener("submit", e => {
  e.preventDefault();
  e.target.innerHTML = "<p>Thank you, we'll be in touch soon.</p>";
});

// Shopping bag (saved in the browser so it survives page changes)
const FREE_DELIVERY = 75;
let cart = [];
try { cart = JSON.parse(localStorage.getItem("darya-cart")) || []; } catch (e) {}
const money = n => "£" + n.toFixed(2);
document.body.insertAdjacentHTML("beforeend", '<div id="scrim"></div><aside id="drawer" aria-label="Shopping bag"></aside>');
const drawer = document.getElementById("drawer");
const toggle = open => document.body.classList.toggle("cart-open", open);

function renderCart() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const n = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("count").textContent = n || "";
  drawer.innerHTML = `
    <div class="drawer-head"><h3>Your bag (${n})</h3><button data-close aria-label="Close bag"><i class="fa-solid fa-xmark"></i></button></div>
    <p class="ship">${total >= FREE_DELIVERY ? "You've unlocked free UK delivery" : `Add ${money(FREE_DELIVERY - total)} more for free UK delivery`}</p>
    <div class="drawer-items">${cart.length ? cart.map(i => `
      <div class="line"><img src="images/${i.img}" alt="">
        <div><h4>${i.name}</h4><p>${money(i.price)}</p>
          <div class="qty"><button data-dec="${i.name}" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-inc="${i.name}" aria-label="Increase quantity">+</button></div></div>
        <button data-rm="${i.name}" aria-label="Remove ${i.name}"><i class="fa-regular fa-trash-can"></i></button>
      </div>`).join("") : '<p class="empty-bag">Your bag is empty.</p>'}</div>
    <div class="drawer-foot"><div class="total"><span>Subtotal</span><span>${money(total)}</span></div>
      <button class="button dark" data-checkout>Checkout</button></div>`;
}
function save() { try { localStorage.setItem("darya-cart", JSON.stringify(cart)); } catch (e) {} renderCart(); }

document.addEventListener("click", e => {
  const el = e.target.closest("[data-add],[data-inc],[data-dec],[data-rm],[data-close],[data-checkout],[data-wish],#bag,#scrim");
  if (!el) return;
  const d = el.dataset, find = n => cart.find(i => i.name === n);
  if (el.id === "bag") { e.preventDefault(); toggle(true); }
  else if (el.id === "scrim" || "close" in d) toggle(false);
  else if ("checkout" in d) alert("This is a demo store, so checkout isn't connected yet.");
  else if (d.wish) toggleWish(d.wish, el);
  else if (d.add) {
    const p = PRODUCTS.find(x => x.name === d.add), size = document.querySelector("input[name=size]:checked")?.value;
    if (p.cat !== "accessories" && !size) { document.querySelector(".sizes")?.classList.add("error"); return; }
    const nm = size ? `${p.name} (${size})` : p.name, l = find(nm);
    l ? l.qty++ : cart.push({ ...p, name: nm, qty: 1 }); save(); toggle(true);
  }
  else if (d.inc) { find(d.inc).qty++; save(); }
  else if (d.dec) { const l = find(d.dec); if (--l.qty < 1) cart = cart.filter(i => i !== l); save(); }
  else if (d.rm) { cart = cart.filter(i => i.name !== d.rm); save(); }
});
document.addEventListener("keydown", e => e.key === "Escape" && toggle(false));
renderCart();

// Wishlist (saved in the browser)
function updateWishCount() { document.getElementById("wcount").textContent = wish.length || ""; }
function toggleWish(name, btn) {
  const on = !wish.includes(name);
  wish = on ? [...wish, name] : wish.filter(n => n !== name);
  try { localStorage.setItem("darya-wish", JSON.stringify(wish)); } catch (e) {}
  const i = btn.querySelector("i");
  i.classList.toggle("fa-solid", on); i.classList.toggle("fa-regular", !on);
  updateWishCount();
  if (wishPage) { btn.closest(".product-card")?.remove(); if (!grid.children.length) grid.innerHTML = EMPTY; }
}
updateWishCount();
