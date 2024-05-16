const authorizedRoutes = ["/profile"];

export const RoutesAccess = {
  manager: [
    ...authorizedRoutes,
    "/dashboard/bookings",
    "/dashboard/restaurant",
    "/dashboard/employees",
    "/favorite",
  ],
  employee: [
    ...authorizedRoutes,
    "/dashboard/restaurant",
    "/dashboard/bookings",
    "/favorite",
  ],
  user: [...authorizedRoutes, "/favorite"],
};
