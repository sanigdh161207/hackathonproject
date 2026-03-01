'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
    Mail,
    Lock,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Eye,
    EyeOff,
    Home,
    ShieldCheck,
    Settings
} from 'lucide-react'
import Link from 'next/link'

type Mode = 'signin' | 'signup'

export default function LoginPage() {
    const router = useRouter()
    const [mode, setMode] = useState<Mode>('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const allowedDomain = 'anurag.edu.in'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        if (!email.endsWith(`@${allowedDomain}`)) {
            setMessage({ type: 'error', text: `Only @${allowedDomain} emails are permitted.` })
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters.' })
            setLoading(false)
            return
        }

        if (mode === 'signup' && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' })
            setLoading(false)
            return
        }

        try {
            if (mode === 'signup') {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const supabase = createClient()
                await supabase.from('profiles').upsert({
                    id: userCredential.user.uid,
                    email: userCredential.user.email,
                    role: 'student',
                })

                setMessage({
                    type: 'success',
                    text: 'Account created successfully! Redirecting...',
                })
                setTimeout(() => router.push('/dashboard'), 1500)
            } else {
                await signInWithEmailAndPassword(auth, email, password)
                router.push('/dashboard')
            }
        } catch (error: any) {
            let errorMessage = 'An error occurred. Please try again.'
            if (error.code === 'auth/email-already-in-use') errorMessage = 'This email is already registered.'
            else if (error.code === 'auth/invalid-credential') errorMessage = 'Invalid email or password.'
            else if (error.code === 'auth/user-not-found') errorMessage = 'No account found with this email.'

            setMessage({ type: 'error', text: errorMessage })
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] p-4 font-sans text-slate-800 selection:bg-red-100 selection:text-red-900">
            {/* Subtle background texture effect */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            {/* Home Button */}
            <Link href="/" className="fixed top-6 left-6 flex items-center gap-2 text-slate-700 hover:text-red-600 transition-all duration-300 font-bold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm z-50 hover:shadow-md hover:-translate-y-0.5 group">
                <Home className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Home</span>
            </Link>

            <Card className="w-full max-w-[480px] border-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 rounded-[2.5rem] overflow-hidden">
                <CardContent className="pt-12 pb-10 px-10">
                    {/* Header Section */}
                    <div className="text-center mb-10 space-y-4">
                        <div className="flex flex-col items-center">
                            <img src="/anurag-logo.png" alt="Anurag University" className="h-20 w-auto object-contain mb-2" />
                            <h1 className="text-2xl font-bold text-[#001f3f] tracking-tight">Campus Genie</h1>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 pt-2">
                            {mode === 'signin' ? 'Welcome Back' : 'Get Started'}
                        </h2>
                        <p className="text-sm font-medium text-slate-500">
                            {mode === 'signin'
                                ? 'Sign in with your institutional credentials'
                                : 'Register with your university email to get started'}
                        </p>
                    </div>

                    {/* Mode Toggle Switch */}
                    <div className="flex bg-[#e8e8e8] rounded-2xl p-1 mb-8">
                        <button
                            type="button"
                            onClick={() => { setMode('signin'); setMessage(null) }}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${mode === 'signin'
                                    ? 'bg-[#981b1b] text-white shadow-lg shadow-red-900/20'
                                    : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            Sign In
                            <span className="bg-white/20 p-0.5 rounded-full">
                                <CheckCircle2 className={`w-4 h-4 ${mode === 'signin' ? 'text-white' : 'text-slate-400'}`} />
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => { setMode('signup'); setMessage(null) }}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${mode === 'signup'
                                    ? 'bg-[#1e3a5f] text-white shadow-lg shadow-blue-900/20'
                                    : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            Sign Up
                            <span className="bg-white/20 p-0.5 rounded-full">
                                <ArrowRight className={`w-4 h-4 ${mode === 'signup' ? 'text-white' : 'text-slate-400'}`} />
                            </span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-slate-800 ml-1">Email Address</Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-red-50 border border-red-100 group-focus-within:border-red-500 transition-colors">
                                    <Mail className="w-4 h-4 text-red-600" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={`your.name@${allowedDomain}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-14 h-14 bg-white border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus-visible:ring-red-600/20 focus-visible:ring-4 focus-visible:border-red-600 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-bold text-slate-800 ml-1">Password</Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-red-50 border border-red-100 group-focus-within:border-red-500 transition-colors">
                                    <Lock className="w-4 h-4 text-red-600" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-14 pr-12 h-14 bg-white border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus-visible:ring-red-600/20 focus-visible:ring-4 focus-visible:border-red-600 transition-all font-medium"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password (Signup only) */}
                        {mode === 'signup' && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <Label htmlFor="confirmPassword" className="text-sm font-bold text-slate-800 ml-1">Confirm Password</Label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-red-50 border border-red-100 group-focus-within:border-red-500 transition-colors">
                                        <ShieldCheck className="w-4 h-4 text-red-600" />
                                    </div>
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-14 h-14 bg-white border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus-visible:ring-red-600/20 focus-visible:ring-4 focus-visible:border-red-600 transition-all font-medium"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Status Message */}
                        {message && (
                            <div className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in zoom-in-95 duration-300 ${message.type === 'success'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                                {message.text}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-14 bg-gradient-to-r from-[#981b1b] to-[#7f1616] hover:from-[#7f1616] hover:to-[#6b1212] text-white font-bold text-lg rounded-2xl shadow-lg shadow-red-900/20 transition-all duration-300 hover:shadow-red-900/40 hover:-translate-y-0.5"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2 w-full relative">
                                    {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                                    <ArrowRight className="w-5 h-5 absolute right-0" />
                                </span>
                            )}
                        </Button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-10 text-center space-y-6">
                        <p className="text-sm font-bold text-slate-500">
                            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                            <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-red-600 hover:underline">
                                {mode === 'signin' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>

                        <div className="pt-6 border-t border-slate-100">
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                                    <Lock className="w-3 h-3 text-red-800" />
                                    <span>Only @{allowedDomain} emails are accepted. Secured by Firebase Authentication.</span>
                                </div>
                                <Link
                                    href="/admin-login"
                                    className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-700 transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-100 hover:border-red-100"
                                >
                                    <Settings className="w-3.5 h-3.5" />
                                    Admin Portal Access
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
