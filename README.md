
## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd artisan-marketplace
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/craftconnect
   JWT_SECRET=your_jwt_secret_here
   PORT=8000
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📊 Database Collections

The application uses MongoDB with the following collections:

- **Users**: Customer and artisan accounts
- **Products**: Product listings with images and details
- **Orders**: Customer orders and order history
- **Reviews**: Product reviews and ratings
- **Categories**: Product categories

## 🔐 Authentication & Authorization

- **JWT-based authentication** for secure user sessions
- **Role-based access control** (Customer vs Artisan)
- **Protected routes** for authenticated users
- **Secure password hashing** with bcryptjs

## 🖼️ Image Management

- **Multiple image upload** per product
- **Drag-and-drop** functionality
- **Image gallery** with navigation
- **Automatic image optimization**
- **Secure file storage** in uploads directory

## 💳 Payment System

- **Secure checkout process**
- **Order creation** after successful payment
- **Order history tracking**
- **Payment status management**

## 🎨 UI/UX Features

- **Responsive design** for all devices
- **Modern Tailwind CSS** styling
- **Smooth animations** and transitions
- **Loading states** and error handling
- **Accessible design** principles

## 🔧 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## �� API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Artisan only)
- `PUT /api/products/:id` - Update product (Artisan only)
- `DELETE /api/products/:id` - Delete product (Artisan only)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/artisans` - Get all artisans
- `GET /api/users/artisans/:id` - Get artisan by ID

### Wishlist
- `GET /api/users/wishlist` - Get user wishlist
- `POST /api/users/wishlist` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist

### Reviews
- `POST /api/reviews` - Add product review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## �� Acknowledgments

- **Flaticon** for the favicon and icons
- **Tailwind CSS** for the beautiful UI framework
- **MongoDB** for the database solution
- **React** community for the amazing ecosystem

---

**ArtisanMArket** - Supporting local artisans and preserving traditional crafts through our online marketplace. 🛠️✨
