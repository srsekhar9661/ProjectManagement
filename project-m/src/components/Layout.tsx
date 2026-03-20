import Navbar from "./Navbar";

export default function Layout({ children }){
    return (
        <div className="bg-[#f8f9fa] w-screen">
            <Navbar />
            {children}
        </div>
    )
}