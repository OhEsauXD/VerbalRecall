
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserInfo } from '@/lib/toeflTestData';
import { useToast } from '@/hooks/use-toast';

const ToeflStartPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    grado: '',
    grupo: '',
    carrera: '',
  });

  const grados = ['1°', '2°', '3°', '4°', '5°', '6°'];
  const grupos = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof UserInfo, value: string) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const key in userInfo) {
      if (userInfo[key as keyof UserInfo].trim() === '') {
        toast({
          title: 'Validation Error',
          description: `Please fill in all fields. Missing: ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: 'destructive',
        });
        return;
      }
    }
    sessionStorage.setItem('toeflUserInfo', JSON.stringify(userInfo));
    // Clear any previous test state
    localStorage.removeItem('toeflTestState');
    router.push('/toefl-practice/section/1');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">TOEFL Practice Test Registration</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Please fill in your details to begin the test.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="nombre">Nombre(s)</Label>
              <Input id="nombre" name="nombre" type="text" value={userInfo.nombre} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
              <Input id="apellidoPaterno" name="apellidoPaterno" type="text" value={userInfo.apellidoPaterno} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
              <Input id="apellidoMaterno" name="apellidoMaterno" type="text" value={userInfo.apellidoMaterno} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grado">Grado</Label>
                <Select name="grado" onValueChange={(value) => handleSelectChange('grado', value)} value={userInfo.grado}>
                  <SelectTrigger id="grado"><SelectValue placeholder="Select Grado" /></SelectTrigger>
                  <SelectContent>
                    {grados.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="grupo">Grupo</Label>
                <Select name="grupo" onValueChange={(value) => handleSelectChange('grupo', value)} value={userInfo.grupo}>
                  <SelectTrigger id="grupo"><SelectValue placeholder="Select Grupo" /></SelectTrigger>
                  <SelectContent>
                    {grupos.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="carrera">Carrera</Label>
              <Input id="carrera" name="carrera" type="text" value={userInfo.carrera} onChange={handleChange} required />
            </div>
            <CardFooter className="p-0 pt-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Begin Test
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToeflStartPage;

    