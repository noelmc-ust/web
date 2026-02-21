
// ---- Simple Retail Store (no backend) ----
const PRODUCTS = [
  { id: 1, name: "Wireless Mouse", price: 799, currency: "₹", desc: "Ergonomic, silent clicks." },
  { id: 2, name: "Mechanical Keyboard", price: 2999, currency: "₹", desc: "Blue switches, RGB." },
  { id: 3, name: "USB-C Hub", price: 1299, currency: "₹", desc: "HDMI + 3x USB 3.0." },
  { id: 4, name: "Noise-Cancel Headset", price: 4999, currency: "₹", desc: "Over-ear, BT 5.3." },
  { id: 5, name: "1080p Webcam", price: 1599, currency: "₹", desc: "Auto light correction." },
  { id: 6, name: "Portable SSD 500GB", price: 5499, currency: "₹", desc: "NVMe, USB 3.2." }
];

const $ = (id) => document.getElementById(id);
const fmt = (n) => `₹${n.toFixed(2)}`;

function loadCart() {
  try { return JSON.parse(localStorage.getItem("cart") || "{}"); }
  catch { return {}; }
}
function saveCart(cart) { localStorage.setItem("cart", JSON.stringify(cart)); }

function renderProducts() {
  const el = $("products");
  el.innerHTML = PRODUCTS.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <div class="muted">${p.desc}</div>
      <div class="price">${p.currency}${p.price.toFixed(2)}</div>
      <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

function cartToArray(cart) {
  return Object.entries(cart).map(([id, qty]) => {
    const prod = PRODUCTS.find(p => p.id === Number(id));
    return { ...prod, qty, subtotal: prod.price * qty };
  });
}

function updateCartUI() {
  const cart = loadCart();
  const items = cartToArray(cart);

  const count = items.reduce((a, i) => a + i.qty, 0);
  const total = items.reduce((a, i) => a + i.subtotal, 0);

  $("cartBadge").textContent = String(count);
  $("cartCount").textContent = String(count);
  $("cartTotal").textContent = fmt(total);

  $("cartItems").innerHTML = items.length ? items.map(i => `
    <div class="cart-item">
      <div>
        <div><strong>${i.name}</strong></div>
        <small class="muted">${fmt(i.price)} each</small>
      </div>
      <div class="qty">
        <button class="btn" onclick="decrement(${i.id})">-</button>
        <span>${i.qty}</span>
        <button class="btn" onclick="increment(${i.id})">+</button>
      </div>
      <div><strong>${fmt(i.subtotal)}</strong></div>
    </div>
  `).join("") : `<div class="muted">Cart is empty.</div>`;
}

function addToCart(id) {
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  updateCartUI();
}

function increment(id) {
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  updateCartUI();
}

function decrement(id) {
  const cart = loadCart();
  if (!cart[id]) return;
  cart[id] = cart[id] - 1;
  if (cart[id] <= 0) delete cart[id];
  saveCart(cart);
  updateCartUI();
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartUI();
}

function setupActions() {
  $("clearCartBtn").addEventListener("click", clearCart);
  $("checkoutBtn").addEventListener("click", () => {
    alert("Checkout is simulated in this demo.\nImplement server-side payment in a real app.");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupActions();
  updateCartUI();
});

