
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
    toeflListeningSections,
    UserInfo,
    ToeflListeningAnswer,
    ListeningQuestion,
    TOTAL_LISTENING_PARTS,
    DialogueLine,
    MiniDialogueAudio,
    ToeflListeningSectionData
} from '@/lib/toeflListeningTestData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Printer, FileText, Home, RotateCcw } from 'lucide-react';

const ToeflListeningResultsPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [answers, setAnswers] = useState<ToeflListeningAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [showScoreSheetDialog, setShowScoreSheetDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  let totalQuestions = 0;
  toeflListeningSections.forEach(section => {
    if (section.audioContent.type === 'mini-dialogue' && section.audioContent.miniDialogueSet) {
        totalQuestions += section.audioContent.miniDialogueSet.reduce((sum, md) => sum + md.questions.length, 0);
    } else {
        totalQuestions += section.questions.length;
    }
  });


  const resultsCardRef = useRef<HTMLDivElement>(null);
  const [isPageDataLoaded, setIsPageDataLoaded] = useState(false);
  const [showScoreHighlight, setShowScoreHighlight] = useState(false);
  const [overlayState, setOverlayState] = useState<'open' | 'closed'>('closed');

  const getQuestionById = (questionId: string): ListeningQuestion | undefined => {
    for (const section of toeflListeningSections) {
        if (section.audioContent.type === 'mini-dialogue' && section.audioContent.miniDialogueSet) {
            for (const subDialogue of section.audioContent.miniDialogueSet) {
                const question = subDialogue.questions.find(q => q.id === questionId);
                if (question) return question;
            }
        } else {
            const question = section.questions.find(q => q.id === questionId);
            if (question) return question;
        }
    }
    return undefined;
  };

  useEffect(() => {
    setCurrentDate(format(new Date(), 'dd/MM/yyyy'));
    const storedUserInfo = sessionStorage.getItem('toeflListeningUserInfo');
    const storedTestState = localStorage.getItem('toeflListeningTestState');

    let loadedUserInfo: UserInfo | null = null;
    let loadedAnswers: ToeflListeningAnswer[] = [];

    if (storedUserInfo) {
      loadedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(loadedUserInfo);
    }
    if (storedTestState) {
      const testState = JSON.parse(storedTestState);
      loadedAnswers = testState.answers || [];
      setAnswers(loadedAnswers);

      let correctAnswersCount = 0;
      (testState.answers || []).forEach((ans: ToeflListeningAnswer) => {
        const question = getQuestionById(ans.questionId);
        if (question && ans.selectedOptionIndex !== null && ans.selectedOptionIndex !== undefined && question.options[ans.selectedOptionIndex!]?.isCorrect) {
          correctAnswersCount++;
        }
      });
      setScore(correctAnswersCount);
    }

    if (loadedUserInfo || loadedAnswers.length > 0) {
      setIsPageDataLoaded(true);
      setOverlayState('open');
      setShowScoreHighlight(true);
      setTimeout(() => setOverlayState('closed'), 1000);
      setTimeout(() => setShowScoreHighlight(false), 2000);
    } else if (currentDate) {
        setIsPageDataLoaded(true);
    }
  }, [currentDate]);

  useEffect(() => {
    if (isPageDataLoaded && resultsCardRef.current && (userInfo || answers.length > 0)) {
      resultsCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isPageDataLoaded, userInfo, answers]);

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
    body { font-family: Arial, sans-serif; margin: 0; color: #000; font-size: 9pt; }
    .container { max-width: 100%; padding: 0; }
    h1, h2, h3 { color: #000; text-align: center; }
    h1 { font-size: 14pt; margin-bottom: 3px;}
    h2 { font-size: 11pt; margin-bottom: 8px; }
    h3 { font-size: 9pt; margin-bottom: 3px; text-align: left; }
    .user-info, .score-summary { border: 1px solid #000; padding: 6px; margin-bottom: 8px; border-radius: 0; }
    .user-info p, .score-summary p { margin: 2px 0; font-size: 8pt; }
    .answer-grid { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .answer-grid th, .answer-grid td { border: 1px solid #000; padding: 2px; text-align: center; font-size: 7pt; }
    .answer-grid th { background-color: #ccc; }
    .grid-container { display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px; }
    .grid-item-table { break-inside: avoid; page-break-inside: avoid; }
    @page { size: letter portrait; margin: 0.5in; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 8pt; }
      .no-print { display: none; }
      h1 { font-size: 13pt; } h2 { font-size: 10pt; }
      .user-info p, .score-summary p { font-size: 7pt; }
      .answer-grid th, .answer-grid td { font-size: 6pt; padding: 1px; }
      .grid-container { gap: 2px; }
    }
  `;

  const handlePrintScoreSheet = () => {
    setShowScoreSheetDialog(false);
    if (!userInfo) return;

    let body = '<div class="container">';
    body += '<h1>TOEFL ITP Listening - Score Sheet</h1>';
    body += '<h2>Resultado de Prueba de Comprensión Auditiva</h2>';

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

    const numColumnsForGrid = totalQuestions <= 25 ? 5 : (totalQuestions <= 50 ? 10 : 10) ;
    const questionsPerColumn = Math.ceil(totalQuestions / numColumnsForGrid);

    let globalQuestionCounter = 0;
    for (let col = 0; col < numColumnsForGrid; col++) {
        body += '<div class="grid-item-table"><table class="answer-grid">';
        body += '<thead><tr><th>#</th><th>Resp.</th></tr></thead>';
        body += '<tbody>';
        for (let row = 0; row < questionsPerColumn; row++) {
            const questionNumberOverall = col * questionsPerColumn + row + 1;
            if (questionNumberOverall <= totalQuestions) {
                let displayAnswer = '-';
                let currentQNum = 0;
                let actualQuestionId: string | undefined;

                outerLoop: for (const section of toeflListeningSections) {
                    if (section.audioContent.type === 'mini-dialogue' && section.audioContent.miniDialogueSet) {
                        for (const subDialogue of section.audioContent.miniDialogueSet) {
                            for (const q of subDialogue.questions) {
                                currentQNum++;
                                if (currentQNum === questionNumberOverall) {
                                    actualQuestionId = q.id;
                                    break outerLoop;
                                }
                            }
                        }
                    } else {
                        for (const q of section.questions) {
                            currentQNum++;
                            if (currentQNum === questionNumberOverall) {
                                actualQuestionId = q.id;
                                break outerLoop;
                            }
                        }
                    }
                }

                if (actualQuestionId) {
                    const userAnswer = answers.find(a => a.questionId === actualQuestionId);
                    const actualAnswerIndex = userAnswer ? userAnswer.selectedOptionIndex : null;
                    if (actualAnswerIndex !== null && actualAnswerIndex !== undefined) {
                        displayAnswer = String.fromCharCode(97 + actualAnswerIndex).toUpperCase();
                    }
                }
                body += `<tr><td>${questionNumberOverall}</td><td>${displayAnswer}</td></tr>`;
            }
        }
        body += '</tbody></table></div>';
    }
    body += '</div></div>';

    const printWindow = generatePrintWindowContent('TOEFL Listening Score Sheet', body, scoreSheetStyles);
    setTimeout(() => printWindow?.print(), 500);
  };

  const detailedFeedbackStyles = `
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: auto; }
    h1, h2, h3 { color: #00693E; }
    h1 { font-size: 24px; text-align: center; margin-bottom: 20px; }
    .user-info { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 5px; background-color: #e6fff2; }
    .user-info p { margin: 5px 0; font-size: 14px; }
    .score-summary { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
    .audio-part-review { margin-bottom: 30px; page-break-inside: avoid; }
    .audio-transcript { background-color: #f0f0f0; padding: 10px; border-radius: 4px; margin-bottom:15px; font-style: italic; font-size: 0.9em; white-space: pre-line; }
    .audio-transcript strong { font-weight: bold; }
    .question-review { margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; page-break-inside: avoid;}
    .question-review p { margin: 3px 0; }
    .question-text { font-weight: bold; }
    .user-answer-text { font-style: italic; }
    .correct-symbol { color: green; font-weight: bold; }
    .incorrect-symbol { color: red; font-weight: bold; }
    .correct-answer-text { font-weight: bold; background-color: #d4edda; padding: 2px 4px; border-radius: 3px; }
    .explanation-text { font-size: 0.9em; color: #555; margin-top: 5px; padding-left: 10px; border-left: 2px solid #00693E;}
    .options-list { list-style-type: none; padding-left: 0; }
    .options-list li { margin-bottom: 3px; }
    @page { size: A4; margin: 20mm; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none; } }
  `;

  const getTranscriptForSection = (sectionData: ToeflListeningSectionData): string => {
    const { audioContent } = sectionData;
    if (audioContent.type === 'lecture' && audioContent.script) {
        return audioContent.script;
    } else if (audioContent.type === 'conversation' && audioContent.conversationScript) {
        return audioContent.conversationScript.map(line => `<strong>${line.speaker}:</strong> ${line.line}`).join('<br>');
    } else if (audioContent.type === 'mini-dialogue' && audioContent.miniDialogueSet) {
        return audioContent.miniDialogueSet.map(dialogue =>
            `<strong>Dialogue ${dialogue.id.split('_d')[1]}:</strong><br>` + // Assuming ID like mdsX_dY
            dialogue.script.map(line => `&nbsp;&nbsp;<strong>${line.speaker}:</strong> ${line.line}`).join('<br>')
        ).join('<br><br>---<br><br>');
    }
    return 'Transcripción no disponible.';
  };


  const handleDownloadDetailedFeedback = () => {
    setShowFeedbackDialog(false);
    if (!userInfo) return;

    let body = '<div class="container">';
    body += '<h1>TOEFL Listening - Detailed Feedback</h1>';

    body += '<div class="user-info">';
    body += `<h3>Información del Estudiante</h3>`;
    body += `<p><strong>Nombre:</strong> ${userInfo.nombre} ${userInfo.apellidoPaterno} ${userInfo.apellidoMaterno}</p>`;
    body += `<p><strong>Grado:</strong> ${userInfo.grado} | <strong>Grupo:</strong> ${userInfo.grupo}</p>`;
    body += `<p><strong>Carrera:</strong> ${userInfo.carrera}</p>`;
    body += `<p><strong>Fecha:</strong> ${currentDate}</p>`;
    body += '</div>';

    body += `<div class="score-summary">Puntuación Total: ${score} / ${totalQuestions} (${totalQuestions > 0 ? ((score/totalQuestions)*100).toFixed(1) : 0}%)</div>`;

    body += '<h2>Revisión Detallada</h2>';
    let questionNumberOverall = 0;

    toeflListeningSections.forEach(section => {
      body += `<div class="audio-part-review">`;
      body += `<h3>${section.audioContent.title || `Audio Part ${section.id}`} (${section.audioContent.type})</h3>`;
      body += `<div class="audio-transcript"><strong>Transcripción:</strong><br>${getTranscriptForSection(section)}</div>`;

      const questionsToReview = section.audioContent.type === 'mini-dialogue' && section.audioContent.miniDialogueSet 
        ? section.audioContent.miniDialogueSet.flatMap(md => md.questions) 
        : section.questions;

      questionsToReview.forEach(q => {
        questionNumberOverall++;
        const userAnswer = answers.find(a => a.questionId === q.id);
        const selectedOptionIndex = userAnswer?.selectedOptionIndex;
        const isCorrect = selectedOptionIndex !== undefined && selectedOptionIndex !== null && q.options[selectedOptionIndex]?.isCorrect;

        body += '<div class="question-review">';
        body += `<p class="question-text">${questionNumberOverall}. ${q.questionText}</p>`;

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
      });
      body += `</div>`;
    });
    body += '</div>';

    const printWindow = generatePrintWindowContent('TOEFL Listening Detailed Feedback', body, detailedFeedbackStyles);
    setTimeout(() => printWindow?.print(), 500);
  };

  const handlePlayAgain = () => {
    sessionStorage.removeItem('toeflListeningUserInfo');
    localStorage.removeItem('toeflListeningTestState');
    router.push('/toefl-listening/start');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (!isPageDataLoaded && !currentDate) {
    return (<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground"><Card className="w-full max-w-md text-center"><CardHeader><CardTitle className="text-2xl text-primary">Cargando...</CardTitle></CardHeader><CardContent><p className="text-muted-foreground mb-6">Por favor espere.</p></CardContent></Card></div>);
  }
  if (isPageDataLoaded && !userInfo && answers.length === 0) {
     return (<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground"><Card className="w-full max-w-md text-center opacity-100 translate-y-0"><CardHeader><CardTitle className="text-2xl text-primary">No Results Found</CardTitle></CardHeader><CardContent><p className="text-muted-foreground mb-6">It seems you haven't completed the test or your session has expired.</p><Button onClick={handleGoHome} className="w-full bg-primary hover:bg-primary/90"><Home className="mr-2 h-4 w-4"/>Go Home</Button></CardContent></Card></div>);
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8 relative">
         {overlayState === 'open' && <div className="fixed inset-0 bg-black/30 z-0 animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-1000" data-state={overlayState} />}
        <Card ref={resultsCardRef} tabIndex={-1} className={cn("w-full max-w-4xl mx-auto relative z-10 scroll-mt-5", "transition-all duration-700 ease-out", isPageDataLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Resultados de Prueba de Comprensión Auditiva TOEFL</CardTitle>
            {userInfo && (
              <CardDescription className="text-muted-foreground mt-2">
                Resultados para: {userInfo.nombre} {userInfo.apellidoPaterno} ${userInfo.apellidoMaterno} (${userInfo.carrera} - ${userInfo.grado}{userInfo.grupo})
                <br />Fecha: {currentDate}
              </CardDescription>
            )}
            <p className={cn("text-2xl font-semibold mt-4 p-2 transition-all duration-500", showScoreHighlight ? "border-2 border-primary rounded-lg shadow-lg" : "border-2 border-transparent")}>
                Tu Puntuación: <span className="text-accent">{score}</span> / {totalQuestions} ({totalQuestions > 0 ? ((score/totalQuestions)*100).toFixed(1) : 0}%)
            </p>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-4 mt-6 text-center text-primary">Revisa Tus Respuestas</h3>
            <Accordion type="single" collapsible className="w-full">
              {toeflListeningSections.map(section => {
                const sectionTitle = section.audioContent.title || `Audio Part ${section.id}`;
                const questionsForThisSection = section.audioContent.type === 'mini-dialogue' && section.audioContent.miniDialogueSet
                    ? section.audioContent.miniDialogueSet.flatMap((md, mdIndex) => 
                        md.questions.map(q => ({ ...q, subDialogueId: md.id, subDialogueIndex: mdIndex }))
                      )
                    : section.questions.map(q => ({ ...q, subDialogueId: null, subDialogueIndex: null }));
                
                // Calculate starting overall question number for this section
                let startingOverallQNumber = 1;
                for (let i = 0; i < toeflListeningSections.findIndex(s => s.id === section.id); i++) {
                    const prevSection = toeflListeningSections[i];
                    if (prevSection.audioContent.type === 'mini-dialogue' && prevSection.audioContent.miniDialogueSet) {
                        startingOverallQNumber += prevSection.audioContent.miniDialogueSet.reduce((sum, md) => sum + md.questions.length, 0);
                    } else {
                        startingOverallQNumber += prevSection.questions.length;
                    }
                }

                return (
                    <AccordionItem value={`listening-section-${section.id}`} key={`listening-${section.id}`}>
                    <AccordionTrigger className="text-lg hover:no-underline text-accent">{sectionTitle}</AccordionTrigger>
                    <AccordionContent>
                        <div className="mb-3 p-3 bg-muted/70 rounded text-sm italic border border-border whitespace-pre-line">
                            <strong>Transcripción:</strong><br/>
                            <span dangerouslySetInnerHTML={{ __html: getTranscriptForSection(section) }} />
                        </div>
                        {questionsForThisSection.map((q, qIndexInSection) => {
                        const userAnswer = answers.find(a => a.questionId === q.id);
                        const selectedOptionIndex = userAnswer?.selectedOptionIndex;
                        const isCorrect = selectedOptionIndex !== undefined && selectedOptionIndex !== null && q.options[selectedOptionIndex]?.isCorrect;
                        const overallQuestionNumber = startingOverallQNumber + qIndexInSection;

                        return (
                            <div key={q.id} className="mb-6 p-4 border-b border-border last:border-b-0">
                            <p className="font-semibold text-foreground">{overallQuestionNumber}. {q.questionText}</p>
                            <ul className="list-none pl-0 mt-2 space-y-1">
                                {q.options.map((opt, index) => (
                                <li key={index} className={cn("p-2 rounded-md", opt.isCorrect ? "bg-green-100 dark:bg-green-800/70 text-green-700 dark:text-green-300 font-bold" : (selectedOptionIndex === index && !opt.isCorrect) ? "bg-red-100 dark:bg-red-900/70 text-red-700 dark:text-red-300 line-through" : "bg-muted/50 text-muted-foreground")}>
                                    {String.fromCharCode(97 + index)}) {opt.text}
                                    {selectedOptionIndex === index && (isCorrect ? <span className="font-bold ml-2 text-green-600 dark:text-green-400">(Tu respuesta ✓)</span> : <span className="font-bold ml-2 text-red-600 dark:text-red-400">(Tu respuesta ✗)</span>)}
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
                );
              })}
            </Accordion>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-4 p-6">
            <AlertDialog open={showScoreSheetDialog} onOpenChange={setShowScoreSheetDialog}><Tooltip><TooltipTrigger asChild><AlertDialogTrigger asChild><Button onClick={() => setShowScoreSheetDialog(true)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"><Printer className="mr-2 h-4 w-4"/> Imprimir Hoja de Puntaje</Button></AlertDialogTrigger></TooltipTrigger><TooltipContent><p>Genera una hoja de respuestas (monocromático).</p></TooltipContent></Tooltip><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar Impresión</AlertDialogTitle><AlertDialogDescription>Se abrirá el diálogo de impresión. ¿Continuar?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handlePrintScoreSheet}>Imprimir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
            <AlertDialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}><Tooltip><TooltipTrigger asChild><AlertDialogTrigger asChild><Button onClick={() => setShowFeedbackDialog(true)} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"><FileText className="mr-2 h-4 w-4"/> Descargar Feedback Detallado</Button></AlertDialogTrigger></TooltipTrigger><TooltipContent><p>Genera un PDF con transcripciones, preguntas, respuestas y explicaciones.</p></TooltipContent></Tooltip><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar Descarga</AlertDialogTitle><AlertDialogDescription>Se abrirá el diálogo de impresión. ¿Continuar?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDownloadDetailedFeedback}>Descargar</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
            <Tooltip><TooltipTrigger asChild><Button onClick={handlePlayAgain} variant="outline" className="w-full sm:w-auto"><RotateCcw className="mr-2 h-4 w-4"/> Jugar de Nuevo</Button></TooltipTrigger><TooltipContent><p>Reinicia la prueba.</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button onClick={handleGoHome} variant="outline" className="w-full sm:w-auto"><Home className="mr-2 h-4 w-4"/>Ir al Inicio</Button></TooltipTrigger><TooltipContent><p>Vuelve a la página principal.</p></TooltipContent></Tooltip>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default ToeflListeningResultsPage;
