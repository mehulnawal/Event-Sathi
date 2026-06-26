"use client";
import { useAdminAuth } from "../useAdminAuth";
import { AdminListPage } from "../AdminListPage";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function TatkalPage() {
  const { checked } = useAdminAuth();
  if (!checked) return null;

  return (
    <AdminListPage
      title="Tatkal / Emergency Requests"
      apiPath="/api/admin/tatkal"
      badgeColor="bg-[#D94F3D]"
      columns={["Name", "Mobile", "City", "Event Type", "Event Date", "Submitted"]}
      rowMapper={(item) => [
        item.fullName,
        item.mobileNumber,
        item.city,
        item.eventType === "Other" ? item.customEventType || "Other" : item.eventType,
        item.eventDate,
        formatDate(item.createdAt),
      ]}
    />
  );
}
