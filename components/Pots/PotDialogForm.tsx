"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { THEMES } from "@/constants/themes";
import { useSubmitPot } from "@/hooks/useSubmitPot";
import { potFormSchema } from "@/schemas/formsSchemas";
import { z } from "zod";
import { Input } from "../ui/input";

type PotDialogFormProps = {
  onSubmitted?: () => void;
};

const formSchema = potFormSchema;

export function PotDialogForm({ onSubmitted }: PotDialogFormProps) {
  const themes = THEMES;
  const { createPot, isSubmitting } = useSubmitPot();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      target: undefined,
      theme: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await createPot(values);
    if (success) {
      form.reset();
      onSubmitted?.();
    }
  };

  return (
    <Form {...form} aria-label="Pot Form">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                Pot Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="e.g. New Laptop"
                  className="text-standard h-12 border border-beige-500  focus-visible:ring-1 focus-visible:ring-grey-900 focus-visible:ring-offset-1"
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                Target
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    {...field}
                    type="number"
                    placeholder="e.g. 500"
                    className="text-standard h-12 border border-beige-500 pl-7 focus-visible:ring-1 focus-visible:ring-grey-900 focus-visible:ring-offset-1"
                    min={0}
                    max={999999}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || undefined)
                    }
                    value={field.value || ""}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                Theme
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 border border-beige-500 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 data-[placeholder]:text-neutral-500 [&>svg]:hidden">
                    <div className="text-standard mx-xs flex w-full justify-between gap-md">
                      <SelectValue placeholder="Select Theme" />
                      <Image
                        src={"/assets/images/icon-caret-down.svg"}
                        alt="Dropdown"
                        width={11}
                        height={6}
                        className="w-auto"
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem
                        key={theme.name as string}
                        value={theme.name as string}
                      >
                        <div className="flex items-center gap-md">
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: theme.color }}
                          />
                          <span>{theme.name as string}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="!mt-2xl h-12 w-full"
          type="submit"
          disabled={isSubmitting}
        >
          Add Pot
        </Button>
      </form>
    </Form>
  );
}
