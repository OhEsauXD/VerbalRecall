
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { toeflTestSections, UserInfo, ToeflAnswer, ToeflQuestion } from '@/lib/toeflTestData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Printer, FileText, Home, RotateCcw } from 'lucide-react';

const ToeflResultsPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [answers, setAnswers] = useState<ToeflAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [showScoreSheetDialog, setShowScoreSheetDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'dd/MM/yyyy'));
    const storedUserInfo = sessionStorage.getItem('toeflUserInfo');
    const storedTestState = localStorage.getItem('toeflTestState');

    if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
    if (storedTestState) {
      const testState = JSON.parse(storedTestState);
      setAnswers(testState.answers || []);
      
      let correctAnswers = 0;
      (testState.answers || []).forEach((ans: ToeflAnswer) => {
        const question = getQuestionById(ans.questionId);
        if (question && ans.selectedOptionIndex !== null && question.options[ans.selectedOptionIndex]?.isCorrect) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
    }
  }, []);

  const getQuestionById = (questionId: string): ToeflQuestion | undefined => {
    for (const section of toeflTestSections) {
      const question = section.questions.find(q => q.id === questionId);
      if (question) return question;
    }
    return undefined;
  };

  const generatePrintWindowContent = (title: string, bodyContent: string, styles: string): Window | null => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>' + title + '</title>');
      printWindow.document.write('<style>' + styles + '</style></head><body>');
      printWindow.document.write(bodyContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
    }
    return printWindow;
  };
  
  const scoreSheetStyles = `
    body { font-family: Arial, sans-serif; margin: 20px; color: #000; }
    .container { max-width: 800px; margin: auto; }
    h1, h2, h3 { color: #003566; text-align: center; }
    h1 { font-size: 24px; margin-bottom: 5px;}
    h2 { font-size: 20px; margin-bottom: 15px; }
    .user-info, .score-summary { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
    .user-info p, .score-summary p { margin: 5px 0; font-size: 14px; }
    .answer-grid { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .answer-grid th, .answer-grid td { border: 1px solid #000; padding: 8px; text-align: center; font-size: 12px; }
    .answer-grid th { background-color: #e0e0e0; }
    .grid-container { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
    .grid-item { border: 1px solid #000; padding: 5px; }
    @page { size: A4; margin: 20mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none; }
    }
  `;

  const handlePrintScoreSheet = () => {
    setShowScoreSheetDialog(false);
    if (!userInfo) return;

    let body = '<div class="container">';
    body += '<h1>TOEFL ITP Practice - Score Sheet</h1>';
    body += '<h2>Resultado de Prueba Práctica</h2>';
    
    body += '<div class="user-info">';
    body += `<h3>Información del Estudiante</h3>`;
    body += `<p><strong>Nombre:</strong> ${userInfo.nombre} ${userInfo.apellidoPaterno} ${userInfo.apellidoMaterno}</p>`;
    body += `<p><strong>Grado:</strong> ${userInfo.grado} | <strong>Grupo:</strong> ${userInfo.grupo}</p>`;
    body += `<p><strong>Carrera:</strong> ${userInfo.carrera}</p>`;
    body += `<p><strong>Fecha:</strong> ${currentDate}</p>`;
    body += '</div>';

    body += '<div class="score-summary">';
    body += `<h3>Resumen de Puntuación</h3>`;
    body += `<p><strong>Puntuación Total:</strong> ${score} / ${toeflTestSections.reduce((sum, sec) => sum + sec.questions.length, 0)}</p>`;
    body += '</div>';

    body += '<h3>Hoja de Respuestas</h3>';
    body += '<div class="grid-container">';
    for (let i = 0; i < 5; i++) { // 5 columns
        body += '<div><table class="answer-grid">';
        body += '<thead><tr><th>#</th><th>Respuesta</th></tr></thead>';
        body += '<tbody>';
        for (let j = 0; j < 5; j++) { // 5 rows per column
            const questionNumber = i * 5 + j + 1;
            if (questionNumber <= answers.length) {
                const userAnswer = answers.find(a => getQuestionById(a.questionId)?.id.startsWith(`${Math.floor((questionNumber-1)/5)+1}-`));
                // Find the specific question for this number
                let actualQuestion: ToeflQuestion | undefined;
                let actualAnswerIndex: number | null = null;

                for (const section of toeflTestSections) {
                    const qMatch = section.questions.find(q => parseInt(q.id.split('-')[1]) === (questionNumber % 5 === 0 ? 5 : questionNumber % 5) && section.id === Math.floor((questionNumber-1)/5)+1);
                    if (qMatch) {
                        actualQuestion = qMatch;
                        const ansForQ = answers.find(a => a.questionId === qMatch.id);
                        actualAnswerIndex = ansForQ ? ansForQ.selectedOptionIndex : null;
                        break;
                    }
                }
                const displayAnswer = actualAnswerIndex !== null ? String.fromCharCode(97 + actualAnswerIndex).toUpperCase() : '-';
                body += `<tr><td>${questionNumber}</td><td>${displayAnswer}</td></tr>`;
            } else {
                 body += `<tr><td>${questionNumber}</td><td>-</td></tr>`;
            }
        }
        body += '</tbody></table></div>';
    }
    body += '</div>'; // end grid-container
    body += '</div>'; // end container

    const printWindow = generatePrintWindowContent('TOEFL Practice Score Sheet', body, scoreSheetStyles);
    printWindow?.print();
  };
  
  const detailedFeedbackStyles = `
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: auto; }
    h1, h2, h3 { color: #00502A; } /* Greenish tone for learning tool */
    h1 { font-size: 24px; text-align: center; margin-bottom: 20px; }
    .user-info { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 5px; background-color: #f0fff0; }
    .user-info p { margin: 5px 0; font-size: 14px; }
    .score-summary { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
    .question-review { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;}
    .question-review p { margin: 3px 0; }
    .question-text { font-weight: bold; }
    .user-answer-text { font-style: italic; }
    .correct-symbol { color: green; font-weight: bold; }
    .incorrect-symbol { color: red; font-weight: bold; }
    .correct-answer-text { font-weight: bold; background-color: #d4edda; padding: 2px 4px; border-radius: 3px; }
    .explanation-text { font-size: 0.9em; color: #555; margin-top: 5px; padding-left: 10px; border-left: 2px solid #00502A;}
    .options-list { list-style-type: none; padding-left: 0; }
    .options-list li { margin-bottom: 3px; }
    @page { size: A4; margin: 20mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none; }
    }
  `;

  const handleDownloadDetailedFeedback = () => {
    setShowFeedbackDialog(false);
    if (!userInfo) return;

    let body = '<div class="container">';
    body += '<h1>TOEFL Practice - Detailed Feedback</h1>';

    body += '<div class="user-info">';
    body += `<h3>Información del Estudiante</h3>`;
    body += `<p><strong>Nombre:</strong> ${userInfo.nombre} ${userInfo.apellidoPaterno} ${userInfo.apellidoMaterno}</p>`;
    body += `<p><strong>Grado:</strong> ${userInfo.grado} | <strong>Grupo:</strong> ${userInfo.grupo}</p>`;
    body += `<p><strong>Carrera:</strong> ${userInfo.carrera}</p>`;
    body += `<p><strong>Fecha:</strong> ${currentDate}</p>`;
    body += '</div>';

    body += `<div class="score-summary">Puntuación Total: ${score} / ${toeflTestSections.reduce((sum, sec) => sum + sec.questions.length, 0)}</div>`;
    
    body += '<h2>Revisión Detallada</h2>';
    let questionNumber = 1;
    toeflTestSections.forEach(section => {
      body += `<h3>Sección: ${section.topic}</h3>`;
      section.questions.forEach(q => {
        const userAnswer = answers.find(a => a.questionId === q.id);
        const selectedOptionIndex = userAnswer?.selectedOptionIndex;
        const isCorrect = selectedOptionIndex !== null && q.options[selectedOptionIndex]?.isCorrect;

        body += '<div class="question-review">';
        body += `<p class="question-text">${questionNumber}. ${q.questionText}</p>`;
        
        body += '<ul class="options-list">';
        q.options.forEach((opt, index) => {
          let liContent = `${String.fromCharCode(97 + index)}) ${opt.text}`;
          if (selectedOptionIndex === index) {
            liContent = `<span class="user-answer-text">${liContent} ${isCorrect ? '<span class="correct-symbol">✓</span>' : '<span class="incorrect-symbol">✗</span>'} (Tu respuesta)</span>`;
          }
          if (opt.isCorrect) {
            liContent = `<span class="correct-answer-text">${liContent}</span>`;
          }
          body += `<li>${liContent}</li>`;
        });
        body += '</ul>';

        if (!isCorrect && selectedOptionIndex !== null) {
           // Not needed as per new requirement: only explain correct
        }
        body += `<p class="explanation-text"><strong>Explicación (Respuesta Correcta):</strong> ${q.explanation}</p>`;
        body += '</div>';
        questionNumber++;
      });
    });
    body += '</div>'; // end container

    const printWindow = generatePrintWindowContent('TOEFL Practice Detailed Feedback', body, detailedFeedbackStyles);
    printWindow?.print();
  };

  const handlePlayAgain = () => {
    sessionStorage.removeItem('toeflUserInfo');
    localStorage.removeItem('toeflTestState');
    router.push('/toefl-practice/start');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (!userInfo && answers.length === 0 && !currentDate) { // Wait for date too
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Cargando Resultados...</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">Por favor espere.</p>
                </CardContent>
            </Card>
        </div>
    );
  }
  if (!userInfo && answers.length === 0 && currentDate) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">No se Encontraron Resultados</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">Parece que no has completado la prueba o tu sesión ha expirado.</p>
                    <Button onClick={handleGoHome} className="w-full bg-primary hover:bg-primary/90"><Home className="mr-2 h-4 w-4"/>Ir al Inicio</Button>
                </CardContent>
            </Card>
        </div>
    );
  }


  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Resultados de Prueba Práctica TOEFL</CardTitle>
            {userInfo && (
              <CardDescription className="text-muted-foreground mt-2">
                Resultados para: {userInfo.nombre} {userInfo.apellidoPaterno} {userInfo.apellidoMaterno} ({userInfo.carrera} - {userInfo.grado}{userInfo.grupo})
                <br />
                Fecha: {currentDate}
              </CardDescription>
            )}
            <p className="text-2xl font-semibold mt-4">Tu Puntuación: <span className="text-accent">{score}</span> / {toeflTestSections.reduce((sum, sec) => sum + sec.questions.length, 0)}</p>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-4 text-center text-primary">Revisa Tus Respuestas</h3>
            <Accordion type="single" collapsible className="w-full">
              {toeflTestSections.map(section => (
                <AccordionItem value={`section-${section.id}`} key={section.id}>
                  <AccordionTrigger className="text-lg hover:no-underline text-accent">{section.topic}</AccordionTrigger>
                  <AccordionContent>
                    {section.questions.map((q, qIndex) => {
                      const userAnswer = answers.find(a => a.questionId === q.id);
                      const selectedOptionIndex = userAnswer?.selectedOptionIndex;
                      const isCorrect = selectedOptionIndex !== null && q.options[selectedOptionIndex]?.isCorrect;
                      return (
                        <div key={q.id} className="mb-6 p-4 border-b border-border last:border-b-0">
                          <p className="font-semibold text-foreground">{((section.id -1) * 5) + qIndex + 1}. {q.questionText}</p>
                          <ul className="list-none pl-0 mt-2 space-y-1">
                            {q.options.map((opt, index) => (
                              <li
                                key={index}
                                className={cn(
                                  "p-2 rounded-md",
                                  opt.isCorrect ? "bg-green-100 dark:bg-green-800/70 text-green-700 dark:text-green-300 font-bold" : 
                                  (selectedOptionIndex === index && !opt.isCorrect) ? "bg-red-100 dark:bg-red-900/70 text-red-700 dark:text-red-300 line-through" :
                                  "bg-muted/50 text-muted-foreground"
                                )}
                              >
                                {String.fromCharCode(97 + index)}) {opt.text}
                                {selectedOptionIndex === index && 
                                  (isCorrect ? <span className="font-bold ml-2 text-green-600 dark:text-green-400">(Tu respuesta ✓)</span> : <span className="font-bold ml-2 text-red-600 dark:text-red-400">(Tu respuesta ✗)</span>)
                                }
                                {opt.isCorrect && selectedOptionIndex !== index && <span className="font-bold ml-2">(Respuesta Correcta)</span>}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-2 text-sm text-muted-foreground italic"><strong>Explicación (Español):</strong> {q.explanation}</p>
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-4 p-6">
            <AlertDialog open={showScoreSheetDialog} onOpenChange={setShowScoreSheetDialog}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button onClick={() => setShowScoreSheetDialog(true)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                      <Printer className="mr-2 h-4 w-4"/> Imprimir Hoja de Puntaje
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Genera una hoja de respuestas con tu información y puntaje, estilo oficial (monocromático).</p>
                </TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Impresión</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esto abrirá el diálogo de impresión para generar tu hoja de puntaje. ¿Deseas continuar?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePrintScoreSheet}>Imprimir</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
               <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                     <Button onClick={() => setShowFeedbackDialog(true)} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                       <FileText className="mr-2 h-4 w-4"/> Descargar Feedback Detallado
                     </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Genera un PDF con todas las preguntas, tus respuestas, las correctas y explicaciones en español.</p>
                </TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Descarga</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esto abrirá el diálogo de impresión para generar tu reporte de feedback detallado. ¿Deseas continuar?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDownloadDetailedFeedback}>Descargar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handlePlayAgain} variant="outline" className="w-full sm:w-auto">
                        <RotateCcw className="mr-2 h-4 w-4"/> Jugar de Nuevo
                    </Button>
                </TooltipTrigger>
                <TooltipContent><p>Reinicia la prueba con un nuevo intento.</p></TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleGoHome} variant="outline" className="w-full sm:w-auto">
                        <Home className="mr-2 h-4 w-4"/>Ir al Inicio
                    </Button>
                </TooltipTrigger>
                <TooltipContent><p>Vuelve a la página principal de juegos.</p></TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default ToeflResultsPage;

    