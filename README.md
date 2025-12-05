### Overview
React Shopping UI is a frontend application built with React for simulating an online shopping experience. It includes product listings, search functionality, cart management, and checkout flows. The app is designed to be modular, with reusable components and efficient state handling via Redux. It's deployed on Vercel for easy preview.

### Features
Product Browsing: Paginated list of products with search autocomplete.
Product Details: View individual product information.
Shopping Cart: Add/remove items, view order summary.
Checkout: Form-based checkout with validation.
Responsive Design: Works on desktop and mobile.
State Persistence: Uses localStorage for cart persistence.

### Technologies
Frontend Framework: React (with hooks and functional components)
State Management: Redux Toolkit (slices for products), React Context API
Styling: CSS (via index.css), Tailwind utility classes
Form Handling & Validation: React Hook Form, Zod, @hookform/resolvers
Build Tools: Vite (inferred from main.jsx and standard React setup)
Deployment: Vercel
Other: LocalStorage for persistence

### Components
AutoCompleteSearchBar: A search input that suggests products as you type. Uses debounced input for performance.
CartTile: Renders a single cart item with quantity controls and remove option.
Modal: Reusable overlay for confirmations (e.g., delete item).
OrderSummary: Displays cart totals, taxes, and subtotal.(removes items for better ux pending ).
ProductTile: Card for listing products with image, price, and add-to-cart button.

Each component is exported via index.jsx for easy imports.

### Pages
CartList: Full cart view with list of items and summary.
CheckOutPage: Multi-step form for user details, payment (validated with Zod).
Pagination: Handles product list navigation (e.g., infinite scroll or page buttons).
ProductDetails: Detailed view of a selected product, including reviews/images.
ProductList: Main catalog with filters, search, and tiles.

Routing is likely handled in App.jsx using React Router (install if missing: npm install react-router-dom).


### State Management
Redux Toolkit: Central store in store.js. Products managed in productsSlice.js (reducers for fetch/add/remove).
LocalStorage: Persistence via localStorage.js (e.g., save cart on changes).Also form data on rememberMe.
Context API: context/index.jsx for lighter global state (e.g., theme or user prefs).Furthur update

npm install react-redux @reduxjs/toolkit

### Project Structure
```
└── 📁src
    └── 📁assets
        ├── react.svg
    └── 📁components
        └── 📁AutoCompleteSearchBar
            ├── index.jsx
        └── 📁cartTile
            ├── index.jsx
        └── 📁Modal
            ├── index.jsx
        └── 📁orderSummary
            ├── index.jsx
        └── 📁productTile
            ├── index.jsx
    └── 📁context
        ├── index.jsx
    └── 📁pages
        └── 📁cartList
            ├── index.jsx
        └── 📁checkOutPage
            ├── index.jsx
        └── 📁pagination
            ├── index.jsx
        └── 📁productDetails
            ├── index.jsx
        └── 📁productList
            ├── index.jsx
    └── 📁redux
        └── 📁slices
            ├── productsSlice.js
        ├── localStorage.js
        ├── store.js
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## External form validation with zod and react hook form

Dependencies:  npm install react-hook-form zod @hookform/resolvers




