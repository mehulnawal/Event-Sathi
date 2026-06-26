"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, getAdminUser } from "./adminAuth";

export function useAdminAuth() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setUsername(getAdminUser() || "Admin");
    setChecked(true);
  }, []);

  return { username, checked };
}
