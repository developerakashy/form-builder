import mongoose, { mongo, Schema } from "mongoose";

const FormResponseSchema = new Schema({
    form_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    response: {
        type: String
    }
}, {timestamps: true})

const FormResponse = mongoose.model('FormResponse', FormResponseSchema)

export default FormResponse
