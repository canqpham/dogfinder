import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Sidebar from ".";

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname])

    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant={"secondary"} className="lg:hidden">
                    <MenuIcon className="size-5 text-neutral-500" />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0 ">
                <SheetHeader>
                    <SheetTitle>Dog Finder</SheetTitle>
                </SheetHeader>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}