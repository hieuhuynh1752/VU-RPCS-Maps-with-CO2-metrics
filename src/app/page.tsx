import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import MapContainer from "@/components/MapContainer"
import { FloatingControls } from "@/components/FloatingControls"

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="relative flex-1">
          <MapContainer />
          <FloatingControls />
        </div>
      </div>
    </div>
  )
}
