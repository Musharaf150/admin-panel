"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { CompaignFormSchema } from "@/lib/validator"
import { compaignDefaultValues } from "@/constants"
import Compaign, { ICompaign } from "@/lib/database/models/compaign.model"
import { Input } from "./ui/input"
import ComDropdown from "./ComDropDown"
import { Textarea } from "./ui/textarea"
import { FileUploader } from "./FileUploader"
import Image from "next/image"
import DatePicker from "react-datepicker"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useUploadThing } from "@/lib/uploadthing"
import { createCompaign, updateCompaign } from "@/lib/actions/compaign.action"
import { Checkbox } from "./ui/checkbox"


type CompaignFormProps ={
    userId: string,
    type: 'Create' | 'Update'
    compaign?: ICompaign,
  compaignId?: string
}

const CompaignForm = ({userId,type,compaign,compaignId}:CompaignFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues = compaign && type === 'Update' 
    ? { 
      ...compaign, 
      startDateTime: new Date(compaign.startDateTime), 
      endDateTime: new Date(compaign.endDateTime) 
    }
    : compaignDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof CompaignFormSchema>>({
    resolver: zodResolver(CompaignFormSchema),
    defaultValues: initialValues
  })

  async function onSubmit(values: z.infer<typeof CompaignFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === 'Create') {
        try {
          const newCompaign = await createCompaign({
            compaign: {
                ...values, imageUrl: uploadedImageUrl},
            userId,
            path: '/compaigns'
          })
  
          if(newCompaign) {
            form.reset();
            router.push(`/compaigns/${newCompaign._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      if(type === 'Update') {
        try {
          const updatedCompaign = await updateCompaign({
            userId,
            compaign: { ...values, imageUrl: uploadedImageUrl,_id: compaignId },
            path: `/compaigns/${compaignId}`
          })
  
          if(updatedCompaign) {
            form.reset();
            router.push(`/compaigns/${updatedCompaign._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Compaign title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comCategoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <ComDropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader 
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">Start Date: </p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date | null) => {
                            if (date) {
                              field.onChange(date); // Handle non-null date values
                            }
                          }}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="bg-gray-50"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
          <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date | null) => {
                            if (date) {
                              field.onChange(date); // Handle non-null date values
                            }
                          }}                        
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="bg-gray-50"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>


        <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/dollar.svg"
                        alt="dollar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <Input type="number" placeholder="Goal Amount" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                      <FormField
                        control={form.control}
                        name="isZakatEligible"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center">
                                <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Zakat Eligible</label>
                                <Checkbox
                                  onCheckedChange={field.onChange}
                                  checked={field.value}
                                id="isZakatEligible" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                              </div>
          
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              
        </div>


        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Creating...'
          ): `${type} Compaign `}</Button>
      </form>
    </Form>
  )
}

export default CompaignForm
function startUpload(files: File[]) {
    throw new Error("Function not implemented.")
}

