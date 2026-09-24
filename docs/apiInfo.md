### API Endpoints

Routes marked **(protected)** need an `Authorization: Bearer <token>` header. The token comes from signup or login.

**Auth Routes** (`/api/v1/auth`)

- `POST "/signup"` : create account `{ name, email, phone?, password }`, returns `{ token, user }`. Also creates an empty cart and wishlist
- `POST "/login"` : `{ email, password }`, returns `{ token, user }`
- `GET "/me"` : get the logged in user (protected)

**Product Routes** (`/api/v1/products`)

- `GET "/"` : get all products
- `GET "/:productId"` : get a particular product by id
- `POST "/"` : add product/products

**Category Routes** (`/api/v1/category`)

- `GET "/featured"` : get all featured categories
- `GET "/"` : get all categories
- `GET "/:categoryId"` : get category by id
- `POST "/"` : add category/categories

**Cart Routes** (`/api/v1/cart`) (protected)

- `GET "/"` : get the logged in user's cart with items populated
- `PUT "/"` : update cart (send updated items array each time)

**Wishlist Routes** (`/api/v1/wishlist`) (protected)

- `GET "/"` : get the logged in user's wishlist with items populated
- `POST "/item"` : add a single item `{ productId }`
- `DELETE "/"` : remove a single item `{ productId }`

**Address Routes** (`/api/v1/address`) (protected)

- `GET "/"` : get all addresses of the logged in user
- `GET "/id/:id"` : get an adress detail
- `POST "/"` : add an adress
- `PUT "/:id"` : update an address by id
- `DELETE "/:id"` : delete an address by id

**Order Routes** (`/api/v1/orders`) (protected)

- `GET "/"` : get all orders of the logged in user, newest first
- `GET "/id/:id"` : get order details
- `POST "/"` : add order placed
- `DELETE "/"` : delete an order `{ orderId }`
