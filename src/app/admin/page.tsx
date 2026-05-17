"use html";
"use client";

import { useState } from 'react';
import Link from 'next/link';

import {
    Shield,
    Sparkles,
    Activity,
    MapPin,
    Users,
    Briefcase,
    Calendar,
    Zap,
    TrendingUp,
    CheckCircle,
    Clock,
    Plus,
    Filter,
    MoreVertical,
    Search,
    ArrowUpRight,
    Sliders,
    Award
} from 'lucide-react';

// Static Premium Demo Data for Operations Center
const metricsData = [
    { id: 1, label: "Total Elite Vendors", value: "1,420", change: "+12% this month", type: "vendor", icon: Users, shadow: "var(--shadow-vendor)" },
    { id: 2, label: "Active Luxury Clients", value: "890", change: "98% retention rate", type: "plum", icon: Award, shadow: "var(--shadow-sm)" },
    { id: 3, label: "Events Managed", value: "3,140", change: "Across 8 Tier-1 Cities", type: "plum", icon: Calendar, shadow: "var(--shadow-md)" },
    { id: 4, label: "Bookings Today", value: "42", change: "INR 2.4M Volume", type: "gold", icon: TrendingUp, shadow: "var(--shadow-gold)" },
    { id: 5, label: "Emergency Dispatches", value: "3 Active", change: "Avg 14min fulfillment", type: "emergency", icon: Zap, shadow: "var(--shadow-coral)" },
    { id: 6, label: "Pending Verifications", value: "18", change: "Background check phase", type: "plum", icon: Shield, shadow: "var(--shadow-sm)" },
];

const liveOperations = [
    { id: "OP-9021", event: "Vogue India Fashion Gala", location: "Taj Lands End, Mumbai", status: "In Progress", color: "var(--es-vendor)", time: "Live Now" },
    { id: "OP-9022", event: "Ambani Private Residence Soirée", location: "Antilia, Mumbai", status: "Briefing Staff", color: "var(--es-gold)", time: "Starting in 45m" },
    { id: "OP-9023", event: "BMW i7 Launch Corporate Setup", location: "JW Marriott, Bengaluru", status: "Manning Critical", color: "var(--es-coral)", time: "Emergency Fulfilled" },
    { id: "OP-9024", event: "Royal Destination Wedding", location: "Umaid Bhawan, Jodhpur", status: "Staging Phase", color: "var(--es-plum)", time: "Tomorrow, 08:00" },
];

const categories = [
    { name: "Ultra-Luxury Weddings", count: 640, percentage: 85, color: "var(--es-gold)" },
    { name: "High-End Corporate Keynotes", count: 420, percentage: 70, color: "var(--es-plum)" },
    { name: "Premium Concert VIP Lounges", count: 210, percentage: 45, color: "var(--es-coral)" },
    { name: "Private Estate Banquets", count: 110, percentage: 30, color: "var(--es-vendor)" },
    { name: "Global Luxury Festivals", count: 40, percentage: 15, color: "var(--es-text-2)" },
];

const vendorsList = [
    { id: "VND-771", name: "Aria Montgomery", category: "VIP Guest Relations", city: "Mumbai", status: "Verified Elite", rating: "4.98", availability: "On Assignment", earnings: "₹4,50,000", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    { id: "VND-302", name: "Vikram Malhotra", category: "Technical Stage Director", city: "Delhi NCR", status: "Verified Elite", rating: "4.95", availability: "Standby", earnings: "₹8,20,000", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
    { id: "VND-489", name: "Elena Rostova", category: "Artistic Show Producer", city: "Bengaluru", status: "Pending Review", rating: "5.00", availability: "Available", earnings: "₹1,80,000", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" },
    { id: "VND-104", name: "Kabir Mehta", category: "High-Profile Mixologist", city: "Mumbai", status: "Verified Elite", rating: "4.91", availability: "On Assignment", earnings: "₹5,10,000", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
    { id: "VND-882", name: "Zoya Al-Sayed", category: "Celebrity Protocol Lead", city: "Hyderabad", status: "Verified Elite", rating: "4.99", availability: "Resting", earnings: "₹12,40,000", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" },
];

const operationalTimeline = [
    { id: 1, type: "dispatch", text: "Emergency Dispatch: 4 VIP Hosts deployed to St. Regis Ballroom", time: "3 mins ago", badge: "CRITICAL", badgeColor: "var(--es-coral-bg)", textColor: "var(--es-coral)" },
    { id: 2, type: "onboarding", text: "New Vendor Verified: Kabir Mehta (Mixology) passed background clearance", time: "14 mins ago", badge: "SYSTEM", badgeColor: "var(--es-plum-subtle)", textColor: "var(--es-plum)" },
    { id: 3, type: "booking", text: "Booking Secured: Ritz Carlton Gala signed for Dec 18th (INR 4.5M contract)", time: "1 hour ago", badge: "REVENUE", badgeColor: "var(--es-gold-subtle)", textColor: "var(--es-gold-dark)" },
    { id: 4, type: "completion", text: "Event Closed Out: Taj Palace Royal Wedding deployment finalized. Stars released.", time: "2 hours ago", badge: "SUCCESS", badgeColor: "var(--es-vendor-bg)", textColor: "var(--es-vendor)" },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('all');
    const [scrolled, setScrolled] = useState(false);

    return (
        <main style={{ background: 'var(--es-bg)', minHeight: '100vh', overflowX: 'hidden' }}>

            <header className={`nav${scrolled ? ' scrolled' : ''}`}>
                <div className="nav__inner">
                    <Link href="/" className="nav__logo">
                        Event<span>Saathi</span>
                    </Link>
                </div>
            </header>

            {/* 1. PREMIUM HERO / COMMAND HEADER */}
            <section className="section" style={{ paddingBlock: 'clamp(40px, 5vw, 60px)', borderBottom: '1px solid var(--es-border)', background: 'var(--es-bg-card)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>

                        {/* Context Breadcrumb & Pulse Indicator */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span className="text-overline" style={{ margin: 0 }}>System Control</span>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--es-border-strong)' }}></span>
                                <span className="text-sm" style={{ color: 'var(--es-text-3)', fontWeight: 500 }}>Live Operations Platform v3.4</span>
                            </div>

                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 14px',
                                background: 'var(--es-vendor-bg)',
                                border: '1.5px solid var(--es-vendor-subtle)',
                                borderRadius: 'var(--r-full)'
                            }}>
                                <div style={{ position: 'relative', width: '8px', height: '8px' }}>
                                    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--es-vendor)', animation: 'pulseSoft 2s infinite' }}></span>
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--es-vendor-dark)', letterSpacing: '0.03em' }}>ALL SYSTEMS OPERATIONAL</span>
                            </div>
                        </div>

                        {/* Main Command Title */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                            <div>
                                <h1 className="text-display" style={{ color: 'var(--es-plum-dark)', marginBottom: '8px' }}>
                                    Event Operations <span>Command Center</span>
                                </h1>
                                <p className="text-body" style={{ color: 'var(--es-text-2)', maxWidth: '650px' }}>
                                    Real-time operational authority, elite personnel dispatch metrics, and luxury event compliance tracking across Tier-1 regions.
                                </p>
                            </div>

                            {/* Geo Operations Dropdown Mock */}
                            <div style={{ display: 'flex', gap: '12px', width: '100%', sm: 'auto', maxWidth: '320px' }} className="hide-mobile">
                                <div className="form-group" style={{ width: '100%' }}>
                                    <select className="form-select" defaultValue="all">
                                        <option value="all">🌐 National Matrix (All Cities)</option>
                                        <option value="bom">Mumbai Core</option>
                                        <option value="del">Delhi NCR Elite</option>
                                        <option value="blr">Bengaluru Hub</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. PREMIUM METRICS GRID */}
            <section style={{ paddingBlock: '40px' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px'
                    }}>
                        {metricsData.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="flow-card"
                                    style={{
                                        background: 'var(--es-bg-card)',
                                        border: '1.5px solid var(--es-border)',
                                        borderRadius: 'var(--r-lg)',
                                        padding: '24px',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <span className="text-sm" style={{ color: 'var(--es-text-2)', fontWeight: 600, letterSpacing: '-0.01em' }}>{item.label}</span>
                                        <div style={{
                                            padding: '8px',
                                            borderRadius: 'var(--r-sm)',
                                            background: item.type === 'emergency' ? 'var(--es-coral-subtle)' : item.type === 'vendor' ? 'var(--es-vendor-subtle)' : 'var(--es-bg-subtle)',
                                            color: item.type === 'emergency' ? 'var(--es-coral)' : item.type === 'vendor' ? 'var(--es-vendor-dark)' : 'var(--es-plum)'
                                        }}>
                                            <IconComponent size={18} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                                        <span style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '32px',
                                            fontWeight: 800,
                                            color: item.type === 'emergency' ? 'var(--es-coral)' : 'var(--es-text)'
                                        }}>
                                            {item.value}
                                        </span>
                                    </div>

                                    <div style={{
                                        marginTop: '12px',
                                        paddingTop: '12px',
                                        borderTop: '1px solid var(--es-bg-subtle)',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        color: item.type === 'emergency' ? 'var(--es-coral)' : 'var(--es-text-3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        {item.type === 'emergency' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--es-coral)', animation: 'pulseSoft 1.5s infinite' }}></span>}
                                        {item.change}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* THREE COLUMN OPERATIONAL LAYER */}
            <section style={{ paddingBottom: '40px' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        xl: '2fr 1fr',
                        gap: '32px'
                    }} className="es-emergency-grid">

                        {/* LEFT / CENTER COLUMN GROUP */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>

                            {/* 3. LIVE OPERATIONS SECTION */}
                            <div style={{ background: 'var(--es-bg-card)', border: '1.5px solid var(--es-border)', borderRadius: 'var(--r-xl)', padding: '28px', minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                                    <div>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--es-plum-dark)' }}>Live Deployment Stream</h3>
                                        <p className="text-sm" style={{ color: 'var(--es-text-3)' }}>Currently active configurations and urgent staffing scenarios fieldwide</p>
                                    </div>
                                    <button className="btn btn-secondary btn-sm">
                                        <Sliders size={14} /> Full Map Matrix
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {liveOperations.map((op) => (
                                        <div
                                            key={op.id}
                                            className="flow-card"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '16px 20px',
                                                background: 'var(--es-bg)',
                                                border: '1.5px solid var(--es-border)',
                                                borderRadius: 'var(--r-md)',
                                                flexWrap: 'wrap',
                                                gap: '16px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
                                                <div style={{
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    color: 'var(--es-text-3)',
                                                    background: 'var(--es-bg-subtle)',
                                                    padding: '6px 10px',
                                                    borderRadius: 'var(--r-sm)'
                                                }}>
                                                    {op.id}
                                                </div>
                                                <div style={{ minWidth: 0 }}>
                                                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--es-text)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{op.event}</h4>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--es-text-2)', fontSize: '13px' }}>
                                                        <MapPin size={12} style={{ color: 'var(--es-text-3)' }} />
                                                        <span>{op.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <span style={{
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    padding: '4px 12px',
                                                    borderRadius: 'var(--r-full)',
                                                    background: op.color === 'var(--es-coral)' ? 'var(--es-coral-subtle)' : op.color === 'var(--es-gold)' ? 'var(--es-gold-subtle)' : 'var(--es-bg-subtle)',
                                                    color: op.color
                                                }}>
                                                    {op.status}
                                                </span>
                                                <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--es-text-3)' }}>{op.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 5. VENDOR MANAGEMENT TABLE */}
                            <div style={{ background: 'var(--es-bg-card)', border: '1.5px solid var(--es-border)', borderRadius: 'var(--r-xl)', padding: '28px', minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                                    <div>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--es-plum-dark)' }}>Verified Roster Management</h3>
                                        <p className="text-sm" style={{ color: 'var(--es-text-3)' }}>High-tier professionals currently registered under platform compliance frameworks</p>
                                    </div>

                                    {/* Search Bar Visual */}
                                    <div style={{ position: 'relative', width: '100%', sm: 'auto', maxWidth: '240px' }} className="hide-mobile">
                                        <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--es-text-3)' }} />
                                        <input
                                            type="text"
                                            placeholder="Search elite roster..."
                                            style={{
                                                width: '100%',
                                                padding: '10px 12px 10px 36px',
                                                fontSize: '13px',
                                                border: '1.5px solid var(--es-border)',
                                                borderRadius: 'var(--r-md)',
                                                background: 'var(--es-bg)',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Table Responsive Wrapper */}
                                <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1.5px solid var(--es-border)' }}>
                                                <th style={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--es-text-3)' }}>Personnel</th>
                                                <th style={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--es-text-3)' }}>Core Capability</th>
                                                <th style={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--es-text-3)' }}>Region</th>
                                                <th style={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--es-text-3)' }}>Status Aura</th>
                                                <th style={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--es-text-3)' }}>Performance</th>
                                                <th style={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--es-text-3)' }}>Allocation</th>
                                                <th style={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--es-text-3)' }}>Platform Earnings</th>
                                                <th style={{ paddingBottom: '14px', textAlign: 'right' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendorsList.map((vendor) => (
                                                <tr key={vendor.id} style={{ borderBottom: '1px solid var(--es-bg-subtle)' }} className="flow-card-row">
                                                    <td style={{ paddingBlock: '16px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <img src={vendor.avatar} alt={vendor.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                                                            <div>
                                                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--es-text)' }}>{vendor.name}</div>
                                                                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--es-text-3)' }}>{vendor.id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ paddingBlock: '16px', fontSize: '14px', color: 'var(--es-text-2)', fontWeight: 500 }}>{vendor.category}</td>
                                                    <td style={{ paddingBlock: '16px', fontSize: '14px', color: 'var(--es-text)' }}>{vendor.city}</td>
                                                    <td style={{ paddingBlock: '16px' }}>
                                                        <span className={`badge ${vendor.status === 'Verified Elite' ? 'badge-vendor' : 'badge-plum'}`}>
                                                            {vendor.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ paddingBlock: '16px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--es-gold-dark)' }}>★ {vendor.rating}</td>
                                                    <td style={{ paddingBlock: '16px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--es-text-2)' }}>
                                                            <span style={{
                                                                width: '6px',
                                                                height: '6px',
                                                                borderRadius: '50%',
                                                                background: vendor.availability === 'On Assignment' ? 'var(--es-coral)' : vendor.availability === 'Standby' ? 'var(--es-gold)' : 'var(--es-vendor)'
                                                            }}></span>
                                                            {vendor.availability}
                                                        </div>
                                                    </td>
                                                    <td style={{ paddingBlock: '16px', fontSize: '14px', fontWeight: 600, color: 'var(--es-plum-dark)' }}>{vendor.earnings}</td>
                                                    <td style={{ paddingBlock: '16px', textAlign: 'right' }}>
                                                        <button style={{ background: 'transparent', border: 'none', color: 'var(--es-text-3)', cursor: 'pointer' }}>
                                                            <MoreVertical size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: OPERATIONS & TIMELINES */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>

                            {/* 7. QUICK DISPATCH ACTIONS */}
                            <div style={{ background: 'var(--es-bg-card)', border: '1.5px solid var(--es-border)', borderRadius: 'var(--r-xl)', padding: '28px' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--es-plum-dark)', marginBottom: '18px' }}>Operational Triggers</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'space-between' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={16} /> Onboard Premium Talent</span>
                                        <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
                                    </button>

                                    <button className="btn btn-emergency" style={{ width: '100%', justifyContent: 'space-between', fontSize: '15px', padding: '13px 26px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={16} /> Critical Staffing Dispatch</span>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', animation: 'pulseSoft 1s infinite' }}></div>
                                    </button>

                                    <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', border: '1.5px solid var(--es-border)' }}>
                                        <Shield size={16} style={{ color: 'var(--es-plum)' }} /> Audit Pending Compliance
                                    </button>

                                    <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', background: 'var(--es-bg-subtle)' }}>
                                        <Activity size={16} style={{ color: 'var(--es-text-2)' }} /> Extract Operations Ledger (.CSV)
                                    </button>

                                </div>
                            </div>

                            {/* 4. CATEGORY DISTRIBUTION VISUAL */}
                            <div style={{ background: 'var(--es-bg-card)', border: '1.5px solid var(--es-border)', borderRadius: 'var(--r-xl)', padding: '28px' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--es-plum-dark)', marginBottom: '6px' }}>Sector Footprints</h3>
                                <p className="text-sm" style={{ color: 'var(--es-text-3)', marginBottom: '20px' }}>Volume density segmented by exclusive gathering definitions</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                    {categories.map((cat, idx) => (
                                        <div key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', textTransform: 'none', fontSize: '13px', fontWeight: 600, color: 'var(--es-text)', marginBottom: '6px' }}>
                                                <span>{cat.name}</span>
                                                <span style={{ color: 'var(--es-text-2)' }}>{cat.count} assigned</span>
                                            </div>
                                            {/* Premium Bar Track Layout */}
                                            <div style={{ width: '100%', height: '6px', background: 'var(--es-bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${cat.percentage}%`,
                                                    height: '100%',
                                                    background: cat.color,
                                                    borderRadius: '999px',
                                                    transition: 'width var(--t-smooth)'
                                                }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 6. PERFORMANCE / ACTIVITY TIMELINE */}
                            <div style={{ background: 'var(--es-bg-card)', border: '1.5px solid var(--es-border)', borderRadius: 'var(--r-xl)', padding: '28px' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--es-plum-dark)', marginBottom: '20px' }}>Live Command Stream</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                                    {/* Visual Line connector */}
                                    <div style={{ position: 'absolute', top: '8px', bottom: '8px', left: '7px', width: '1.5px', background: 'var(--es-border)' }}></div>

                                    {operationalTimeline.map((time) => (
                                        <div key={time.id} style={{ display: 'flex', gap: '14px', position: 'relative', minWidth: 0 }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                background: 'var(--es-bg-card)',
                                                border: `3px solid ${time.textColor}`,
                                                zIndex: 2,
                                                marginTop: '3px',
                                                flexShrink: 0
                                            }}></div>
                                            <div style={{ minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 700,
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        background: time.badgeColor,
                                                        color: time.textColor,
                                                        letterSpacing: '0.02em'
                                                    }}>
                                                        {time.badge}
                                                    </span>
                                                    <span style={{ fontSize: '11px', color: 'var(--es-text-3)', fontFamily: 'var(--font-mono)' }}>{time.time}</span>
                                                </div>
                                                <p style={{ fontSize: '13px', color: 'var(--es-text-2)', lineHeight: '1.5', wordBreak: 'break-word' }}>{time.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* 8. PREMIUM FINAL SECTION */}
            <section className="section" style={{ background: 'var(--es-plum-dark)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                {/* Dynamic Subtle Overlay Graphics matching emergency layouts */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 80% 80%, rgba(196,155,43,0.08) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '700px', marginInline: 'auto' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            background: 'rgba(237,217,138,0.1)',
                            border: '1px solid rgba(237,217,138,0.2)',
                            borderRadius: 'var(--r-full)',
                            marginBottom: '24px'
                        }}>
                            <Sparkles size={12} style={{ color: 'var(--es-gold)' }} />
                            <span className="text-overline" style={{ color: 'var(--es-gold-light)', margin: 0, letterSpacing: '0.15em' }}>Sovereign Operational Reach</span>
                        </div>

                        <h2 className="text-display" style={{ color: 'var(--es-bg)', marginBottom: '16px', fontSize: 'clamp(28px, 4vw, 42px)' }}>
                            Governing Elite Event Deployments Nationwide
                        </h2>

                        <p className="text-body-lg" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '32px' }}>
                            From isolated high-profile estate guest protocols to massive multi-city premium product rollouts, our administrative architecture preserves extreme fidelity across every variable.
                        </p>

                        {/* Performance Snapshot Badges */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '24px',
                            width: '100%',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            paddingTop: '32px'
                        }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--es-gold)' }}>99.94%</div>
                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.05em' }}>Fulfillment SLA</div>
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--es-bg)' }}>&lt; 15m</div>
                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.05em' }}>Emergency Guard Response</div>
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--es-bg)' }}>Tier-1</div>
                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.05em' }}>Compliance Calibration</div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}