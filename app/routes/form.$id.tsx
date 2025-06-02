import RenderFormElement from "@/components/renderFormElement";
import connectDB from "@/lib/db.server";
import { FormModel } from "@/models/Form";
import FormResponse from "@/models/FormResponse";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

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
    const [formSubmitted, setFormSubmitted] = useState(false)
    const fetcher = useFetcher()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        console.log(data)

        fetcher.submit(
            data,
            {
                method: 'POST',
                encType: 'application/json'
            }
        )

        setFormSubmitted(true)

    }

    useEffect(() => {
        if(fetcher?.data?.success){
            console.log(fetcher?.data)
        }
    }, [fetcher.data])
    return (
        <div className="w-vw min-h-dvh border bg-stone-100 pb-12">
            {
                formSubmitted ?
                    <div className="border flex flex-col gap-6 w-5/6 bg-white mx-auto  md:max-w-[550px] lg:max-w-[550px] p-6 mt-4 rounded-xl">
                        <h1 className="text-2xl"> Thanks for your response</h1>
                        <p>Your response has been submitted successfully!</p>
                    </div> :

                    <form onSubmit={handleSubmit} className="border flex flex-col gap-6 w-5/6 bg-white mx-auto  md:max-w-[550px] lg:max-w-[550px] p-6 mt-4 rounded-xl">
                        {
                            elements.map(item =>
                                <div key={item.id}>
                                    {<RenderFormElement element={item}/>}
                                </div>
                            )
                        }
                    </form>
            }
        </div>
    )
}

export const action: ActionFunction = async ({params, request}) => {
    const data = await request.json()
    await connectDB()

    const form = await FormModel.findById(params.id)

    if(!form){
        throw new Response('Form not found', {status: 400})
    }

    const stringData = JSON.stringify(data)

    const formResponse = await FormResponse.create({
        form_id: form._id,
        response: stringData
    })

    return json({success: true, formResponse})

}
