// import { Input } from 'postcss'
import React from 'react'
// import { Input } from 'postcss'

function SubmitProject() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center">
      <div className="w-full">
        <div className="space-y-12 md:text-center">
          <div className="max-w-3xl pt-7 mb-10 space-y-5 sm:mx-auto sm:space-y-4">
              <h2 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">Submit a project</h2>
                <p className="text-xl text-gray-500">Fill this form to submit a project.</p>
                  </div>
            </div>

              <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
              <div>

                {/* PROJECT IMAGE UPLOAD */}

                  <div className="">
                    <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Project Image</label>
                
                  </div>
                    <div className="mb-2 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Click here to upload</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">an image file</p>
                      </div>
                    </div>
                  </div>
              

                <form action="">
                  <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Project name</label>
                    <input type="text" id="name" name="name" placeholder="Enter project name." className="border border-gray-300 shadow p-3 w-full rounded"/>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Description</label>
                    <input type="text" id="name" name="name" placeholder="" className="border border-gray-300 shadow p-3 py-10 w-full rounded"/>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="country" className="block mb-2 font-bold text-gray-600">Country</label>
                    <select id="country" name="country" autoComplete="country-name" className="mt-1 block w-full py-4 p-3  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>United States</option>
                        <option>Philipines</option>
                        <option>France</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Budget</label>
                    <input type="text" id="name" name="name" placeholder="Enter project budget.(USD)" className="border border-gray-300 shadow p-3 w-full rounded"/>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Duration</label>
                    <input type="text" id="name" name="name" placeholder="Enter duration in days." className="border border-gray-300 shadow p-3 w-full rounded"/>
                  </div>
                  



                  <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">Submit</button>
                </form>
        </div>
      </div>
    </div>
      
    
  )
}

export default SubmitProject