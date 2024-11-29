import React from "react"

export const FloatingControls: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 space-y-2">
      <button className="bg-white p-2 rounded shadow-md hover:bg-gray-100">
        Zoom In
      </button>
      <button className="bg-white p-2 rounded shadow-md hover:bg-gray-100">
        Zoom Out
      </button>
    </div>
  )
}
