import { NextResponse } from 'next/server';
import { applicationsDb } from '@/lib/db';

export async function GET() {
  return NextResponse.json({ success: true, data: applicationsDb }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { university, program } = body;
    
    if (!university || !program) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    const newApp = {
      id: Date.now().toString(),
      university,
      program,
      status: 'Draft' as const,
      deadline: 'TBD',
      progress: 10
    };
    
    applicationsDb.push(newApp);
    
    return NextResponse.json({ success: true, data: newApp }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create application' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const index = applicationsDb.findIndex((app) => app.id === body.id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }

    applicationsDb[index] = { ...applicationsDb[index], ...body };
    return NextResponse.json({ success: true, data: applicationsDb[index] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const index = applicationsDb.findIndex((app) => app.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }

    applicationsDb.splice(index, 1);
    return NextResponse.json({ success: true, message: 'Application deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete application' }, { status: 500 });
  }
}
