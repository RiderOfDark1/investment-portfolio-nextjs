"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            email: "test@user.com",
            password: "testtest",
        },
    });

    useEffect(() => {
        // Redirect to dashboard if token exists
        const token = localStorage.getItem('token');
        if(token) {
            router.push('/dashboard');
        }
    }, []);

    const handleLogin = async (values) => {
        setError(''); // Clear any previous errors
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...values })
        });

        const data = await res.json();

        if(res.ok) {
            // Save token to localStorage and redirect to dashboard
            localStorage.setItem('token', data.token);
            //router.push('/dashboard');
            window.location.href = '/login';
        } else {
            setError('Invalid credentials. Please try again');
        }
    }

    return (
        <div className="p-5">
            <h1 className="-scroll-ml-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Login</h1>
            {error && <p>{error}</p>}
            <div className="max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} type="email" required />
                                    </FormControl>
                                    <FormDescription>
                                        We'll never share your email with anyone else.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};