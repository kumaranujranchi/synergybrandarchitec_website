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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  User, 
  Tag, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon,
  Calendar as CalendarIcon,
  Eye,
  MessageCircle
} from 'lucide-react';

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
  
  // Related posts simulation - would be better with proper API
  const { data: allPostsData } = useQuery<{ posts: BlogPostDisplay[] }>({
    queryKey: ['/api/blog-posts'],
    retry: false,
  });
  
  // Get related posts (excluding current post, limit to 2)
  const relatedPosts = allPostsData?.posts
    ?.filter(p => p.id !== data?.post?.id)
    ?.slice(0, 2) || [];
  
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
  
  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Error copying:', err));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-slate-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF6B00] mx-auto"></div>
              <p className="mt-4 text-lg">Loading blog post...</p>
            </div>
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
        <main className="flex-grow bg-slate-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-20 bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-2xl font-bold text-red-500 mb-4">Blog Post Not Found</h1>
              <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
              <Link href="/blog">
                <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 rounded-full px-6">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
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
      
      <main className="flex-grow bg-slate-50 pt-8 md:pt-16">
        <article>
          {/* Hero section with featured image */}
          <div className="w-full h-[40vh] md:h-[60vh] relative">
            {post.featuredImage ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC] to-[#FF6B00]"></div>
            )}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl text-white">
                  <div className="flex items-center gap-3 mb-4">
                    {post.category && (
                      <Badge className="bg-[#FF6B00]">{post.category}</Badge>
                    )}
                    <span className="text-white/80 text-sm flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="text-white/80 text-sm flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {getReadingTime(post.content)}
                    </span>
                    <span className="text-white/80 text-sm flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {Math.floor(Math.random() * 500) + 100} Views
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>
                  
                  <p className="text-lg md:text-xl text-white/80 mb-6">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog content */}
          <div className="container mx-auto px-4 py-12 -mt-16 relative z-30">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left sidebar - Social sharing */}
              <div className="lg:w-1/12 hidden lg:block">
                <div className="sticky top-24 flex flex-col items-center gap-4">
                  <div className="py-4 text-gray-500 text-sm font-medium">SHARE</div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="w-10 h-10 rounded-full border-gray-300 hover:border-[#FF6B00] hover:text-[#FF6B00]"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="w-10 h-10 rounded-full border-gray-300 hover:border-[#FF6B00] hover:text-[#FF6B00]"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(post.title)}`, '_blank')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="w-10 h-10 rounded-full border-gray-300 hover:border-[#FF6B00] hover:text-[#FF6B00]"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="w-10 h-10 rounded-full border-gray-300 hover:border-[#FF6B00] hover:text-[#FF6B00]"
                    onClick={copyLink}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex flex-col items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium">{Math.floor(Math.random() * 10)}</span>
                  </div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="lg:w-7/12">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 md:p-10">
                    {/* Blog post content - using dangerouslySetInnerHTML as content may contain HTML */}
                    <div 
                      className="blog-content prose prose-lg max-w-none prose-headings:text-[#0066CC] prose-a:text-[#FF6B00]"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-10 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="font-medium text-gray-700">Tags:</span>
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="rounded-full px-3 py-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Mobile sharing buttons */}
                    <div className="flex lg:hidden justify-center gap-3 mt-10 pt-6 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-10 h-10 rounded-full"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-10 h-10 rounded-full"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(post.title)}`, '_blank')}
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-10 h-10 rounded-full"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-10 h-10 rounded-full"
                        onClick={copyLink}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Author bio */}
                    <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-gray-50 p-6 rounded-lg">
                      <div className="w-16 h-16 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] font-bold text-xl">
                        SBA
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-lg mb-1">Synergy Brand Architect</h3>
                        <p className="text-gray-600 mb-2">Digital Marketing Experts</p>
                        <p className="text-sm text-gray-500">
                          We help businesses grow with strategic digital marketing solutions. Our team specializes in branding, SEO, social media, and content marketing.
                        </p>
                      </div>
                    </div>
                    
                    {/* Navigation */}
                    <div className="mt-8">
                      <Link href="/blog">
                        <Button className="rounded-full bg-transparent hover:bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Blog
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Related Posts - Mobile Only */}
                {relatedPosts.length > 0 && (
                  <div className="mt-8 lg:hidden">
                    <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                    <div className="grid grid-cols-1 gap-6">
                      {relatedPosts.map(relatedPost => (
                        <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          {relatedPost.featuredImage && (
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={relatedPost.featuredImage} 
                                alt={relatedPost.title} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <span className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {formatDate(relatedPost.publishedAt)}
                              </span>
                            </div>
                            <CardTitle className="text-lg hover:text-[#FF6B00] transition-colors">
                              <Link href={`/blog/${relatedPost.slug}`}>
                                {relatedPost.title}
                              </Link>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Link href={`/blog/${relatedPost.slug}`}>
                              <Button className="bg-transparent hover:bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00] hover:border-[#FF6B00]/80 px-5 py-2 rounded-full">
                                Read Article
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right sidebar */}
              <div className="lg:w-4/12">
                {/* Call to action */}
                <Card className="border-0 shadow-lg overflow-hidden mb-8">
                  <div className="h-3 bg-gradient-to-r from-[#FF6B00] to-[#FF9F4D]"></div>
                  <CardHeader>
                    <CardTitle className="text-2xl">Need digital marketing help?</CardTitle>
                    <CardDescription>
                      Synergy Brand Architect provides expert digital marketing solutions to help your business grow online.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Strategic branding and positioning</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>SEO optimization and content marketing</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Social media management and advertising</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Custom website design and development</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t p-6">
                    <Link href="/#contact" className="w-full">
                      <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 rounded-full">
                        Get in Touch
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Related posts - desktop only */}
                {relatedPosts.length > 0 && (
                  <div className="hidden lg:block">
                    <h3 className="text-xl font-bold mb-6 relative after:absolute after:w-12 after:h-1 after:bg-[#FF6B00] after:left-0 after:-bottom-2">
                      Related Articles
                    </h3>
                    <div className="space-y-6 mt-8">
                      {relatedPosts.map(relatedPost => (
                        <div key={relatedPost.id} className="flex gap-4 group">
                          {relatedPost.featuredImage ? (
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={relatedPost.featuredImage} 
                                alt={relatedPost.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
                          )}
                          <div>
                            <div className="text-sm text-gray-500 mb-1 flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {formatDate(relatedPost.publishedAt)}
                            </div>
                            <h4 className="font-bold text-gray-800 group-hover:text-[#FF6B00] transition-colors">
                              <Link href={`/blog/${relatedPost.slug}`}>
                                {relatedPost.title}
                              </Link>
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Newsletter subscription */}
                <Card className="border-0 shadow-lg mt-8 bg-gradient-to-br from-[#0066CC]/90 to-[#0066CC] text-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Subscribe to Our Newsletter</CardTitle>
                    <CardDescription className="text-white/80">
                      Get the latest marketing insights delivered to your inbox.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Input
                        placeholder="Your email address"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <Button className="w-full bg-white text-[#0066CC] hover:bg-white/90 rounded-full">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
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