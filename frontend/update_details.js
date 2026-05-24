const fs = require('fs');

const file = 'src/components/ProductDetailsTwo.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add imports
content = content.replace("import { Link } from 'react-router-dom';", "import { Link, useParams } from 'react-router-dom';\nimport { mockProducts } from './GlobalSearch';");

// 2. Add product lookup logic
const lookupLogic = `const ProductDetailsTwo = () => {
    const { id } = useParams();
    const product = mockProducts.find(p => p.id === parseInt(id)) || mockProducts[0];
`;
content = content.replace("const ProductDetailsTwo = () => {", lookupLogic);

// 3. Update productImages array
const imagesTarget = `    const productImages = [
        "assets/images/thumbs/product-details-two-thumb1.png",
        "assets/images/thumbs/product-details-two-thumb2.png",
        "assets/images/thumbs/product-details-two-thumb3.png",
        "assets/images/thumbs/product-details-two-thumb1.png",
        "assets/images/thumbs/product-details-two-thumb2.png",
    ];`;
const imagesReplacement = `    const productImages = [product.image, product.image, product.image, product.image];`;
content = content.replace(imagesTarget, imagesReplacement);

// 4. Set mainImage initial value
// Since useState runs before product is bound if we just used static string, wait... productImages uses product.image, which is dynamically scoped! So it works.

// 5. Replace title
// Note: due to formatting & newlines, regex is better.
content = content.replace(/<h5 className="mb-12">[\s\S]*?<\/h5>/, '<h5 className="mb-12">{product.name}</h5>');

// 6. Replace price
content = content.replace(/<h6 className="mb-0">USD 320\.99<\/h6>/, '<h6 className="mb-0">{product.price}</h6>');

fs.writeFileSync(file, content);
console.log("Successfully updated ProductDetailsTwo.jsx");
