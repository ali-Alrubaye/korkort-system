export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

export interface UserNavigationItem extends NavigationItem {
  onClick?: () => void;
}
