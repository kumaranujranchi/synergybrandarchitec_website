import { User, InsertUser, UpdateUser, CartItem, InsertCartItem, UpdateCartItem, Order, InsertOrder, UpdateOrder, Product, InsertProduct, UpdateProduct, AddonProduct, InsertAddonProduct, UpdateAddonProduct } from '@shared/schema';
import bcrypt from 'bcrypt';

export interface IStorage {
  // User methods
  createUser(userData: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: number, userData: UpdateUser): Promise<User | undefined>;
  listUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<boolean>;
  validateUserCredentials(email: string, password: string): Promise<User | null>;

  // Product methods
  createProduct(productData: InsertProduct): Promise<Product>;
  getProduct(id: number): Promise<Product | undefined>;
  listProducts(): Promise<Product[]>;
  updateProduct(id: number, productData: UpdateProduct): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Addon Product methods
  createAddonProduct(addonData: InsertAddonProduct): Promise<AddonProduct>;
  getAddonProduct(id: number): Promise<AddonProduct | undefined>;
  listAddonProducts(): Promise<AddonProduct[]>;
  updateAddonProduct(id: number, addonData: UpdateAddonProduct): Promise<AddonProduct | undefined>;
  deleteAddonProduct(id: number): Promise<boolean>;

  // Cart methods
  addToCart(cartData: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, cartData: UpdateCartItem): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  getUserCart(userId: number): Promise<CartItem[]>;
  clearUserCart(userId: number): Promise<boolean>;

  // Order methods
  createOrder(orderData: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  listOrders(): Promise<Order[]>;
  updateOrder(id: number, orderData: UpdateOrder): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  deleteOrder(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private products = new Map<number, Product>();
  private addonProducts = new Map<number, AddonProduct>();
  private cartItems = new Map<number, CartItem>();
  private orders = new Map<number, Order>();
  
  private lastUserId = 0;
  private lastProductId = 0;
  private lastAddonProductId = 0;
  private lastCartItemId = 0;
  private lastOrderId = 0;

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    try {
      await this.createInitialAdmin();
      await this.createInitialProducts();
      await this.createInitialAddonProducts();
      console.log("Storage initialized successfully");
    } catch (error) {
      console.error("Error initializing storage:", error);
    }
  }

  private async createInitialAdmin() {
    // Check if admin user already exists
    const usersArray = Array.from(this.users.values());
    const adminExists = usersArray.some(user => user.email === 'admin@synergybrandarchitect.in');
    
    if (!adminExists) {
      try {
        const id = ++this.lastUserId;
        const hashedPassword = bcrypt.hashSync('admin123', 10);
        
        const now = new Date();
        const user: User = {
          id,
          name: 'Admin',
          email: 'admin@synergybrandarchitect.in',
          phone: null,
          website: null,
          password: hashedPassword,
          role: 'admin',
          permissions: ['view', 'create', 'edit', 'delete', 'manage_users'],
          createdAt: now,
          updatedAt: now
        };
        
        this.users.set(id, user);
        console.log('Initial admin user created');
      } catch (error) {
        console.error('Error creating initial admin:', error);
      }
    }
  }

  private async createInitialProducts() {
    const productsArray = Array.from(this.products.values());
    if (productsArray.length === 0) {
      const now = new Date();

      // Create initial products
      const products = [
        {
          name: "Digital Marketing Package - Basic",
          description: "Essential digital marketing services for small businesses",
          price: 15000,
          features: ["Social Media Management", "Basic SEO", "Content Creation", "Email Marketing"],
          category: "digital-marketing",
          isActive: true
        },
        {
          name: "Digital Marketing Package - Premium",
          description: "Comprehensive digital marketing solution for growing businesses",
          price: 35000,
          features: ["Advanced Social Media", "Complete SEO", "Content Marketing", "PPC Management", "Analytics & Reporting"],
          category: "digital-marketing",
          isActive: true
        },
        {
          name: "Website Development",
          description: "Professional website development services",
          price: 25000,
          features: ["Responsive Design", "SEO Optimized", "CMS Integration", "Mobile Friendly"],
          category: "web-development",
          isActive: true
        }
      ];

      for (const productData of products) {
        const id = ++this.lastProductId;
        const product: Product = {
          id,
          ...productData,
          createdAt: now,
          updatedAt: now
        };
        
        this.products.set(id, product);
      }
      
      console.log("Initial products created");
    }
  }

  private async createInitialAddonProducts() {
    const addonsArray = Array.from(this.addonProducts.values());
    if (addonsArray.length === 0) {
      const now = new Date();

      const addons = [
        {
          name: "Extra Social Media Posts",
          description: "Additional social media content creation and posting",
          price: 5000,
          category: "social-media",
          isActive: true
        },
        {
          name: "Advanced Analytics Report",
          description: "Detailed monthly analytics and performance reports",
          price: 3000,
          category: "analytics",
          isActive: true
        }
      ];

      for (const addonData of addons) {
        const id = ++this.lastAddonProductId;
        const addon: AddonProduct = {
          id,
          ...addonData,
          createdAt: now,
          updatedAt: now
        };
        
        this.addonProducts.set(id, addon);
      }
      
      console.log("Initial addon products created");
    }
  }

  // User methods
  async createUser(userData: InsertUser): Promise<User> {
    const id = ++this.lastUserId;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const now = new Date();
    const user: User = {
      id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || null,
      website: userData.website || null,
      password: hashedPassword,
      role: userData.role || 'client',
      permissions: userData.permissions ? [...userData.permissions] : ['view'],
      createdAt: now,
      updatedAt: now
    };
    
    this.users.set(id, user);
    return { ...user };
  }

  async getUser(id: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      return { ...user };
    }
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const usersArray = Array.from(this.users.values());
    for (const user of usersArray) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return { ...user };
      }
    }
    return undefined;
  }

  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      const updatedUser: User = {
        ...user,
        ...userData,
        id,
        updatedAt: new Date()
      };
      this.users.set(id, updatedUser);
      return { ...updatedUser };
    }
    return undefined;
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values()).map(user => ({ ...user }));
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // Product methods
  async createProduct(productData: InsertProduct): Promise<Product> {
    const id = ++this.lastProductId;
    const now = new Date();
    const product: Product = {
      id,
      ...productData,
      createdAt: now,
      updatedAt: now
    };
    
    this.products.set(id, product);
    return { ...product };
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (product) {
      return { ...product };
    }
    return undefined;
  }

  async listProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).map(product => ({ ...product }));
  }

  async updateProduct(id: number, productData: UpdateProduct): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (product) {
      const updatedProduct: Product = {
        ...product,
        ...productData,
        id,
        updatedAt: new Date()
      };
      this.products.set(id, updatedProduct);
      return { ...updatedProduct };
    }
    return undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Addon Product methods
  async createAddonProduct(addonData: InsertAddonProduct): Promise<AddonProduct> {
    const id = ++this.lastAddonProductId;
    const now = new Date();
    const addon: AddonProduct = {
      id,
      ...addonData,
      createdAt: now,
      updatedAt: now
    };
    
    this.addonProducts.set(id, addon);
    return { ...addon };
  }

  async getAddonProduct(id: number): Promise<AddonProduct | undefined> {
    const addon = this.addonProducts.get(id);
    if (addon) {
      return { ...addon };
    }
    return undefined;
  }

  async listAddonProducts(): Promise<AddonProduct[]> {
    return Array.from(this.addonProducts.values()).map(addon => ({ ...addon }));
  }

  async updateAddonProduct(id: number, addonData: UpdateAddonProduct): Promise<AddonProduct | undefined> {
    const addon = this.addonProducts.get(id);
    if (addon) {
      const updatedAddon: AddonProduct = {
        ...addon,
        ...addonData,
        id,
        updatedAt: new Date()
      };
      this.addonProducts.set(id, updatedAddon);
      return { ...updatedAddon };
    }
    return undefined;
  }

  async deleteAddonProduct(id: number): Promise<boolean> {
    return this.addonProducts.delete(id);
  }

  // Cart methods
  async addToCart(cartData: InsertCartItem): Promise<CartItem> {
    const id = ++this.lastCartItemId;
    const now = new Date();
    const cartItem: CartItem = {
      id,
      ...cartData,
      createdAt: now,
      updatedAt: now
    };
    
    this.cartItems.set(id, cartItem);
    return { ...cartItem };
  }

  async updateCartItem(id: number, cartData: UpdateCartItem): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (cartItem) {
      const updatedCartItem: CartItem = {
        ...cartItem,
        ...cartData,
        id,
        updatedAt: new Date()
      };
      this.cartItems.set(id, updatedCartItem);
      return { ...updatedCartItem };
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async getUserCart(userId: number): Promise<CartItem[]> {
    const cartItemsArray = Array.from(this.cartItems.values());
    return cartItemsArray.filter(item => item.userId === userId).map(item => ({ ...item }));
  }

  async clearUserCart(userId: number): Promise<boolean> {
    const cartItemsArray = Array.from(this.cartItems.values());
    let cleared = false;
    
    for (const item of cartItemsArray) {
      if (item.userId === userId) {
        this.cartItems.delete(item.id);
        cleared = true;
      }
    }
    
    return cleared;
  }

  // Order methods
  async createOrder(orderData: InsertOrder): Promise<Order> {
    const id = ++this.lastOrderId;
    const now = new Date();
    const order: Order = {
      id,
      ...orderData,
      createdAt: now,
      updatedAt: now
    };
    
    this.orders.set(id, order);
    return { ...order };
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      return { ...order };
    }
    return undefined;
  }

  async listOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).map(order => ({ ...order }));
  }

  async updateOrder(id: number, orderData: UpdateOrder): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      const updatedOrder: Order = {
        ...order,
        ...orderData,
        id,
        updatedAt: new Date()
      };
      this.orders.set(id, updatedOrder);
      return { ...updatedOrder };
    }
    return undefined;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    const ordersArray = Array.from(this.orders.values());
    return ordersArray.filter(order => order.userId === userId).map(order => ({ ...order }));
  }

  async deleteOrder(id: number): Promise<boolean> {
    return this.orders.delete(id);
  }
}

export const storage = new MemStorage();