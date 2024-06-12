import { useSession } from 'next-auth/react';

export default function History() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Please login to see your history</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Translation History</h1>
      {/* Fetch and display user's translation history here */}
    </div>
  );
}
