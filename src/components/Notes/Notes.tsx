import { Button, Spinner, useOverlayState } from "@heroui/react"
import { useQuery } from "@tanstack/react-query"
import { getNotes } from "../../api/notes.api"
import { useAuth } from "../../context/AuthContext"
import NoteCard from "./NoteCard"
import NoteFormModal from "./NoteFormModal"


export default function Notes() {
  const { token } = useAuth()
    const addState = useOverlayState()

  const { data: notes = [], isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(token!),
    enabled: !!token,
  })

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900">My Notes</h1>
        <Button size="lg" className={'bg-blue-900'} onPress={addState.open}>Add note</Button>
      </div>


      {isLoading && <Spinner />}
      {isError && <p className="text-red-600">{error.message}</p>}
      {!isLoading && !isError && notes.length === 0 && (
        <p className="text-zinc-500">No notes yet.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
           <NoteFormModal state={addState} />

    </section>
  )
}