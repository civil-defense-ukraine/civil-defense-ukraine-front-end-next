// app/news/[newsId]/page.tsx
'use client';

import { useParams, notFound } from 'next/navigation';
import NewsArticle from '@/components/pages/NewsArticle/NewsArticle';

const SingleNewsPage = () => {
  const { newsId } = useParams();

  if (!newsId) {
    notFound();  // Trigger a 404 page
    return null;  // Optional: You can return null as a fallback, though not necessary
  }

  return <NewsArticle newsId={newsId as string} />;
};

export default SingleNewsPage;
