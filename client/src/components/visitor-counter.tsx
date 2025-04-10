import { useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';

interface VisitorCountResponse {
  count: number;
}

export default function VisitorCounter() {
  // Define the query with the proper response type
  const { data, isError } = useQuery<VisitorCountResponse>({
    queryKey: ['/api/visitor-count'],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: async () => {
      const response = await fetch('/api/visitor-count');
      if (!response.ok) {
        throw new Error('Failed to fetch visitor count');
      }
      return response.json();
    }
  });

  // Use a fallback of 0 if data is not available
  const visitorCount = data?.count || 0;

  if (isError) {
    return null;
  }

  return (
    <div className="flex items-center text-gray-400 text-sm">
      <Users size={16} className="mr-2" />
      <span>{visitorCount.toLocaleString()} Visitors</span>
    </div>
  );
}