import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { startTransition, useEffect, useState } from "react"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Input } from "./ui/input"
import { IComCategory } from "@/lib/database/models/comcategory.model"
import { createComCategory, getAllComCategories } from "@/lib/actions/comcategory.action"
  
  type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
  }
  
  const ComDropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [comCategories, setComCategories] = useState<IComCategory[]>([])
    const [newComCategory, setNewComCategory] = useState('');
  
    const handleAddCategory = () => {
      createComCategory({
        comCategoryName: newComCategory.trim()
      })
        .then((ComCategory) => {
          setComCategories((prevState) => [...prevState, ComCategory])
        })
    }
  
    useEffect(() => {
      const getComCategories = async () => {
        const categoryList = await getAllComCategories();
  
        categoryList && setComCategories(categoryList as IComCategory[])
      }
  
      getComCategories();
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field bg-white">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {comCategories.length > 0 && comCategories.map((ComCategory) => (
            <SelectItem key={ComCategory._id} value={ComCategory._id} className="select-item p-regular-14">
              {ComCategory.name}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new category</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewComCategory(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default ComDropdown 