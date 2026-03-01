'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, User, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Profile = {
    id: string
    email: string
    full_name: string | null
    role: 'admin' | 'student'
    updated_at: string
}

export default function RolesManagementPage() {
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchProfiles()
    }, [])

    const fetchProfiles = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/admin/roles')
            if (!res.ok) throw new Error('Failed to fetch profiles')
            const data = await res.json()
            setProfiles(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'student' : 'admin'
        const confirmAction = window.confirm(`Are you sure you want to make this user an ${newRole}?`)

        if (!confirmAction) return

        setUpdatingId(userId)
        setError('')

        try {
            const res = await fetch('/api/admin/roles', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, newRole })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update role')
            }

            // Update local state
            setProfiles(prev => prev.map(p => p.id === userId ? { ...p, role: newRole } : p))

        } catch (err: any) {
            setError(err.message)
            alert(err.message) // Simple alert for specific errors like 'cannot remove last admin'
        } finally {
            setUpdatingId(null)
        }
    }

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
            <Link href="/admin" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
            </Link>

            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 border border-indigo-300 shadow-sm flex items-center justify-center">
                    <Shield className="w-6 h-6 text-indigo-700" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Role Management</h1>
                    <p className="text-base text-slate-500 mt-1 font-medium">Elevate users to Admin or demote them to Student.</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 font-medium">
                    Error: {error}
                </div>
            )}

            <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                                <th className="p-4 pl-6">User</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Current Role</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">No users found.</td>
                                </tr>
                            ) : (
                                profiles.map((profile) => (
                                    <tr key={profile.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                                    <User className="w-5 h-5 text-slate-500" />
                                                </div>
                                                <span className="font-semibold text-slate-800">{profile.full_name || 'Anonymous User'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600 font-medium">{profile.email}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${profile.role === 'admin'
                                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                                }`}>
                                                {profile.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right pr-6">
                                            <button
                                                onClick={() => toggleRole(profile.id, profile.role)}
                                                disabled={updatingId === profile.id}
                                                className={`inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl transition-all ${profile.role === 'admin'
                                                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50'
                                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 shadow-sm hover:shadow'
                                                    }`}
                                            >
                                                {updatingId === profile.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : profile.role === 'admin' ? (
                                                    'Revoke Admin'
                                                ) : (
                                                    'Make Admin'
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
