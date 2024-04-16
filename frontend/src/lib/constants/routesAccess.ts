const authorizedRoutes = ["/profile"];

export const RoutesAccess = {
  manager: [
    ...authorizedRoutes,
    "/dashboard/bookings",
    "/dashboard/restaurant",
    "/dashboard/employees",
  ],
  user: [...authorizedRoutes],
};
