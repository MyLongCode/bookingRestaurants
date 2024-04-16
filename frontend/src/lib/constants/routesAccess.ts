const commonRoutes = ["/restaurants"];
const authorizedRoutes = [...commonRoutes, "/profile"];

export const RoutesAccess = {
  manager: [...authorizedRoutes, "/dashboard/bookings"],
  user: [...authorizedRoutes],
  unauthorized: [...commonRoutes],
};
