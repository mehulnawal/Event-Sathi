// Admin token helpers
export const getAdminToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("es_admin_token");
};

export const setAdminToken = (token, username) => {
  localStorage.setItem("es_admin_token", token);
  localStorage.setItem("es_admin_user", username);
};

export const clearAdminToken = () => {
  localStorage.removeItem("es_admin_token");
  localStorage.removeItem("es_admin_user");
};

export const getAdminUser = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("es_admin_user");
};

export const adminFetch = async (path, options = {}) => {
  const token = getAdminToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token || "",
      ...(options.headers || {}),
    },
  });
  return res;
};
