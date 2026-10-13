import { Button, Input, Modal, TextArea, toast, useOverlayState } from "@heroui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { addNote, updateNote } from "../../api/notes.api"
import { useAuth } from "../../context/AuthContext"
import type { Note } from "../../types/note"

type Props = {
  state: ReturnType<typeof useOverlayState>
  note?: Note 
}

export default function NoteFormModal({ state, note }: Props) {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState(note?.title ?? "")
  const [content, setContent] = useState(note?.content ?? "")

  
  useEffect(() => {
    if (state.isOpen) {
      setTitle(note?.title ?? "")
      setContent(note?.content ?? "")
    }
  }, [state.isOpen, note])

  const mutation = useMutation({
    mutationFn: () =>
      note
        ? updateNote(token!, note._id, { title, content })
        : addNote(token!, { title, content }),
    onSuccess: () => {
      toast.success(note ? "Note updated" : "Note added")
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      state.close()
    },
    onError: (err) => {
      const message = axios.isAxiosError<{ msg?: string }>(err)
        ? (err.response?.data?.msg ?? err.message)
        : err.message
      toast.danger(message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.warning("Title and content are required")
      return
    }
    mutation.mutate()
  }

  return (
    <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>{note ? "Edit note" : "Add note"}</Modal.Heading>
          </Modal.Header>

          <form onSubmit={handleSubmit}>
            <Modal.Body className="flex flex-col gap-4">
              <Input
                className="w-full"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextArea
                className="w-full"
                placeholder="Content"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" isPending={mutation.isPending}>
                {note ? "Save" : "Add"}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}