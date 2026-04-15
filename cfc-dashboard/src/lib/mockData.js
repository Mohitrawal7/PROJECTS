export const mockEvents = [
  {
    id: '1',
    title: 'Tech for Good Hackathon 2025',
    type: 'Hackathon',
    date: '2025-03-15',
    location: 'Kathmandu Innovation Hub',
    capacity: 200,
    registered: 178,
    status: 'upcoming',
    description: 'A 48-hour hackathon focused on social impact tech solutions.',
    created_at: '2025-01-10',
  },
  {
    id: '2',
    title: 'Open Source Workshop',
    type: 'Workshop',
    date: '2025-02-20',
    location: 'Online (Zoom)',
    capacity: 100,
    registered: 100,
    status: 'completed',
    description: 'Introduction to contributing to open source projects.',
    created_at: '2025-01-05',
  },
  {
    id: '3',
    title: 'Women in Tech Summit',
    type: 'Summit',
    date: '2025-04-10',
    location: 'Hotel Annapurna, Kathmandu',
    capacity: 300,
    registered: 45,
    status: 'upcoming',
    description: 'Celebrating and empowering women in the tech industry.',
    created_at: '2025-01-20',
  },
  {
    id: '4',
    title: 'AI & ML Bootcamp',
    type: 'Bootcamp',
    date: '2025-01-30',
    location: 'CFC Office, Butwal',
    capacity: 50,
    registered: 48,
    status: 'completed',
    description: 'Intensive 3-day bootcamp covering ML fundamentals.',
    created_at: '2024-12-15',
  },
]

export const mockRegistrations = [
  { id: '1', event_id: '1', name: 'Aarav Sharma', email: 'aarav@email.com', phone: '9841234567', college: 'IOE Pulchowk', status: 'confirmed', registered_at: '2025-01-12' },
  { id: '2', event_id: '1', name: 'Priya Thapa', email: 'priya@email.com', phone: '9851234567', college: 'KU Dhulikhel', status: 'confirmed', registered_at: '2025-01-13' },
  { id: '3', event_id: '1', name: 'Rohan Poudel', email: 'rohan@email.com', phone: '9861234567', college: 'TU Kirtipur', status: 'pending', registered_at: '2025-01-14' },
  { id: '4', event_id: '2', name: 'Sita Rai', email: 'sita@email.com', phone: '9871234567', college: 'Kathmandu College', status: 'confirmed', registered_at: '2025-01-10' },
  { id: '5', event_id: '3', name: 'Deepika Karki', email: 'deepika@email.com', phone: '9881234567', college: 'Herald College', status: 'confirmed', registered_at: '2025-01-21' },
  { id: '6', event_id: '1', name: 'Bikash Shrestha', email: 'bikash@email.com', phone: '9891234567', college: 'ISMT College', status: 'cancelled', registered_at: '2025-01-15' },
]

export const mockSponsors = [
  { id: '1', name: 'NIC Asia Bank', type: 'Platinum', amount: 500000, status: 'active', contact: 'rajesh@nicasia.com', phone: '01-4444444', events: ['Tech for Good Hackathon 2025'], notes: 'Long-term partner since 2022', created_at: '2024-11-01' },
  { id: '2', name: 'Subisu Cablenet', type: 'Gold', amount: 250000, status: 'active', contact: 'info@subisu.net.np', phone: '01-5555555', events: ['Women in Tech Summit'], notes: 'Providing internet infrastructure', created_at: '2024-12-01' },
  { id: '3', name: 'CloudFactory', type: 'Silver', amount: 100000, status: 'pending', contact: 'sponsor@cloudfactory.com', phone: '01-6666666', events: ['Open Source Workshop'], notes: 'Negotiation in progress', created_at: '2025-01-05' },
  { id: '4', name: 'Verisk Nepal', type: 'Gold', amount: 200000, status: 'inactive', contact: 'hr@verisk.com', phone: '01-7777777', events: [], notes: 'Previous sponsor, renewal pending', created_at: '2024-09-01' },
]

export const mockProposals = [
  { id: '1', sponsor_id: '1', title: 'Hackathon 2025 Platinum Sponsorship', status: 'accepted', amount: 500000, sent_at: '2024-11-05', responded_at: '2024-11-10', notes: 'Accepted with logo on all materials' },
  { id: '2', sponsor_id: '2', title: 'Summit Gold Package', status: 'accepted', amount: 250000, sent_at: '2024-12-05', responded_at: '2024-12-12', notes: 'Banner + social mentions' },
  { id: '3', sponsor_id: '3', title: 'Workshop Silver Tier', status: 'sent', amount: 100000, sent_at: '2025-01-06', responded_at: null, notes: 'Awaiting response' },
  { id: '4', sponsor_id: '4', title: 'Annual Partnership Renewal', status: 'draft', amount: 300000, sent_at: null, responded_at: null, notes: 'Draft in progress' },
]

export const mockEmailTemplates = [
  { id: '1', name: 'Registration Confirmation', subject: 'You\'re registered! 🎉 — {{event_name}}', category: 'Registration', body: `Hi {{first_name}},

We're thrilled to confirm your registration for **{{event_name}}**!

📅 Date: {{event_date}}
📍 Venue: {{event_location}}
🎟️ Registration ID: {{reg_id}}

Please bring this email (or your reg ID) on the day.

See you there!
— Team CFC`, last_updated: '2025-01-01' },
  { id: '2', name: 'Event Reminder', subject: '⏰ Reminder: {{event_name}} is tomorrow!', category: 'Reminder', body: `Hi {{first_name}},

Just a quick reminder that **{{event_name}}** is happening tomorrow!

📅 {{event_date}} at {{event_time}}
📍 {{event_location}}

Don't forget to bring:
- Your student ID
- Laptop (if applicable)
- Positive energy! 🚀

— Team CFC`, last_updated: '2025-01-05' },
  { id: '3', name: 'Sponsorship Proposal', subject: 'Partnership Opportunity — Code for Change {{year}}', category: 'Sponsorship', body: `Dear {{contact_name}},

We are reaching out on behalf of **Code for Change (CFC)**, Nepal's leading tech community for students.

We are hosting **{{event_name}}** on {{event_date}} and would love to have {{company_name}} as our {{tier}} sponsor.

Benefits include:
- Brand visibility to 500+ tech students
- Logo placement on all event materials
- Speaking opportunity at the event

We'd love to discuss this further. Can we schedule a call?

Best regards,
{{your_name}}
Code for Change`, last_updated: '2025-01-10' },
  { id: '4', name: 'Post Event Thank You', subject: 'Thank you for attending {{event_name}} 💙', category: 'Post-Event', body: `Hi {{first_name}},

What an incredible event! Thank you for being part of **{{event_name}}**.

We're already working on the next one. Stay tuned!

Resources from the event: {{resources_link}}

With gratitude,
— Team CFC`, last_updated: '2025-01-12' },
]

export const mockAnalytics = {
  monthly_registrations: [
    { month: 'Sep', count: 45 },
    { month: 'Oct', count: 78 },
    { month: 'Nov', count: 55 },
    { month: 'Dec', count: 92 },
    { month: 'Jan', count: 148 },
    { month: 'Feb', count: 110 },
  ],
  sponsor_revenue: [
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 250000 },
    { month: 'Nov', amount: 100000 },
    { month: 'Dec', amount: 500000 },
    { month: 'Jan', amount: 200000 },
    { month: 'Feb', amount: 0 },
  ],
  event_types: [
    { name: 'Hackathon', value: 3 },
    { name: 'Workshop', value: 7 },
    { name: 'Summit', value: 2 },
    { name: 'Bootcamp', value: 4 },
    { name: 'Meetup', value: 5 },
  ],
  top_colleges: [
    { name: 'IOE Pulchowk', count: 89 },
    { name: 'KU Dhulikhel', count: 67 },
    { name: 'TU Kirtipur', count: 54 },
    { name: 'Herald College', count: 43 },
    { name: 'ISMT College', count: 38 },
  ],
}
