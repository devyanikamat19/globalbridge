import { NextResponse } from 'next/server';
import { postsDb } from '@/app/lib/db';

// GET: Fetch all posts
export async function GET() {
  return NextResponse.json({ success: true, data: postsDb }, { status: 200 });
}

// POST: Add a new post via API
export async function POST(request: Request) {
  const body = await request.json();
  const newPost = {
    id: Date.now().toString(),
    title: body.title || 'Untitled Post',
    content: body.content || 'No content provided.',
  };
  postsDb.push(newPost);
  return NextResponse.json({ success: true, data: newPost }, { status: 201 });
}

// PUT: Update an existing post
export async function PUT(request: Request) {
  const body = await request.json();
  const index = postsDb.findIndex((post) => post.id === body.id);

  if (index === -1) {
    return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
  }

  postsDb[index] = { ...postsDb[index], title: body.title, content: body.content };
  return NextResponse.json({ success: true, data: postsDb[index] }, { status: 200 });
}

// DELETE: Remove a post
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const index = postsDb.findIndex((post) => post.id === id);
  if (index === -1) {
    return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
  }

  postsDb.splice(index, 1);
  return NextResponse.json({ success: true, message: 'Post deleted' }, { status: 200 });
}
