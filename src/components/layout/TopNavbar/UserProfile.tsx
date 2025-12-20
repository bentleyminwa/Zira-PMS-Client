import { UserButton } from '@clerk/clerk-react';

export default function UserProfile() {
  return (
    <div className='flex items-center justify-center'>
      <UserButton
        appearance={{
          elements: {
            avatarBox:
              'w-9 h-9 rounded-xl border-2 border-primary/20 hover:border-primary transition-colors',
          },
        }}
      />
    </div>
  );
}
