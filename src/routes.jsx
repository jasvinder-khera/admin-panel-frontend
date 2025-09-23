import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ArrowUpTrayIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import ProtectedRoute from "./services/ProtectedRoute";
import AuthRoute from "./services/AuthRoute";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const dashboardRoutes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: (<ProtectedRoute>
          <Home />
        </ProtectedRoute>),
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Add Details",
        path: "/profile",
        element: (<ProtectedRoute>
        <Profile />
        </ProtectedRoute>),
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element:(<ProtectedRoute> <Profile /> </ProtectedRoute>),
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: (<ProtectedRoute> <Tables /> </ProtectedRoute>),
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: (<ProtectedRoute><Notifications /> </ProtectedRoute>),
      },
    ],
  },
]
 export const authRoutes = [
  {
    icon: <ServerStackIcon {...icon} />,
    name: "sign in",
    path: "/sign-in",
    element: (<AuthRoute><SignIn /> </AuthRoute>),
  },
  {
    icon: <RectangleStackIcon {...icon} />,
    name: "sign up",
    path: "/sign-up",
    element: (<AuthRoute><SignUp /> </AuthRoute>),
  },
];


export const routes = [
  {
    layout: "dashboard",
    pages: dashboardRoutes,
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: authRoutes,
  },
];
