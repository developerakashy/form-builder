import mongoose, { Schema } from 'mongoose'

const formSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    elements: {
        type: String
    }
}, {timestamps: true})

export const FormModel = mongoose.model('Form', formSchema)
