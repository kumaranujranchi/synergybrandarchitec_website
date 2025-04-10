import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';

export default function VisitorCounter() {
  const { data, isError } = useQuery({
    queryKey: ['/api/visitor-count'],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

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