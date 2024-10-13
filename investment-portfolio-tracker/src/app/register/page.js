"use client";
import { useState } from 'react';
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

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleRegister = async (values) => {
        e.preventDefault();
        setError('');

        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...values }),
        })

        if(res.ok) {
            router.push('/login');
        } else {
            setError('Registration failed. Try again!');
        }
    }

    return (
        <div className="p-5">
            <h1 className="-scroll-ml-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Register
            </h1>
            <div className="max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8">
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
                            Register
                        </Button>
                    </form>
                </Form>
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}