export interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: 'LATEST' | 'TUTORIAL' | 'ARCHITECTURE' | 'COMMUNITY' | 'PERFORMANCE';
  imageUrl?: string;
  authorImageUrl?: string;
}