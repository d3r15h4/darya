# Darya
# DARYA by Derisha

A demo storefront for a modest fashion brand: abayas, dresses, sets and accessories. Built with plain HTML, CSS and JavaScript, with no frameworks or build step.

**Live site:** https://d3r15h4.github.io/darya/

> This is a demo project. Products are fictional and checkout is not connected.

## Features

- Responsive layout with a header that changes as you scroll
- Shop page with search and price sorting
- Category pages for Abayas, Dresses, Sets and Accessories
- Slide-out shopping bag with quantities and a free-delivery progress message
- Bag contents saved in the browser between pages
- Wishlist hearts on every product

## Project structure

```
index.html          Homepage
shop.html           All products
abayas.html         Category pages (dresses, sets and accessories work the same way)
about.html          Brand story
contact.html        Contact form (shows a confirmation only, does not send)
style.css           All styles
script.js           Header, footer, products, bag
images/             Logo, hero, collection and product photos
```

## Editing the site

**Products:** edit the `PRODUCTS` list at the top of `script.js`. Each item has a name, price, image file name and category (`abayas`, `dresses`, `sets` or `accessories`). The homepage, shop and category pages all update from that one list.

**Header, footer and menu:** also in `script.js` (the `NAV` list and the header/footer markup), so you only change them once.

**Images:** put files in `images/` and match the names used in `script.js`: `logo.png`, `hero.jpg`, `brand-story.jpg`, `collection1.jpg` to `collection4.jpg`, `image1.jpg` to `image4.jpg`, `laylaset.jpg`, `amaldress.jpg`, `safiyahijab.jpg` and `zainabshawl.jpg`.

**Adding a category:** copy `sets.html`, change the `data-category`, `data-title` and `data-blurb` values, then add the page to the `CATS` list in `script.js`.

## Run locally

Open `index.html` in a browser. For the best results, serve the folder instead:

```
python3 -m http.server
```

Then visit http://localhost:8000.

## Deploy

The site is hosted with GitHub Pages. Push to the main branch, and it updates within a minute or two (use a hard refresh if you still see the old version).

## Roadmap

- Product detail pages with size selector
- Size and length guide
- Wishlist page
- Filters (size, colour, price range)
- Real checkout (Stripe Payment Links or Shopify Buy Button)
- Working contact form and email signup
- Lookbook page
