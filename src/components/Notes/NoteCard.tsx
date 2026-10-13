import { Button, Card, Dropdown, Label, toast, useOverlayState } from "@heroui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { FaEllipsisV } from "react-icons/fa"
import { deleteNote } from "../../api/notes.api"
import { useAuth } from "../../context/AuthContext"
import type { Note } from "../../types/note"
import NoteFormModal from "./NoteFormModal"

export default function NoteCard({ note }: { note: Note }) {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const editState = useOverlayState()

  const deleteMutation = useMutation({
    mutationFn: () => deleteNote(token!, note._id),
    onSuccess: () => {
      toast.success("Note deleted")
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    },
    onError: (err) => {
      const message = axios.isAxiosError<{ msg?: string }>(err)
        ? (err.response?.data?.msg ?? err.message)
        : err.message
      toast.danger(message)
    },
  })

  const handleAction = (key: React.Key) => {
    if (key === "edit") editState.open()
    if (key === "delete" && !deleteMutation.isPending) deleteMutation.mutate()
  }

  return (
    <>
      <Card className={deleteMutation.isPending ? "opacity-50" : ""}>
        <Card.Header className="flex-row items-start justify-between gap-2">
          <Card.Title className="line-clamp-1">{note.title}</Card.Title>

          <Dropdown>
            <Button isIconOnly variant="tertiary" size="sm" aria-label="Note options">
              <FaEllipsisV />
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={handleAction}>
                <Dropdown.Item id="edit" textValue="Edit">
                  <Label>Edit</Label>
                </Dropdown.Item>
                <Dropdown.Item id="delete" textValue="Delete" variant="danger">
                  <Label>Delete</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card.Header>

        <Card.Content>
          <p className="line-clamp-4 text-sm text-zinc-600">{note.content}</p>
        </Card.Content>

        <Card.Footer>
          <span className="text-xs text-zinc-400">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </Card.Footer>
      </Card>

      <NoteFormModal state={editState} note={note} />
    </>
  )
}