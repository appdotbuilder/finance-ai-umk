

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <span className="text-sm font-bold">FA</span>
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">FinanceAI</span>
                <span className="truncate text-xs text-sidebar-foreground/70">Smart Finance for UMK</span>
            </div>
        </>
    );
}
