import { User, InsertUser, UpdateUser, CartItem, InsertCartItem, UpdateCartItem, Order, InsertOrder, UpdateOrder, AddonProduct, InsertAddonProduct, UpdateAddonProduct } from '@shared/schema';
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

  // Submission methods
  createSubmission(data: any): Promise<any>;
  listSubmissions(filters: any): Promise<any[]>;
  updateSubmission(id: number, data: any): Promise<any>;

  // Audit methods
  logAudit(data: any): Promise<void>;
}

export class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private addonProducts = new Map<number, AddonProduct>();
  private cartItems = new Map<number, CartItem>();
  private orders = new Map<number, Order>();
  private submissions = new Map<number, any>();
  
  private lastUserId = 0;
  private lastAddonProductId = 0;
  private lastCartItemId = 0;
  private lastOrderId = 0;
  private lastSubmissionId = 0;

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    try {
      await this.createInitialAdmin();
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
          name: addonData.name,
          description: addonData.description,
          price: addonData.price.toString(),
          isActive: addonData.isActive,
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
        permissions: userData.permissions ? [...userData.permissions] : user.permissions,
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



  // Addon Product methods
  async createAddonProduct(addonData: InsertAddonProduct): Promise<AddonProduct> {
    const id = ++this.lastAddonProductId;
    const now = new Date();
    const addon: AddonProduct = {
      id,
      name: addonData.name,
      description: addonData.description,
      price: addonData.price,
      isActive: addonData.isActive ?? true,
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
      userId: cartData.userId,
      productId: cartData.productId,
      quantity: cartData.quantity || 1,
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
      userId: orderData.userId,
      name: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      totalAmount: orderData.totalAmount,
      message: orderData.message || null,
      status: orderData.status || 'pending',
      paymentId: null,
      paymentStatus: null,
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

  // Submission methods
  async createSubmission(data: any): Promise<any> {
    const id = ++this.lastSubmissionId;
    const now = new Date();
    const submission = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    this.submissions.set(id, submission);
    return { ...submission };
  }

  async listSubmissions(filters: any): Promise<any[]> {
    return Array.from(this.submissions.values()).map(submission => ({ ...submission }));
  }

  async updateSubmission(id: number, data: any): Promise<any> {
    const submission = this.submissions.get(id);
    if (submission) {
      const updatedSubmission = {
        ...submission,
        ...data,
        id,
        updatedAt: new Date()
      };
      this.submissions.set(id, updatedSubmission);
      return { ...updatedSubmission };
    }
    return undefined;
  }

  // Audit methods
  async logAudit(data: any): Promise<void> {
    // For in-memory storage, we can just log to console
    // In a real implementation, this would be stored in the database
    console.log('Audit log:', data);
  }
}

export const storage = new MemStorage();