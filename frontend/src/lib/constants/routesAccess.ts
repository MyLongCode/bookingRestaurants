const authorizedRoutes = ["/profile"];

export const RoutesAccess = {
  manager: [
    ...authorizedRoutes,
    "/dashboard/bookings",
    "/dashboard/restaurant",
    "/dashboard/employees",
  ],
  employee: [
    ...authorizedRoutes,
    "/dashboard/restaurant",
    "/dashboard/bookings",
  ],
  user: [...authorizedRoutes, "/favorite"],
};
