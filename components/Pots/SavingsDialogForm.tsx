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
import { potChangeAmountSchema } from "@/schemas/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";

const formSchema = potChangeAmountSchema;

type Props = {
  currentAmount: number;
  newSavingsType: "addition" | "subtraction";
  potTarget: number;
  dialogOpen: boolean;
  potId: string;
  handleAmountChange: (amount: number) => void;
  handleSubmit: (amount: number) => Promise<void>;
  isSubmitting: boolean;
};

export function SavingsDialogForm({
  currentAmount,
  newSavingsType,
  potTarget,
  dialogOpen,
  handleAmountChange,
  handleSubmit,
  isSubmitting,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newAmount: 0,
    },
  });

  useEffect(() => {
    if (!dialogOpen) {
      form.reset({ newAmount: 0 });
    }
  }, [dialogOpen, form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        newAmount: number;
      },
      "newAmount"
    >,
  ) => {
    const cleanedValue = e.target.value.replace(/\D/g, "");
    const newAmount = parseInt(cleanedValue, 10) || 0;
    field.onChange(newAmount);
    handleAmountChange(newAmount);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await handleSubmit(values.newAmount);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="newAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                {newSavingsType === "addition"
                  ? "Amount to Add"
                  : "Amount to Withdraw"}
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
                    max={
                      newSavingsType === "addition"
                        ? potTarget - currentAmount
                        : currentAmount
                    }
                    onChange={(e) => handleChange(e, field)}
                    value={field.value || ""}
                  />
                </div>
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
          {newSavingsType === "addition"
            ? "Confirm Addition"
            : "Confirm Withdrawal"}
        </Button>
      </form>
    </Form>
  );
}
