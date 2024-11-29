import React from "react"

export const Sidebar: React.FC = () => {
  const locations: string[] = ["Place 1", "Place 2", "Place 3"]

  return (
    <aside className="w-64 h-full bg-white shadow-md overflow-y-auto">
      <h2 className="text-xl font-bold p-4">Locations</h2>
      <ul>
        {locations.map((place, idx) => (
          <li key={idx} className="px-4 py-2 hover:bg-gray-200">
            {place}
          </li>
        ))}
      </ul>
    </aside>
  )
}
