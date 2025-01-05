import * as React from 'react';
import homeIcon from "@/assets/icons/home.svg";
import votedIcon from "@/assets/icons/voted.svg";
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

const navItems = [
    {
        name: 'Home',
        link: "/",
        icon: homeIcon
    },
    {
        name: 'Voted',
        link: "/voted",
        icon: votedIcon
    }
]
const Sidebar: React.FunctionComponent = () => {
    const { pathname } = useLocation();

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className='flex flex-col relative h-screen max-w-sm w-full'>
            <div className='flex justify-center m-5'>
                <div className='text-white text-lg'>DogFinder</div>
            </div>
            {navItems.map((item, index) => {
                return (
                    <Link to={item.link} className='flex w-full' key={index}>
                        <div
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                pathname === item.link
                                    ? 'bg-white text-black rounded-none hover:text-slate-700 hover:bg-white'
                                    : 'hover:bg-slate-950 hover:text-white bg-transparent text-slate-950 lg:text-white',
                                "justify-start w-full"
                            )}
                        >
                            <span>
                                <img
                                    src={item.icon}
                                    className='w-5 h-5 mr-2'
                                    alt={item.name}
                                    style={{ filter: isMobile ? "invert(0)" : `${pathname === item.link ? `invert(0)` : `invert(1)`}` }}
                                /></span>
                            <span>{item.name}</span>
                        </div>
                    </Link>
                )
            })}
        </nav>
    );
};

export default Sidebar;
