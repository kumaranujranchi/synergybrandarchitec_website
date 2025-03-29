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
import { Search, Calendar, ArrowRight } from 'lucide-react';

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
  
  // Truncate text
  const truncate = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-[#FF6B00]/10 to-transparent pt-20 pb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Blog</h1>
            <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto mb-8">
              Insights, tips, and trends from the digital marketing world to help your business grow online.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90"
                onClick={() => setSearchTerm('')}
              >
                Search
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <Button
                variant={categoryFilter === null ? "default" : "outline"}
                onClick={() => setCategoryFilter(null)}
                className={categoryFilter === null ? "bg-[#FF6B00]" : ""}
              >
                All
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category as string}
                  variant={categoryFilter === category ? "default" : "outline"}
                  onClick={() => setCategoryFilter(category as string)}
                  className={categoryFilter === category ? "bg-[#FF6B00]" : ""}
                >
                  {category as string}
                </Button>
              ))}
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
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg">
                  {searchTerm 
                    ? `No posts found matching "${searchTerm}"` 
                    : categoryFilter
                      ? `No posts found in the "${categoryFilter}" category`
                      : "No blog posts available yet. Check back soon!"}
                </p>
                {(searchTerm || categoryFilter) && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter(null);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="flex flex-col h-full transition-all hover:shadow-lg">
                    <CardHeader>
                      {post.featuredImage && (
                        <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      )}
                      <CardTitle className="text-xl">
                        <Link href={`/blog/${post.slug}`} className="hover:text-[#FF6B00] transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(post.publishedAt)}
                        {post.category && (
                          <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge variant="secondary">{post.category}</Badge>
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600">{truncate(post.excerpt, 150)}</p>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" className="text-[#FF6B00] hover:text-[#FF6B00]/90 p-0 flex items-center">
                          Read more <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}