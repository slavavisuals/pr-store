'use client';

import { signOutUser } from '@/lib/actions/user.actions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const SignOutButton = () => {
  const handleSignOut = async () => {
    console.log('Sign out button clicked'); // Debug log
    try {
      await signOutUser();
    } catch (error) {
      // NEXT_REDIRECT errors are expected behavior for NextAuth redirects
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        console.log('Sign out redirect triggered');
        return;
      }
      console.error('Error signing out:', error);
    }
  };

  return (
    <DropdownMenuItem 
      onClick={handleSignOut}
      className='mb-1 cursor-pointer'
    >
      Sign Out
    </DropdownMenuItem>
  );
};

export default SignOutButton;