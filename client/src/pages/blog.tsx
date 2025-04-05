import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsappButton from '@/components/whatsapp-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@shared/schema';
import { Search, Calendar, ArrowRight, Eye, Calendar as CalendarIcon, Clock } from 'lucide-react';

// For displaying on the frontend
interface BlogPostDisplay extends Omit<BlogPost, 'publishedAt'> {
  publishedAt: string | null;
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Fetch blog posts
  const { data, isLoading, error } = useQuery<{ posts: BlogPostDisplay[] }>({
    queryKey: ['/api/blog-posts'],
    retry: false,
  });
  
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Extract unique categories
  const categories = data?.posts
    ? Array.from(new Set(data.posts.map(post => post.category).filter(Boolean)))
    : [];
  
  // Filter posts based on search and category
  const filteredPosts = data?.posts
    ? data.posts.filter(post => {
        const matchesSearch = searchTerm === '' || 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = categoryFilter === null || post.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
      })
    : [];
  
  // Get featured posts (first 2)
  const featuredPosts = filteredPosts.slice(0, 2);
  
  // Get remaining posts
  const remainingPosts = filteredPosts.slice(2);
  
  // Truncate text
  const truncate = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };
  
  // Calculate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-slate-50 pt-8 md:pt-16">
        {/* Hero Section with Featured Content Slider */}
        {featuredPosts.length > 0 && (
          <section className="relative bg-gray-100 overflow-hidden">
            <div className="relative w-full h-[70vh] md:h-[80vh]">
              {featuredPosts[0]?.featuredImage ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={featuredPosts[0].featuredImage}
                    alt={featuredPosts[0].title}
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC] to-[#FF6B00]"></div>
              )}
              
              <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
                <div className="max-w-3xl text-white">
                  {/* Added top spacing for mobile devices */}
                  <div className="mt-16 md:mt-0">
                    {/* Mobile-friendly metadata with flex-wrap */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
                      {featuredPosts[0]?.category && (
                        <Badge className="bg-[#FF6B00]">{featuredPosts[0].category}</Badge>
                      )}
                      <span className="text-white/80 text-sm flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {formatDate(featuredPosts[0]?.publishedAt)}
                      </span>
                      <span className="text-white/80 text-sm flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredPosts[0] ? getReadingTime(featuredPosts[0].content) : ''}
                      </span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    {featuredPosts[0]?.title}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/80 mb-6">
                    {truncate(featuredPosts[0]?.excerpt || '', 200)}
                  </p>
                  
                  <Link href={`/blog/${featuredPosts[0]?.slug}`}>
                    <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">
                      Read More
                    </Button>
                  </Link>
                </div>
                
                {/* Navigation dots */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-white"></span>
                  <span className="w-3 h-3 rounded-full bg-white/40"></span>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Search and Filters Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 w-full md:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-10 py-2 rounded-full border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={categoryFilter === null ? "default" : "outline"}
                  onClick={() => setCategoryFilter(null)}
                  className={`rounded-full px-5 py-2 ${categoryFilter === null ? "bg-[#FF6B00]" : ""}`}
                >
                  All
                </Button>
                
                {categories.map((category) => (
                  <Button
                    key={category as string}
                    variant={categoryFilter === category ? "default" : "outline"}
                    onClick={() => setCategoryFilter(category as string)}
                    className={`rounded-full px-5 py-2 ${categoryFilter === category ? "bg-[#FF6B00]" : ""}`}
                  >
                    {category as string}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  className="rounded-full px-5 py-2"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="mb-12">
                <h2 className="text-3xl font-bold relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-[#FF6B00] after:left-0 after:bottom-0 pb-2">
                  Featured Articles
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {featuredPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-80 overflow-hidden">
                      {post.featuredImage ? (
                        <img 
                          src={post.featuredImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        {/* Mobile-friendly metadata with flex-wrap */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                          {post.category && (
                            <Badge className="bg-[#FF6B00] text-white">{post.category}</Badge>
                          )}
                          <span className="text-sm opacity-90 flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="text-sm opacity-90 flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {Math.floor(Math.random() * 500) + 100} Views
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-[#FF6B00] transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-white/80 line-clamp-2 mb-4">{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`}>
                          <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* All Blog Posts Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-[#FF6B00] after:left-0 after:bottom-0 pb-2">
                Latest Articles
              </h2>
            </div>
            
            {/* Blog posts grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF6B00] mx-auto"></div>
                <p className="mt-4 text-lg">Loading blog posts...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">Failed to load blog posts. Please try again later.</p>
              </div>
            ) : (remainingPosts.length === 0 && featuredPosts.length === 0) ? (
              <div className="text-center py-12">
                <p className="text-lg">
                  {searchTerm 
                    ? `No posts found matching "${searchTerm}"` 
                    : categoryFilter
                      ? `No posts found in the "${categoryFilter}" category`
                      : "No blog posts available yet. Check back soon!"}
                </p>
              </div>
            ) : remainingPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg">No additional posts available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {remainingPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0">
                    {post.featuredImage && (
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      {/* Mobile-friendly metadata with flex-wrap */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {formatDate(post.publishedAt)}
                        </span>
                        {post.category && (
                          <Badge variant="outline">{post.category}</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl hover:text-[#FF6B00] transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{truncate(post.excerpt, 120)}</p>
                      <Link href={`/blog/${post.slug}`}>
                        <Button className="bg-transparent hover:bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00] hover:border-[#FF6B00]/80 px-5 py-2 rounded-full">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination - can be implemented for larger sites */}
            {filteredPosts.length > 6 && (
              <div className="mt-16 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-full">1</Button>
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-full">2</Button>
                  <Button className="w-10 h-10 p-0 rounded-full bg-[#FF6B00]">3</Button>
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-full">4</Button>
                  <span className="mx-2">...</span>
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-full">10</Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF9F4D] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-white/80 mb-8">Stay updated with the latest marketing trends, tips, and news delivered directly to your inbox.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/10 text-white placeholder:text-white/60 border-white/20 focus:border-white"
                />
                <Button className="bg-white text-[#FF6B00] hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}