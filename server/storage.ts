import { 
  User, InsertUser, UpdateUser,
  Submission, InsertSubmission, UpdateSubmission,
  Note, InsertNote, AuditLog,
  BlogPost, InsertBlogPost, UpdateBlogPost,
  AddonProduct, InsertAddonProduct, UpdateAddonProduct,
  CartItem, InsertCartItem, UpdateCartItem,
  Order, InsertOrder, UpdateOrder,
  OrderItem, InsertOrderItem,
  OrderRevision, InsertOrderRevision, UpdateOrderRevision,
  PasswordResetToken, OTPCode,
  users, submissions, notes, auditLogs, blogPosts, addonProducts, 
  cartItems, orders, orderItems, orderRevisions, passwordResetTokens, otpCodes
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
  
  // Blog post methods
  createBlogPost(post: InsertBlogPost & {authorId: number}): Promise<BlogPost>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, data: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  listBlogPosts(filters?: {status?: string, category?: string}): Promise<BlogPost[]>;
  
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
  
  // Audit logs
  logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private submissions: Map<number, Submission>;
  private notes: Map<number, Note>;
  private auditLogs: Map<number, AuditLog>;
  private blogPosts: Map<number, BlogPost>;
  private addonProducts: Map<number, AddonProduct>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private orderRevisions: Map<number, OrderRevision>;
  
  private lastUserId: number;
  private lastSubmissionId: number;
  private lastNoteId: number;
  private lastAuditLogId: number;
  private lastBlogPostId: number;
  private lastAddonProductId: number;
  private lastCartItemId: number;
  private lastOrderId: number;
  private lastOrderItemId: number;
  private lastOrderRevisionId: number;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    this.notes = new Map();
    this.auditLogs = new Map();
    this.blogPosts = new Map();
    this.addonProducts = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.orderRevisions = new Map();
    
    this.lastUserId = 0;
    this.lastSubmissionId = 0;
    this.lastNoteId = 0;
    this.lastAuditLogId = 0;
    this.lastBlogPostId = 0;
    this.lastAddonProductId = 0;
    this.lastCartItemId = 0;
    this.lastOrderId = 0;
    this.lastOrderItemId = 0;
    this.lastOrderRevisionId = 0;
    
    // Create initial admin user
    this.createInitialAdmin();
    
    // Initialize the blog posts
    this.initializeInitialBlogPosts();
    
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
          name: "Blog Section Creation",
          price: "1500",
          description: "Add a blog section to your website to share updates and improve SEO.",
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
          name: "Add Blog Posts (SEO Optimized)",
          price: "500",
          description: "Create SEO-optimized blog posts for your website. Price is per post.",
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
  
  private initializeInitialBlogPosts() {
    // Check if we already have blog posts
    if (this.blogPosts.size > 0) {
      return;
    }
    
    try {
      // Initial blog post data
      const now = new Date();
      const adminId = 1; // Assuming admin user has ID 1
      
      // Blog Post 1
      const post1: BlogPost = {
        id: ++this.lastBlogPostId,
        title: "5 Digital Marketing Trends to Watch in 2023",
        slug: "digital-marketing-trends-2023",
        excerpt: "Stay ahead of the curve with these emerging digital marketing trends that are shaping the industry in 2023.",
        content: `<h2>Introduction</h2>
<p>The digital marketing space is transforming rapidly, and businesses that want to thrive must stay in sync with the latest trends. As technology evolves and consumer behavior shifts, 2023 presents a unique set of opportunities for marketers. From artificial intelligence to data privacy, this blog dives deep into the five most impactful digital marketing trends that are shaping the landscape this year.</p>

<h2>1. Hyper-Personalization Through AI and Machine Learning</h2>
<p>In 2023, personalization is no longer optional. With the help of artificial intelligence (AI) and machine learning, marketers can now analyze user data in real-time and deliver highly personalized content, offers, and product recommendations. AI tools help predict customer behavior, segment audiences, and automate communication based on customer preferences. For example, e-commerce platforms now use AI to recommend products uniquely suited to individual browsing history, boosting conversion rates significantly.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Use AI-powered CRMs and automation tools.</li>
<li>Implement dynamic email marketing campaigns.</li>
<li>Leverage customer data from your website and social channels to personalize ads and content.</li>
</ul>

<h2>2. Voice Search Optimization</h2>
<p>The rise of virtual assistants like Alexa, Google Assistant, and Siri has led to a significant increase in voice searches. According to recent statistics, over 50% of online searches will be conducted by voice by the end of this year. This change in how users search demands that marketers rethink their SEO strategies. Unlike typed queries, voice searches tend to be more conversational and question-based.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Optimize content using long-tail keywords and natural language.</li>
<li>Create FAQ pages to target voice queries.</li>
<li>Focus on local SEO, as most voice searches are local in nature.</li>
</ul>

<h2>3. Short-Form Video Dominance</h2>
<p>Short-form video content continues to explode in popularity, particularly on platforms like TikTok, Instagram Reels, and YouTube Shorts. These videos are easy to consume, shareable, and highly engaging. In 2023, brands that harness the power of short-form videos are seeing higher audience engagement and brand recall.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Post behind-the-scenes content, product demos, or quick tips.</li>
<li>Embrace storytelling in under 60 seconds.</li>
<li>Use trending audio and hashtags to increase visibility.</li>
</ul>

<h2>4. Influencer Marketing Evolution</h2>
<p>Influencer marketing is evolving from one-off promotions to long-term partnerships. Consumers today prefer genuine recommendations from micro and nano influencers over traditional celebrity endorsements. These smaller influencers tend to have more niche audiences and higher engagement rates, making them more effective for targeted marketing.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Collaborate with influencers who align with your brand values.</li>
<li>Focus on authenticity rather than reach.</li>
<li>Track campaign performance through affiliate links or UTM parameters.</li>
</ul>

<h2>5. First-Party Data and Consumer Privacy</h2>
<p>With third-party cookies being phased out and data privacy regulations tightening globally, marketers are shifting their focus toward collecting and utilizing first-party data. This includes data gathered directly from users through website forms, email subscriptions, and app interactions.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Encourage newsletter signups and gated content.</li>
<li>Use surveys and quizzes to gather valuable insights.</li>
<li>Be transparent about data collection and usage policies.</li>
</ul>

<h2>Conclusion</h2>
<p>Digital marketing in 2023 is all about connection, personalization, and trust. Marketers must adopt a more human-centric approach powered by intelligent technology and genuine engagement. By embracing these five trends—hyper-personalization, voice search optimization, short-form videos, influencer partnerships, and first-party data—you can future-proof your marketing strategy and stay ahead in the digital race.</p>
<p>Stay tuned for more insights to elevate your digital presence and connect with your audience more effectively.</p>`,
        featuredImage: "https://imgur.com/2fALBbD.jpg",
        authorId: adminId,
        status: "published",
        tags: ["digital marketing", "trends", "AI", "voice search", "influencer marketing"],
        category: "Digital Marketing",
        metaTitle: "5 Digital Marketing Trends to Watch in 2023 | Synergy Brand Architect",
        metaDescription: "Stay ahead with our guide to the top digital marketing trends of 2023. Learn about AI personalization, voice search, video content, influencer partnerships, and data privacy.",
        publishedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
        createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
        updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5)
      };
      
      // Blog Post 2
      const post2: BlogPost = {
        id: ++this.lastBlogPostId,
        title: "The Ultimate Guide to Local SEO for Patna Businesses",
        slug: "local-seo-guide-patna-businesses",
        excerpt: "Learn how to optimize your business for local search and attract more customers in Patna with these proven SEO strategies.",
        content: `<h2>Introduction</h2>
<p>For businesses in Patna, being discoverable in local search results can be the difference between thriving and merely surviving. With more consumers than ever turning to search engines to find local services and products, optimizing your online presence for local SEO has never been more critical. This comprehensive guide will walk you through the essential strategies to boost your business's visibility in Patna's local search landscape.</p>

<h2>Why Local SEO Matters for Patna Businesses</h2>
<p>The digital landscape in Patna is evolving rapidly, with internet penetration increasing significantly in recent years. Today's Patna consumers regularly use search engines to find everything from restaurants and retail shops to professional services. According to recent statistics, "near me" searches in Bihar have grown by over 150% in the past two years, with Patna leading this trend.</p>

<h2>Essential Local SEO Strategies</h2>

<h3>1. Optimize Your Google Business Profile</h3>
<p>Your Google Business Profile (formerly Google My Business) is the cornerstone of local SEO success. To maximize its impact:</p>
<ul>
<li>Ensure all business information is accurate and complete</li>
<li>Add high-quality photos of your business, products, and services</li>
<li>Regularly post updates, offers, and news</li>
<li>Respond promptly to customer reviews and questions</li>
<li>Add your specific business categories and relevant attributes</li>
</ul>

<h3>2. Build Location-Specific Content</h3>
<p>Creating content that speaks directly to the Patna market can significantly improve your local relevance:</p>
<ul>
<li>Develop location-specific pages for each area you serve within Patna</li>
<li>Write blog posts about local events, news, or trends relevant to your industry</li>
<li>Create guides to local landmarks or attractions near your business</li>
<li>Use locally relevant keywords such as "best [service] in Patna" or "[product] near Patliputra"</li>
</ul>

<h3>3. Local Link Building</h3>
<p>Earning links from other reputable Patna-based websites signals to search engines that your business is a trusted local entity:</p>
<ul>
<li>Get listed in local business directories specific to Patna and Bihar</li>
<li>Partner with complementary local businesses for cross-promotion</li>
<li>Sponsor local events, schools, or charities and earn backlinks</li>
<li>Participate in local business associations and chambers of commerce</li>
</ul>

<h3>4. Mobile Optimization</h3>
<p>With most local searches occurring on mobile devices, ensuring your website is mobile-friendly is essential:</p>
<ul>
<li>Use responsive design that adapts to various screen sizes</li>
<li>Optimize page loading speed for slower mobile connections</li>
<li>Make contact information easily accessible with clickable phone numbers</li>
<li>Implement easy navigation with simple menus</li>
</ul>

<h2>Measuring Local SEO Success</h2>
<p>To track the effectiveness of your local SEO efforts, monitor these key metrics:</p>
<ul>
<li>Local ranking positions for your target keywords</li>
<li>Traffic from Patna and surrounding areas</li>
<li>Conversion rates from local visitors</li>
<li>Growth in directions requests through Google Maps</li>
<li>Increase in phone calls from search results</li>
</ul>

<h2>Conclusion</h2>
<p>Implementing a comprehensive local SEO strategy is no longer optional for businesses in Patna that want to remain competitive. By optimizing your Google Business Profile, creating location-specific content, building local links, and ensuring mobile-friendliness, you'll increase your visibility to potential customers right when they're looking for what you offer. Start applying these strategies today, and watch your local digital presence transform.</p>

<p>Need professional help with your local SEO strategy? Synergy Brand Architect specializes in helping Patna businesses dominate local search results. Contact us today for a free local SEO audit.</p>`,
        featuredImage: "https://imgur.com/2fALBbD.jpg",
        authorId: adminId,
        status: "published",
        tags: ["local SEO", "Patna", "small business", "Google Business Profile", "local marketing"],
        category: "SEO",
        metaTitle: "Local SEO Guide for Patna Businesses | Synergy Brand Architect",
        metaDescription: "Increase visibility with our ultimate local SEO guide for Patna businesses. Learn proven strategies to attract more local customers and outrank competition.",
        publishedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3),
        createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4),
        updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3)
      };
      
      // Blog Post 3
      const post3: BlogPost = {
        id: ++this.lastBlogPostId,
        title: "How to Build a Brand That Resonates With Your Audience",
        slug: "build-brand-that-resonates-with-audience",
        excerpt: "Discover the key elements of creating a memorable brand that connects emotionally with your target audience and drives business growth.",
        featuredImage: "https://imgur.com/2fALBbD.jpg",
        content: `<h2>Introduction</h2>
<p>In today's crowded marketplace, a strong brand is your most valuable asset. It's not just about having a catchy logo or a clever tagline—it's about creating a coherent identity that resonates with your audience on an emotional level. When customers connect with your brand, they're more likely to become loyal advocates and help your business grow. This guide explores the essential elements of building a brand that truly speaks to your audience.</p>

<h2>Understanding Your Audience</h2>
<p>The foundation of resonant branding begins with deep audience understanding:</p>
<ul>
<li>Create detailed buyer personas based on demographic and psychographic data</li>
<li>Conduct surveys and interviews to uncover pain points and aspirations</li>
<li>Analyze your competitors' audience engagement strategies</li>
<li>Monitor social media conversations to identify trends and preferences</li>
</ul>

<h2>Crafting Your Brand Story</h2>
<p>Humans are naturally drawn to stories. A compelling brand narrative creates emotional connections:</p>
<ul>
<li>Define your brand's origin and purpose—why you exist beyond making profit</li>
<li>Identify the problem your brand solves and how it improves customers' lives</li>
<li>Develop a consistent voice that reflects your brand's personality</li>
<li>Share authentic stories about your team, customers, and journey</li>
</ul>

<h2>Visual Identity That Communicates Your Values</h2>
<p>Your visual elements should instantly communicate your brand's essence:</p>
<ul>
<li>Choose colors that evoke the right emotional response from your target audience</li>
<li>Design a logo that works across all platforms and sizes</li>
<li>Select typography that reflects your brand personality</li>
<li>Create consistent visual guidelines for all marketing materials</li>
</ul>

<h2>Building Emotional Connections</h2>
<p>The most successful brands forge emotional bonds with their audience:</p>
<ul>
<li>Focus on how your product or service makes customers feel</li>
<li>Identify shared values between your brand and your audience</li>
<li>Create experiences that surprise and delight</li>
<li>Demonstrate authentic social responsibility that aligns with audience values</li>
</ul>

<h2>Consistency Across All Touchpoints</h2>
<p>A resonant brand delivers consistency at every customer interaction:</p>
<ul>
<li>Align your online and offline presence with consistent messaging</li>
<li>Train your team to embody brand values in customer interactions</li>
<li>Ensure product quality and service delivery meets brand promises</li>
<li>Maintain a consistent content strategy across all platforms</li>
</ul>

<h2>Measuring Brand Resonance</h2>
<p>To gauge how well your brand is connecting with audiences, monitor these metrics:</p>
<ul>
<li>Brand sentiment in social media mentions and reviews</li>
<li>Customer loyalty and retention rates</li>
<li>Net Promoter Score (NPS) and customer satisfaction</li>
<li>Direct feedback through surveys and interviews</li>
</ul>

<h2>Conclusion</h2>
<p>Building a brand that resonates with your audience is both an art and a science. It requires deep understanding, creative storytelling, consistent execution, and continual refinement. When done right, a resonant brand creates passionate advocates who not only purchase your products but also champion your company to others.</p>

<p>Remember that brand building is not a one-time effort but an ongoing journey. As your business evolves and your audience changes, your brand must adapt while staying true to its core values and purpose. By focusing on authentic connections and consistently delivering on your brand promise, you'll build a brand that not only resonates with your audience but stands the test of time.</p>`,

        authorId: adminId,
        status: "published",
        tags: ["branding", "brand strategy", "customer loyalty", "brand storytelling", "brand identity"],
        category: "Branding",
        metaTitle: "How to Build a Brand That Resonates With Your Audience | Synergy Brand Architect",
        metaDescription: "Create a powerful brand that connects emotionally with your target audience. Learn key strategies for storytelling, visual identity, and building customer loyalty.",
        publishedAt: now,
        createdAt: now,
        updatedAt: now
      };
      
      // Add the posts to the map
      this.blogPosts.set(post1.id, post1);
      this.blogPosts.set(post2.id, post2);
      this.blogPosts.set(post3.id, post3);
      
      console.log('Initial blog posts created');
    } catch (error) {
      console.error('Error creating initial blog posts:', error);
    }
  }

  private createInitialAdmin() {
    // Use synchronous operations to avoid potential issues with async initialization
    // First check if admin exists
    let adminExists = false;
    const usersArray = Array.from(this.users.values());
    for (const user of usersArray) {
      if (user.email.toLowerCase() === 'admin@synergybrandarchitect.in') {
        adminExists = true;
        break;
      }
    }
    
    if (!adminExists) {
      try {
        // Create admin user synchronously
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
    // Convert MapIterator to array to avoid downlevelIteration error
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
    if (!user) return undefined;
    
    // Handle permissions properly
    let permissions = user.permissions;
    if (userData.permissions) {
      permissions = [...userData.permissions];
    }
    
    const updatedUser: User = {
      ...user,
      ...userData,
      permissions,
      updatedAt: new Date(),
      // If password is being updated, hash it
      password: userData.password ? await bcrypt.hash(userData.password, 10) : user.password
    };
    
    this.users.set(id, updatedUser);
    return { ...updatedUser };
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values()).map(user => ({ ...user }));
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    
    return { ...user };
  }

  // Submission methods
  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const id = ++this.lastSubmissionId;
    const now = new Date();
    
    const newSubmission: Submission = {
      id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      city: submission.city || null,
      service: submission.service,
      message: submission.message,
      status: 'new',
      submittedAt: now,
      updatedAt: now
    };
    
    this.submissions.set(id, newSubmission);
    return { ...newSubmission };
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (submission) {
      return { ...submission };
    }
    return undefined;
  }

  async updateSubmission(id: number, data: UpdateSubmission): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (!submission) return undefined;
    
    const updatedSubmission: Submission = {
      ...submission,
      status: data.status || submission.status,
      updatedAt: new Date()
    };
    
    this.submissions.set(id, updatedSubmission);
    return { ...updatedSubmission };
  }

  async deleteSubmission(id: number): Promise<boolean> {
    return this.submissions.delete(id);
  }

  async listSubmissions(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Submission[]> {
    let submissions = Array.from(this.submissions.values());
    
    if (filters) {
      if (filters.status) {
        submissions = submissions.filter(s => s.status === filters.status);
      }
      
      if (filters.startDate) {
        submissions = submissions.filter(s => s.submittedAt >= filters.startDate!);
      }
      
      if (filters.endDate) {
        submissions = submissions.filter(s => s.submittedAt <= filters.endDate!);
      }
    }
    
    // Sort by newest first
    return submissions.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  // Notes methods
  async addNote(note: InsertNote & {userId: number}): Promise<Note> {
    const id = ++this.lastNoteId;
    
    const newNote: Note = {
      id,
      submissionId: note.submissionId,
      userId: note.userId,
      content: note.content,
      createdAt: new Date()
    };
    
    this.notes.set(id, newNote);
    return { ...newNote };
  }

  async getSubmissionNotes(submissionId: number): Promise<Note[]> {
    return Array.from(this.notes.values())
      .filter(note => note.submissionId === submissionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Blog post methods
  async createBlogPost(post: InsertBlogPost & {authorId: number}): Promise<BlogPost> {
    const id = ++this.lastBlogPostId;
    const now = new Date();
    
    // Generate slug from title if not provided
    let slug = post.slug;
    if (!slug) {
      slug = post.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      // Make sure slug is unique
      let slugExists = true;
      let counter = 0;
      let uniqueSlug = slug;
      
      while (slugExists) {
        const posts = Array.from(this.blogPosts.values());
        slugExists = posts.some(existingPost => existingPost.slug === uniqueSlug);
        
        if (slugExists) {
          counter++;
          uniqueSlug = `${slug}-${counter}`;
        } else {
          slug = uniqueSlug;
        }
      }
    }
    
    const newPost: BlogPost = {
      id,
      title: post.title,
      slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage || null,
      authorId: post.authorId,
      status: post.status || 'draft',
      tags: Array.isArray(post.tags) ? post.tags.map(t => String(t)) : [],
      category: post.category || null,
      metaTitle: post.metaTitle || null,
      metaDescription: post.metaDescription || null,
      publishedAt: post.status === 'published' ? now : null,
      createdAt: now,
      updatedAt: now
    };
    
    this.blogPosts.set(id, newPost);
    return { ...newPost };
  }
  
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (post) {
      return { ...post };
    }
    return undefined;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = Array.from(this.blogPosts.values());
    for (const post of posts) {
      if (post.slug === slug) {
        return { ...post };
      }
    }
    return undefined;
  }
  
  async updateBlogPost(id: number, data: UpdateBlogPost): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    // Handle tags array properly
    let tags = post.tags;
    if (data.tags) {
      tags = Array.isArray(data.tags) ? data.tags.map(t => String(t)) : post.tags;
    }
    
    // Special handling for status changes
    const now = new Date();
    let publishedAt = post.publishedAt;
    if (data.status === 'published' && post.status !== 'published') {
      publishedAt = now;
    }
    
    const updatedPost: BlogPost = {
      ...post,
      ...data,
      tags,
      publishedAt,
      updatedAt: now
    };
    
    this.blogPosts.set(id, updatedPost);
    return { ...updatedPost };
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
  
  async listBlogPosts(filters?: { status?: string; category?: string }): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (filters?.status) {
      posts = posts.filter(post => post.status === filters.status);
    }
    
    if (filters?.category) {
      posts = posts.filter(post => post.category === filters.category);
    }
    
    return posts.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA; // Sort in descending order (newest first)
    });
  }
  
  async logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void> {
    const auditLog: AuditLog = {
      id: ++this.lastAuditLogId,
      createdAt: new Date(),
      ...log
    };
    
    this.auditLogs.set(auditLog.id, auditLog);
  }

  // Password reset token methods
  private passwordResetTokens: Map<string, {
    userId: number, 
    token: string, 
    expiresAt: Date, 
    createdAt: Date, 
    used: boolean
  }> = new Map();
  
  async createPasswordResetToken(userId: number): Promise<string> {
    // Check if user exists
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Generate random token
    const token = crypto.randomUUID().replace(/-/g, '');
    
    // Set expiry time (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    // Store token
    this.passwordResetTokens.set(token, {
      userId,
      token,
      expiresAt,
      createdAt: new Date(),
      used: false
    });
    
    // Log the audit
    await this.logAudit({
      userId,
      action: 'password_reset_token_created',
      details: 'Password reset token generated',
      ipAddress: '0.0.0.0', // In a real implementation, this would be the actual IP
      userAgent: 'system'
    });
    
    return token;
  }
  
  async validateResetToken(token: string): Promise<User | null> {
    // Get token from storage
    const tokenData = this.passwordResetTokens.get(token);
    
    // Check if token exists, is not used, and not expired
    if (!tokenData || tokenData.used || new Date() > tokenData.expiresAt) {
      return null;
    }
    
    // Get user
    const user = await this.getUser(tokenData.userId);
    if (!user) {
      return null;
    }
    
    return user;
  }
  
  async markResetTokenAsUsed(token: string): Promise<boolean> {
    // Get token from storage
    const tokenData = this.passwordResetTokens.get(token);
    
    // Check if token exists
    if (!tokenData) {
      return false;
    }
    
    // Mark as used
    tokenData.used = true;
    this.passwordResetTokens.set(token, tokenData);
    
    // Log the audit
    await this.logAudit({
      userId: tokenData.userId,
      action: 'password_reset_token_used',
      details: 'Password reset token used',
      ipAddress: '0.0.0.0', // In a real implementation, this would be the actual IP
      userAgent: 'system'
    });
    
    return true;
  }
  
  // OTP methods
  private otpCodes: Map<string, {
    userId: number,
    email: string,
    code: string,
    expiresAt: Date,
    createdAt: Date,
    used: boolean
  }> = new Map();
  
  async createOTP(userId: number, email: string): Promise<string> {
    // Check if user exists
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry time (15 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);
    
    // Store OTP with email as key for easy lookup
    const key = `${email}:${otp}`;
    this.otpCodes.set(key, {
      userId,
      email,
      code: otp,
      expiresAt,
      createdAt: new Date(),
      used: false
    });
    
    // Log the audit
    await this.logAudit({
      userId,
      action: 'otp_created',
      details: 'OTP generated for password reset',
      ipAddress: '0.0.0.0', // In a real implementation, this would be the actual IP
      userAgent: 'system'
    });
    
    return otp;
  }
  
  async validateOTP(email: string, otp: string): Promise<User | null> {
    // Get OTP from storage
    const key = `${email}:${otp}`;
    const otpData = this.otpCodes.get(key);
    
    // Check if OTP exists, is not used, and not expired
    if (!otpData || otpData.used || new Date() > otpData.expiresAt) {
      return null;
    }
    
    // Get user
    const user = await this.getUser(otpData.userId);
    if (!user) {
      return null;
    }
    
    return user;
  }
  
  async markOTPAsUsed(email: string, otp: string): Promise<boolean> {
    // Get OTP from storage
    const key = `${email}:${otp}`;
    const otpData = this.otpCodes.get(key);
    
    // Check if OTP exists
    if (!otpData) {
      return false;
    }
    
    // Mark as used
    otpData.used = true;
    this.otpCodes.set(key, otpData);
    
    // Log the audit
    await this.logAudit({
      userId: otpData.userId,
      action: 'otp_used',
      details: 'OTP used for password reset',
      ipAddress: '0.0.0.0', // In a real implementation, this would be the actual IP
      userAgent: 'system'
    });
    
    return true;
  }
  
  // Addon Product methods
  async createAddonProduct(product: InsertAddonProduct): Promise<AddonProduct> {
    const newProduct: AddonProduct = {
      id: ++this.lastAddonProductId,
      name: product.name,
      price: product.price,
      description: product.description,
      isActive: product.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.addonProducts.set(newProduct.id, newProduct);
    return newProduct;
  }
  
  async getAddonProduct(id: number): Promise<AddonProduct | undefined> {
    return this.addonProducts.get(id);
  }
  
  async updateAddonProduct(id: number, data: UpdateAddonProduct): Promise<AddonProduct | undefined> {
    const product = this.addonProducts.get(id);
    if (!product) return undefined;
    
    const updatedProduct: AddonProduct = {
      ...product,
      ...data,
      updatedAt: new Date()
    };
    
    this.addonProducts.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteAddonProduct(id: number): Promise<boolean> {
    return this.addonProducts.delete(id);
  }
  
  async listAddonProducts(activeOnly = true): Promise<AddonProduct[]> {
    const products = Array.from(this.addonProducts.values());
    return activeOnly ? products.filter(p => p.isActive) : products;
  }
  
  // Cart methods
  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if the user already has this product in cart
    const existingCartItems = Array.from(this.cartItems.values())
      .filter(item => item.userId === cartItem.userId && item.productId === cartItem.productId);
    
    if (existingCartItems.length > 0) {
      // Update quantity if item already exists
      const existing = existingCartItems[0];
      const updatedItem: CartItem = {
        ...existing,
        quantity: existing.quantity + (cartItem.quantity || 1),
        updatedAt: new Date()
      };
      this.cartItems.set(existing.id, updatedItem);
      return updatedItem;
    }
    
    // Create new cart item
    const newCartItem: CartItem = {
      id: ++this.lastCartItemId,
      userId: cartItem.userId,
      productId: cartItem.productId,
      quantity: cartItem.quantity || 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.cartItems.set(newCartItem.id, newCartItem);
    return newCartItem;
  }
  
  async getCartItem(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }
  
  async updateCartItem(id: number, data: UpdateCartItem): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedCartItem: CartItem = {
      ...cartItem,
      ...data,
      updatedAt: new Date()
    };
    
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }
  
  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async getUserCart(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values())
      .filter(item => item.userId === userId);
  }
  
  async clearUserCart(userId: number): Promise<boolean> {
    const userCartItems = Array.from(this.cartItems.values())
      .filter(item => item.userId === userId);
    
    userCartItems.forEach(item => this.cartItems.delete(item.id));
    return true;
  }
  
  // Order methods
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const newOrder: Order = {
      id: ++this.lastOrderId,
      userId: order.userId,
      status: order.status || 'pending',
      totalAmount: order.totalAmount,
      name: order.name,
      email: order.email,
      phone: order.phone,
      message: order.message || '',
      paymentId: null,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.set(newOrder.id, newOrder);
    
    // Create order items
    items.forEach(item => {
      const orderItem: OrderItem = {
        id: ++this.lastOrderItemId,
        orderId: newOrder.id,
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity || 1,
        createdAt: new Date()
      };
      
      this.orderItems.set(orderItem.id, orderItem);
    });
    
    return newOrder;
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async updateOrder(id: number, data: UpdateOrder): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = {
      ...order,
      ...data,
      updatedAt: new Date()
    };
    
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Newest first
  }
  
  async listOrders(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Order[]> {
    let orders = Array.from(this.orders.values());
    
    if (filters) {
      if (filters.status) {
        orders = orders.filter(order => order.status === filters.status);
      }
      
      if (filters.startDate) {
        orders = orders.filter(order => order.createdAt >= filters.startDate!);
      }
      
      if (filters.endDate) {
        orders = orders.filter(order => order.createdAt <= filters.endDate!);
      }
    }
    
    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Newest first
  }
  
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values())
      .filter(item => item.orderId === orderId);
  }
  
  // Order Revision methods
  async createOrderRevision(revision: InsertOrderRevision): Promise<OrderRevision> {
    const newRevision: OrderRevision = {
      id: ++this.lastOrderRevisionId,
      orderId: revision.orderId,
      userId: revision.userId,
      description: revision.description,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orderRevisions.set(newRevision.id, newRevision);
    return newRevision;
  }
  
  async getOrderRevisions(orderId: number): Promise<OrderRevision[]> {
    return Array.from(this.orderRevisions.values())
      .filter(revision => revision.orderId === orderId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Newest first
  }
  
  async updateOrderRevision(id: number, data: UpdateOrderRevision): Promise<OrderRevision | undefined> {
    const revision = this.orderRevisions.get(id);
    if (!revision) return undefined;
    
    const updatedRevision: OrderRevision = {
      ...revision,
      ...data,
      updatedAt: new Date()
    };
    
    this.orderRevisions.set(id, updatedRevision);
    return updatedRevision;
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    if (!pool) {
      throw new Error('Database pool is not initialized');
    }

    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({
      pool: pool as Pool,
      tableName: 'session',
      createTableIfMissing: true,
    });

    // Create initial data if it doesn't exist
    this.ensureInitialDataExists();
  }

  // Helper method to ensure initial data exists
  private async ensureInitialDataExists() {
    try {
      // Check if admin user exists
      const adminUser = await this.getUserByEmail('admin@synergybrandarchitect.in');
      if (!adminUser) {
        await this.createInitialAdmin();
      }

      // Check if blog posts exist
      const existingBlogPosts = await this.listBlogPosts();
      if (existingBlogPosts.length === 0) {
        await this.createInitialBlogPosts();
      }

      // Check if addon products exist
      const existingProducts = await this.listAddonProducts();
      if (existingProducts.length === 0) {
        await this.createInitialAddonProducts();
      }
    } catch (error) {
      console.error("Error ensuring initial data exists:", error);
    }
  }

  // Create initial admin user
  private async createInitialAdmin() {
    try {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await this.createUser({
        name: 'Admin',
        email: 'admin@synergybrandarchitect.in',
        password: hashedPassword,
        role: 'admin',
        permissions: ['all'],
        phone: '9525230232'
      });
      
      console.log('Initial admin user created');
    } catch (error) {
      console.error('Error creating initial admin:', error);
    }
  }

  // Initialize initial blog posts
  private async createInitialBlogPosts() {
    try {
      const adminUser = await this.getUserByEmail('admin@synergybrandarchitect.in');
      if (!adminUser) {
        throw new Error('Admin user not found for creating initial blog posts');
      }

      const now = new Date();
      
      // Blog post 1
      await this.createBlogPost({
        title: "5 Digital Marketing Trends to Watch in 2023",
        slug: "digital-marketing-trends-2023",
        excerpt: "Stay ahead of the curve with these emerging digital marketing trends that are shaping the industry in 2023.",
        content: `<h2>Introduction</h2>
<p>The digital marketing space is transforming rapidly, and businesses that want to thrive must stay in sync with the latest trends. As technology evolves and consumer behavior shifts, 2023 presents a unique set of opportunities for marketers. From artificial intelligence to data privacy, this blog dives deep into the five most impactful digital marketing trends that are shaping the landscape this year.</p>

<h2>1. Hyper-Personalization Through AI and Machine Learning</h2>
<p>In 2023, personalization is no longer optional. With the help of artificial intelligence (AI) and machine learning, marketers can now analyze user data in real-time and deliver highly personalized content, offers, and product recommendations. AI tools help predict customer behavior, segment audiences, and automate communication based on customer preferences. For example, e-commerce platforms now use AI to recommend products uniquely suited to individual browsing history, boosting conversion rates significantly.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Use AI-powered CRMs and automation tools.</li>
<li>Implement dynamic email marketing campaigns.</li>
<li>Leverage customer data from your website and social channels to personalize ads and content.</li>
</ul>

<h2>2. Voice Search Optimization</h2>
<p>With the increasing popularity of virtual assistants like Alexa, Siri, and Google Assistant, voice search is becoming a significant part of the search landscape. By 2023, it's estimated that over 50% of households will own smart speaker devices. This shift in search behavior requires marketers to rethink their SEO strategies and optimize for conversational queries.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Focus on long-tail keywords and natural language phrases.</li>
<li>Create FAQ content that answers common questions in your industry.</li>
<li>Ensure your business listings have accurate information for local voice searches.</li>
</ul>

<h2>3. Privacy-First Marketing Strategies</h2>
<p>With the phasing out of third-party cookies and increased privacy regulations, marketers need to adapt to a more privacy-conscious landscape. This trend is pushing businesses to collect and leverage first-party data more effectively while being transparent about data usage.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Build a robust first-party data collection strategy.</li>
<li>Implement cookieless tracking solutions.</li>
<li>Focus on building trust through transparent data practices.</li>
</ul>

<h2>4. Social Commerce and Live Shopping</h2>
<p>The line between social media and e-commerce continues to blur. Platforms like Instagram, Facebook, and TikTok are expanding their shopping features, allowing users to discover and purchase products without leaving the app. Live shopping events, where products are showcased and sold in real-time through live videos, are also gaining significant traction.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Set up shoppable posts on your social media platforms.</li>
<li>Explore live shopping events for product launches or special promotions.</li>
<li>Integrate user-generated content into your social commerce strategy.</li>
</ul>

<h2>5. Sustainability and Purpose-Driven Marketing</h2>
<p>Consumers are increasingly making purchasing decisions based on a brand's environmental impact and social values. In 2023, purpose-driven marketing that highlights a company's sustainability efforts and social responsibility initiatives will be crucial for connecting with conscious consumers.</p>

<h3>How to Leverage This Trend:</h3>
<ul>
<li>Communicate your brand's sustainability initiatives authentically.</li>
<li>Align your marketing campaigns with causes that resonate with your audience.</li>
<li>Consider eco-friendly packaging and sustainable product options.</li>
</ul>

<h2>Conclusion</h2>
<p>As we navigate through 2023, these five trends are reshaping the digital marketing landscape. Brands that can adapt to these changes and integrate these strategies into their marketing plans will be well-positioned to connect with their audience more effectively and drive business growth.</p>

<p>At Synergy Brand Architect, we're dedicated to helping businesses in Patna and beyond stay ahead of the curve with innovative digital marketing strategies. Contact us today to learn how we can help your brand leverage these trends for success.</p>`,
        featuredImage: "//i.imgur.com/8MISy5Mh.jpg",
        status: "published",
        tags: ["digital marketing", "trends", "2023", "AI", "voice search"],
        category: "Digital Marketing",
        metaTitle: "5 Digital Marketing Trends to Watch in 2023 | Synergy Brand Architect",
        metaDescription: "Discover the top 5 digital marketing trends of 2023 that are reshaping the industry. Learn how AI, voice search, privacy-focused strategies, social commerce, and purpose-driven marketing are changing the game.",
        publishedAt: now,
        authorId: adminUser.id
      });
      
      // Blog post 2
      await this.createBlogPost({
        title: "The Ultimate Guide to Local SEO for Patna Businesses",
        slug: "ultimate-guide-local-seo-patna-businesses",
        excerpt: "Learn how to dominate local search results and attract more customers to your Patna-based business with our comprehensive local SEO guide.",
        content: `<h2>Introduction</h2>
<p>For businesses in Patna, establishing a strong local online presence is no longer optional—it's essential for survival and growth. With over 90% of consumers searching online for local businesses, Local SEO has become the cornerstone of digital marketing for businesses that serve specific geographic areas. This comprehensive guide will walk you through the strategies and tactics to boost your visibility in local search results and attract more customers in Patna.</p>

<h2>What is Local SEO and Why Does it Matter for Patna Businesses?</h2>
<p>Local SEO is the practice of optimizing your online presence to attract more business from relevant local searches. These searches take place on Google and other search engines when people in Patna are looking for products or services near them.</p>

<p>For businesses in Patna, local SEO matters because:</p>
<ul>
<li>46% of all Google searches are seeking local information</li>
<li>97% of people learn more about a local company online than anywhere else</li>
<li>88% of searches for local businesses on a mobile device either call or visit the business within 24 hours</li>
<li>Patna's digital landscape is growing rapidly with increased smartphone penetration</li>
</ul>

<h2>Essential Local SEO Strategies for Patna Businesses</h2>

<h3>1. Optimize Your Google Business Profile (Formerly Google My Business)</h3>
<p>Your Google Business Profile is the cornerstone of your local SEO strategy. It's free, easy to update, and is often the first place potential customers will encounter your business.</p>

<p>Key optimization tips:</p>
<ul>
<li>Claim and verify your business listing</li>
<li>Use your exact business name as it appears on your storefront</li>
<li>Add your complete address with proper PIN code (e.g., Patna 800001)</li>
<li>Include accurate business hours</li>
<li>Add high-quality photos of your business, products, and services</li>
<li>Select the most relevant business categories</li>
<li>Add your products or services with descriptions</li>
<li>Collect and respond to Google reviews regularly</li>
</ul>

<h3>2. Build Local Citations</h3>
<p>Citations are mentions of your business name, address, and phone number (NAP) on other websites. For Patna businesses, focus on these citation sources:</p>

<ul>
<li>JustDial</li>
<li>Sulekha</li>
<li>TradeIndia</li>
<li>IndiaMART</li>
<li>Local Patna directories like PatnaYellowPages</li>
<li>Industry-specific directories relevant to your business</li>
</ul>

<p>Ensure your NAP information is consistent across all platforms to avoid confusing search engines.</p>

<h3>3. Localize Your Website Content</h3>
<p>Your website should clearly communicate your Patna location and service area:</p>

<ul>
<li>Include your city name (Patna) and neighborhood in title tags, meta descriptions, headers, and URL when appropriate</li>
<li>Create location-specific pages if you serve multiple areas in and around Patna</li>
<li>Add an embedded Google Map showing your location</li>
<li>Create locally relevant content that mentions local landmarks, events, or news</li>
<li>Include testimonials from local customers</li>
</ul>

<h3>4. Implement Schema Markup</h3>
<p>Schema markup is code that helps search engines understand the content on your website better. For local businesses, LocalBusiness schema is particularly important as it helps search engines identify and display your business information correctly.</p>

<p>Key schema elements to include:</p>
<ul>
<li>Business name</li>
<li>Address</li>
<li>Phone number</li>
<li>Business hours</li>
<li>Price range</li>
<li>Customer reviews</li>
</ul>

<h3>5. Build Local Backlinks</h3>
<p>Backlinks from local websites signal to search engines that your business is an established part of the Patna community.</p>

<p>Ways to build local backlinks:</p>
<ul>
<li>Get listed in local business associations (e.g., Bihar Chamber of Commerce)</li>
<li>Participate in local events and get featured on event websites</li>
<li>Sponsor local teams or charity events</li>
<li>Guest post on local blogs or news sites</li>
<li>Partner with complementary local businesses for cross-promotion</li>
</ul>

<h3>6. Focus on Mobile Optimization</h3>
<p>With the majority of local searches performed on mobile devices, having a mobile-friendly website is crucial:</p>

<ul>
<li>Use responsive design that adapts to all screen sizes</li>
<li>Ensure fast page loading speeds</li>
<li>Make contact information easily accessible</li>
<li>Add click-to-call buttons for easy phone contact</li>
<li>Use large, easy-to-tap buttons for navigation</li>
</ul>

<h3>7. Generate and Manage Reviews</h3>
<p>Reviews not only influence potential customers but also impact your local search rankings:</p>

<ul>
<li>Actively encourage satisfied customers to leave Google reviews</li>
<li>Respond to all reviews, both positive and negative, professionally</li>
<li>Address negative reviews by offering solutions</li>
<li>Monitor review sites regularly including Google, JustDial, and Sulekha</li>
</ul>

<h2>Local SEO Challenges Specific to Patna</h2>

<h3>Challenge 1: Language Considerations</h3>
<p>Many users in Patna search in Hindi or a mix of Hindi and English. Consider creating content in both languages to capture this audience. Use Hindi keywords where appropriate, especially for services commonly searched in the local language.</p>

<h3>Challenge 2: Competition in Key Industries</h3>
<p>Certain industries in Patna are highly competitive online, including education, healthcare, and retail. Businesses in these sectors need more aggressive local SEO strategies and may benefit from targeted local paid search campaigns to complement organic efforts.</p>

<h3>Challenge 3: Limited Digital Adoption Among Some Demographics</h3>
<p>While digital usage is growing rapidly in Patna, some demographic groups still rely on traditional means of finding businesses. A comprehensive marketing approach that combines digital with traditional methods may be necessary.</p>

<h2>Measuring Your Local SEO Success</h2>

<p>Track these key metrics to gauge the effectiveness of your local SEO efforts:</p>

<ul>
<li>Google Business Profile insights (views, searches, actions)</li>
<li>Local ranking positions for key search terms</li>
<li>Local organic traffic to your website</li>
<li>Phone calls from search listings</li>
<li>Direction requests</li>
<li>Conversion rates from local traffic</li>
</ul>

<h2>Conclusion</h2>
<p>Implementing a comprehensive local SEO strategy is essential for businesses in Patna looking to capture the growing number of customers searching online for local products and services. By optimizing your Google Business Profile, building local citations, creating locally relevant content, and focusing on reviews, you can significantly improve your visibility in local search results.</p>

<p>At Synergy Brand Architect, we specialize in helping Patna businesses improve their local search presence. Our team understands the unique challenges and opportunities of the local market, and we can develop a customized local SEO strategy to help your business reach more customers in Patna and surrounding areas. Contact us today to learn how we can help your business grow through effective local SEO.</p>`,
        featuredImage: "//i.imgur.com/lYXuDe6h.jpg",
        status: "published",
        tags: ["local SEO", "Patna", "Google Business Profile", "local marketing", "business visibility"],
        category: "SEO",
        metaTitle: "The Ultimate Guide to Local SEO for Patna Businesses | Synergy Brand Architect",
        metaDescription: "Learn how to dominate local search results in Patna with our comprehensive local SEO guide. Practical strategies to improve your Google ranking and attract more local customers.",
        publishedAt: now,
        authorId: adminUser.id
      });
      
      // Blog post 3
      await this.createBlogPost({
        title: "How to Build a Brand That Resonates With Your Audience",
        slug: "how-to-build-brand-resonates-audience",
        excerpt: "Discover the essential elements of creating a powerful brand that connects emotionally with your target audience and drives business growth.",
        content: `<h2>Introduction</h2>
<p>In today's crowded marketplace, having a great product or service isn't enough. To truly stand out and create loyal customers, you need a brand that resonates deeply with your target audience. A strong brand goes beyond logos and colors—it creates an emotional connection that turns casual customers into brand advocates. This comprehensive guide explores the key principles and strategies for building a brand that truly speaks to your audience.</p>

<h2>Understanding Brand Resonance</h2>
<p>Brand resonance occurs when your audience feels a deep connection with your brand's values, personality, and messaging. It's the harmony between what your brand stands for and what your audience cares about. When a brand resonates, it becomes a natural extension of how consumers see themselves or how they want to be perceived.</p>

<p>Key components of brand resonance include:</p>
<ul>
<li><strong>Behavioral loyalty</strong> - Repeat purchases and engagement</li>
<li><strong>Attitudinal attachment</strong> - Loving the brand beyond its functional benefits</li>
<li><strong>Sense of community</strong> - Feeling connected to others who use the brand</li>
<li><strong>Active engagement</strong> - Willingness to invest time, energy, and money beyond purchases</li>
</ul>

<h2>Step 1: Define Your Brand Purpose and Values</h2>
<p>A resonant brand starts with a clear purpose—the "why" behind your business. Your purpose should connect to something larger than profits and address how your brand makes a positive difference in people's lives.</p>

<h3>Action Items:</h3>
<ul>
<li>Define your brand's purpose using the "Golden Circle" approach (Why, How, What)</li>
<li>Identify 3-5 core values that guide your brand's behavior and decision-making</li>
<li>Create a compelling origin story that humanizes your brand</li>
<li>Ensure your purpose addresses a genuine need or aspiration of your target audience</li>
</ul>

<p><strong>Example:</strong> Patagonia's purpose isn't just to sell outdoor clothing but "to save our home planet." This resonates deeply with environmentally conscious consumers who want their purchases to align with their values.</p>

<h2>Step 2: Know Your Audience Intimately</h2>
<p>The foundation of brand resonance is a deep understanding of who your audience is, what they care about, and what motivates them. This goes beyond basic demographics to include psychographics, behaviors, and emotional drivers.</p>

<h3>Action Items:</h3>
<ul>
<li>Create detailed audience personas including psychographic traits</li>
<li>Conduct customer interviews to understand pain points and aspirations</li>
<li>Analyze social media conversations around your industry or category</li>
<li>Use surveys and feedback forms to gather quantitative data</li>
<li>Identify the emotional benefits customers seek, not just functional ones</li>
</ul>

<p><strong>Example:</strong> A brand selling organic baby products needs to understand that their audience isn't just "parents" but might be "health-conscious new parents who are anxious about making the right choices and view their purchasing decisions as reflections of their parenting values."</p>

<h2>Step 3: Develop a Distinctive Brand Voice and Personality</h2>
<p>Your brand's personality and voice should feel authentic to your values while resonating with your audience. This creates recognition and emotional connection across all touchpoints.</p>

<h3>Action Items:</h3>
<ul>
<li>Define 3-5 personality traits for your brand (e.g., sincere, bold, innovative)</li>
<li>Create a voice chart that explains how your brand should and shouldn't sound</li>
<li>Develop tone variations for different channels while maintaining consistency</li>
<li>Ensure your personality stands out from competitors</li>
<li>Test your voice with audience members to gauge resonance</li>
</ul>

<p><strong>Example:</strong> Dove's caring, empathetic personality and voice of empowerment resonates with their audience's desire for authentic beauty representation.</p>

<h2>Step 4: Craft Your Visual Identity System</h2>
<p>Your visual identity should translate your brand's purpose, values, and personality into design elements that create immediate recognition and emotional connection.</p>

<h3>Action Items:</h3>
<ul>
<li>Develop a logo that communicates your brand essence</li>
<li>Create a color palette that evokes the right emotional response</li>
<li>Select typography that reinforces your personality</li>
<li>Define imagery style (photography, illustration) guidelines</li>
<li>Design a cohesive system that works across all platforms</li>
</ul>

<p><strong>Example:</strong> Tiffany & Co.'s distinctive robin's egg blue creates immediate recognition and evokes feelings of luxury and special moments.</p>

<h2>Step 5: Create Messaging That Connects</h2>
<p>Effective brand messaging speaks directly to your audience's needs, desires, and values while differentiating you from competitors.</p>

<h3>Action Items:</h3>
<ul>
<li>Develop a brand positioning statement that highlights your unique value</li>
<li>Craft a tagline that captures your essence</li>
<li>Create message hierarchies for different audience segments</li>
<li>Frame benefits in terms of customer outcomes, not just features</li>
<li>Use language that reflects how your audience speaks</li>
</ul>

<p><strong>Example:</strong> Nike's "Just Do It" resonates because it speaks to the inner athlete in everyone, regardless of ability, encouraging people to push beyond their limits.</p>

<h2>Step 6: Build Consistent Brand Experiences</h2>
<p>For true resonance, your brand must deliver consistent experiences across all touchpoints—from website to packaging to customer service.</p>

<h3>Action Items:</h3>
<ul>
<li>Map all customer touchpoints and ensure brand consistency</li>
<li>Design signature brand moments that reinforce your key values</li>
<li>Train team members to embody your brand in customer interactions</li>
<li>Create guidelines for partners and vendors to maintain consistency</li>
<li>Regularly audit your brand experience for gaps or inconsistencies</li>
</ul>

<p><strong>Example:</strong> Apple's brand experience is consistent from the minimalist packaging to the sleek store design to the intuitive user interface, all reinforcing their commitment to simplicity and innovation.</p>

<h2>Step 7: Cultivate Community and Conversation</h2>
<p>Resonant brands create spaces for customers to connect with each other, not just with the brand. This fosters a sense of belonging that strengthens loyalty.</p>

<h3>Action Items:</h3>
<ul>
<li>Create platforms for customers to share experiences with your brand</li>
<li>Develop content that encourages conversation and sharing</li>
<li>Acknowledge and celebrate customer stories</li>
<li>Facilitate connections between community members</li>
<li>Actively participate in conversations, not just broadcast messages</li>
</ul>

<p><strong>Example:</strong> Sephora's Beauty Insider Community allows makeup enthusiasts to connect, share tips, and discuss products, creating a vibrant community around their shared passion.</p>

<h2>Step 8: Evolve While Maintaining Core Essence</h2>
<p>Resonant brands stay relevant by evolving with their audience while staying true to their core purpose and values.</p>

<h3>Action Items:</h3>
<ul>
<li>Regularly gather customer feedback on brand perception</li>
<li>Monitor cultural trends that might impact your audience's preferences</li>
<li>Update visual elements and messaging to stay fresh while maintaining recognition</li>
<li>Expand offerings in alignment with your core purpose</li>
<li>Communicate the reasoning behind significant brand evolutions</li>
</ul>

<p><strong>Example:</strong> Lego has evolved from simple brick toys to digital games, movies, and theme parks while maintaining their core purpose of inspiring creativity through play.</p>

<h2>Common Pitfalls to Avoid</h2>

<ul>
<li><strong>Inauthenticity:</strong> Claiming values that aren't reflected in business practices</li>
<li><strong>Inconsistency:</strong> Sending mixed messages across different touchpoints</li>
<li><strong>Over-promising:</strong> Creating expectations your product can't fulfill</li>
<li><strong>Talking at, not with:</strong> Failing to engage in two-way communication</li>
<li><strong>Ignoring feedback:</strong> Not adapting to changing customer expectations</li>
</ul>

<h2>Measuring Brand Resonance</h2>

<p>Track these metrics to gauge how well your brand is resonating:</p>

<ul>
<li><strong>Net Promoter Score (NPS):</strong> Measures likelihood to recommend</li>
<li><strong>Brand sentiment analysis:</strong> Evaluates emotional tone of mentions</li>
<li><strong>Engagement metrics:</strong> Comments, shares, time spent with content</li>
<li><strong>Customer retention rates:</strong> Indicates long-term loyalty</li>
<li><strong>Price premium:</strong> Ability to charge more than competitors</li>
<li><strong>User-generated content volume:</strong> Shows active brand advocacy</li>
</ul>

<h2>Conclusion</h2>
<p>Building a brand that truly resonates with your audience is a continuous journey, not a destination. It requires deep understanding, authentic expression, and consistent delivery. When done right, the rewards are substantial: loyal customers who not only repeatedly choose your brand but actively champion it to others.</p>

<p>At Synergy Brand Architect, we specialize in creating brands that forge meaningful connections with their audiences. Whether you're building a new brand or refreshing an existing one, our team can help you develop a brand strategy that genuinely resonates. Contact us to learn how we can help your brand forge deeper connections that drive sustainable growth.</p>`,
        featuredImage: "//i.imgur.com/iu4DR5Uh.jpg",
        status: "published",
        tags: ["branding", "audience engagement", "brand strategy", "brand identity", "marketing"],
        category: "Branding",
        metaTitle: "How to Build a Brand That Resonates With Your Audience | Synergy Brand Architect",
        metaDescription: "Learn the essential strategies for creating a powerful brand that connects emotionally with your target audience. Discover how to build brand loyalty and advocacy through authentic positioning and consistent experiences.",
        publishedAt: now,
        authorId: adminUser.id
      });
      
      console.log('Initial blog posts created');
    } catch (error) {
      console.error('Error creating initial blog posts:', error);
    }
  }

  // Initialize initial addon products
  private async createInitialAddonProducts() {
    try {
      const products = [
        {
          name: "Addition of Page",
          price: "1000",
          description: "For clients who have had their website built by us. Includes design and content integration.",
          isActive: true
        },
        {
          name: "Pop-Up",
          price: "500",
          description: "Create engaging pop-ups for offers or lead collection to boost conversions.",
          isActive: true
        },
        {
          name: "Content Editing on Existing Page",
          price: "300",
          description: "Update or modify content on your existing pages. Price is per page.",
          isActive: true
        },
        {
          name: "Image Change",
          price: "300",
          description: "Replace existing images on your website with new ones. Price is per image.",
          isActive: true
        },
        {
          name: "Video Addition (With Section)",
          price: "1000",
          description: "Add a video section to your website. Price may vary based on complexity.",
          isActive: true
        },
        {
          name: "Annual Maintenance Contract (AMC)",
          price: "20% of project cost per month",
          description: "Ongoing maintenance and support for your website to ensure it stays up-to-date and secure.",
          isActive: true
        },
        {
          name: "SEO Optimization for Existing Pages",
          price: "2000",
          description: "Improve your website's search engine ranking. Price is per page.",
          isActive: true
        },
        {
          name: "Speed Optimization",
          price: "1500",
          description: "Make your website faster and improve user experience with our speed optimization service.",
          isActive: true
        },
        {
          name: "Security Setup",
          price: "1000",
          description: "Implement SSL, backups, and other security measures to protect your website.",
          isActive: true
        },
        {
          name: "Blog Section Creation",
          price: "1500",
          description: "Add a blog section to your website to share updates and improve SEO.",
          isActive: true
        }
      ];

      for (const product of products) {
        await this.createAddonProduct(product);
      }
      console.log("Initial addon products created");
    } catch (error) {
      console.error("Error creating initial addon products:", error);
    }
  }

  // User methods
  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({...userData, updatedAt: new Date()})
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async listUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount > 0;
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // Password reset methods
  async createPasswordResetToken(userId: number): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiration
    
    await db.insert(passwordResetTokens).values({
      userId,
      token,
      expiresAt,
      used: false
    });
    
    return token;
  }

  async validateResetToken(token: string): Promise<User | null> {
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.token, token),
          eq(passwordResetTokens.used, false),
          gte(passwordResetTokens.expiresAt, new Date())
        )
      );
    
    if (!resetToken) return null;
    
    const user = await this.getUser(resetToken.userId);
    return user || null;
  }

  async markResetTokenAsUsed(token: string): Promise<boolean> {
    const result = await db
      .update(passwordResetTokens)
      .set({ used: true })
      .where(eq(passwordResetTokens.token, token));
    
    return result.rowCount > 0;
  }

  async createOTP(userId: number, email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minute expiration
    
    await db.insert(otpCodes).values({
      userId,
      email,
      code: otp,
      expiresAt,
      used: false
    });
    
    return otp;
  }

  async validateOTP(email: string, otp: string): Promise<User | null> {
    const [otpEntry] = await db
      .select()
      .from(otpCodes)
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, otp),
          eq(otpCodes.used, false),
          gte(otpCodes.expiresAt, new Date())
        )
      );
    
    if (!otpEntry) return null;
    
    const user = await this.getUser(otpEntry.userId);
    return user || null;
  }

  async markOTPAsUsed(email: string, otp: string): Promise<boolean> {
    const result = await db
      .update(otpCodes)
      .set({ used: true })
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, otp)
        )
      );
    
    return result.rowCount > 0;
  }

  // Submission methods
  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [newSubmission] = await db
      .insert(submissions)
      .values({
        ...submission,
        status: 'new',
        submittedAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return newSubmission;
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    const [submission] = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));
    
    return submission;
  }

  async updateSubmission(id: number, data: UpdateSubmission): Promise<Submission | undefined> {
    const [updatedSubmission] = await db
      .update(submissions)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(submissions.id, id))
      .returning();
    
    return updatedSubmission;
  }

  async deleteSubmission(id: number): Promise<boolean> {
    const result = await db
      .delete(submissions)
      .where(eq(submissions.id, id));
    
    return result.rowCount > 0;
  }

  async listSubmissions(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Submission[]> {
    let query = db.select().from(submissions);
    
    if (filters) {
      const conditions = [];
      
      if (filters.status) {
        conditions.push(eq(submissions.status, filters.status));
      }
      
      if (filters.startDate) {
        conditions.push(gte(submissions.submittedAt, filters.startDate));
      }
      
      if (filters.endDate) {
        conditions.push(lte(submissions.submittedAt, filters.endDate));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query.orderBy(desc(submissions.submittedAt));
  }

  // Notes methods
  async addNote(note: InsertNote & {userId: number}): Promise<Note> {
    const { submissionId, content, userId } = note;
    
    const [newNote] = await db
      .insert(notes)
      .values({
        submissionId,
        userId,
        content,
        createdAt: new Date()
      })
      .returning();
    
    return newNote;
  }

  async getSubmissionNotes(submissionId: number): Promise<Note[]> {
    return await db
      .select()
      .from(notes)
      .where(eq(notes.submissionId, submissionId))
      .orderBy(desc(notes.createdAt));
  }

  // Blog post methods
  async createBlogPost(post: InsertBlogPost & {authorId: number}): Promise<BlogPost> {
    // Generate slug if not provided
    if (!post.slug) {
      post.slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        ...post,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return newPost;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    
    return post;
  }

  async updateBlogPost(id: number, data: UpdateBlogPost): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, id))
      .returning();
    
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id));
    
    return result.rowCount > 0;
  }

  async listBlogPosts(filters?: { status?: string; category?: string }): Promise<BlogPost[]> {
    let query = db.select().from(blogPosts);
    
    if (filters) {
      const conditions = [];
      
      if (filters.status) {
        conditions.push(eq(blogPosts.status, filters.status));
      }
      
      if (filters.category) {
        conditions.push(eq(blogPosts.category, filters.category));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query.orderBy(desc(blogPosts.createdAt));
  }

  // Audit logs
  async logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void> {
    await db
      .insert(auditLogs)
      .values({
        ...log,
        createdAt: new Date()
      });
  }

  // Addon Product methods
  async createAddonProduct(product: InsertAddonProduct): Promise<AddonProduct> {
    const [newProduct] = await db
      .insert(addonProducts)
      .values({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return newProduct;
  }

  async getAddonProduct(id: number): Promise<AddonProduct | undefined> {
    const [product] = await db
      .select()
      .from(addonProducts)
      .where(eq(addonProducts.id, id));
    
    return product;
  }

  async updateAddonProduct(id: number, data: UpdateAddonProduct): Promise<AddonProduct | undefined> {
    const [updatedProduct] = await db
      .update(addonProducts)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(addonProducts.id, id))
      .returning();
    
    return updatedProduct;
  }

  async deleteAddonProduct(id: number): Promise<boolean> {
    const result = await db
      .delete(addonProducts)
      .where(eq(addonProducts.id, id));
    
    return result.rowCount > 0;
  }

  async listAddonProducts(activeOnly = true): Promise<AddonProduct[]> {
    let query = db.select().from(addonProducts);
    
    if (activeOnly) {
      query = query.where(eq(addonProducts.isActive, true));
    }
    
    return await query.orderBy(addonProducts.name);
  }

  // Cart methods
  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if the item is already in the cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, cartItem.userId),
          eq(cartItems.productId, cartItem.productId)
        )
      );
    
    if (existingItem) {
      // Update quantity if it already exists
      const [updatedItem] = await db
        .update(cartItems)
        .set({
          quantity: existingItem.quantity + (cartItem.quantity || 1),
          updatedAt: new Date()
        })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      
      return updatedItem;
    }
    
    // Otherwise, create a new cart item
    const [newCartItem] = await db
      .insert(cartItems)
      .values({
        ...cartItem,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return newCartItem;
  }

  async getCartItem(id: number): Promise<CartItem | undefined> {
    const [item] = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.id, id));
    
    return item;
  }

  async updateCartItem(id: number, data: UpdateCartItem): Promise<CartItem | undefined> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(cartItems.id, id))
      .returning();
    
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    const result = await db
      .delete(cartItems)
      .where(eq(cartItems.id, id));
    
    return result.rowCount > 0;
  }

  async getUserCart(userId: number): Promise<CartItem[]> {
    return await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.userId, userId))
      .orderBy(desc(cartItems.createdAt));
  }

  async clearUserCart(userId: number): Promise<boolean> {
    const result = await db
      .delete(cartItems)
      .where(eq(cartItems.userId, userId));
    
    return result.rowCount > 0;
  }

  // Order methods
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    // Create the order
    const [newOrder] = await db
      .insert(orders)
      .values({
        ...order,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    // Create the order items
    for (const item of items) {
      await db
        .insert(orderItems)
        .values({
          ...item,
          orderId: newOrder.id,
          createdAt: new Date()
        });
    }
    
    return newOrder;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id));
    
    return order;
  }

  async updateOrder(id: number, data: UpdateOrder): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(orders.id, id))
      .returning();
    
    return updatedOrder;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  async listOrders(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Order[]> {
    let query = db.select().from(orders);
    
    if (filters) {
      const conditions = [];
      
      if (filters.status) {
        conditions.push(eq(orders.status, filters.status));
      }
      
      if (filters.startDate) {
        conditions.push(gte(orders.createdAt, filters.startDate));
      }
      
      if (filters.endDate) {
        conditions.push(lte(orders.createdAt, filters.endDate));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query.orderBy(desc(orders.createdAt));
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));
  }

  // Order Revision methods
  async createOrderRevision(revision: InsertOrderRevision): Promise<OrderRevision> {
    const [newRevision] = await db
      .insert(orderRevisions)
      .values({
        ...revision,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return newRevision;
  }

  async getOrderRevisions(orderId: number): Promise<OrderRevision[]> {
    return await db
      .select()
      .from(orderRevisions)
      .where(eq(orderRevisions.orderId, orderId))
      .orderBy(desc(orderRevisions.createdAt));
  }

  async updateOrderRevision(id: number, data: UpdateOrderRevision): Promise<OrderRevision | undefined> {
    const [updatedRevision] = await db
      .update(orderRevisions)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(orderRevisions.id, id))
      .returning();
    
    return updatedRevision;
  }
}

// Export the appropriate storage implementation based on database availability
export const storage = db ? new DatabaseStorage() : new MemStorage();
