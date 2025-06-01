import connectDB from "@/lib/db.server";
import { FormModel } from "@/models/Form";
import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({request}) => {
    const {name} = await request.json()
    await connectDB()

    const newForm = await FormModel.create({
        name
    })

    return json({success: true, _id: newForm._id})
}
