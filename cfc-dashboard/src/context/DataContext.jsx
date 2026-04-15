import { createContext, useContext, useState } from 'react'
import {
  mockEvents, mockRegistrations, mockSponsors,
  mockProposals, mockEmailTemplates
} from '../lib/mockData'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [events, setEvents] = useState(mockEvents)
  const [registrations, setRegistrations] = useState(mockRegistrations)
  const [sponsors, setSponsors] = useState(mockSponsors)
  const [proposals, setProposals] = useState(mockProposals)
  const [templates, setTemplates] = useState(mockEmailTemplates)

  const genId = () => Date.now().toString()

  // Events
  const addEvent = (e) => setEvents(prev => [...prev, { ...e, id: genId(), created_at: new Date().toISOString().split('T')[0] }])
  const updateEvent = (id, data) => setEvents(prev => prev.map(e => e.id === id ? { ...e, ...data } : e))
  const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id))

  // Registrations
  const addRegistration = (r) => setRegistrations(prev => [...prev, { ...r, id: genId(), registered_at: new Date().toISOString().split('T')[0] }])
  const updateRegistration = (id, data) => setRegistrations(prev => prev.map(r => r.id === id ? { ...r, ...data } : r))
  const deleteRegistration = (id) => setRegistrations(prev => prev.filter(r => r.id !== id))

  // Sponsors
  const addSponsor = (s) => setSponsors(prev => [...prev, { ...s, id: genId(), created_at: new Date().toISOString().split('T')[0] }])
  const updateSponsor = (id, data) => setSponsors(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  const deleteSponsor = (id) => setSponsors(prev => prev.filter(s => s.id !== id))

  // Proposals
  const addProposal = (p) => setProposals(prev => [...prev, { ...p, id: genId(), sent_at: null, responded_at: null }])
  const updateProposal = (id, data) => setProposals(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  const deleteProposal = (id) => setProposals(prev => prev.filter(p => p.id !== id))

  // Templates
  const addTemplate = (t) => setTemplates(prev => [...prev, { ...t, id: genId(), last_updated: new Date().toISOString().split('T')[0] }])
  const updateTemplate = (id, data) => setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...data, last_updated: new Date().toISOString().split('T')[0] } : t))
  const deleteTemplate = (id) => setTemplates(prev => prev.filter(t => t.id !== id))

  return (
    <DataContext.Provider value={{
      events, addEvent, updateEvent, deleteEvent,
      registrations, addRegistration, updateRegistration, deleteRegistration,
      sponsors, addSponsor, updateSponsor, deleteSponsor,
      proposals, addProposal, updateProposal, deleteProposal,
      templates, addTemplate, updateTemplate, deleteTemplate,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
