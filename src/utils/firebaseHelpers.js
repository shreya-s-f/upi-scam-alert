// src/utils/firebaseHelpers.js
// All Firestore read/write functions in one place

import {
  collection, addDoc, query, where,
  getDocs, orderBy, limit, serverTimestamp, getCountFromServer
} from 'firebase/firestore'
import { db } from '../firebase/config'

const REPORTS_COL = 'reports'

// ─── SUBMIT A NEW REPORT ─────────────────────────────────────────────────────
export async function submitReport({ upiId, phone, scamType, description, reporterName }) {
  // Normalise: lowercase, trim
  const normUpi   = upiId?.trim().toLowerCase() || ''
  const normPhone = phone?.trim() || ''

  if (!normUpi && !normPhone) throw new Error('Provide a UPI ID or phone number.')

  const doc = {
    upiId:       normUpi,
    phone:       normPhone,
    scamType,
    description: description?.trim() || '',
    reporterName: reporterName?.trim() || 'Anonymous',
    createdAt:   serverTimestamp(),
    // Simple spam guard: store a hash-like key (not truly secure, but enough for MVP)
    searchKey:   [normUpi, normPhone].filter(Boolean).join('|'),
  }

  return addDoc(collection(db, REPORTS_COL), doc)
}

// ─── CHECK A UPI ID / PHONE ───────────────────────────────────────────────────
export async function checkUPI(input) {
  const norm = input.trim().toLowerCase()
  if (!norm) throw new Error('Please enter a UPI ID or phone number.')

  // Query by upiId
  const q1 = query(collection(db, REPORTS_COL), where('upiId', '==', norm))
  // Query by phone
  const q2 = query(collection(db, REPORTS_COL), where('phone', '==', norm))

  const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)])

  const allDocs = []
  snap1.forEach(d => allDocs.push({ id: d.id, ...d.data() }))
  snap2.forEach(d => {
    // Avoid duplicates if same doc matched both
    if (!allDocs.find(x => x.id === d.id)) allDocs.push({ id: d.id, ...d.data() })
  })

  const count = allDocs.length

  let riskLevel = 'safe'
  if (count >= 5)      riskLevel = 'danger'
  else if (count >= 1) riskLevel = 'warning'

  return { count, riskLevel, reports: allDocs }
}

// ─── GET RECENT REPORTS (feed) ───────────────────────────────────────────────
export async function getRecentReports(limitCount = 20) {
  const q = query(
    collection(db, REPORTS_COL),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  const snap = await getDocs(q)
  const results = []
  snap.forEach(d => results.push({ id: d.id, ...d.data() }))
  return results
}

// ─── GET TOTAL REPORT COUNT ───────────────────────────────────────────────────
export async function getTotalReports() {
  const snap = await getCountFromServer(collection(db, REPORTS_COL))
  return snap.data().count
}
