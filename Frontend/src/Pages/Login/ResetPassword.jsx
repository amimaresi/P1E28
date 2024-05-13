import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPassword() {
  return <>
    <div className='flex justify-center p-12'>
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>réinitialisation de votre mot de passe</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mtps"> nouveau mot de passe:</Label>
              <Input id="mtps" placeholder="" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="VerMtps">vérification du mot de passe</Label>
              <Input id="VerMtps" placeholder="" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="bg-[#EFF3FF]" variant="outline">Annuler</Button>
        <Button className="bg-buttonDark">changer votre mot de passe</Button>
      </CardFooter>
    </Card>
    </div>
  
  </>;
}
