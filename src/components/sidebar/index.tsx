import * as React from 'react';
import homeIcon from "@/assets/icons/home.svg";
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

const navItems = [
    {
        name: 'Home',
        link: "/",
        icon: homeIcon
    }
]
const Sidebar: React.FunctionComponent = () => {
    const { pathname } = useLocation();

    return (
        <nav className='flex flex-col relative h-screen max-w-sm w-full'>
            <div className='flex justify-center m-5'>
                <div className='text-white text-lg'>DogFinder</div>
            </div>
            {navItems.map((item, index) => {
                return (
                    <div key={index} className={cn(
                        buttonVariants({ variant: "default" }),
                        pathname === item.link ? 'bg-white text-white-800 rounded-none' : 'hover:bg-slate-950 hover:text-white bg-transparent',
                        "justify-start"
                    )}>
                        <Link to={item.link} className='flex '>
                            <span><img src={item.icon} className='w-5 h-5 mr-2' alt={item.name} style={{ filter: `${pathname === item.link ? "invert(0)" : "invert(1)"}` }} /></span>
                            <span>{item.name}</span>
                        </Link>
                    </div>
                )
            })}
        </nav>
    );
};

export default Sidebar;
