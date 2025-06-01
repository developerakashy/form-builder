import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

function ElementConfig({elementId, setDroppedItems, droppedItems}){
    const item = droppedItems.find(item => item.id === elementId)
    console.log(item)
    const [selectedType, setSelectedType] = useState(item?.inputType)
    console.log(selectedType)


    if(!item) return null

    return (
        <div className="w-64 border py-2 px-4">
            {item.type === 'input' &&
                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <p className="text-2xl font-medium mb-2">Input</p>
                        <Separator/>
                    </div>

                    <Label className="flex flex-col items-start gap-2">
                        Label
                        <Input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map(ele => ele.id === elementId ? ({...ele, name: e.target.value, label: e.target.value}) : ele)
                                )
                            }}

                        />
                    </Label>

                    <Label className="flex flex-col items-start gap-2">
                        Type
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={'Select Type'} />
                            </SelectTrigger>
                            <SelectContent >
                            <SelectGroup>
                                <SelectLabel>Select Type</SelectLabel>
                                {
                                ['text', 'email', 'number'].map((option) => (
                                    <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase()}{option.slice(1)}</SelectItem>
                                ))
                                }
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Label>

                    <Label className="flex flex-col items-start gap-2">
                        Placeholder
                        <Input
                            type="text"
                            value={item.placeholder}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map((ele) => ele.id === elementId ? ({...ele, placeholder: e.target.value}) : ele)
                                )
                            }}
                        />
                    </Label>

                    <Label htmlFor={item.name}>
                        <Checkbox
                            className="cursor-pointer"
                            id={item.name}
                            checked={item.required}
                            onCheckedChange={(checked) => {
                                    setDroppedItems(prev => prev.map(ele => ele.id === elementId ? ({...ele, required: checked}) : ele))
                            }}
                        />
                    Required</Label>
                </div>
            }


            {item.type === 'heading' &&
                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <p className="text-2xl font-medium mb-2">Heading</p>
                        <Separator/>
                    </div>

                    <Label className="flex flex-col items-start gap-2">
                        Heading
                        <Input
                            type="text"
                            value={item.text}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map((ele) => ele.id === elementId ? ({...ele, text:e.target.value}) : ele)
                                )
                            }}
                        />
                    </Label>

                </div>
            }

            {item.type === 'paragraph' &&
                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <p className="text-2xl font-medium mb-2">Paragraph</p>
                        <Separator/>
                    </div>

                    <Label className="flex flex-col items-start gap-2">
                        Paragraph
                        <Input
                            type="text"
                            value={item.text}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map((ele) => ele.id === elementId ? ({...ele, text:e.target.value}) : ele)
                                )
                            }}
                        />
                    </Label>

                </div>
            }

            {item.type === 'textarea' &&
                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <p className="text-2xl font-medium mb-2">Textarea</p>
                        <Separator/>
                    </div>

                    <Label className="flex flex-col items-start gap-2">
                        Label
                        <Input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map((ele) => ele.id === elementId ? ({...ele, label:e.target.value, name:e.target.value}) : ele)
                                )
                            }}
                        />
                    </Label>

                    <Label className="flex flex-col items-start gap-2">
                        Placeholder
                        <Input
                            type="text"
                            value={item.placeholder}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map((ele) => ele.id === elementId ? ({...ele, placeholder:e.target.value}) : ele)
                                )
                            }}
                        />
                    </Label>

                    <Label htmlFor={item.name}>
                        <Checkbox
                            className="cursor-pointer"
                            id={item.name}
                            checked={item.required}
                            onCheckedChange={(checked) => {
                                    setDroppedItems(prev => prev.map(ele => ele.id === elementId ? ({...ele, required: checked}) : ele))
                            }}
                        />
                    Required</Label>

                </div>
            }

            {item.type === 'checkbox' &&
                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <p className="text-2xl font-medium mb-2">Checkbox</p>
                        <Separator/>
                    </div>

                    <Label className="flex flex-col items-start gap-2">
                        Label
                        <Input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map((ele) => ele.id === elementId ? ({...ele, label:e.target.value}) : ele)
                                )
                            }}
                        />
                    </Label>

                </div>
            }


            {item.type === 'radio' && //need work on it
                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <p className="text-2xl font-medium mb-2">Radio</p>
                        <Separator/>
                    </div>

                    <Label className="flex flex-col items-start gap-2">
                        Label
                        <Input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map((ele) => ele.id === elementId ? ({...ele, label:e.target.value}) : ele)
                                )
                            }}
                        />
                    </Label>

                    <Separator/>

                    <div className="flex flex-col gap-4">
                        <Label>Options</Label>
                        <div className="flex flex-col gap-4">
                            {
                                item.options.map((option, index) =>
                                    <Input
                                        key={`${option.label}-${index}`}
                                        type="text"
                                        value={option.value}
                                        onChange={(e) => {
                                            setDroppedItems(prev =>

                                                    prev.map(ele => {
                                                        if(ele.id === elementId){
                                                            const updatedOptions = ele.options.map((opt, i) => index === i ? ({value: e.target.value, label: e.target.value}) : opt)
                                                            return {...ele, options: updatedOptions}
                                                        }

                                                        return ele
                                                    })

                                            )
                                        }}
                                    />
                                )
                            }
                        </div>
                        <Button
                            onClick={() => {
                                setDroppedItems(prev =>
                                    prev.map(ele => ele.id === elementId ? ({...ele, options: [...ele.options, {id:crypto.randomUUID() ,value: 'option', label: 'option'}]}) : ele)
                                )
                            }}
                        >Add</Button>
                    </div>

                </div>
            }

            {item.type === 'button' && //need work on it
                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <p className="text-2xl font-medium mb-2">Radio option</p>
                        <Separator/>
                    </div>

                    <Label className="flex flex-col items-start gap-2">
                        Name
                        <Input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                                setDroppedItems(prev =>
                                    prev.map((ele) => ele.id === elementId ? ({...ele, label:e.target.value}) : ele)
                                )
                            }}
                        />
                    </Label>

                </div>
            }
        </div>
    )
}

export default ElementConfig
