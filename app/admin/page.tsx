"use client"
import * as React from "react"
import { useState } from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Admin = () => {
  const [division, setDivision] = useState("")
  const [destination, setDestination] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<File[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
      const maxSize = 2 * 1024 * 1024 ;
  
      const validFiles = Array.from(e.target.files).filter(
        (file) => allowedTypes.includes(file.type) && file.size <= maxSize
      )
      setImages((prevImages) => [...prevImages, ...validFiles])
    }
  }
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    
    const formData = new FormData();
    formData.append("division", division);
    formData.append("destination", destination);
    formData.append("name", name);
    formData.append("description", description);
    
    images.forEach((image, index) => {
        formData.append(`images[${index}]`, image); 
      })
      
      
    try {
        const response  = await fetch('http://localhost:3000/api/singleplace',
            {
              method: 'POST',
              body: formData
            }
        )

        if (response.ok) {
            alert("Uploaded successfully!")

            setDivision("")
            setDestination("")
            setName("")
            setDescription("")
            setImages([])
          } else {
            alert("Failed to upload!")
          }

    } catch (error) {
        console.error("Error uploading data:", error)
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px] p-4 shadow-lg">
        <CardHeader>
          <CardTitle>TripVerse Admin</CardTitle>
          <CardDescription>Add destination to the TripVerse Universe</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">

             

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="destination">Division</Label>
                <Select onValueChange={setDivision}>
                  <SelectTrigger id="division">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                    <SelectItem value="khulna">Khulna</SelectItem>
                    <SelectItem value="barishal">Barishal</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi</SelectItem>
                    <SelectItem value="rangpur">Rangpur</SelectItem>
                    <SelectItem value="mymensingh">Mymensingh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
             
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="destination">Destination</Label>
                <Select onValueChange={setDestination}>
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="city">City Tour</SelectItem>
                    <SelectItem value="offbeat">Offbeat Places</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your Place"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

             
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Describe the place..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="images">Images</Label>
                <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg
                      className="w-10 h-10 mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V12m0 0V8m0 4H3m4 0h4m-4 0v4m0-4h4M21 12.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-4.5 0v.01"
                      ></path>
                    </svg>
                    <span className="text-sm">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-400">PNG, JPG (Max 2MB)</span>
                  </div>
                </div>
              </div>

             
              {images.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Uploaded Images:</h3>
                  <div className="flex space-x-4 mt-2">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="button" onClick={() => {
                setDivision("")
                setDestination("")
                setName("")
                setDescription("")
                setImages([])
              }}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Submit
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Admin
