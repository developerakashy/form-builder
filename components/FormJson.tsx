const JSON_FORM = {
    "form-id": "random-id",
    "title": "form name",
    "description": "something about form",
    "theme": "light",
    "steps": [
        {
            "stepTitle": "Title for step form",
            "fiels": [
                {
                    "id": "random-unique-id",
                    "type": "input",
                    "inputType": "email",
                    "name": "field_name",
                    "label": "Field Label",
                    "required": false,
                    "tooltip": "Help the user with this field",
                    "placeholder": "Enter something...",
                    "options": [
                        {
                        "name": "opt1",
                        "label": "Option 1",
                        "value": "option1"
                        }
                    ],
                    "validations": {
                        "regex": {
                        "pattern": "^[a-zA-Z]+$",
                        "helpText": "Only letters allowed"
                        },
                        "min": {
                        "value": 2,
                        "helpText": "Minimum length is 2"
                        },
                        "max": {
                        "value": 10,
                        "helpText": "Maximum length is 10"
                        }
                    },
                    "hidden": false
                }

            ]
        }
    ]
}

export type FieldType = 'input' | 'textarea' | 'button' | 'radio' | 'checkbox' | 'date' | 'time' | 'dropdown' | 'label' | 'heading' | 'subheading' | 'url'
export type FieldInputType = 'email' | 'text' | 'number'

export interface FieldOption {
    name: string
    value: string
    label: string
}

export interface FieldValidations {
    regex?: {
        pattern: string,
        helpText: string
    }
    min?: {
        value: number | string
        helpText?: string
    }
    max?: {
        value: number | string
        helpText?: string
    }
}

export interface FormField {
    id: string
    type: FieldType
    inputType?: FieldInputType
    name: string
    label: string
    hidden?: boolean
    required?: boolean
    toolTip?:  string
    placeholder?: string
    options?: FieldOption[]
    validations?: FieldValidations
}


export interface FormStep {
    stepTitle: string
    fields: FormField[]
}

export interface FormSchema {
    id: string
    title: string
    description: string
    theme?: 'light' | 'dark'
    steps: FormStep[]
}


export const PREDEFINED_FIELDS:FormField[] = [
    {
        id: 'input-1',
        type: 'input',
        name: 'input-1',
        inputType: 'text',
        label: 'Text',
        placeholder: 'Enter value...',
        required: false,
        hidden: false,
        toolTip: '',
        validations: {
            min: { value: 2, helpText: 'Too short' },
            max: { value: 50, helpText: 'Too long' }
        }
    },
    {
        id: 'input-2',
        type: 'input',
        name: 'input-2',
        inputType: 'email',
        label: 'Email',
        placeholder: 'Enter value...',
        required: false,
        hidden: false,
        toolTip: '',
        validations: {
            regex: {
                pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
                helpText: 'Must be a valid email'
            }
        }
    },
    {
        id: 'input-3',
        type: 'input',
        name: 'input-3',
        inputType: 'number',
        label: 'Number',
        placeholder: 'Enter value...',
        required: false,
        hidden: false,
        toolTip: '',
        validations: {
            min: { value: 1, helpText: 'Must be at least 1' },
            max: { value: 100, helpText: 'Must be at most 100' }
        }
    },
    {
        id: 'label-1',
        type: 'label',
        name: 'label-1',
        label: 'Label',
        required: false,
        hidden: false
    },
    {
        id: 'button-1',
        type: 'button',
        name: 'button-1',
        label: 'Submit',
        required: false,
        hidden: false
    },
    {
        id: 'heading-1',
        type: 'heading',
        name: 'heading-1',
        label: 'Text For Heading',
    },
    {
        id: 'subheading-1',
        type: 'subheading',
        name: 'subheading-1',
        label: 'Text For SubHeading',
    },
    {
        id: 'url-1',
        type: 'url',
        name: 'url-1',
        label: 'Url',
        placeholder: 'Enter value...',
        required: false,
        hidden: false,
        validations: {
            regex: {
            pattern: "^(https?:\\/\\/)?([\\w\\-]+\\.)+[\\w\\-]{2,}(\\/\\S*)?$",
            helpText: "Enter a valid URL"
            }
        }
    },
    {
        id: 'date-1',
        type: 'date',
        name: 'date-1',
        label: 'Date',
        required: false,
        hidden: false,
    },
    {
        id: 'time-1',
        type: 'time',
        name: 'time-1',
        label: 'Time',
        required: false,
        hidden: false
    },
    {
        id: 'textarea-1',
        type: 'textarea',
        name: 'textarea-1',
        label: 'Textarea',
        placeholder: 'Enter value...',
        required: false,
        hidden: false
    },
    {
        id: 'checkbox-1',
        type: 'checkbox',
        name: 'checkbox-1',
        label: 'Label',
        required: false,
        hidden: false,
        options: [
            { name: 'option 1', label: 'Option 1', value: 'option 1' }
        ]
    },
    {
        id: 'radio-1',
        type: 'radio',
        name: 'radio-1',
        label: 'Label',
        required: false,
        hidden: false,
        options: [
            { name: 'option 1', label: 'Option 1', value: 'option 1' }
        ]
    },
    {
        id: 'dropdown-1',
        type: 'dropdown',
        name: 'dropdown-1',
        label: 'Label',
        required: false,
        hidden: false,
        options: [
            { name: 'option 1', label: 'Option 1', value: 'option 1' }
        ]
    }
]
