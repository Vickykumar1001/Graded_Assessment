/*
Graded Assessment: Working with JSON Data
Problem:
You are tasked with implementing a product management system. The system will use JSON data for storing information about products. Each product has the following properties:
•	id: Unique identifier for the product.
•	name: Name of the product.
•	category: Category of the product.
•	price: Price of the product.
•	available: Boolean indicating if the product is in stock.
The tasks below involve reading JSON data, adding new products, updating product information, and filtering products based on certain conditions.

Tasks:
1. Parse the JSON data:
Write a function that reads the JSON data (in the format above) and converts it into a usable data structure. You will need to parse the JSON into a JavaScript object.
2. Add a new product:
Write a function to add a new product to the catalog. This product will have the same structure as the others and should be appended to the products array.
3. Update the price of a product:
Write a function that takes a product ID and a new price and updates the price of the product with the given ID. If the product doesn’t exist, the function should return an error message.
4. Filter products based on availability:
Write a function that returns only the products that are available (i.e., available: true).
5. Filter products by category:
Write a function that takes a category name (e.g., "Electronics") and returns all products in that category.*/

const { readFileSync, writeFileSync } = require('fs')


// Reading the data
let data = readFileSync("./data.json", "utf8")
// console.log(data);


// Task 1: Parse JSON data
function parseJSONData(data) {
    try {
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.log('Error:', err);
    }
}

const products = parseJSONData(data);
// console.log(products)

// Task 2: Add a new product
function addProduct(new_product) {
    const existingProduct = products.find(product => product.id === new_product.id);
    if (existingProduct) {
        return `Product with ID ${new_product.id} already exists.`;
    }
    products.push(new_product);
    writeFileSync("./data.json", JSON.stringify(products, null, 2));
    return `Product with ID ${new_product.id} added successfully.`;
}

// Task 3: Update the price of a product
function updateProductPrice(id, new_price) {
    const existingProduct = products.find(product => product.id === id);
    if (!existingProduct) {
        return `Product with ID ${id} does not exist.`;
    }
    existingProduct.price = new_price;
    writeFileSync("./data.json", JSON.stringify(products, null, 2));
    return `Price of product with ID ${id} updated successfully.`;
}

// Task 4: Filter products based on availability
function filterAvailableProducts() {
    return products.filter(product => product.available);
}

// Task 5: Filter products by category
function filterProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Example usage:

// 1. Initial list of Products
console.log("\n Initial list of Products: \n");
console.log(products)

// 2. Adding new Product
const new_product = {
    id: 5,
    name: "Table",
    category: "Furniture",
    price: 1500,
    available: true,
};
console.log(addProduct(new_product));
//  List after adding a Product
// console.log("\n List after adding a Product:  \n");
// console.log(products)

// 3. updating price of a Product
console.log(updateProductPrice(2, 400));
//  List after Updating a Product
// console.log("\n List after Updating a Product:  \n");
// console.log(products)

// 4. Filtering products based on availability
console.log("\n Products available: \n");
console.log(filterAvailableProducts());

// 5. Filtering products by category
console.log("\n Products in Category 'Electronics': \n");
console.log(filterProductsByCategory("Electronics"));


