# MongoDB database is used

## Mongoose is used to manage schemas

### Users

- \_id (PK)
- name: String
- email: String (unique)
- phone: String
- password: String (bcrypt hash, never returned by default)
- createdAt, updatedAt: Date

### Categories

- \_id (PK)
- name: String
- image: String
- isFeatured: Boolean

### Products

- \_id (PK)
- name: String
- description: String
- price: Number
- originalPrice: Number
- discount: Number
- image: String
- sizes: Array of Strings
- inStock: Boolean
- rating: Number
- category: Array of ObjectId (ref -> Categories)

### Cart

- \_id (PK)
- user: ObjectId (ref -> Users, unique)
- items:array of {productId: ObjectId (ref -> Products),quantity: Number}

### Wishlist

- \_id (PK)
- user: ObjectId (ref -> Users, unique)
- items:[ ObjectId (ref -> Products)]

### Addresses

- \_id (PK)
- user: ObjectId (ref -> Users)
- name: String
- phone: String
- pincode: String
- city: String
- state: String
- addressLine: String
- type: String

### Orders

- \_id (PK)
- user: ObjectId (ref -> Users)
- items: Array of { productId: ObjectId (ref -> Products), name: String, price: Number, quantity: Number, image: String }
- totalAmount: Number
- deliveryCharge: Number
- address: { name: String, phone: String, pincode: String, city: String, state: String, addressLine: String, type: String }
- placedAt: Date
