import * as React from 'react';
import Sidebar from '../sidebar';
import Navbar from '../navbar';
import VotedLatest from '../voted-latest/intex';

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
    return (
        <div className='flex flex-col justify-end lg:justify-start bg-white h-screen'>
            <aside className='hidden lg:block gap-x-4 bg-gray-800 fixed top-0 left-0 z-40 lg:w-60 h-screen '>
                <Sidebar />
            </aside>
            <div className='lg:ml-60 lg:mr-60 lg:p-8 flex-1'>
                <Navbar />
                {children}
            </div>
            <aside className='hidden lg:block bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-screen'>
                <VotedLatest />
            </aside>
        </div>
    );
};

export default Layout;
