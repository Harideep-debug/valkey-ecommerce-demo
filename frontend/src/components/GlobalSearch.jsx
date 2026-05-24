import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

export const mockProducts = [
  // iPhones
  { id: 201, name: "Apple iPhone 15 Pro Max", price: "$1199.00", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=300&auto=format&fit=crop", category: "Smartphones", link: "/product/201" },
  { id: 202, name: "Apple iPhone 14", price: "$799.00", image: "https://images.unsplash.com/photo-1663314815591-66774a169b59?q=80&w=300&auto=format&fit=crop", category: "Smartphones", link: "/product/202" },
  { id: 203, name: "Apple iPhone 13 Mini", price: "$599.00", image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=300&auto=format&fit=crop", category: "Smartphones", link: "/product/203" },
  // Hackathon premium products
  { id: 101, name: "Premium Audio Headphones", price: "$299.00", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop", category: "Electronics", link: "/product/101" },
  { id: 102, name: "Smart Watch Elite", price: "$199.00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop", category: "Electronics", link: "/product/102" },
  { id: 103, name: "Limited Edition Sneakers", price: "$159.00", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop", category: "Fashion", link: "/product/103" },
  { id: 104, name: "Pro DSLR Camera", price: "$899.00", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop", category: "Electronics", link: "/product/104" },
  { id: 105, name: "Creator Desk Setup", price: "$1200.00", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=200&auto=format&fit=crop", category: "Electronics", link: "/product/105" },
  // Local template assets
  { id: 1, name: "Fresh Organic Apples", price: "$4.99", image: "assets/images/thumbs/product-img1.png", category: "Fruits", link: "/product/1" },
  { id: 2, name: "Whole Wheat Bread", price: "$3.49", image: "assets/images/thumbs/product-img2.png", category: "Groceries", link: "/product/2" },
  { id: 3, name: "Premium Coffee Beans", price: "$12.99", image: "assets/images/thumbs/product-img3.png", category: "Groceries", link: "/product/3" },
  { id: 4, name: "Organic Carrots", price: "$2.99", image: "assets/images/thumbs/product-img4.png", category: "Vegetables", link: "/product/4" },
  { id: 5, name: "Dairy Milk", price: "$4.49", image: "assets/images/thumbs/product-img5.png", category: "Groceries", link: "/product/5" },
  { id: 6, name: "Farm Fresh Eggs", price: "$5.99", image: "assets/images/thumbs/product-img6.png", category: "Groceries", link: "/product/6" },
  { id: 7, name: "C-500 Antioxidant Dietary Supplement", price: "$14.99", image: "assets/images/thumbs/product-img7.png", category: "Health & Wellness", link: "/product/7" },
  { id: 8, name: "Marcel's Modern Pantry Almond Unsweetened", price: "$6.99", image: "assets/images/thumbs/product-img8.png", category: "Groceries", link: "/product/8" },
  { id: 9, name: "O Organics Milk, Whole, Vitamin D", price: "$5.49", image: "assets/images/thumbs/product-img9.png", category: "Groceries", link: "/product/9" },
  { id: 10, name: "Whole Grains and Seeds Organic Bread", price: "$4.99", image: "assets/images/thumbs/product-img10.png", category: "Groceries", link: "/product/10" },
  { id: 11, name: "Lucerne Yogurt, Lowfat, Strawberry", price: "$2.49", image: "assets/images/thumbs/product-img11.png", category: "Fruits", link: "/product/11" },
  { id: 12, name: "Nature Valley Whole Grain Oats and Honey Protein", price: "$7.99", image: "assets/images/thumbs/product-img12.png", category: "Groceries", link: "/product/12" },
  { id: 13, name: "Dietary Supplement Pack", price: "$18.99", image: "assets/images/thumbs/product-img13.png", category: "Health & Wellness", link: "/product/13" },
  { id: 14, name: "Dietary Supplement Box", price: "$22.99", image: "assets/images/thumbs/product-img14.png", category: "Health & Wellness", link: "/product/14" },
  { id: 15, name: "Nature Supplement Bottle", price: "$19.99", image: "assets/images/thumbs/product-img15.png", category: "Health & Wellness", link: "/product/15" },
  { id: 16, name: "Good & Gather Farmed Atlantic Salmon", price: "$16.99", image: "assets/images/thumbs/product-img16.png", category: "Groceries", link: "/product/16" },
  { id: 17, name: "Organic Almonds", price: "$9.99", image: "assets/images/thumbs/product-img17.png", category: "Groceries", link: "/product/17" },
  { id: 18, name: "Peanut Butter Spread", price: "$4.99", image: "assets/images/thumbs/product-img18.png", category: "Groceries", link: "/product/18" },
  { id: 19, name: "Fresh Avocados", price: "$3.99", image: "assets/images/thumbs/product-img19.png", category: "Fruits", link: "/product/19" },
  { id: 20, name: "Premium Honey Jar", price: "$8.99", image: "assets/images/thumbs/product-img20.png", category: "Groceries", link: "/product/20" },
  { id: 21, name: "Organic Olive Oil", price: "$14.99", image: "assets/images/thumbs/product-img21.png", category: "Groceries", link: "/product/21" },
  { id: 22, name: "Fresh Orange Juice", price: "$5.99", image: "assets/images/thumbs/product-img22.png", category: "Groceries", link: "/product/22" },
  { id: 23, name: "Grapes Bunch", price: "$6.49", image: "assets/images/thumbs/product-img23.png", category: "Fruits", link: "/product/23" },
  { id: 24, name: "Sparkling Water", price: "$2.99", image: "assets/images/thumbs/product-img24.png", category: "Groceries", link: "/product/24" },
  { id: 25, name: "Mixed Berries Pack", price: "$7.99", image: "assets/images/thumbs/product-img25.png", category: "Groceries", link: "/product/25" },
  { id: 26, name: "Fresh Broccoli", price: "$3.49", image: "assets/images/thumbs/product-two-img1.png", category: "Vegetables", link: "/product/26" },
  { id: 27, name: "Organic Spinach", price: "$4.99", image: "assets/images/thumbs/product-two-img2.png", category: "Vegetables", link: "/product/27" },
  { id: 28, name: "Juicy Watermelon", price: "$6.99", image: "assets/images/thumbs/product-two-img3.png", category: "Fruits", link: "/product/28" },
  { id: 29, name: "Sweet Pineapple", price: "$5.49", image: "assets/images/thumbs/product-two-img4.png", category: "Fruits", link: "/product/29" },
  { id: 30, name: "Green Cabbage", price: "$2.99", image: "assets/images/thumbs/product-two-img5.png", category: "Vegetables", link: "/product/30" },
  { id: 31, name: "Red Tomatoes", price: "$3.99", image: "assets/images/thumbs/product-two-img6.png", category: "Vegetables", link: "/product/31" },
  { id: 32, name: "Yellow Onions", price: "$2.49", image: "assets/images/thumbs/product-two-img7.png", category: "Vegetables", link: "/product/32" },
  { id: 33, name: "Fresh Garlic", price: "$1.99", image: "assets/images/thumbs/product-two-img8.png", category: "Vegetables", link: "/product/33" },
  { id: 34, name: "Organic Ginger", price: "$4.49", image: "assets/images/thumbs/product-two-img9.png", category: "Vegetables", link: "/product/34" },
  { id: 35, name: "Ripe Bananas", price: "$2.29", image: "assets/images/thumbs/product-two-img10.png", category: "Fruits", link: "/product/35" },
  { id: 36, name: "Green Apples", price: "$4.99", image: "assets/images/thumbs/product-two-img11.png", category: "Fruits", link: "/product/36" },
  { id: 37, name: "Red Cherries", price: "$8.99", image: "assets/images/thumbs/product-two-img12.png", category: "Groceries", link: "/product/37" },
  { id: 38, name: "Fresh Strawberries", price: "$5.99", image: "assets/images/thumbs/product-two-img13.png", category: "Groceries", link: "/product/38" },
  { id: 39, name: "Blueberries Box", price: "$6.49", image: "assets/images/thumbs/product-two-img14.png", category: "Groceries", link: "/product/39" },
  { id: 40, name: "Organic Raspberries", price: "$7.99", image: "assets/images/thumbs/product-two-img15.png", category: "Groceries", link: "/product/40" },
  { id: 41, name: "Gaming Laptop Elite", price: "$1499.00", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=200&auto=format&fit=crop", category: "Electronics", link: "/product/41" },
  { id: 42, name: "4K OLED Monitor", price: "$799.00", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=200&auto=format&fit=crop", category: "Electronics", link: "/product/42" },
  { id: 43, name: "Wireless Mechanical Keyboard", price: "$129.00", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=200&auto=format&fit=crop", category: "Electronics", link: "/product/43" },
  { id: 44, name: "Noise Cancelling Earbuds", price: "$199.00", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=200&auto=format&fit=crop", category: "Electronics", link: "/product/44" },
  { id: 45, name: "Ergonomic Office Chair", price: "$349.00", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=200&auto=format&fit=crop", category: "Furniture", link: "/product/45" }
];

const fuseOptions = {
  keys: [
    { name: 'name', weight: 1.0 }
  ],
  threshold: 0.25,
  ignoreLocation: true,
  minMatchCharLength: 2
};
const fuse = new Fuse(mockProducts, fuseOptions);

const GlobalSearch = ({ buttonStyle, wrapperStyle, inputStyle }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchQuery.trim() === "" 
    ? [] 
    : fuse.search(searchQuery).map(result => result.item);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={wrapperStyle || 'flex-align flex-wrap form-location-wrapper'} style={{ flexGrow: 1 }}>
      <div className='search-form__wrapper position-relative w-100'>
        <input
          type='text'
          className={inputStyle || 'search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44 w-100'}
          placeholder='Search for a product or brand'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type='submit'
          className={buttonStyle || 'w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'}
        >
          <i className='ph ph-magnifying-glass' />
        </button>

        {/* Search Results Dropdown */}
        {searchQuery.length > 0 && (
          <div className="search-results-dropdown position-absolute w-100 bg-white border border-gray-200 rounded-12 mt-8 shadow-sm overflow-hidden" style={{ top: '100%', left: 0, zIndex: 9999 }}>
            {searchResults.length > 0 ? (
              <ul className="list-unstyled mb-0 max-h-300 overflow-y-auto">
                {searchResults.map(product => (
                  <li key={product.id} className="border-bottom border-gray-100 last-no-border">
                    <Link to={product.link} className="d-flex align-items-center p-12 hover-bg-neutral-100 transition-1 text-decoration-none" onClick={() => setSearchQuery("")}>
                      <img src={product.image} alt={product.name} className="w-40 h-40 object-fit-cover rounded-8 me-12" />
                      <div>
                        <h6 className="text-sm mb-4 text-gray-900">{product.name}</h6>
                        <span className="text-main-600 fw-bold text-xs">{product.price}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-16 text-center text-gray-500">
                No products found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default GlobalSearch;
