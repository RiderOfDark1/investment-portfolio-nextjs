"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from '@/app/images/logo.png';

const Navbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        //router.push('/login');
        window.location.href = '/login';  // Hard reload to the login page
    }

    const NavItems = () => (
        <>
            {!isLoggedIn && (
                <>
                    <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                        Login
                    </Link>
                    <Link href="/register" className="text-sm font-medium transition-colors hover:text-primary">
                        Register
                    </Link>
                </>
            )}

            {isLoggedIn && (
                <>
                    {/* <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                        Dashboard
                    </Link> */}
                    <Button variant="ghost" onClick={handleLogout}>
                        Logout
                    </Button>
                </>
            )}
        </>
    );

    return(
        <nav className="flex items-center justify-between p-4 bg-background">
            <Link href="/" className="text-lg font-bold">
                <Image
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={100}
                />
            </Link>
            <div className="hidden md:flex space-x-4 items-center">
                <NavItems />
            </div>
            <Sheet>
                <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                    <NavItems />
                </div>
                </SheetContent>
            </Sheet>
        </nav>
    );

};

export default Navbar;