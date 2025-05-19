
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { toeflTestSections, UserInfo, ToeflAnswer, ToeflQuestion, TOTAL_SECTIONS } from '@/lib/toeflTestData';
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
  const totalQuestions = toeflTestSections.reduce((sum, sec) => sum + sec.questions.length, 0);

  const resultsCardRef = useRef<HTMLDivElement>(null);
  const [isPageDataLoaded, setIsPageDataLoaded] = useState(false);
  const [showScoreHighlight, setShowScoreHighlight] = useState(false);
  const [overlayState, setOverlayState] = useState<'open' | 'closed'>('closed');


  useEffect(() => {
    setCurrentDate(format(new Date(), 'dd/MM/yyyy'));
    const storedUserInfo = sessionStorage.getItem('toeflUserInfo');
    const storedTestState = localStorage.getItem('toeflTestState');

    let loadedUserInfo: UserInfo | null = null;
    let loadedAnswers: ToeflAnswer[] = [];

    if (storedUserInfo) {
      loadedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(loadedUserInfo);
    }
    if (storedTestState) {
      const testState = JSON.parse(storedTestState);
      loadedAnswers = testState.answers || [];
      setAnswers(loadedAnswers);
      
      let correctAnswersCount = 0;
      (testState.answers || []).forEach((ans: ToeflAnswer) => {
        const question = getQuestionById(ans.questionId);
        if (question && ans.selectedOptionIndex !== null && question.options[ans.selectedOptionIndex]?.isCorrect) {
          correctAnswersCount++;
        }
      });
      setScore(correctAnswersCount);
    }

    if (loadedUserInfo || loadedAnswers.length > 0) { // Check if either user info or answers are present
      setIsPageDataLoaded(true);
      setOverlayState('open');
      setShowScoreHighlight(true);

      setTimeout(() => setOverlayState('closed'), 1000); // Overlay fades after 1s animation
      setTimeout(() => setShowScoreHighlight(false), 2000); // Highlight fades after 2s
    } else if (currentDate) { // If only date is set, but no user info/answers, means empty state
        setIsPageDataLoaded(true); // Still mark as "loaded" to remove initial opacity if needed
    }
  }, [currentDate]); // Added currentDate to dependencies to ensure animations trigger if data load is very fast

  useEffect(() => {
    if (isPageDataLoaded && resultsCardRef.current && (userInfo || answers.length > 0)) {
      resultsCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // resultsCardRef.current.focus(); // Optional: if focus management is strictly needed
    }
  }, [isPageDataLoaded, userInfo, answers]); // Trigger scroll when data is loaded and card is ready

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
      // Ensure content is loaded before printing for some browsers
      // setTimeout(() => { printWindow.print(); }, 500); 
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
    .grid-container { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; } /* 5 columns for tables */
    .grid-item-table { break-inside: avoid; page-break-inside: avoid; } /* Helper for printing grid items */
    @page { size: A4; margin: 20mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none; }
      .grid-container { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); } /* Adjust for printing */
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
    body += `<p><strong>Puntuación Total:</strong> ${score} / ${totalQuestions}</p>`;
    body += '</div>';

    body += '<h3>Hoja de Respuestas</h3>';
    body += '<div class="grid-container">';
    
    const numColumnsForGrid = 5; 
    const questionsPerColumn = Math.ceil(totalQuestions / numColumnsForGrid); 

    for (let col = 0; col < numColumnsForGrid; col++) { 
        body += '<div class="grid-item-table"><table class="answer-grid">';
        body += '<thead><tr><th>#</th><th>Respuesta</th></tr></thead>';
        body += '<tbody>';
        for (let row = 0; row < questionsPerColumn; row++) { 
            const questionNumber = col * questionsPerColumn + row + 1;
            if (questionNumber <= totalQuestions) {
                let actualQuestionId: string | undefined;
                let questionCounter = 0;
                outerLoop: for (const section of toeflTestSections) {
                    for (const q of section.questions) {
                        questionCounter++;
                        if (questionCounter === questionNumber) {
                            actualQuestionId = q.id;
                            break outerLoop;
                        }
                    }
                }

                let displayAnswer = '-';
                if (actualQuestionId) {
                    const userAnswer = answers.find(a => a.questionId === actualQuestionId);
                    const actualAnswerIndex = userAnswer ? userAnswer.selectedOptionIndex : null;
                    if (actualAnswerIndex !== null) {
                        displayAnswer = String.fromCharCode(97 + actualAnswerIndex).toUpperCase();
                    }
                }
                body += `<tr><td>${questionNumber}</td><td>${displayAnswer}</td></tr>`;
            }
        }
        body += '</tbody></table></div>';
    }
    body += '</div>'; 
    body += '</div>'; 

    const printWindow = generatePrintWindowContent('TOEFL Practice Score Sheet', body, scoreSheetStyles);
    // Delay print to ensure content is rendered in the new window
    setTimeout(() => printWindow?.print(), 500);
  };
  
  const detailedFeedbackStyles = `
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: auto; }
    h1, h2, h3 { color: #00502A; } /* Greenish tone for learning tool */
    h1 { font-size: 24px; text-align: center; margin-bottom: 20px; }
    .user-info { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 5px; background-color: #f0fff0; }
    .user-info p { margin: 5px 0; font-size: 14px; }
    .score-summary { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
    .question-review { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; page-break-inside: avoid;}
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

    body += `<div class="score-summary">Puntuación Total: ${score} / ${totalQuestions}</div>`;
    
    body += '<h2>Revisión Detallada</h2>';
    let questionNumber = 1;
    toeflTestSections.forEach(section => {
      body += `<h3>Sección: ${section.topic}</h3>`;
      section.questions.forEach(q => {
        const userAnswer = answers.find(a => a.questionId === q.id);
        const selectedOptionIndex = userAnswer?.selectedOptionIndex;
        const isCorrect = selectedOptionIndex !== undefined && selectedOptionIndex !== null && q.options[selectedOptionIndex]?.isCorrect;

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

        if (q.explanation) {
           body += `<p class="explanation-text"><strong>Explicación (Respuesta Correcta):</strong> ${q.explanation}</p>`;
        }
        body += '</div>';
        questionNumber++;
      });
    });
    body += '</div>'; 

    const printWindow = generatePrintWindowContent('TOEFL Practice Detailed Feedback', body, detailedFeedbackStyles);
    setTimeout(() => printWindow?.print(), 500);
  };

  const handlePlayAgain = () => {
    sessionStorage.removeItem('toeflUserInfo');
    localStorage.removeItem('toeflTestState');
    router.push('/toefl-practice/start');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  // Initial loading state before any data is processed
  if (!isPageDataLoaded && !currentDate) { 
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
  // No results found state (after attempting to load data)
  if (isPageDataLoaded && !userInfo && answers.length === 0) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <Card className="w-full max-w-md text-center opacity-100 translate-y-0"> {/* Ensure this card is also visible */}
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
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8 relative">
         {overlayState === 'open' && (
           <div className="fixed inset-0 bg-black/30 z-0 animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-1000" data-state={overlayState} />
         )}
        <Card
          ref={resultsCardRef}
          tabIndex={-1} // Make it focusable for potential programmatic focus
          className={cn(
            "w-full max-w-4xl mx-auto relative z-10 scroll-mt-5", // scroll-mt-5 is for 20px scroll margin top
            "transition-all duration-700 ease-out",
            isPageDataLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Resultados de Prueba Práctica TOEFL</CardTitle>
            {userInfo && (
              <CardDescription className="text-muted-foreground mt-2">
                Resultados para: {userInfo.nombre} {userInfo.apellidoPaterno} {userInfo.apellidoMaterno} ({userInfo.carrera} - {userInfo.grado}{userInfo.grupo})
                <br />
                Fecha: {currentDate}
              </CardDescription>
            )}
            <p className={cn(
                "text-2xl font-semibold mt-4 p-2 transition-all duration-500",
                showScoreHighlight ? "border-2 border-primary rounded-lg shadow-lg" : "border-2 border-transparent"
              )}>
                Tu Puntuación: <span className="text-accent">{score}</span> / {totalQuestions}
            </p>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-4 text-center text-primary">Revisa Tus Respuestas</h3>
            <Accordion type="single" collapsible className="w-full">
              {toeflTestSections.map(section => (
                <AccordionItem value={`section-${section.id}`} key={section.id}>
                  <AccordionTrigger className="text-lg hover:no-underline text-accent">{section.title} - {section.topic}</AccordionTrigger>
                  <AccordionContent>
                    {section.questions.map((q, qIndex) => {
                      const userAnswer = answers.find(a => a.questionId === q.id);
                      const selectedOptionIndex = userAnswer?.selectedOptionIndex;
                      const isCorrect = selectedOptionIndex !== undefined && selectedOptionIndex !== null && q.options[selectedOptionIndex]?.isCorrect;
                      
                      let overallQuestionNumber = 0;
                      for(let i=0; i < section.id -1; i++){ 
                        overallQuestionNumber += toeflTestSections[i].questions.length;
                      }
                      overallQuestionNumber += qIndex + 1;

                      return (
                        <div key={q.id} className="mb-6 p-4 border-b border-border last:border-b-0">
                          <p className="font-semibold text-foreground">{overallQuestionNumber}. {q.questionText}</p>
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
                          {q.explanation && <p className="mt-2 text-sm text-muted-foreground italic"><strong>Explicación (Español):</strong> {q.explanation}</p>}
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
