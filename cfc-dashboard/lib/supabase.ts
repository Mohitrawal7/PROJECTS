import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Event = {
  id: string
  title: string
  description: string
  event_date: string
  end_date: string
  location: string
  banner_url?: string
  is_open: boolean
  max_participants?: number
  created_at: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  email: string
  phone?: string
  avatar_url?: string
  bio?: string
  is_mentor: boolean
  is_active: boolean
  joined_at: string
}

export type Registration = {
  id: string
  event_id: string
  name: string
  email: string
  phone?: string
  college?: string
  status: 'registered' | 'confirmed' | 'cancelled'
  registered_at: string
}

export type Attendance = {
  id: string
  event_id: string
  member_id: string
  status: 'present' | 'absent' | 'excused'
  notes?: string
  marked_at: string
  team_members?: TeamMember
}

export type Finance = {
  id: string
  event_id?: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  currency: string
  party_name?: string
  receipt_url?: string
  date: string
  created_at: string
  events?: Event
}

export type EmailLog = {
  id: string
  event_id?: string
  email_type: 'event_reminder' | 'joining_link' | 'mentor_thankyou' | 'general'
  recipient_email: string
  recipient_name?: string
  status: 'pending' | 'sent' | 'failed'
  sent_at?: string
  error_msg?: string
  created_at: string
}
