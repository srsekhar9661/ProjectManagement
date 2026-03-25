import { ReactNode } from "react"

export default function PageWrapper( { children } ){
    return (
        <div className="h-full overflow-y-auto p-6">
            {children}
        </div>
    )
}