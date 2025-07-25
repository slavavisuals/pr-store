import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';
import { EllipsisVertical, ShoppingCart } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import UserButton from './user-button';

const Menu = () => {
  return (
    <>
      <div className='flex justify-end gap-3'>
        <nav className='hidden w-full max-w-xs gap-1 md:flex'>
          <ModeToggle />
          <Button asChild variant='ghost'>
            <Link href='/cart'>
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <UserButton />
        </nav>
        <nav className='md:hidden'>
          <Sheet>
            <SheetTrigger className='align-middle'>
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className='flex flex-col items-start p-4'>
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
              <Button asChild variant='ghost'>
                <Link href='/cart'>
                  <ShoppingCart />
                  Cart
                </Link>
              </Button>
              <UserButton />
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};
export default Menu;
