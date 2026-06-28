"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "./adminAuth";
import React from "react";

const formatDate = (d) =>
  new Date(d).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export function AdminListPage({
  title,
  apiPath,
  columns,
  rowMapper,
  badgeColor,
}) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminFetch(apiPath);
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiPath]);

  const filtered = data.filter((item) => {
    const searchLower = search.toLowerCase();
    return JSON.stringify(item).toLowerCase().includes(searchLower);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          className="animate-spin h-8 w-8 text-[#7B1223]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-2xl font-bold text-[#7B1223]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {title}
          </h2>
          <p className="text-sm text-[#8C7B6B] mt-0.5">
            {data.length} total submission{data.length !== 1 ? "s" : ""}
          </p>
        </div>
        <span
          className={`text-xs font-bold px-3 py-1.5 rounded-full text-white ${badgeColor}`}
        >
          {filtered.length} shown
        </span>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, city, email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-4 py-2.5 text-sm border border-[#C9973A]/30 rounded-lg bg-white focus:outline-none focus:border-[#7B1223] text-[#1C1C1C]"
      />

      {/* Desktop Table View (Visible on md and above) */}
      <div className="hidden md:block bg-white rounded-xl border border-[#C9973A]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F0E8] border-b border-[#C9973A]/20">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="text-left px-4 py-3 text-xs font-bold text-[#8C7B6B] uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-bold text-[#8C7B6B] uppercase tracking-wider text-right">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-10 text-center text-sm text-[#8C7B6B]"
                  >
                    No entries found
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <React.Fragment key={item._id}>
                    <tr className="border-t border-[#F5F0E8] hover:bg-[#FDFAF5] transition-colors">
                      {rowMapper(item).map((cell, j) => (
                        <td
                          key={j}
                          className="px-4 py-3 text-[#1C1C1C] whitespace-nowrap"
                        >
                          {cell}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            setExpanded(expanded === item._id ? null : item._id)
                          }
                          className="text-xs font-bold text-[#7B1223] hover:text-[#C9973A] transition-colors"
                        >
                          {expanded === item._id ? "Hide ▲" : "View ▼"}
                        </button>
                      </td>
                    </tr>
                    {expanded === item._id && (
                      <tr className="bg-[#FDFAF5]">
                        <td
                          colSpan={columns.length + 1}
                          className="px-4 py-4 border-t border-[#C9973A]/10"
                        >
                          <DetailView item={item} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View (Visible below md breakpoint) */}
      <div className="block md:hidden space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#C9973A]/20 p-8 text-center text-sm text-[#8C7B6B]">
            No entries found
          </div>
        ) : (
          filtered.map((item) => {
            const cells = rowMapper(item);
            return (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-[#C9973A]/20 overflow-hidden"
              >
                {/* Card Fields */}
                <div className="p-4 space-y-3">
                  {columns.map((col, idx) => (
                    <div key={col}>
                      <p className="text-[10px] font-bold text-[#8C7B6B] uppercase tracking-wider">
                        {col}
                      </p>
                      <div className="text-sm text-[#1C1C1C] mt-0.5 break-words">
                        {cells[idx]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Actions Footer */}
                <div className="bg-[#F5F0E8]/40 border-t border-[#C9973A]/10 px-4 py-2.5 flex justify-end">
                  <button
                    onClick={() =>
                      setExpanded(expanded === item._id ? null : item._id)
                    }
                    className="text-xs font-bold text-[#7B1223] hover:text-[#C9973A] transition-colors"
                  >
                    {expanded === item._id
                      ? "Hide Details ▲"
                      : "View Details ▼"}
                  </button>
                </div>

                {/* Mobile Expanded Detail Section */}
                {expanded === item._id && (
                  <div className="bg-[#FDFAF5] p-4 border-t border-[#C9973A]/10">
                    <DetailView item={item} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function DetailView({ item }) {
  const skip = ["_id", "__v", "createdAt", "updatedAt"];
  const entries = Object.entries(item).filter(([k]) => !skip.includes(k));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
      {entries.map(([key, val]) => {
        let display = val;
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          const nonZero = Object.entries(val).filter(([, v]) => v > 0);
          display =
            nonZero.length > 0
              ? nonZero.map(([k, v]) => `${k}: ${v}`).join(", ")
              : "None selected";
        } else if (Array.isArray(val)) {
          display = val.join(", ");
        } else if (typeof val === "boolean") {
          display = val ? "Yes" : "No";
        }

        return (
          <div key={key}>
            <p className="text-[10px] font-bold text-[#8C7B6B] uppercase tracking-wider">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </p>
            {(key === "companyProfilePath" || key === "resumeFilePath") &&
            val ? (
              <a
                href={"/uploads/" + val}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#7B1223] underline hover:text-[#C9973A] transition-colors"
              >
                View / Download PDF
              </a>
            ) : (
              <p className="text-sm text-[#1C1C1C] mt-0.5 break-words">
                {display || "—"}
              </p>
            )}
          </div>
        );
      })}
      <div>
        <p className="text-[10px] font-bold text-[#8C7B6B] uppercase tracking-wider">
          Submitted At
        </p>
        <p className="text-sm text-[#1C1C1C] mt-0.5">
          {new Date(item.createdAt).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
