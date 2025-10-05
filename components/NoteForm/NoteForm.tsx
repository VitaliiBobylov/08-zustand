import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateNote } from "@/lib/api";
import type { CreateNotePayload, Note } from "@/types/note";
import { useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required("Title is required"),
  content: Yup.string().max(500),
  tag: Yup.mixed<Note["tag"]>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const createNoteMutation = useCreateNote();

  const initialValues: CreateNotePayload = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const handleSubmit = (values: CreateNotePayload) => {
    createNoteMutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        onClose();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <Field name="title" placeholder="Title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />

          <Field
            as="textarea"
            name="content"
            placeholder="Content"
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />

          <Field as="select" name="tag" className={css.select}>
            {["Todo", "Work", "Personal", "Meeting", "Shopping"].map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />

          <div className={css.actions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
