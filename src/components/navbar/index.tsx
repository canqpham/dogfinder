import * as React from 'react';
import { MobileSidebar } from '../sidebar/mobileSidebar';

const Navbar: React.FunctionComponent = () => {
  return (
    <nav className="pt-4 px-6 w-full flex items-center justify-between fixed">
        <MobileSidebar />
    </nav>
  )
};

export default Navbar;
