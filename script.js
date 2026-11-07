/* DARYA - shared header, footer and product list */

// Edit products here once; the homepage and shop both use this list.
const PRODUCTS = [
  { name: "The Amina Abaya",   price: 74.99, img: "image1.jpg" },
  { name: "The Hajara Set",    price: 84.99, img: "image2.jpg" },
  { name: "The Noor Dress",    price: 64.99, img: "image3.jpg" },
  { name: "The Mehreen Abaya", price: 44.99, img: "image4.jpg" },
  { name: "The Layla Set",     price: 72.99, img: "laylaset.jpg" },
  { name: "The Amal Dress",    price: 38.99, img: "amaldress.jpg" }
];
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
    <a href="#" aria-label="Wishlist"><i class="fa-regular fa-heart"></i></a>
    <a href="#" aria-label="Bag"><i class="fa-solid fa-bag-shopping"></i></a>
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
const grid = document.querySelector("[data-products]");
if (grid) {
  const card = p => `<article class="product-card"><div class="thumb"><img src="images/${p.img}" alt="${p.name}" loading="lazy"><button class="wish" aria-label="Add ${p.name} to wishlist"><i class="fa-regular fa-heart"></i></button></div><h3>${p.name}</h3><p>£${p.price.toFixed(2)}</p></article>`;
  const draw = l => grid.innerHTML = l.length ? l.map(card).join("") : '<p class="empty">No products match your search.</p>';
  draw(PRODUCTS.slice(0, +grid.dataset.products || PRODUCTS.length));

  grid.addEventListener("click", e => {
    const b = e.target.closest(".wish");
    if (b) { const i = b.querySelector("i"); i.classList.toggle("fa-regular"); i.classList.toggle("fa-solid"); }
  });

  const search = document.getElementById("search"), sort = document.getElementById("sort");
  if (search && sort) {
    const update = () => {
      const q = search.value.toLowerCase().trim();
      const l = PRODUCTS.filter(p => p.name.toLowerCase().includes(q));
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
