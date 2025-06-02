import { closestCorners, DndContext, DragCancelEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ActionFunction, json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { act, useEffect, useState } from "react";
import Draggable from "@/components/draggable";
import RenderFormElement, { FormElements } from "@/components/renderFormElement";
import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import Droppable from "@/components/droppable";
import ElementConfig from "@/components/ElementConfig";
import connectDB from "@/lib/db.server";
import { FormModel } from "@/models/Form";
import { Link, redirect, useFetcher, useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loader from "@/components/loading";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader:LoaderFunction = async () => {
  await connectDB()

  const forms = await FormModel.find()

  return json({forms})

}


export default function Index() {
  const {forms} = useLoaderData()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const fetcher = useFetcher()
    const navigation = useNavigation()


  const saveForm = async (name:string) => {
    if(loading) return
    setLoading(true)
    const res = await fetch('/create_form', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name
      })
    })

    const data = await res.json()

    console.log('form saved', data)

    setLoading(false)
    return navigate(`/form/edit/${data._id}`)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData.get('name'))
    saveForm(formData.get('name'))
  }

  useEffect(() => {

    if(fetcher?.data?.success){
      toast.success(`${fetcher?.data?.deleted?.name?.toUpperCase()} Form deleted`)
    }
  }, [fetcher.data])

  const deleteForm = (id) => {
    fetcher.submit(
      {
        _id: id
      },
      {
        method: 'POST',
        encType: 'application/json'
      }
    )
  }

  if(navigation.state === "loading"){
    return (
      <Loader/>
    )
  }

  return (
      <div  className="">
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-12 py-2 border">
          <p className="font-semibold">FormBuilder</p>



        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Create</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Form creation</DialogTitle>
            <DialogHeader>
              <p>Form Name</p>
            </DialogHeader>


            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="w-full">
                <label hidden htmlFor="name">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="cursor-pointer">Close</Button>
                </DialogClose>
                <Button className="cursor-pointer" type="submit">{loading ? 'Creating...' : 'Create'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

         </header>


        <div className="mt-18 px-12">
              <h1 className="font-bold p-2 text-xl">Forms created</h1>
              <Table className="border ">
                <TableCaption>A list of your recent created forms.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                    <TableHead className=""></TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {
                  forms.map((form) =>
                        <TableRow key={form._id}>
                          <TableCell className="font-medium">{form.name}</TableCell>
                          <TableCell>
                            <Link to={`/form/${form._id}`}>
                              <Button variant="link" className="cursor-pointer">View</Button>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link to={`/form/edit/${form._id}`}>
                              <Button variant="outline" className="cursor-pointer">Edit</Button>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link to={`/response/${form._id}`}>
                              <Button variant="outline" className="cursor-pointer">view reponse</Button>
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button onClick={() => deleteForm(form._id)} variant="destructive" className=" cursor-pointer">Delete</Button>
                          </TableCell>
                        </TableRow>
                  )
                }
                </TableBody>
              </Table>

        </div>
      </div>

  );

}

export const action:ActionFunction = async ({request}) => {
  const { _id } = await request.json()
  await connectDB()

  const deleted = await FormModel.findByIdAndDelete(_id)

  return json({success:true, deleted})
}
