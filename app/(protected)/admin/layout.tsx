'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/firebase/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)
    const [verifying, setVerifying] = useState(true)

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.replace('/login')
                return
            }
            verifyAdmin()
        }
    }, [user, authLoading])

    const verifyAdmin = async () => {
        try {
            if (user?.email?.toLowerCase() === 'admin@anurag.edu.in') {
                setAuthorized(true)
                setVerifying(false)
                return
            }

            const supabase = createClient()
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user?.uid)
                .single()

            if (error || !data || data.role !== 'admin') {
                toast.error('Access Denied: Administrator privileges required.')
                router.replace('/')
            } else {
                setAuthorized(true)
            }
        } catch (error) {
            console.error('Admin verification failed', error)
            router.replace('/')
        } finally {
            setVerifying(false)
        }
    }

    if (authLoading || verifying) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                <p className="text-slate-500 font-medium">Verifying administrator privileges...</p>
            </div>
        )
    }

    if (!authorized) return null

    return <>{children}</>
}
