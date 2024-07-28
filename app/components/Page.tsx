export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-[100vh] text-sm">
        {children}
        </div>
    );
}
