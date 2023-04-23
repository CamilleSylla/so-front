import Nav from "@/components/Nav";

export default function DefaultLayout ({children}) {

    return(
        <div>
            <div>
                <Nav/>
            {children}
            </div>
        </div>
    )
}