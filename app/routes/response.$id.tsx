import connectDB from "@/lib/db.server";
import { FormModel } from "@/models/Form";
import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData, useNavigation } from "@remix-run/react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FormResponse from "@/models/FormResponse";
import Loader from "@/components/loading";


export const loader: LoaderFunction = async ({params}) => {
    await connectDB()

    const formInfo = await FormModel.findById(params.id)

    if(!formInfo){
        throw new Response('Form not found', {status: 400})
    }
    const formResponse = await FormResponse.find({form_id: params.id})

    return json({formInfo, formResponse})
}

export default function Index(){
    const {formInfo, formResponse} = useLoaderData<typeof loader>()
    let formElements = JSON.parse(JSON.parse(formInfo.elements))
    let formResponseArr = formResponse.map(response => ({...JSON.parse(response.response), _id: response._id}))
    const navigation = useNavigation()
    formElements = formElements.filter(ele => ele.name )
    console.log(formElements)
    console.log(formResponseArr)

    if(navigation.state === 'loading'){
        return (
            <Loader/>
        )
    }

    return (
        <div className="px-12">

            <h1 className="my-4 font-semibold">Form Response: {formInfo.name}</h1>
            <p className="">Total: {formResponseArr.length}</p>

            <Table className="border ">
                <TableCaption>A list of responses.</TableCaption>
                <TableHeader>
                <TableRow>
                    {
                        formElements.map(row =>
                            <TableHead key={row.id}>{row.label}</TableHead>
                        )
                    }
                </TableRow>
                </TableHeader>
                <TableBody>
                {formResponseArr.length === 0 ?
                    <TableRow>
                        <TableCell className="">No responses</TableCell>
                    </TableRow>
                :
                formResponseArr.map((form) =>
                        <TableRow key={form._id}>
                        {
                            formElements.map(ele =>

                                <TableCell className="font-medium">{form[ele.name] || "-"}</TableCell>
                            )
                        }

                        </TableRow>
                )
                }
                </TableBody>
            </Table>
        </div>
    )
}
