import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'wouter';
import { BlogPost } from '@shared/schema';
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
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, Clock, ArrowLeft, Share2 } from 'lucide-react';

// For displaying on the frontend
interface BlogPostDisplay extends Omit<BlogPost, 'publishedAt'> {
  publishedAt: string | null;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  
  // Fetch blog post
  const { data, isLoading, error } = useQuery<{ post: BlogPostDisplay }>({
    queryKey: [`/api/blog-posts/${slug}`],
    retry: false,
  });
  
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Calculate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };
  
  // Share functionality
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.post.title || 'Blog Post',
        text: data?.post.excerpt || '',
        url: window.location.href,
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying:', err));
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF6B00] mx-auto"></div>
            <p className="mt-4 text-lg">Loading blog post...</p>
          </div>
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    );
  }

  if (error || !data?.post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Blog Post Not Found</h1>
            <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog">
              <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    );
  }

  const post = data.post;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <article>
          {/* Hero section with featured image */}
          {post.featuredImage && (
            <div className="w-full h-[40vh] md:h-[50vh] relative">
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
                  <div className="flex flex-wrap justify-center gap-4 text-white/90">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {getReadingTime(post.content)}
                    </span>
                    {post.category && (
                      <Badge className="bg-[#FF6B00]">{post.category}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Blog content */}
          <div className="container mx-auto px-4 py-12">
            {/* If no featured image, show title here */}
            {!post.featuredImage && (
              <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {getReadingTime(post.content)}
                  </span>
                  {post.category && (
                    <Badge className="bg-[#FF6B00]">{post.category}</Badge>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <div className="lg:w-2/3">
                <Card>
                  <CardContent className="p-6 md:p-8">
                    {/* Blog post content - using dangerouslySetInnerHTML as content may contain HTML */}
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-[#0066CC] prose-a:text-[#FF6B00]"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2 items-center">
                          <Tag className="h-4 w-4 text-gray-500" />
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Share */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <Button variant="outline" onClick={sharePost} className="flex items-center">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share this article
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Navigation */}
                <div className="mt-8">
                  <Link href="/blog">
                    <Button variant="outline" className="flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Blog
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Need digital marketing help?</CardTitle>
                    <CardDescription>
                      Synergy Brand Architect provides expert digital marketing solutions to help your business grow online.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="bg-[#FF6B00]/10 p-1 rounded mr-2 mt-0.5">
                          <svg className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Comprehensive digital marketing strategy</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FF6B00]/10 p-1 rounded mr-2 mt-0.5">
                          <svg className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>SEO optimization and content marketing</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FF6B00]/10 p-1 rounded mr-2 mt-0.5">
                          <svg className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Social media management and advertising</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FF6B00]/10 p-1 rounded mr-2 mt-0.5">
                          <svg className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Custom website design and development</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/#contact" className="w-full">
                      <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90">
                        Get in Touch
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}