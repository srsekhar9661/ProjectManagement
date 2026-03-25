import Navbar from "./Navbar";

export default function Layout({ children }){
    return (
        <div className="bg-[#f8f9fa] h-full flex flex-col overflow-hidden">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            <div className="flex-1 w-full flex overflow-hidden">
                
                {children}
            </div>
        </div>
    )
}