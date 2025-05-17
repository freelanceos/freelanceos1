import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  reviews, type Review, type InsertReview,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getBestsellerProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Review operations
  getReviewsByProduct(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Order operations
  getOrders(): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Order Item operations
  getOrderItemsByOrder(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  
  private userCurrentId: number;
  private categoryCurrentId: number;
  private productCurrentId: number;
  private reviewCurrentId: number;
  private orderCurrentId: number;
  private orderItemCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.productCurrentId = 1;
    this.reviewCurrentId = 1;
    this.orderCurrentId = 1;
    this.orderItemCurrentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
  }
  
  async getBestsellerProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isBestseller,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id, rating: 0, reviewCount: 0 };
    this.products.set(id, product);
    return product;
  }
  
  // Review operations
  async getReviewsByProduct(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId,
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewCurrentId++;
    const review: Review = { ...insertReview, id, createdAt: new Date() };
    this.reviews.set(id, review);
    
    // Update product rating
    const product = this.products.get(insertReview.productId);
    if (product) {
      const productReviews = await this.getReviewsByProduct(product.id);
      const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / productReviews.length;
      
      this.products.set(product.id, {
        ...product,
        rating: averageRating,
        reviewCount: productReviews.length
      });
    }
    
    return review;
  }
  
  // Order operations
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const now = new Date();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = {
      ...order,
      status,
      updatedAt: new Date()
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Order Item operations
  async getOrderItemsByOrder(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId,
    );
  }
  
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemCurrentId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Initialize data
  private initializeData() {
    // Create a demo user
    const user: User = {
      id: this.userCurrentId++,
      username: 'demo',
      password: 'demo123',
      email: 'demo@example.com',
      fullName: 'مستخدم تجريبي'
    };
    this.users.set(user.id, user);

    // Create categories
    const programmingCategory: Category = {
      id: this.categoryCurrentId++,
      name: 'كتب البرمجة والتطوير',
      slug: 'programming',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'اكتشف مجموعة متنوعة من الكتب التي ستساعدك على تعلم لغات البرمجة المختلفة وتقنيات التطوير الحديثة.'
    };
    
    const designCategory: Category = {
      id: this.categoryCurrentId++,
      name: 'قوالب التصميم',
      slug: 'design-templates',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
      description: 'قوالب احترافية جاهزة للاستخدام لمواقع الويب وتطبيقات الهاتف والوسائط الاجتماعية لتبدأ مشاريعك بسرعة.'
    };
    
    const learningCategory: Category = {
      id: this.categoryCurrentId++,
      name: 'موارد التعلم',
      slug: 'learning-resources',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
      description: 'دورات تدريبية وموارد تعليمية شاملة لتطوير مهاراتك في مختلف مجالات التقنية والإبداع.'
    };
    
    this.categories.set(programmingCategory.id, programmingCategory);
    this.categories.set(designCategory.id, designCategory);
    this.categories.set(learningCategory.id, learningCategory);

    // Create products
    const products = [
      // Programming eBooks
      {
        name: 'تعلم جافاسكريبت من الصفر إلى الاحتراف',
        slug: 'javascript-from-zero-to-hero',
        description: 'دليل شامل لتعلم لغة جافاسكريبت، من المبادئ الأساسية إلى المفاهيم المتقدمة. مثالي للمبتدئين والمطورين الذين يرغبون في تحسين مهاراتهم.',
        price: 89,
        imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
        categoryId: programmingCategory.id,
        type: 'ebook',
        rating: 4.5,
        reviewCount: 120,
        isBestseller: false,
        isFeatured: true
      },
      {
        name: 'بايثون للمبتدئين - دليل شامل',
        slug: 'python-for-beginners',
        description: 'تعلم أساسيات لغة بايثون بطريقة سهلة وبسيطة. يغطي هذا الكتاب جميع المفاهيم الأساسية مع أمثلة عملية وتطبيقات.',
        price: 99,
        imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
        categoryId: programmingCategory.id,
        type: 'ebook',
        rating: 5,
        reviewCount: 215,
        isBestseller: true,
        isFeatured: false
      },
      {
        name: 'أساسيات تصميم واجهات المستخدم',
        slug: 'ui-design-basics',
        description: 'دليل شامل لفهم أساسيات تصميم واجهات المستخدم وتطبيق أفضل الممارسات في مشاريعك.',
        price: 119,
        imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
        categoryId: programmingCategory.id,
        type: 'ebook',
        rating: 4,
        reviewCount: 56,
        isBestseller: false,
        isFeatured: true
      },
      {
        name: 'احتراف تصميم مواقع الويب في 2023',
        slug: 'web-design-mastery-2023',
        description: 'تعلم أحدث تقنيات وأدوات تصميم مواقع الويب. دليل شامل للمصممين والمطورين.',
        price: 129,
        imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
        categoryId: programmingCategory.id,
        type: 'ebook',
        rating: 4.5,
        reviewCount: 187,
        isBestseller: true,
        isFeatured: false
      },
      {
        name: 'تطوير تطبيقات الجوال باستخدام React Native',
        slug: 'react-native-mobile-development',
        description: 'دليل عملي لبناء تطبيقات جوال احترافية باستخدام إطار عمل React Native. يشمل مشاريع عملية وأمثلة.',
        price: 149,
        imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
        categoryId: programmingCategory.id,
        type: 'ebook',
        rating: 4,
        reviewCount: 98,
        isBestseller: true,
        isFeatured: false
      },
      {
        name: 'دليل شامل للتسويق الرقمي',
        slug: 'digital-marketing-guide',
        description: 'كل ما تحتاج معرفته عن التسويق الرقمي، من وسائل التواصل الاجتماعي إلى تحسين محركات البحث.',
        price: 109,
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        categoryId: programmingCategory.id,
        type: 'ebook',
        rating: 4.2,
        reviewCount: 76,
        isBestseller: false,
        isFeatured: false
      },
      
      // Design Templates
      {
        name: 'قالب متجر إلكتروني احترافي',
        slug: 'professional-ecommerce-template',
        description: 'قالب احترافي متكامل لبناء متجر إلكتروني متميز. سهل التخصيص ومتوافق مع جميع الأجهزة.',
        price: 149,
        imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d',
        categoryId: designCategory.id,
        type: 'template',
        rating: 5,
        reviewCount: 87,
        isBestseller: false,
        isFeatured: true
      },
      {
        name: 'حزمة قوالب تطبيقات الجوال',
        slug: 'mobile-app-template-bundle',
        description: 'مجموعة من قوالب واجهات المستخدم لتطبيقات الجوال. تشمل أكثر من 50 شاشة بتصميم حديث.',
        price: 199,
        imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
        categoryId: designCategory.id,
        type: 'template',
        rating: 3.5,
        reviewCount: 42,
        isBestseller: false,
        isFeatured: true
      },
      {
        name: 'حزمة قوالب وسائل التواصل الاجتماعي',
        slug: 'social-media-template-kit',
        description: 'أكثر من 100 قالب لمنشورات وسائل التواصل الاجتماعي. مثالية للعلامات التجارية والمسوقين.',
        price: 79,
        imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
        categoryId: designCategory.id,
        type: 'template',
        rating: 5,
        reviewCount: 163,
        isBestseller: true,
        isFeatured: false
      },
      {
        name: 'قوالب عروض تقديمية احترافية',
        slug: 'professional-presentation-templates',
        description: 'مجموعة من قوالب العروض التقديمية بتصميم احترافي وحديث. مناسبة للأعمال والتعليم.',
        price: 69,
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
        categoryId: designCategory.id,
        type: 'template',
        rating: 4.2,
        reviewCount: 58,
        isBestseller: false,
        isFeatured: false
      },
      {
        name: 'قوالب واجهات مواقع الويب',
        slug: 'website-ui-templates',
        description: 'مجموعة متكاملة من قوالب واجهات المستخدم لمواقع الويب المختلفة. تشمل 10 تصاميم مختلفة.',
        price: 129,
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
        categoryId: designCategory.id,
        type: 'template',
        rating: 4.7,
        reviewCount: 92,
        isBestseller: false,
        isFeatured: false
      },
      {
        name: 'حزمة أيقونات مميزة للمصممين',
        slug: 'premium-icon-pack-designers',
        description: 'أكثر من 2000 أيقونة بجودة عالية وبأنماط مختلفة. مثالية للمصممين ومطوري الويب.',
        price: 59,
        imageUrl: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
        categoryId: designCategory.id,
        type: 'template',
        rating: 4.5,
        reviewCount: 47,
        isBestseller: false,
        isFeatured: false
      },
      
      // Learning Resources
      {
        name: 'دورة تدريبية شاملة في تطوير الويب',
        slug: 'comprehensive-web-development-course',
        description: 'دورة تدريبية متكاملة تغطي جميع جوانب تطوير الويب من HTML/CSS إلى JavaScript وإطارات العمل الحديثة.',
        price: 249,
        imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
        categoryId: learningCategory.id,
        type: 'ebook',
        rating: 4.8,
        reviewCount: 132,
        isBestseller: false,
        isFeatured: false
      },
      {
        name: 'دليل احتراف التصميم الجرافيكي',
        slug: 'graphic-design-mastery-guide',
        description: 'دليل شامل لاحتراف التصميم الجرافيكي بجميع أدواته وتقنياته. يشمل تدريبات عملية ومشاريع.',
        price: 179,
        imageUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
        categoryId: learningCategory.id,
        type: 'ebook',
        rating: 4.4,
        reviewCount: 85,
        isBestseller: false,
        isFeatured: false
      },
      {
        name: 'أساسيات الذكاء الاصطناعي وتعلم الآلة',
        slug: 'ai-machine-learning-basics',
        description: 'كتاب شامل يشرح أساسيات الذكاء الاصطناعي وتعلم الآلة بطريقة مبسطة مع أمثلة عملية.',
        price: 159,
        imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
        categoryId: learningCategory.id,
        type: 'ebook',
        rating: 4.6,
        reviewCount: 63,
        isBestseller: false,
        isFeatured: false
      },
      {
        name: 'تصميم تجربة المستخدم: من المبادئ إلى التطبيق',
        slug: 'ux-design-principles-to-application',
        description: 'كتاب متقدم في تصميم تجربة المستخدم، يشرح المبادئ والأسس ويقدم تطبيقات عملية.',
        price: 139,
        imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c',
        categoryId: learningCategory.id,
        type: 'ebook',
        rating: 4.9,
        reviewCount: 78,
        isBestseller: false,
        isFeatured: false
      }
    ];

    // Add products to the store
    products.forEach(product => {
      const id = this.productCurrentId++;
      this.products.set(id, { ...product, id });
    });

    // Create sample reviews
    const reviews = [
      {
        userId: user.id,
        productId: 1,
        rating: 5,
        comment: "كتاب تعلم جافاسكريبت من الصفر إلى الاحتراف هو أفضل استثمار قمت به لتطوير مهاراتي. الشرح واضح والأمثلة عملية، وساعدني في الحصول على وظيفة جديدة!"
      },
      {
        userId: user.id,
        productId: 7,
        rating: 4,
        comment: "قالب متجر إلكتروني احترافي كان نقطة انطلاق مثالية لمشروعي. سهل التخصيص، واحترافي، وسريع. تمكنت من إطلاق متجري خلال أسبوع فقط بفضل هذا القالب الرائع!"
      },
      {
        userId: user.id,
        productId: 9,
        rating: 5,
        comment: "قوالب وسائل التواصل الاجتماعي وفرت علي الكثير من الوقت والجهد. التصميمات عصرية واحترافية، وسهلة التخصيص. أنصح بها لكل مصمم ومسوق رقمي!"
      }
    ];

    // Add reviews to the store
    reviews.forEach(review => {
      const id = this.reviewCurrentId++;
      this.reviews.set(id, { ...review, id, createdAt: new Date() });
    });
  }
}

export const storage = new MemStorage();
