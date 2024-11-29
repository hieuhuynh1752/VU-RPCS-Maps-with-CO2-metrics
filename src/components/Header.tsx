import React from "react"

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">My Maps</div>
      <input
        type="text"
        placeholder="Search location..."
        className="px-4 py-2 rounded-md text-black w-1/2"
      />
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 bg-blue-600 rounded-md">Sign In</button>
      </div>
    </header>
  )
}
