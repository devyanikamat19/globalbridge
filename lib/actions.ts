'use server';

import { revalidatePath } from 'next/cache';
import { applicationsDb } from '@/lib/db';
import { Application } from '@/lib/types';

// Server Action: Create Application
export async function createApplicationAction(formData: FormData) {
  const university = formData.get('university') as string;
  const program = formData.get('program') as string;
  
  if (!university || !program) return;
  
  const newApp: Application = {
    id: Date.now().toString(), // Simple random ID for the in-memory array
    university,
    program,
    status: 'Draft',
    deadline: 'TBD',
    progress: 10
  };

  applicationsDb.push(newApp);
  
  // Purge cache to instantly refresh UI data (Zero Fetch Boilerplate)
  revalidatePath('/dashboard');
}

// Server Action: Delete Application
export async function deleteApplicationAction(id: string) {
  const index = applicationsDb.findIndex((app) => app.id === id);
  if (index !== -1) {
    applicationsDb.splice(index, 1);
  }
  
  revalidatePath('/dashboard');
}

// Server Action: Advance Status
export async function advanceApplicationStatusAction(id: string, currentStatus: string) {
  const statuses = ['Draft', 'Submitted', 'Interview', 'Offer'];
  const currentIndex = statuses.indexOf(currentStatus);
  
  if (currentIndex === -1 || currentIndex === statuses.length - 1) return;
  
  const nextStatus = statuses[currentIndex + 1] as "Draft" | "Submitted" | "Interview" | "Offer" | "Rejected";
  const progress = (currentIndex + 2) * 25;
  
  const index = applicationsDb.findIndex((app) => app.id === id);
  if (index !== -1) {
    applicationsDb[index].status = nextStatus;
    applicationsDb[index].progress = progress;
  }
  
  revalidatePath('/dashboard');
}
