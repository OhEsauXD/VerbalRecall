
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserInfo, ToeflGrammarTestState } from '@/lib/toeflGrammarTestData';
import { INITIAL_GRAMMAR_TEST_DURATION, TOTAL_GRAMMAR_SECTIONS, QUESTIONS_PER_GRAMMAR_SECTION } from '@/lib/toeflGrammarTestData';
import { useToast } from '@/hooks/use-toast';

const ToeflGrammarStartPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    grado: '',
    grupo: '',
    carrera: '',
    otraCarrera: '',
  });
  const [showOtraCarreraInput, setShowOtraCarreraInput] = useState(false);

  const grados = Array.from({ length: 10 }, (_, i) => `${i + 1}°`);
  const grupos = Array.from({ length: 10 }, (_, i) => `${i + 1}`);
  const carreras = [
    'Ingenieria Industrial',
    'Ingenieria en Inovacion agricola sustentable',
    'Ingenieria en Energias Renovables',
    'Otra',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [name]: value }));
    if (name === 'carrera') {
      if (value === 'Otra') {
        setShowOtraCarreraInput(true);
      } else {
        setShowOtraCarreraInput(false);
        setUserInfo(prev => ({ ...prev, otraCarrera: '' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields: (keyof UserInfo)[] = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'grado', 'grupo', 'carrera'];
    for (const key of requiredFields) {
      if (!userInfo[key] || userInfo[key].trim() === '') {
        toast({
          title: 'Error de Validación',
          description: `Por favor, complete todos los campos. Falta: ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: 'destructive',
        });
        return;
      }
    }

    if (userInfo.carrera === 'Otra' && (!userInfo.otraCarrera || userInfo.otraCarrera.trim() === '')) {
      toast({
        title: 'Error de Validación',
        description: 'Por favor, especifique la carrera en el campo "Otra Carrera".',
        variant: 'destructive',
      });
      return;
    }
    
    const finalUserInfo = { ...userInfo };
    if (userInfo.carrera === 'Otra') {
      finalUserInfo.carrera = userInfo.otraCarrera || 'Otra';
    }

    // Initialize test state
    const initialSectionStates: ToeflGrammarTestState['sectionStates'] = {};
    for (let i = 1; i <= TOTAL_GRAMMAR_SECTIONS; i++) {
        initialSectionStates[i] = { answers: [] };
    }

    const initialTestState: ToeflGrammarTestState = {
      currentGlobalQuestionIndex: 0,
      sectionStates: initialSectionStates,
      startTime: Date.now(),
      timeRemaining: INITIAL_GRAMMAR_TEST_DURATION,
      userInfo: finalUserInfo,
    };

    sessionStorage.setItem('toeflGrammarUserInfo', JSON.stringify(finalUserInfo));
    localStorage.setItem('toeflGrammarTestState', JSON.stringify(initialTestState));
    router.push('/toefl-grammar/section/1'); // Navigate to the first question (global index 0)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">Registro Prueba de Gramática TOEFL</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Por favor, ingrese sus datos para comenzar la prueba.</CardDescription>
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
                  <SelectTrigger id="grado"><SelectValue placeholder="Seleccionar Grado" /></SelectTrigger>
                  <SelectContent>
                    {grados.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="grupo">Grupo</Label>
                <Select name="grupo" onValueChange={(value) => handleSelectChange('grupo', value)} value={userInfo.grupo}>
                  <SelectTrigger id="grupo"><SelectValue placeholder="Seleccionar Grupo" /></SelectTrigger>
                  <SelectContent>
                    {grupos.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="carrera">Carrera</Label>
              <Select name="carrera" onValueChange={(value) => handleSelectChange('carrera', value)} value={userInfo.carrera}>
                <SelectTrigger id="carrera"><SelectValue placeholder="Seleccionar Carrera" /></SelectTrigger>
                <SelectContent>
                  {carreras.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {showOtraCarreraInput && (
              <div>
                <Label htmlFor="otraCarrera">Especificar Carrera</Label>
                <Input id="otraCarrera" name="otraCarrera" type="text" value={userInfo.otraCarrera} onChange={handleChange} required />
              </div>
            )}
            <CardFooter className="p-0 pt-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Comenzar Prueba de Gramática
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToeflGrammarStartPage;
