import NavButtons from "./NavButtons";
import NavBar from "./NavBar";
import React, {useEffect, useState,} from 'react';
import PopupModal from "./PopupModal";
export default function Header() {
    const [show, setShow] = useState(false);

    return (
        <>

            <div className={"w-100"}>

                <PopupModal show={(show)}/>

                <NavButtons/>
                <NavBar/>
            </div>
        </>
    )
}