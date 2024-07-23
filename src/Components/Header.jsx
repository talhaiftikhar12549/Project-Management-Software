import NavButtons from "./NavButtons";
import NavBar from "./NavBar";

export default function Header() {
    return (
        <>
            <div className={"w-100"}>
            <NavButtons/>
            <NavBar/>
            </div>
        </>
    )
}