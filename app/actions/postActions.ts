'use server';

import { revalidatePath } from 'next/cache';
import { postsDb } from '@/app/lib/db';

// Server Action: Create Post
export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) return;

  postsDb.push({
    id: Date.now().toString(),
    title,
    content,
  });

  // Purge cache to instantly refresh UI data
  revalidatePath('/posts-demo');
}

// Server Action: Delete Post
export async function deletePostAction(id: string) {
  const index = postsDb.findIndex((post) => post.id === id);
  if (index !== -1) {
    postsDb.splice(index, 1);
  }

  // Purge cache to instantly refresh UI data
  revalidatePath('/posts-demo');
}
