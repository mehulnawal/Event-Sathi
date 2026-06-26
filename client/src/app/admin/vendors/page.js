"use client";
import { useAdminAuth } from "../useAdminAuth";
import { AdminListPage } from "../AdminListPage";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function VendorsPage() {
  const { checked } = useAdminAuth();
  if (!checked) return null;

  return (
    <AdminListPage
      title="Vendor Registrations"
      apiPath="/api/admin/vendors"
      badgeColor="bg-[#C9973A]"
      columns={["Business", "Contact", "Mobile", "City", "Category", "Emergency", "Submitted"]}
      rowMapper={(item) => [
        item.businessName,
        item.contactName,
        item.mobile,
        item.city,
        Array.isArray(item.category) ? item.category.join(", ") : item.category,
        item.emergencyAvailability,
        formatDate(item.createdAt),
      ]}
    />
  );
}
