import React, { useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
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
import axios from 'axios';
export default function ResetPassword() {
  const [password , setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token} = useParams()
  
  const resetPassword = async ()=>{
    console.log(password)
    if (password !== confirmPassword) {
      setError({ is: true, content: "Les mots de passe ne correspondent pas" });
      console.log("password don't match");
      return;
    }
    try {
       const resutlt = await axios.post(
        `http://localhost:3000/auth/reset-password/${token}`,
        {password},
        { withCredentials: true },
      );
      console.log('this is result :', resutlt.data);
    } catch (error) {
      console.log(error)
    }
  }

  
const [Error, setError] = useState({ is: false, content: '' });
const [show, setShow] = useState(false);

  const handlePasswordChange = (value) => {
    setPassword(value);
    setError({ is: false, content: '' });
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  
    setError({ is: false, content: '' });
  };

  
  return <>
    <div className='flex justify-center p-12'>
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>réinitialisation de votre mot de passe</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {Error.is && <p className="text-red-500">{Error.content}</p>}
        <form>
          <div className="grid w-full items-center gap-4">
          
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mtps"> nouveau mot de passe:</Label>
              <Input type={show ? 'text' : 'password'} id="mtps" placeholder="" onChange={(e) => handlePasswordChange(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="VerMtps">vérification du mot de passe</Label>
              <Input type={show ? 'text' : 'password'} id="VerMtps" placeholder="" onChange={(e) => handleConfirmPasswordChange(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="bg-[#EFF3FF]" variant="outline">Annuler</Button>
        <Button className="bg-buttonDark" onClick={resetPassword}>changer votre mot de passe</Button>
      </CardFooter>
    </Card>
    </div>
  
  </>;
}
