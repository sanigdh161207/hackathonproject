import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

// Initialize a Supabase client with the Service Role key to bypass RLS
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
    try {
        const supabase = await createServerClient()

        // Auth check
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Role check: Only admins can view roles
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Fetch all profiles using the Service Role to bypass constraints if needed
        const { data: profiles, error } = await supabaseAdmin
            .from('profiles')
            .select('id, email, full_name, role, updated_at')
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json(profiles)
    } catch (error: any) {
        console.error('Error in GET /api/admin/roles:', error)
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const supabase = await createServerClient()

        // Auth check
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Role check: Only admins can authorize role changes
        const { data: adminProfile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (adminProfile?.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await request.json()
        const { userId, newRole } = body

        if (!userId || !newRole) {
            return NextResponse.json({ error: 'Missing userId or newRole' }, { status: 400 })
        }

        // Prevent removing the last admin (basic safety check - could be more robust)
        if (newRole !== 'admin') {
            const { count } = await supabaseAdmin
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('role', 'admin')

            if (count && count <= 1) {
                return NextResponse.json({ error: 'Cannot remove the last administrator.' }, { status: 400 })
            }
        }

        // Update the role using the Service Role to bypass RLS policies
        const { data, error } = await supabaseAdmin
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ success: true, profile: data })

    } catch (error: any) {
        console.error('Error in PATCH /api/admin/roles:', error)
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
    }
}
