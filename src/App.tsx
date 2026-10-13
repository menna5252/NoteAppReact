import { RouterProvider } from "react-router-dom"
import { router } from "./routing/AppRoutes"
import { Toast } from "@heroui/react"
import AuthContextProvider from "./context/AuthContext"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

function App() {

  return (
  <>
   <QueryClientProvider client={queryClient}>
   <AuthContextProvider>
    <Toast.Provider placement="top end" />
      <RouterProvider router={router} />
      </AuthContextProvider>
      </QueryClientProvider>
  </>
   
  

   


  )
}

export default App
