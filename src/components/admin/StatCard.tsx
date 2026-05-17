// "use client";

// import { motion } from "framer-motion";
// import { LucideIcon } from "lucide-react";
// import { scaleIn } from "@/lib/animations";

// interface StatCardProps {
//   label: string;
//   value: string | number;
//   change?: string;
//   icon: LucideIcon;
//   color: string;
// }

// export default function StatCard({
//   label,
//   value,
//   change,
//   icon: Icon,
//   color,
// }: StatCardProps) {
//   return (
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -4 }}
//       className="glass rounded-2xl p-5 md:p-6"
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
//             {label}
//           </p>
//           <p className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
//             {typeof value === "number" ? value.toLocaleString() : value}
//           </p>
//           {change && (
//             <p className="mt-1 text-xs font-medium text-emerald-400">{change}</p>
//           )}
//         </div>
//         <div
//           className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
//         >
//           <Icon className="h-5 w-5" />
//         </div>
//       </div>
//     </motion.div>
//   );
// }
