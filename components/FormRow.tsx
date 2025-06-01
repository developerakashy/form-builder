import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"


function FormRow({id, children}:{id:string, children:React.ReactNode}){
    const {listeners, attributes, setNodeRef, transform, transition} = useSortable({
        id
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return(
        <div className={`${id === 'preview' ? 'opacity-50 border-dashed border-2' : ""} p-2 w-[500px] mx-auto`} ref={setNodeRef} {...listeners} {...attributes} style={style}>
            {children}
        </div>
    )
}

export default FormRow
