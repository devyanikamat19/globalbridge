export interface BlogItem {
  id: string;
  title: string;
  content: string;
}

// In-memory data store for demonstration
export const postsDb: BlogItem[] = [
  { id: '1', title: 'Getting Started with Next.js 16', content: 'Exploring App Router features.' },
  { id: '2', title: 'Mastering Server Actions', content: 'Simplifying data mutations without fetch.' },
];
