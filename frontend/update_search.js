const fs = require('fs');

const file = 'src/components/GlobalSearch.jsx';
let content = fs.readFileSync(file, 'utf8');

// Match the export const mockProducts = [ ... ]; block
const regex = /export const mockProducts = \[([\s\S]*?)\];/;
const match = content.match(regex);

if (match) {
    // A bit hacky: evaluate the array, modify it, and write it back
    // However, since it has comments, eval might fail if we don't clean it up or if we just use a regex replace per line.
    
    let lines = content.split('\n');
    let insideMockProducts = false;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes('export const mockProducts = [')) {
            insideMockProducts = true;
            continue;
        }
        if (insideMockProducts) {
            if (line.trim() === '];') {
                insideMockProducts = false;
                continue;
            }
            
            // Assign categories
            if (line.includes('{ id:')) {
                // Change link: "/product-details-two" to link: "/product/" + id
                let idMatch = line.match(/id:\s*(\d+)/);
                if (idMatch) {
                    let id = idMatch[1];
                    line = line.replace(/link:\s*"[^"]+"/, `link: "/product/${id}"`);
                    
                    let category = "Groceries"; // default
                    const nameLower = line.toLowerCase();
                    if (nameLower.includes('iphone')) category = "Smartphones";
                    else if (nameLower.includes('headphone') || nameLower.includes('watch') || nameLower.includes('camera') || nameLower.includes('laptop') || nameLower.includes('monitor') || nameLower.includes('keyboard') || nameLower.includes('earbuds') || nameLower.includes('creator desk setup')) category = "Electronics";
                    else if (nameLower.includes('sneakers')) category = "Fashion";
                    else if (nameLower.includes('chair')) category = "Furniture";
                    else if (nameLower.includes('supplement') || nameLower.includes('c-500')) category = "Health & Wellness";
                    else if (nameLower.includes('apple') || nameLower.includes('avocado') || nameLower.includes('berry') || nameLower.includes('watermelon') || nameLower.includes('pineapple') || nameLower.includes('cherry') || nameLower.includes('banana') || nameLower.includes('grape')) category = "Fruits";
                    else if (nameLower.includes('carrot') || nameLower.includes('broccoli') || nameLower.includes('spinach') || nameLower.includes('cabbage') || nameLower.includes('tomato') || nameLower.includes('onion') || nameLower.includes('garlic') || nameLower.includes('ginger')) category = "Vegetables";
                    
                    // Add category before link
                    line = line.replace(/link:/, `category: "${category}", link:`);
                }
                lines[i] = line;
            }
        }
    }
    
    fs.writeFileSync(file, lines.join('\n'));
    console.log("Successfully updated mockProducts with categories and dynamic links.");
} else {
    console.log("Could not find mockProducts array.");
}
