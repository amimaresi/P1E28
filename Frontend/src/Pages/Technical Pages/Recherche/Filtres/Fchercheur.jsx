import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
export default function Fchercheur({ Filtres, setFiltres }) {
  const { register, handleSubmit, watch, errors, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger className=" m-10 h-7 w-12 rounded bg-buttonDark text-textLight hover:bg-black">
          Open
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filtres</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <DevTool control={control} />
    </>
  );
}
