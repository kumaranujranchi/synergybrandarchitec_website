import {
  User, InsertUser, UpdateUser,
  Submission, InsertSubmission, UpdateSubmission,
  Note, InsertNote, AuditLog,
  AddonProduct, InsertAddonProduct, UpdateAddonProduct,
  CartItem, InsertCartItem, UpdateCartItem,
  Order, InsertOrder, UpdateOrder,
  OrderItem, InsertOrderItem,
  OrderRevision, InsertOrderRevision, UpdateOrderRevision,
  BlogPost, InsertBlogPost, UpdateBlogPost,
  PasswordResetToken, OTPCode,
  users, submissions, notes, auditLogs, addonProducts,
  cartItems, orders, orderItems, orderRevisions, blogPosts, passwordResetTokens, otpCodes
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, isNull, not, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import crypto from "crypto";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";

// Interface for our storage
export interface IStorage {
  // User methods
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: number, userData: UpdateUser): Promise<User | undefined>;
  listUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<boolean>;
  validateUserCredentials(email: string, password: string): Promise<User | null>;
  
  // Password reset methods
  createPasswordResetToken(userId: number): Promise<string>;
  validateResetToken(token: string): Promise<User | null>;
  markResetTokenAsUsed(token: string): Promise<boolean>;
  createOTP(userId: number, email: string): Promise<string>;
  validateOTP(email: string, otp: string): Promise<User | null>;
  markOTPAsUsed(email: string, otp: string): Promise<boolean>;
  
  // Submission methods
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmission(id: number): Promise<Submission | undefined>;
  updateSubmission(id: number, data: UpdateSubmission): Promise<Submission | undefined>;
  deleteSubmission(id: number): Promise<boolean>;
  listSubmissions(filters?: {status?: string, startDate?: Date, endDate?: Date}): Promise<Submission[]>;
  
  // Notes methods
  addNote(note: InsertNote & {userId: number}): Promise<Note>;
  getSubmissionNotes(submissionId: number): Promise<Note[]>;

  
  // Addon Product methods
  createAddonProduct(product: InsertAddonProduct): Promise<AddonProduct>;
  getAddonProduct(id: number): Promise<AddonProduct | undefined>;
  updateAddonProduct(id: number, data: UpdateAddonProduct): Promise<AddonProduct | undefined>;
  deleteAddonProduct(id: number): Promise<boolean>;
  listAddonProducts(activeOnly?: boolean): Promise<AddonProduct[]>;
  
  // Cart methods
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  getCartItem(id: number): Promise<CartItem | undefined>;
  updateCartItem(id: number, data: UpdateCartItem): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  getUserCart(userId: number): Promise<CartItem[]>;
  clearUserCart(userId: number): Promise<boolean>;
  
  // Order methods
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  updateOrder(id: number, data: UpdateOrder): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  listOrders(filters?: {status?: string, startDate?: Date, endDate?: Date}): Promise<Order[]>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  
  // Order Revision methods
  createOrderRevision(revision: InsertOrderRevision): Promise<OrderRevision>;
  getOrderRevisions(orderId: number): Promise<OrderRevision[]>;
  updateOrderRevision(id: number, data: UpdateOrderRevision): Promise<OrderRevision | undefined>;
  
  // Blog Post methods
  createBlogPost(post: InsertBlogPost & {authorId: number}): Promise<BlogPost>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, data: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  listBlogPosts(filters?: {status?: string, category?: string}): Promise<BlogPost[]>;
  
  // Audit logs
  logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private submissions: Map<number, Submission>;
  private notes: Map<number, Note>;
  private auditLogs: Map<number, AuditLog>;
  private addonProducts: Map<number, AddonProduct>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private orderRevisions: Map<number, OrderRevision>;
  private blogPosts: Map<number, BlogPost>;

  private lastUserId: number;
  private lastSubmissionId: number;
  private lastNoteId: number;
  private lastAuditLogId: number;
  private lastAddonProductId: number;
  private lastCartItemId: number;
  private lastOrderId: number;
  private lastOrderItemId: number;
  private lastOrderRevisionId: number;
  private lastBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    this.notes = new Map();
    this.auditLogs = new Map();
    this.addonProducts = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.orderRevisions = new Map();
    this.blogPosts = new Map();

    this.lastUserId = 0;
    this.lastSubmissionId = 0;
    this.lastNoteId = 0;
    this.lastAuditLogId = 0;
    this.lastAddonProductId = 0;
    this.lastCartItemId = 0;
    this.lastOrderId = 0;
    this.lastOrderItemId = 0;
    this.lastOrderRevisionId = 0;
    this.lastBlogPostId = 0;

    // Create initial admin user
    this.createInitialAdmin();

    // Initialize addon products
    this.initializeInitialAddonProducts();
  }
  
  private initializeInitialAddonProducts() {
    // Check if we already have addon products
    if (this.addonProducts.size > 0) {
      return;
    }
    
    try {
      // Initial addon products
      const now = new Date();
      
      // Create array of all addon products with specified prices
      const products: AddonProduct[] = [
        {
          id: ++this.lastAddonProductId,
          name: "Addition of Page",
          price: "1000",
          description: "For clients who have had their website built by us. Includes design and content integration.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Pop-Up",
          price: "500",
          description: "Create engaging pop-ups for offers or lead collection to boost conversions.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Content Editing on Existing Page",
          price: "300",
          description: "Update or modify content on your existing pages. Price is per page.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Image Change",
          price: "300",
          description: "Replace existing images on your website with new ones. Price is per image.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Video Addition (With Section)",
          price: "1000",
          description: "Add a video section to your website. Price may vary based on complexity.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Annual Maintenance Contract (AMC)",
          price: "20% of project cost per month",
          description: "Ongoing maintenance and support for your website to ensure it stays up-to-date and secure.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "SEO Optimization for Existing Pages",
          price: "2000",
          description: "Improve your website's search engine ranking. Price is per page.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Speed Optimization",
          price: "1500",
          description: "Make your website faster and improve user experience with our speed optimization service.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Security Setup",
          price: "1000",
          description: "Implement SSL, backups, and other security measures to protect your website.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },

        {
          id: ++this.lastAddonProductId,
          name: "Custom Contact Form",
          price: "500",
          description: "Create a customized contact form for your specific needs. Price is per form.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "E-Commerce Integration",
          price: "5000",
          description: "Add shopping cart, checkout system, and payment gateway to your website.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Google Analytics Setup",
          price: "1000",
          description: "Set up Google Analytics to track visitors and gain insights about your audience.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Social Media Integration",
          price: "800",
          description: "Link your social media accounts to your website for better engagement.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Newsletter Integration",
          price: "1000",
          description: "Add newsletter subscription functionality to grow your email list.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Third-Party Plugin/Tool Integration",
          price: "1500",
          description: "Integrate third-party plugins or tools with your website. Price is per plugin.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Website Backup and Restore",
          price: "1000",
          description: "Create a complete backup of your website and restore if needed. Price is per instance.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Responsive Design Updates",
          price: "2000",
          description: "Update your website to ensure it looks great on all devices. Price is per page.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Custom 404 Error Page",
          price: "1000",
          description: "Create a custom 404 error page to improve user experience when pages are not found.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Client Portal Creation",
          price: "5000",
          description: "Create a private login section for your clients to access exclusive content.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Website Redesign/Revamp",
          price: "Custom",
          description: "Give your website a fresh new look. Price depends on the scope of work.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },

        {
          id: ++this.lastAddonProductId,
          name: "Logo Design",
          price: "2000",
          description: "Create a new logo or redesign your existing one for a fresh brand identity.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: ++this.lastAddonProductId,
          name: "Live Chat Integration",
          price: "1000",
          description: "Add live chat functionality to your website for better customer support.",
          isActive: true,
          createdAt: now,
          updatedAt: now
        }
      ];
      
      // Add all products to the map
      for (const product of products) {
        this.addonProducts.set(product.id, product);
      }
      
      console.log("Initial addon products created");
    } catch (error) {
      console.error("Error creating initial addon products:", error);
    }
  }
