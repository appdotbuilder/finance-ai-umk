import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Folder, 
    LayoutGrid, 
    CreditCard, 
    Bot, 
    FileText, 
    PieChart,
    Wallet
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Transactions',
        href: '/transactions',
        icon: CreditCard,
    },
    {
        title: 'Accounts',
        href: '/accounts',
        icon: Wallet,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: FileText,
    },
    {
        title: 'Analytics',
        href: '/analytics',
        icon: PieChart,
    },
    {
        title: 'AI Insights',
        href: '/ai-insights',
        icon: Bot,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Help Center',
        href: '/help',
        icon: BookOpen,
    },
    {
        title: 'API Docs',
        href: '/api-docs',
        icon: Folder,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
