/*
Graded Assessment: MongoDB Scripts with Relationships
Scenario Overview:
You are working with an e-commerce platform. The platform has two collections:
1.	Customers collection: Contains information about each customer.
2.	Orders collection: Contains information about orders placed by customers.
Each customer can have multiple orders, but each order is linked to only one customer.

*/

// Customer Document Structure:
// { "_id": ObjectId("unique_id"), "name": "John Doe", "email": "johndoe@example.com", "address": { "street": "123 Main St", "city": "Springfield", "zipcode": "12345" }, "phone": "555-1234", "registration_date": ISODate("2023-01-01T12:00:00Z") }

// Order Document Structure:
// { "_id": ObjectId("unique_id"), "order_id": "ORD123456", "customer_id": ObjectId("unique_customer_id"), // Reference to a Customer document "order_date": ISODate("2023-05-15T14:00:00Z"), "status": "shipped", "items": [ { "product_name": "Laptop", "quantity": 1, "price": 1500 }, { "product_name": "Mouse", "quantity": 2, "price": 25 } ], "total_value": 1550 }


// Part 1: Basic MongoDB Commands and Queries
// Objective: Understand and demonstrate basic CRUD operations on collections with relationships.
// Instructions: Write MongoDB scripts for the following tasks:

// 1.	Create the Collections and Insert Data:
// 	Create two collections: customers and orders.
// 	Insert 5 customer documents into the customers collection.
// 	Insert 5 order documents into the orders collection, each linked to a customer using the customer_id field (the _id of a customer document).

db.createCollection("customers");
{ ok: 1 }
// MOCK DATA Generated from this website: https://www.mockaroo.com/
db.customers.insertMany(
    [{ "name": "Jackqueline McCaughey", "email": "jmccaughey0@chronoengine.com", "address": { "street": "294 Valley Edge Hill", "city": "Zhangjiang", "zipcode": null }, "phone": "935-795-6244", "registration_date": "2023-01-01T00:00:00Z" },
    { "name": "Mick Grundwater", "email": "mgrundwater1@archive.org", "address": { "street": "73 Ridgeway Court", "city": "Minneapolis", "zipcode": "55441" }, "phone": "763-116-8887", "registration_date": "2023-01-01T00:00:00Z" },
    { "name": "Cecilia Esson", "email": "cesson2@1688.com", "address": { "street": "55 Spenser Park", "city": "Solna", "zipcode": "171 94" }, "phone": "734-547-7611", "registration_date": "2023-01-01T00:00:00Z" },
    { "name": "Cordey Kopman", "email": "ckopman3@illinois.edu", "address": { "street": "4705 Westerfield Terrace", "city": "Lesnikovo", "zipcode": "641754" }, "phone": "421-438-0431", "registration_date": "2023-01-01T00:00:00Z" },
    { "name": "Rasia Gavriel", "email": "rgavriel4@ucsd.edu", "address": { "street": "7 Mcbride Hill", "city": "Boden", "zipcode": "961 86" }, "phone": "413-676-5469", "registration_date": "2023-01-01T00:00:00Z" }
    ])

// {
//     acknowledged: true,
//     insertedIds: {
//       '0': ObjectId('6733aee2fbbcdfab230d8190'),
//       '1': ObjectId('6733aee2fbbcdfab230d8191'),
//       '2': ObjectId('6733aee2fbbcdfab230d8192'),
//       '3': ObjectId('6733aee2fbbcdfab230d8193'),
//       '4': ObjectId('6733aee2fbbcdfab230d8194')
//     }
//   }

db.createCollection("orders");

// MOCK DATA Generated from this website: https://www.mockaroo.com/
db.orders.insertMany([
    { "order_id": "ORD000001", "customer_id": ObjectId("6733aee2fbbcdfab230d8190"), "order_date": "5/15/2023", "status": "processing", "items": [{ "product_name": "Mouse", "quantity": 2, "price": 1674.5 }, { "product_name": "Laptop", "quantity": 4, "price": 449.06 }, { "product_name": "Keyboard", "quantity": 1, "price": 928.67 }], "total_value": 103958.81 },
    { "order_id": "ORD000002", "customer_id": ObjectId("6733aee2fbbcdfab230d8190"), "order_date": "5/15/2023", "status": "cancelled", "items": [{ "product_name": "Laptop", "quantity": 1, "price": 1120.63 }, { "product_name": "Keyboard", "quantity": 0, "price": 1262.84 }, { "product_name": "Monitor", "quantity": 6, "price": 1900.92 }, { "product_name": "Laptop", "quantity": 8, "price": 141.1 }, { "product_name": "Monitor", "quantity": 8, "price": 976.47 }], "total_value": 123354.6 },
    { "order_id": "ORD000003", "customer_id": ObjectId("6733aee2fbbcdfab230d8191"), "order_date": "5/15/2023", "status": "shipped", "items": [{ "product_name": "Mouse", "quantity": 9, "price": 67.28 }, { "product_name": "Monitor", "quantity": 7, "price": 95.01 }, { "product_name": "Keyboard", "quantity": 3, "price": 1821.17 }, { "product_name": "Mouse", "quantity": 10, "price": 26.21 }, { "product_name": "Keyboard", "quantity": 1, "price": 742.49 }, { "product_name": "Keyboard", "quantity": 4, "price": 1753.55 }, { "product_name": "Mouse", "quantity": 8, "price": 218.97 }], "total_value": 29673.97 },
    { "order_id": "ORD000004", "customer_id": ObjectId("6733aee2fbbcdfab230d8191"), "order_date": "5/15/2023", "status": "processing", "items": [{ "product_name": "Monitor", "quantity": 7, "price": 382.36 }, { "product_name": "Keyboard", "quantity": 7, "price": 1944.85 }, { "product_name": "Headphones", "quantity": 9, "price": 1667.92 }, { "product_name": "Keyboard", "quantity": 4, "price": 338.4 }], "total_value": 184478.93 },
    { "order_id": "ORD000005", "customer_id": ObjectId("6733aee2fbbcdfab230d8193"), "order_date": "5/15/2023", "status": "processing", "items": [{ "product_name": "Mouse", "quantity": 4, "price": 111.46 }, { "product_name": "Keyboard", "quantity": 9, "price": 311.43 }, { "product_name": "Mouse", "quantity": 2, "price": 1879.01 }, { "product_name": "Keyboard", "quantity": 4, "price": 1662.54 }, { "product_name": "Keyboard", "quantity": 6, "price": 191.78 }, { "product_name": "Headphones", "quantity": 10, "price": 1149.6 }], "total_value": 46727.97 },
])

// {
//     acknowledged: true,
//     insertedIds: {
//       '0': ObjectId('6733b1c07e6bd56dfb0d8195'),
//       '1': ObjectId('6733b1c07e6bd56dfb0d8196'),
//       '2': ObjectId('6733b1c07e6bd56dfb0d8197'),
//       '3': ObjectId('6733b1c07e6bd56dfb0d8198'),
//       '4': ObjectId('6733b1c07e6bd56dfb0d8199')
//     }
//   }

//  2.	Find Orders for a Specific Customer:
// 	Write a script to find all orders placed by a customer with the name “John Doe”. Use the customer’s _id to query the orders collection.

const customer = db.customers.findOne({ "name": "Jackqueline McCaughey" });
db.orders.find({ "customer_id": customer._id });

// [
//     {
//       _id: ObjectId('6733b1c07e6bd56dfb0d8195'),
//       order_id: 'ORD000001',
//       customer_id: ObjectId('6733aee2fbbcdfab230d8190'),
//       order_date: '5/15/2023',
//       status: 'processing',
//       items: [
//         { product_name: 'Mouse', quantity: 2, price: 1674.5 },
//         { product_name: 'Laptop', quantity: 4, price: 449.06 },
//         { product_name: 'Keyboard', quantity: 1, price: 928.67 }
//       ],
//       total_value: 103958.81
//     },
//     {
//       _id: ObjectId('6733b1c07e6bd56dfb0d8196'),
//       order_id: 'ORD000002',
//       customer_id: ObjectId('6733aee2fbbcdfab230d8190'),
//       order_date: '5/15/2023',
//       status: 'cancelled',
//       items: [
//         { product_name: 'Laptop', quantity: 1, price: 1120.63 },
//         { product_name: 'Keyboard', quantity: 0, price: 1262.84 },
//         { product_name: 'Monitor', quantity: 6, price: 1900.92 },
//         { product_name: 'Laptop', quantity: 8, price: 141.1 },
//         { product_name: 'Monitor', quantity: 8, price: 976.47 }
//       ],
//       total_value: 123354.6
//     }
//   ]

// 3.	Find the Customer for a Specific Order:
// 	Write a script to find the customer information for a specific order (e.g., order_id = “ORD123456”).

const order = db.orders.findOne({ "order_id": "ORD000001" });
db.customers.findOne({ "_id": order.customer_id });

// {
//     _id: ObjectId('6733aee2fbbcdfab230d8190'),
//     name: 'Jackqueline McCaughey',
//     email: 'jmccaughey0@chronoengine.com',
//     address: { street: '294 Valley Edge Hill', city: 'Zhangjiang', zipcode: null },
//     phone: '935-795-6244',
//     registration_date: '2023-01-01T00:00:00Z'
//   }

// 4.	Update Order Status:
// 	Write a script to update the status of an order to “delivered” where the order_id is “ORD123456”.

db.orders.updateOne({ "order_id": "ORD000001" }, { $set: { "status": "delivered" } });

// {
//     acknowledged: true,
//     insertedId: null,
//     matchedCount: 1,
//     modifiedCount: 1,
//     upsertedCount: 0
//   }

// 5.	Delete an Order:
// 	Write a script to delete an order where the order_id is “ORD123456”.

db.orders.deleteOne({ "order_id": "ORD000001" });

// { acknowledged: true, deletedCount: 1 }


// ********************************************************************************************************************************************//


// Part 2: Aggregation Pipeline
// Objective: Use MongoDB’s aggregation framework to perform more advanced queries, including working with related data across collections.
// Instructions: Use the aggregation framework to solve the following tasks:

// 1.	Calculate Total Value of All Orders by Customer:
// 	Write a script to calculate the total value of all orders for each customer. This should return each customer’s name and the total order value.

db.orders.aggregate([
    {
        $group: {
            "_id": "$customer_id",
            "total_spent": { $sum: "$total_value" }
        }
    },
    {
        $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "_id",
            as: "customerInfo"
        }
    },
    {
        $unwind: "$customerInfo"
    },
    {
        $project: {
            "customer_name": "$customerInfo.name",
            "total_spent": 1
        }
    }
]);

// [
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8193'),
//       total_spent: 46727.97,
//       customer_name: 'Cordey Kopman'
//     },
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8191'),
//       total_spent: 214152.9,
//       customer_name: 'Mick Grundwater'
//     },
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8190'),
//       total_spent: 123354.6,
//       customer_name: 'Jackqueline McCaughey'
//     }
//   ]


// 2.	Group Orders by Status:
// 	Write a script to group orders by their status (e.g., “shipped”, “delivered”, etc.) and count how many orders are in each status.
db.orders.aggregate([
    { $group: { "_id": "$status", "order_count": { $sum: 1 } } }
]);

// [
//     { _id: 'processing', order_count: 2 },
//     { _id: 'cancelled', order_count: 1 },
//     { _id: 'shipped', order_count: 1 }
//   ]

// 3.	List Customers with Their Recent Orders:
// 	Write a script to find each customer and their most recent order. Include customer information such as name, email, and order details (e.g., order_id, total_value).

db.orders.aggregate([
    { $sort: { "order_date": -1 } },
    {
        $group: {
            "_id": "$customer_id",
            "most_recent_order": { $first: "$$ROOT" }
        }
    },
    {
        $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "_id",
            as: "customerInfo"
        }
    },
    { $unwind: "$customerInfo" },
    {
        $project: {
            "customer_name": "$customerInfo.name",
            "email": "$customerInfo.email",
            "order_id": "$most_recent_order.order_id",
            "total_value": "$most_recent_order.total_value"
        }
    }
]);

// [
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8190'),
//       customer_name: 'Jackqueline McCaughey',
//       email: 'jmccaughey0@chronoengine.com',
//       order_id: 'ORD000002',
//       total_value: 123354.6
//     },
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8191'),
//       customer_name: 'Mick Grundwater',
//       email: 'mgrundwater1@archive.org',
//       order_id: 'ORD000003',
//       total_value: 29673.97
//     },
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8193'),
//       customer_name: 'Cordey Kopman',
//       email: 'ckopman3@illinois.edu',
//       order_id: 'ORD000005',
//       total_value: 46727.97
//     }
//   ]


// 4.	Find the Most Expensive Order by Customer:
// 	Write a script to find the most expensive order for each customer. Return the customer’s name and the details of their most expensive order (e.g., order_id, total_value).

db.orders.aggregate([
    { $sort: { "total_value": -1 } },
    {
        $group: {
            "_id": "$customer_id",
            "most_expensive_order": { $first: "$$ROOT" }
        }
    },
    {
        $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "_id",
            as: "customerInfo"
        }
    },
    { $unwind: "$customerInfo" },
    {
        $project: {
            "customer_name": "$customerInfo.name",
            "order_id": "$most_expensive_order.order_id",
            "total_value": "$most_expensive_order.total_value"
        }
    }
]);

// [
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8193'),
//       customer_name: 'Cordey Kopman',
//       order_id: 'ORD000005',
//       total_value: 46727.97
//     },
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8191'),
//       customer_name: 'Mick Grundwater',
//       order_id: 'ORD000004',
//       total_value: 184478.93
//     },
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8190'),
//       customer_name: 'Jackqueline McCaughey',
//       order_id: 'ORD000002',
//       total_value: 123354.6
//     }
//   ]


// ********************************************************************************************************************************************//

// Part 3: Real-World Scenario with Relationships
// Objective: Apply MongoDB operations to a real-world problem involving two related collections.
// Scenario: You are working as a MongoDB developer for an e-commerce platform. The system needs to track customer orders, including the customer’s name, email, and address, as well as the items they ordered.

// 1.	Find All Customers Who Placed Orders in the Last Month:
// 	Write a script to find all customers who have placed at least one order in the last 30 days. Return the customer name, email, and the order date for their most recent order.

const lastMonth = new Date();
lastMonth.setDate(lastMonth.getMonth() - 1);
// 1731095836755
db.orders.aggregate([
    { $match: { "order_date": { $gte: lastMonth } } },
    {
        $group: {
            "_id": "$customer_id",
            "latest_order_date": { $max: "$order_date" }
        }
    },
    {
        $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "_id",
            as: "customerInfo"
        }
    },
    { $unwind: "$customerInfo" },
    {
        $project: {
            "name": "$customerInfo.name",
            "email": "$customerInfo.email",
            "latest_order_date": 1
        }
    }
]);

// 2.	Find All Products Ordered by a Specific Customer:
// 	Write a script to find all distinct products ordered by a customer with the name “John Doe”. Include the product name and the total quantity ordered.

const customer2 = db.customers.findOne({ "name": "Mick Grundwater" });

db.orders.aggregate([
    { $match: { "customer_id": customer2._id } },
    { $unwind: "$items" },
    {
        $group: {
            "_id": "$items.product_name",
            "total_quantity": { $sum: "$items.quantity" }
        }
    }
]);

// [
//     { _id: 'Monitor', total_quantity: 14 },
//     { _id: 'Keyboard', total_quantity: 19 },
//     { _id: 'Mouse', total_quantity: 27 },
//     { _id: 'Headphones', total_quantity: 9 }
//   ]

// 3.	Find the Top 3 Customers with the Most Expensive Total Orders:
// 	Write a script to find the top 3 customers who have spent the most on orders. Sort the results by total order value in descending order.

db.orders.aggregate([
    {
        $group: {
            "_id": "$customer_id",
            "total_spent": { $sum: "$total_value" }
        }
    },
    {
        $sort: { "total_spent": -1 }
    },
    {
        $limit: 3
    },
    {
        $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "_id",
            as: "customerInfo"
        }
    },
    {
        $unwind: "$customerInfo"
    },
    {
        $project: {
            "customer_name": "$customerInfo.name",
            "total_spent": 1
        }
    }
]);

// [
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8191'),
//       total_spent: 214152.9,
//       customer_name: 'Mick Grundwater'
//     },
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8190'),
//       total_spent: 123354.6,
//       customer_name: 'Jackqueline McCaughey'
//     },
//     {
//       _id: ObjectId('6733aee2fbbcdfab230d8193'),
//       total_spent: 46727.97,
//       customer_name: 'Cordey Kopman'
//     }
//   ]

// 4.	Add a New Order for an Existing Customer:
// 	Write a script to add a new order for a customer with the name “Jane Smith”. The order should include at least two items, such as “Smartphone” and “Headphones”.

const customer3 = db.customers.findOne({ "name": "Mick Grundwater" });

db.orders.insertOne({
    "order_id": "ORD654321",
    "customer_id": customer3._id,
    "order_date": new Date(),
    "status": "pending",
    "items": [
        { "product_name": "Smartphone", "quantity": 1, "price": 10000 },
        { "product_name": "Headphones", "quantity": 1, "price": 1500 }
    ],
    "total_value": 11500
});

// {
//     acknowledged: true,
//     insertedId: ObjectId('6733b3fe7e6bd56dfb0d819a')
//   }

// Part 4: Bonus Challenge
// Objective: Demonstrate the ability to work with advanced MongoDB operations and complex relationships.
// 1.	Find Customers Who Have Not Placed Orders:
// o	Write a script to find all customers who have not placed any orders. Return the customer’s name and email.
// 2.	Calculate the Average Number of Items Ordered per Order:
// o	Write a script to calculate the average number of items ordered per order across all orders. The result should return the average number of items.
// 3.	Join Customer and Order Data Using $lookup:
// o	Write a script using the $lookup aggregation operator to join data from the customers collection and the orders collection. Return customer name, email, order details (order_id, total_value), and order date.
