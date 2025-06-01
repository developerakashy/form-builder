import { useDroppable } from "@dnd-kit/core"
import { Children } from "react"
import { DotPattern } from "./magicui/dot-pattern"

function Droppable({id, children}: {children: React.ReactNode, id:string}){
    const {isOver, setNodeRef} = useDroppable({
        id
    })

    return (
        <div ref={setNodeRef} className={` min-h-dvh w-[700px] z-10 mt-13 mx-auto`}>


            {children}

        </div>
    )
}

export default Droppable
