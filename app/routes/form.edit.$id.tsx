import { DndContext, DragCancelEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { act, useEffect, useState } from "react";
import Draggable from "@/components/draggable";
import RenderFormElement, { FormElements } from "@/components/renderFormElement";
import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import Droppable from "@/components/droppable";
import ElementConfig from "@/components/ElementConfig";
import connectDB from "@/lib/db.server";
import { FormModel } from "@/models/Form";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { X } from "lucide-react";
import { toast } from "sonner";



export const loader: LoaderFunction = async ({ params }) => {
  console.log(params)
  await connectDB()

  const form = await FormModel.findById(params.id)

  if(!form){
    throw new Response("Form not found", { status: 400 })
  }

  return json({_id: form._id, name: form.name, elements: form.elements ? JSON.parse(JSON.parse(form.elements)) : [] })
}

export default function Index() {
  const {_id, name, elements} = useLoaderData<typeof loader>()
  const [droppedItems, setDroppedItems] = useState(elements)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fetcher = useFetcher()

  console.log(elements)


  const handleFormUpdate = (elements) => {
    fetcher.submit(
      {
        elements: JSON.stringify(elements)
      },
      {
        method: 'POST',
        encType: 'application/json'
      }
    )
  }


  const removeElement = (id) => {
    setDroppedItems(prev =>
        prev.filter(ele => ele.id !== id)
    )
  }

  useEffect(() => {
    if (fetcher.data?.success) {
      toast.success('Form updated successfully')
    }
  }, [fetcher.data]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log('Playground updated')
      handleFormUpdate(droppedItems)
    }, 1200)

    return () => {
      clearTimeout(timeout)
    }
  }, [droppedItems])
  console.log(droppedItems)

  const getPosition = (id: string) => droppedItems.findIndex(item => item.id === id)

  function handleDragEnd(event: DragEndEvent){
    const {over, active} = event
    console.log(active)

    if(!over) {
      setDroppedItems(prev => prev.filter(item => item.id !== 'preview'))
      return
    }

    if(active.id.toString().startsWith('palette:')){
      setDroppedItems(prev =>
        prev.map(item => item.id === 'preview' ? ({...item, id: crypto.randomUUID()}) : item)
      )

    } else {

      setDroppedItems(() => {
        const oldPos = getPosition(active.id.toString())
        const newPos = getPosition(over.id.toString())

        return arrayMove(droppedItems, oldPos, newPos)

      })
    }


  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    console.log(active)

    if(!over) return

    const isFormPallete = active.id.toString().startsWith('palette:')
    console.log(isFormPallete)

    if(isFormPallete){
      const elementData = active.data.current
      const newItem = {
        ...elementData,
        id: 'preview', //Reserved
      }

      const overIndex = droppedItems.findIndex((item) => item.id === over.id)

      const exists = droppedItems.find(item => item.id === 'preview')

      console.log(droppedItems)

      console.log(overIndex)
      if(!exists){
        const updated = [...droppedItems]
        updated.splice(overIndex >= 0 ? overIndex : droppedItems.length, 0, newItem)
        setDroppedItems(updated)
      }else if(overIndex >= 0){

        const activeIndex = droppedItems.findIndex(item => item.id === 'preview')
        setDroppedItems(arrayMove(droppedItems, activeIndex, overIndex))

      }

    }

    console.log(droppedItems)

  }

  function handleDragCancel(event: DragCancelEvent) {
    console.log("Drag cancelled", event);
    setDroppedItems((prev) => prev.filter((item) => item.id !== 'preview'));
  }


  return (

    <div className="bg-stone-100">


      <DndContext onDragCancel={handleDragCancel} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>



        <header className="flex z-20 bg-white justify-between items-center px-4 py-2 border fixed inset-x-0 top-0">
            <p className="font-semibold">FormBuilder</p>
            <p className="font-semibold">{name}</p>
            <div className="flex gap-2 items-center">
                {/* <Button onClick={() => saveForm('New Form', droppedItems)}>Create a new form</Button> */}
                {/* <Button className="cursor-pointer" variant="outline" onClick={() => handleFormUpdate(droppedItems)}>Update form</Button> */}
                <Link  to={`/form/${_id}`}>
                  <Button className="cursor-pointer" variant="default">view</Button>
                </Link>

            </div>
        </header>


        <div className="p-4 fixed bg-white left-2 top-16 rounded-xl flex flex-col gap-6">
          {FormElements.map(ele =>
            <Draggable key={ele.name ? ele.name : ele.type} data={ele} id={`palette:${ele.type}:${ele.inputType ? ele.inputType : ""}`}>
              {<RenderFormElement element={ele}/>}
            </Draggable>
          )}
        </div>

        <Droppable id="form-elements" >
          <SortableContext items={droppedItems} strategy={verticalListSortingStrategy}>
            <div className="p-6 flex flex-col gap-2 item-center h-full">



                {
                  droppedItems.map((item) => (
                    <FormRow key={item.id} id={item.id}>
                      {
                        <div
                        className={`${selectedId === item.id ? 'border-blue-500' : ''} p-2 border border-2 border-dashed bg-white relative`}

                        onPointerDown={(e) => {
                            if(e.target.dataset.id){
                                setTimeout(() => {
                                    removeElement(e.target.dataset.id)

                                }, 200)
                                return
                            }

                            const startX = e.clientX
                            const startY = e.clientY
                            console.log(startX)

                            const handlePointerUp = (upEvent: PointerEvent) => {
                                const dx = Math.abs(upEvent.clientX - startX);
                                const dy = Math.abs(upEvent.clientY - startY);
                                const dragged = dx > 5 || dy > 5;

                                if (!dragged) {
                                console.log("Clicked element, not dragged");
                                setSelectedId(item.id);
                                }


                                document.removeEventListener("pointerup", handlePointerUp);
                            };

                            document.addEventListener("pointerup", handlePointerUp);
                        }}

                        >


                          <RenderFormElement element={item}/>
                            <div className="absolute -right-2.5 -top-2.5 group">
                                <button data-id={item.id} variant="ghost" className="cursor-pointer p-1 bg-stone-200 group-hover:bg-red-200 rounded-full">
                                    <X className="h-3 w-3 pointer-events-none stroke-stone-500 group-hover:stroke-red-600"/>
                                </button>
                            </div>

                        </div>
                      }

                    </FormRow>

                  ))
                }

            </div>
          </SortableContext>
        </Droppable>

        {selectedId &&
          <div className="fixed right-2 bg-white rounded-xl top-14 max-w-[350px] border">
            <ElementConfig elementId={selectedId} setDroppedItems={setDroppedItems} droppedItems={droppedItems}/>
          </div>
        }


      </DndContext>
    </div>

  );


}


export const action: ActionFunction = async ({ request, params}) => {
  const body = await request.json()

  await connectDB()

  const updatedForm = await FormModel.findByIdAndUpdate(
    params.id,
    {
      elements: JSON.stringify(body.elements)
    },
    {
      new: true
    }
  )

  return json({ success: true, form: updatedForm });
}
