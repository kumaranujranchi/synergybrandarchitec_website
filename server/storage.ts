import { 
  User, InsertUser, UpdateUser,
  Submission, InsertSubmission, UpdateSubmission,
  Note, InsertNote, AuditLog,
  BlogPost, InsertBlogPost, UpdateBlogPost
} from "@shared/schema";
import bcrypt from "bcrypt";

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
  private lastUserId: number;
  private lastSubmissionId: number;
  private lastNoteId: number;
  private lastAuditLogId: number;
  private lastBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    this.notes = new Map();
    this.auditLogs = new Map();
    this.blogPosts = new Map();
    this.lastUserId = 0;
    this.lastSubmissionId = 0;
    this.lastNoteId = 0;
    this.lastAuditLogId = 0;
    this.lastBlogPostId = 0;
    
    // Create initial admin user
    this.createInitialAdmin();
    
    // Initialize the blog posts
    this.initializeInitialBlogPosts();
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
        featuredImage: "/assets/image_1743250132020.png",
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
        featuredImage: "/assets/image_1743250219807.png",
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
        featuredImage: "/assets/image_1743250716065.png",
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
      password: hashedPassword,
      role: userData.role || 'user',
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
        featuredImage: "/assets/image_1743250132020.png",
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
        featuredImage: "/assets/image_1743250219807.png",
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
        featuredImage: "/assets/image_1743250716065.png",
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
  
  async listBlogPosts(filters?: { status?: string; category?: string }): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (filters) {
      if (filters.status) {
        posts = posts.filter(p => p.status === filters.status);
      }
      
      if (filters.category) {
        posts = posts.filter(p => p.category === filters.category);
      }
    }
    
    // Sort by newest first
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Audit logs
  async logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void> {
    const id = ++this.lastAuditLogId;
    
    const auditLog: AuditLog = {
      id,
      userId: log.userId,
      action: log.action,
      details: log.details || null,
      ipAddress: log.ipAddress || null,
      userAgent: log.userAgent || null,
      createdAt: new Date()
    };
    
    this.auditLogs.set(id, auditLog);
  }
}

// Create and export a singleton instance
export const storage = new MemStorage();