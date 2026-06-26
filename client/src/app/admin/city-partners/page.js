"use client";
import { useAdminAuth } from "../useAdminAuth";
import { AdminListPage } from "../AdminListPage";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function CityPartnersPage() {
  const { checked } = useAdminAuth();
  if (!checked) return null;

  return (
    <AdminListPage
      title="City Partner Applications"
      apiPath="/api/admin/city-partners"
      badgeColor="bg-[#8C7B6B]"
      columns={["Name", "Mobile", "City", "Target City", "Occupation", "Submitted"]}
      rowMapper={(item) => [
        item.fullName,
        item.mobile,
        item.city,
        item.targetCity,
        item.currentOccupation,
        formatDate(item.createdAt),
      ]}
    />
  );
}
