import { useDraggable } from "@dnd-kit/core"

function Draggable({id, data, children}: {children: React.ReactNode, id:string, data: any}){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id,
        data
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined

    return (
        <div ref={setNodeRef} className="" style={style} {...listeners} {...attributes}>
            {children}
        </div>
    )
}

export default Draggable
