// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import ProfilePreview from "@/components/vendor/ProfilePreview";
// import Button from "@/components/ui/Button";
// import { services, cities } from "@/lib/mock-data";
// import { fadeInUp } from "@/lib/animations";
// import { Sparkles } from "lucide-react";

// export default function VendorPage() {
//   const [form, setForm] = useState({
//     name: "",
//     serviceType: "",
//     city: "",
//     pricing: "",
//     availability: "",
//     teamType: "",
//     experience: "",
//   });

//   const update = (key: keyof typeof form, value: string) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Demo only — profile submission is not connected to a backend.");
//   };

//   return (
//     <main className="min-h-screen">
//       <Navbar />

//       <motion.div
//         className="mx-auto max-w-6xl px-5 pt-28 pb-20 md:px-8 lg:px-12"
//         initial="hidden"
//         animate="visible"
//         variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//       >
//         <motion.div variants={fadeInUp} className="mb-12 text-center md:text-left">
//           <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400">
//             <Sparkles className="h-3 w-3" />
//             Join the Network
//           </span>
//           <h1 className="mt-4 font-display text-3xl font-bold text-white md:text-5xl">
//             Register as a <span className="gradient-text-violet">Vendor</span>
//           </h1>
//           <p className="mt-3 max-w-xl text-zinc-400">
//             Freelancers, anchors, managers, decorators — build your profile and
//             get discovered by clients nationwide.
//           </p>
//         </motion.div>

//         <motion.div className="grid gap-10 lg:grid-cols-5">
//           <motion.form
//             variants={fadeInUp}
//             onSubmit={handleSubmit}
//             className="glass-strong lg:col-span-3 space-y-5 rounded-3xl p-6 md:p-8"
//           >
//             <div>
//               <label className="mb-2 block text-sm text-zinc-400">Full Name</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="Your full name"
//                 value={form.name}
//                 onChange={(e) => update("name", e.target.value)}
//                 className="input-premium"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm text-zinc-400">Service Type</label>
//               <select
//                 required
//                 value={form.serviceType}
//                 onChange={(e) => update("serviceType", e.target.value)}
//                 className="input-premium"
//               >
//                 <option value="">Select service</option>
//                 {services.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="grid gap-5 md:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm text-zinc-400">City</label>
//                 <select
//                   required
//                   value={form.city}
//                   onChange={(e) => update("city", e.target.value)}
//                   className="input-premium"
//                 >
//                   <option value="">Select city</option>
//                   {cities.map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm text-zinc-400">Pricing</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g. ₹8,000/day"
//                   value={form.pricing}
//                   onChange={(e) => update("pricing", e.target.value)}
//                   className="input-premium"
//                 />
//               </div>
//             </div>

//             <div className="grid gap-5 md:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm text-zinc-400">Availability</label>
//                 <select
//                   required
//                   value={form.availability}
//                   onChange={(e) => update("availability", e.target.value)}
//                   className="input-premium"
//                 >
//                   <option value="">Select availability</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Weekends">Weekends</option>
//                   <option value="On-demand">On-demand</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm text-zinc-400">Team or Solo</label>
//                 <select
//                   required
//                   value={form.teamType}
//                   onChange={(e) => update("teamType", e.target.value)}
//                   className="input-premium"
//                 >
//                   <option value="">Select type</option>
//                   <option value="Solo">Solo Professional</option>
//                   <option value="Team">Team / Agency</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm text-zinc-400">
//                 Experience (years)
//               </label>
//               <input
//                 type="number"
//                 required
//                 min={0}
//                 placeholder="e.g. 5"
//                 value={form.experience}
//                 onChange={(e) => update("experience", e.target.value)}
//                 className="input-premium"
//               />
//             </div>

//             <Button type="submit" variant="violet" size="lg" className="w-full">
//               Submit Profile
//             </Button>
//           </motion.form>

//           <motion.div variants={fadeInUp} className="lg:col-span-2">
//             <ProfilePreview {...form} />
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       <Footer />
//     </main>
//   );
// }
