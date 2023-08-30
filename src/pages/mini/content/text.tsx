import {useEffect} from "react";
import {history} from "@umijs/max";
export  default ()=>{
    useEffect(() => {
        console.log(history.location.state)
    }, []);
    return (
        <>
            <p>Path: src/pages/mini/content/text.tsx</p>
            <p>Compare this snippet from src/pages/mini/content/content.tsx:</p>
            <p>Compare this snippet from src/pages/group/list.tsx:</p>
        </>
    )
}