import { DroppedItem } from "~/routes/_index"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"
import { Checkbox } from "./ui/checkbox"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

export const FormElements = [
  {
    "type": "heading",
    "text": "Form Heading",
  },
  {
    "type": 'paragraph',
    "text": "Form paragraph",
    "height": 7
  },
  {
    "type": "separator",
    "color": "#ccc",
  },
  {
    "type": "input",
    "label": "Text",
    "placeholder": "Enter text",
    "defaultValue": "",
    "required": false,
    "name": "text_input",
    "inputType": "text",
  },
  {
    "type": "textarea",
    "label": "Text Area",
    "placeholder": "Enter detailed text",
    "defaultValue": "",
    "required": false,
    "name": "textarea",
    "height": 22
  },
  {
    "type": "checkbox",
    "label": "Checkbox",
    "checked": false,
    "name": "checkbox",
    "height": 5
  },
  {
    "type": "radio",
    "label": "Radio Group",
    "name": "radio_group",
    "options": [
      { "label": "Option 1", "value": "option_1", "id": "nrefrgertghe" },
    ],
    "defaultValue": "",
    "required": "false"
  },
  {
    "type": "select",
    "label": "Dropdown",
    "name": "dropdown",
    "options": [
      { "label": "Select an option", "value": "default" },
      { "label": "Option A", "value": "a" },
      { "label": "Option B", "value": "b" }
    ],
    "defaultValue": "",
    "height": 10
  },
  {
    "type": "button",
    "label": "Submit Button",
    "variant": "default",
    "action": "submit",
  },
  {
    "type": "date",
    "label": "Date Picker",
    "name": "date",
    "defaultValue": ""
  },
  {
    "type": "switch",
    "label": "Toggle Switch",
    "name": "toggle",
    "checked": false
  },
]


function RenderFormElement({element}: {element:any}){
    switch(element.type){
        case 'input':
            return (
                <div className="flex flex-col gap-2">
                    <Label htmlFor={element.name}>{element.label || 'Label'}</Label>
                    <Input
                      type={element.inputType}
                      name={element.name}
                      id={element.name}
                      placeholder={element.placeholder}
                      required={element.required}
                      defaultValue={element.defaultValue}
                    />
                </div>
            )
        case 'button':
            return (
            <div className="">
              <Button variant={element.variant} type={element.action}>{element.label}</Button>
            </div>)
        case 'heading':
            return (
              <div className="font-semibold ">
                <h1 className="text-2xl">{element.text}</h1>
              </div>
            )
        case 'paragraph':
            return (
              <div className="">
                <p>{element.text}</p>
              </div>
            )
        case 'textarea':
            return (
              <div className="flex flex-col gap-2">
                <Label htmlFor={element.name}>{element.label}</Label>
                <Textarea placeholder={element.placeholder} name={element.name} id={element.name}/>
              </div>
            )
        case 'separator':
            return (
              <div className="h-2 flex items-center">
                <Separator orientation="horizontal"/>
              </div>
            )
        case 'checkbox':
          return (
            <div className="flex gap-2">
              <Checkbox name={element.name} id={element.name} />
              <Label htmlFor={element.name}>{element.label}</Label>
            </div>
          )
        case 'radio':
          return (
            <div className="flex flex-col gap-3">
              <Label htmlFor={element.name}>{element.label}</Label>
              <RadioGroup name={element.name} defaultValue={element.defaultValue}>
                {element.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value}/>
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )


        default:
          return null;


    }
}

export default RenderFormElement
