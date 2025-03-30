import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { BlogPost } from '@shared/schema';
import AdminLayout from '@/components/admin/layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Save, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import RichTextEditor from '@/components/admin/rich-text-editor';

// Form schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  slug: z.string()
    .min(3, { message: 'Slug must be at least 3 characters' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: 'Slug must contain only lowercase letters, numbers, and hyphens' 
    }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters' }),
  category: z.string().optional(),
  tags: z.array(z.string().optional()).optional(),
  featuredImage: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BlogPostForm() {
  const [location, setLocation] = useLocation();
  const params = useParams();
  const id = params.id ? parseInt(params.id) : null;
  const isEditMode = !!id;
  const queryClient = useQueryClient();
  const [contentValue, setContentValue] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const editorRef = useRef<any>(null);
  
  // Fetch blog post if in edit mode
  const { data: postData, isLoading: isLoadingPost } = useQuery<{post: BlogPost}>({
    queryKey: ['/api/admin/blog-posts', id],
    enabled: isEditMode,
  });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      featuredImage: '',
      status: 'draft',
      metaTitle: '',
      metaDescription: '',
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest('POST', '/api/admin/blog-posts', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog-posts'] });
      toast({
        title: 'Success',
        description: 'Blog post created successfully',
      });
      setLocation('/admin/blog-posts');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create blog post',
        variant: 'destructive',
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest('PATCH', `/api/admin/blog-posts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog-posts', id] });
      toast({
        title: 'Success',
        description: 'Blog post updated successfully',
      });
      setLocation('/admin/blog-posts');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update blog post',
        variant: 'destructive',
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('DELETE', `/api/admin/blog-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog-posts'] });
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });
      setLocation('/admin/blog-posts');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete blog post',
        variant: 'destructive',
      });
    },
  });

  // Update form values when post data is loaded
  useEffect(() => {
    if (postData?.post) {
      const post = postData.post;
      // First set content value to ensure the rich text editor updates
      setContentValue(post.content);
      
      // Then reset the form with all values from the post
      form.reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category || '',
        tags: post.tags || [],
        featuredImage: post.featuredImage || '',
        status: post.status,
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
      });
    }
  }, [postData, form]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle title change to generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    
    // Only auto-generate slug if it's a new post or the slug hasn't been manually edited
    if (!isEditMode || form.getValues('slug') === '') {
      const slug = generateSlug(title);
      form.setValue('slug', slug);
    }
  };

  // Handle rich text editor change
  const handleEditorChange = (value: string) => {
    setContentValue(value);
    form.setValue('content', value);
  };

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    values.content = contentValue; // Ensure we use the content from the rich text editor
    if (isEditMode) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  // Handle tag changes - convert comma-separated string to array
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    form.setValue('tags', tagsArray);
  };

  // Loading state
  if (isEditMode && isLoadingPost) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
          <span className="ml-2">Loading post data...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2"
              onClick={() => setLocation('/admin/blog-posts')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">
              {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
          </div>
          
          {isEditMode && (
            <Button 
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleteMutation.isPending}
            >
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
          )}
        </div>

        {showDeleteConfirm && (
          <Alert className="mb-6 border-red-600">
            <AlertTitle className="text-red-600">Are you sure you want to delete this post?</AlertTitle>
            <AlertDescription>
              This action cannot be undone. The post will be permanently deleted.
              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="destructive" 
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending && (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  )}
                  Confirm Delete
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
            <CardDescription>
              Fill in the details to {isEditMode ? 'update' : 'create'} your blog post.
              Fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic information */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              onChange={handleTitleChange} 
                              placeholder="Enter blog post title" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="my-blog-post-url" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-medium">Content</h3>
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt *</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Brief summary of the blog post" 
                              className="min-h-[80px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem className="space-y-2">
                      <FormLabel>Content *</FormLabel>
                      <RichTextEditor
                        ref={editorRef}
                        value={contentValue}
                        onChange={handleEditorChange}
                        placeholder="Write your blog post content here..."
                      />
                      {form.formState.errors.content && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.content.message}
                        </p>
                      )}
                    </FormItem>
                  </div>
                  
                  {/* Categorization */}
                  <div className="space-y-4 md:col-span-1">
                    <h3 className="text-lg font-medium">Categorization</h3>
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="e.g. Digital Marketing" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                      <FormLabel>Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. seo, social media, content"
                          defaultValue={form.getValues('tags')?.join(', ') || ''}
                          onChange={handleTagsChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  
                  {/* Media */}
                  <div className="space-y-4 md:col-span-1">
                    <h3 className="text-lg font-medium">Media</h3>
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image URL</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="https://example.com/image.jpg" 
                            />
                          </FormControl>
                          <FormMessage />
                          {field.value && (
                            <div className="mt-2 rounded-md overflow-hidden border">
                              <img
                                src={field.value}
                                alt="Preview"
                                className="w-full h-32 object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x150?text=Invalid+Image+URL";
                                }}
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* SEO */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-medium">SEO</h3>
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="SEO-optimized title (defaults to post title if empty)" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="SEO-optimized description (defaults to excerpt if empty)" 
                              className="min-h-[80px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLocation('/admin/blog-posts')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[#FF6B00] hover:bg-[#FF6B00]/90"
                    disabled={
                      createMutation.isPending || 
                      updateMutation.isPending || 
                      deleteMutation.isPending
                    }
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    <Save className="h-4 w-4 mr-2" />
                    {isEditMode ? 'Update Post' : 'Create Post'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}