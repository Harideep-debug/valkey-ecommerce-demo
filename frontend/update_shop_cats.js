const fs = require('fs');

const file = 'src/components/ShopSection.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update filter logic
const filterTarget = `    const displayedProducts = searchQuery.trim() === ""
        ? mockProducts
        : fuse.search(searchQuery).map(res => res.item);`;

const filterReplacement = `    const categoryQuery = queryParams.get('category') || "All";

    let displayedProducts = searchQuery.trim() === ""
        ? mockProducts
        : fuse.search(searchQuery).map(res => res.item);

    if (categoryQuery !== "All") {
        displayedProducts = displayedProducts.filter(p => p.category === categoryQuery);
    }

    const categories = ["All", ...new Set(mockProducts.map(p => p.category).filter(Boolean))];`;

content = content.replace(filterTarget, filterReplacement);

// 2. Replace sidebar links
// The sidebar lists start with <ul className="max-h-540 overflow-y-auto scroll-sm"> and end with </ul> before <div className="shop-sidebar__box rounded-8 border border-gray-100 padding-24 mb-32"> (approx line 150)
const sidebarRegex = /<ul className="max-h-540 overflow-y-auto scroll-sm">[\s\S]*?<\/ul>/;
const sidebarReplacement = `<ul className="max-h-540 overflow-y-auto scroll-sm">
                                    {categories.map((cat, idx) => (
                                        <li key={idx} className="mb-24">
                                            <Link
                                                to={\`/shop?category=\${encodeURIComponent(cat)}\`}
                                                className={\`text-gray-900 hover-text-main-600 \${categoryQuery === cat ? 'fw-bold text-main-600' : ''}\`}
                                            >
                                                {cat} ({cat === 'All' ? mockProducts.length : mockProducts.filter(p => p.category === cat).length})
                                            </Link>
                                        </li>
                                    ))}
                                </ul>`;
content = content.replace(sidebarRegex, sidebarReplacement);

fs.writeFileSync(file, content);
console.log("Successfully updated ShopSection.jsx with categories");
