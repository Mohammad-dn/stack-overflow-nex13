"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validation";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.actions";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context";
const type: any = "create ";

interface Props {
  mongoUserId: string;
}
const Questions = ({ mongoUserId }: Props) => {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  console.log("====================================");
  console.log(mongoUserId);
  console.log("====================================");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmiting(true);
    try {
      // make an async call to your api -> create a question
      // contain all form data
      // navigate to home page
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });

      // navigate to home page

      router.push("/");
    } catch (error) {
    } finally {
      setIsSubmiting(true);
    }
  }
  const handelInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "tag must be less than 15 characters",
          });
        }
      }
      if (!field.value.includes(tagValue as never)) {
        form.setValue("tags", [...field.value, tagValue]);
        tagInput.value = "";
        form.clearErrors("tags");
      } else {
        form.trigger();
      }
    }
  };
  const handleTagRemove = (tag: string, field: any) => {
    const newTag = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTag);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10 "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                be specific and imagine you&apos;re asking a question to another
                person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3 ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detail explenation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  initialValue={""}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bllist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "light",
                  }}
                ></Editor>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                introduce your problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    placeholder="Add tags ..."
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    onKeyDown={(e) => handelInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5 ">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize "
                          onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                          <Image
                            src={"/assets/icons/close.svg"}
                            alt="Close Icon"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Add up to 3 tags to describe what your question is about.you
                need to press enter to add a tag
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          className="primary-gradient w-fit text-light-900"
          disabled={isSubmiting}
          type="submit"
        >
          {isSubmiting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit question" : "Ask a question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Questions;
