export interface Professional {
  id: string;
  name: string;
  role: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  price: string;
  availability: "available" | "busy" | "limited";
  description: string;
  image: string;
}

export const professionals: Professional[] = [
  {
    id: "1",
    name: "Arjun Mehta",
    role: "Event Manager",
    category: "Management",
    city: "Mumbai",
    rating: 4.9,
    reviews: 128,
    price: "₹8,000/day",
    availability: "available",
    description: "End-to-end wedding & corporate execution. 50+ large-scale events.",
    image: "",
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Anchor & Host",
    category: "Entertainment",
    city: "Delhi",
    rating: 4.8,
    reviews: 94,
    price: "₹15,000/show",
    availability: "limited",
    description: "High-energy hosting for concerts, galas & brand launches.",
    image: "",
  },
  {
    id: "3",
    name: "Rahul Verma",
    role: "Sound Engineer",
    category: "Production",
    city: "Bangalore",
    rating: 4.7,
    reviews: 76,
    price: "₹6,500/day",
    availability: "available",
    description: "Live sound design for festivals, weddings & corporate stages.",
    image: "",
  },
  {
    id: "4",
    name: "Sneha Kapoor",
    role: "Decorator",
    category: "Decor",
    city: "Mumbai",
    rating: 4.9,
    reviews: 112,
    price: "₹12,000/event",
    availability: "busy",
    description: "Luxury floral & stage decor. Minimal to maximal aesthetics.",
    image: "",
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Lighting Designer",
    category: "Production",
    city: "Hyderabad",
    rating: 4.6,
    reviews: 58,
    price: "₹7,200/day",
    availability: "available",
    description: "Cinematic lighting for concerts, fashion shows & galas.",
    image: "",
  },
  {
    id: "6",
    name: "Ananya Reddy",
    role: "Wedding Planner",
    category: "Management",
    city: "Chennai",
    rating: 4.8,
    reviews: 89,
    price: "₹25,000/event",
    availability: "available",
    description: "Destination weddings & multi-day celebrations specialist.",
    image: "",
  },
  {
    id: "7",
    name: "Kabir Joshi",
    role: "DJ & Music Curator",
    category: "Entertainment",
    city: "Pune",
    rating: 4.7,
    reviews: 67,
    price: "₹10,000/night",
    availability: "limited",
    description: "Club, wedding & corporate playlists with live mixing.",
    image: "",
  },
  {
    id: "8",
    name: "Meera Iyer",
    role: "Catering Coordinator",
    category: "F&B",
    city: "Bangalore",
    rating: 4.5,
    reviews: 45,
    price: "₹5,000/day",
    availability: "available",
    description: "Premium buffet coordination for 500+ guest events.",
    image: "",
  },
];

export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Jaipur",
];

export const categories = [
  "All",
  "Management",
  "Entertainment",
  "Production",
  "Decor",
  "F&B",
];

export const eventTypes = [
  "Wedding",
  "Corporate",
  "Concert",
  "Birthday",
  "Product Launch",
  "Festival",
  "Private Party",
];

export const services = [
  "Event Manager",
  "Anchor / Host",
  "Decorator",
  "Sound & Lighting",
  "DJ",
  "Catering",
  "Photography",
  "Security",
  "Stage Crew",
];

export const adminStats = {
  totalVendors: 2847,
  totalClients: 1293,
  totalBookings: 4892,
  revenue: "₹2.4Cr",
  growth: "+24%",
};

export const categoryBreakdown = [
  { name: "Management", value: 32, color: "#f59e0b" },
  { name: "Entertainment", value: 24, color: "#8b5cf6" },
  { name: "Production", value: 22, color: "#06b6d4" },
  { name: "Decor", value: 14, color: "#ec4899" },
  { name: "F&B", value: 8, color: "#10b981" },
];

export const recentActivity = [
  {
    id: "1",
    type: "booking",
    message: "New booking — Wedding crew, Mumbai",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "vendor",
    message: "Vendor registered — Sound Engineer, Bangalore",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "emergency",
    message: "Emergency request — Last-minute anchor, Delhi",
    time: "28 min ago",
  },
  {
    id: "4",
    type: "booking",
    message: "Booking completed — Corporate gala, Pune",
    time: "1 hr ago",
  },
  {
    id: "5",
    type: "vendor",
    message: "Vendor verified — Decorator, Chennai",
    time: "2 hrs ago",
  },
];

export const bookingAnalytics = [
  { month: "Jan", bookings: 320 },
  { month: "Feb", bookings: 410 },
  { month: "Mar", bookings: 380 },
  { month: "Apr", bookings: 520 },
  { month: "May", bookings: 610 },
  { month: "Jun", bookings: 580 },
];
