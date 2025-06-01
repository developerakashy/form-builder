import RenderFormElement from "@/components/renderFormElement";
import connectDB from "@/lib/db.server";
import { FormModel } from "@/models/Form";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({params}) => {
    await connectDB()

    const form = await FormModel.findById(params.id)

    if(!form?.elements){
        throw new Response('Form not found', { status: 400 })
    }

    return json({elements: JSON.parse(JSON.parse(form.elements))})
}

export default function Index() {
    const {elements} = useLoaderData<typeof loader>()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        console.log(data)

    }
    return (
        <div className="w-vw min-h-dvh border bg-stone-100">
            <form onSubmit={handleSubmit} className="border flex flex-col gap-6 w-5/6 bg-white mx-auto  md:max-w-[550px] lg:max-w-[550px] p-6 mt-4 rounded-xl">
                {
                    elements.map(item =>
                        <div key={item.id}>
                            {<RenderFormElement element={item}/>}
                        </div>
                    )
                }
            </form>
        </div>
    )
}
