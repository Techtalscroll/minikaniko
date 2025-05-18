// app/myaccount/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function MyAccountPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in'); // redirect to Clerk's sign-in
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">My Account</h1>
      <p>Welcome back!</p>
    </div>
  );
}
