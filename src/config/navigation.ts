import { NavigationItem, UserNavigationItem } from "@/types/navigation";
import { User, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const mainNavigation: NavigationItem[] = [
  { name: "Hem", href: "/" },
  { name: "Teoriprov", href: "/teoriprov" },
  { name: "Övningar", href: "/ovningar" },
  // Lägg till fler navigationslänkar här
];

export const userNavigation: UserNavigationItem[] = [
  {
    name: "Min profil",
    href: "/profil",
    icon: User,
  },
  {
    name: "Inställningar",
    href: "/installningar",
    icon: Settings,
  },
  {
    name: "Logga ut",
    href: "#",
    icon: LogOut,
    onClick: () => signOut({ redirect: true, callbackUrl: "/" }),
  },
];
