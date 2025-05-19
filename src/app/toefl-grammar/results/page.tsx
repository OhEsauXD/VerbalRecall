
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  toeflGrammarTestSections,
  UserInfo,
  ToeflGrammarAnswer,
  ToeflGrammarQuestion,
  ToeflGrammarTestState,
  TOTAL_GRAMMAR_SECTIONS,
  QUESTIONS_PER_GRAMMAR_SECTION
} from '@/lib/toeflGrammarTestData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Printer, FileText, Home, RotateCcw } from 'lucide-react';

const ToeflGrammarResultsPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [testState, setTestState] = useState<ToeflGrammarTestState | null>(null);
  const [score, setScore] = useState(0);
  const [showScoreSheetDialog, setShowScoreSheetDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const totalQuestions = TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION;

  const resultsCardRef = useRef<HTMLDivElement>(null);
  const [isPageDataLoaded, setIsPageDataLoaded] = useState(false);
  const [overlayState, setOverlayState] = useState<'open' | 'closed'>('closed');
  const [showScoreHighlight, setShowScoreHighlight] = useState(false);

  const getQuestionById = (questionId: string): ToeflGrammarQuestion | undefined => {
    for (const section of toeflGrammarTestSections) {
      const question = section.questions.find(q => q.id === questionId);
      if (question) return question;
    }
    return undefined;
  };

  const isAnswerCorrect = (question: ToeflGrammarQuestion, answer: ToeflGrammarAnswer | undefined): boolean => {
    if (!answer) return false;
    switch (question.type) {
        case 'sentenceCompletion':
        case 'sentenceRestructuring':
            return question.options[answer.selectedOptionIndex || -1]?.isCorrect || false;
        case 'errorIdentification':
            return question.errorPartId === answer.selectedErrorPartId;
        case 'paragraphEditing':
            // Simplified check: assumes all gaps must be correct
            if (!answer.selectedGapAnswers) return false;
            return Object.entries(question.gaps).every(([gapNum, gapData]) => 
                gapData.options.find(opt => opt.text === answer.selectedGapAnswers?.[gapNum] && opt.isCorrect)
            );
        default:
            return false;
    }
  };


  useEffect(() => {
    setCurrentDate(format(new Date(), 'dd/MM/yyyy'));
    const storedUserInfo = sessionStorage.getItem('toeflGrammarUserInfo');
    const storedTestStateRaw = localStorage.getItem('toeflGrammarTestState');

    let loadedUserInfo: UserInfo | null = null;
    let loadedTestState: ToeflGrammarTestState | null = null;

    if (storedUserInfo) {
      loadedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(loadedUserInfo);
    }
    if (storedTestStateRaw) {
      loadedTestState = JSON.parse(storedTestStateRaw);
      setTestState(loadedTestState);
      
      let correctAnswersCount = 0;
      if (loadedTestState?.sectionStates) {
          Object.values(loadedTestState.sectionStates).forEach(sectionState => {
              sectionState.answers.forEach(ans => {
                  const question = getQuestionById(ans.questionId);
                  if (question && isAnswerCorrect(question, ans)) {
                      correctAnswersCount++;
                  }
              });
          });
      }
      setScore(correctAnswersCount);
    }

    if (loadedUserInfo || loadedTestState) { 
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
    if (isPageDataLoaded && resultsCardRef.current && (userInfo || testState)) {
      resultsCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isPageDataLoaded, userInfo, testState]); 

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
    body { font-family: Arial, sans-serif; margin: 0; color: #000; font-size: 9pt; } /* Reduced base font size */
    .container { max-width: 100%; padding: 0; }
    h1, h2, h3 { color: #000; text-align: center; }
    h1 { font-size: 14pt; margin-bottom: 3px;} /* Reduced */
    h2 { font-size: 11pt; margin-bottom: 8px; } /* Reduced */
    h3 { font-size: 9pt; margin-bottom: 3px; text-align: left; } /* Reduced */
    .user-info, .score-summary { border: 1px solid #000; padding: 6px; margin-bottom: 8px; border-radius: 0; } /* Reduced padding */
    .user-info p, .score-summary p { margin: 2px 0; font-size: 8pt; } /* Reduced font size and margin */
    .answer-grid { width: 100%; border-collapse: collapse; margin-top: 8px; } /* Reduced margin */
    .answer-grid th, .answer-grid td { border: 1px solid #000; padding: 2px; text-align: center; font-size: 7pt; } /* Reduced padding and font size */
    .answer-grid th { background-color: #ccc; }
    .grid-container { display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px; } /* Increased columns, reduced gap */
    .grid-item-table { break-inside: avoid; page-break-inside: avoid; }
    @page { size: letter portrait; margin: 0.5in; } /* Reduced margin */
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 8pt; }
      .no-print { display: none; }
      h1 { font-size: 13pt; }
      h2 { font-size: 10pt; }
      .user-info p, .score-summary p { font-size: 7pt; }
      .answer-grid th, .answer-grid td { font-size: 6pt; padding: 1px; }
      .grid-container { gap: 2px; }
    }
  `;

  const handlePrintScoreSheet = () => {
    setShowScoreSheetDialog(false);
    if (!userInfo || !testState) return;

    let body = '<div class="container">';
    body += '<h1>TOEFL ITP Grammar - Score Sheet</h1>';
    body += '<h2>Resultado de Prueba de Gramática</h2>';
    
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
    
    const numColumnsForGrid = 10; 
    const questionsPerColumn = Math.ceil(totalQuestions / numColumnsForGrid); 

    let globalQuestionCounter = 0;
    for (let col = 0; col < numColumnsForGrid; col++) { 
        body += '<div class="grid-item-table"><table class="answer-grid">';
        body += '<thead><tr><th>#</th><th>Resp.</th></tr></thead>'; // Abbreviated header
        body += '<tbody>';
        for (let row = 0; row < questionsPerColumn; row++) { 
            const questionNumberOverall = col * questionsPerColumn + row + 1;
            if (questionNumberOverall <= totalQuestions) {
                let displayAnswer = '-';
                // Find the answer for this question number
                let currentQNum = 0;
                let foundAns: ToeflGrammarAnswer | undefined = undefined;
                outerAnswerLoop:
                for (const sectionId of Object.keys(testState.sectionStates).sort((a,b) => parseInt(a) - parseInt(b))) {
                    const sectionState = testState.sectionStates[parseInt(sectionId)];
                    const sectionData = toeflGrammarTestSections.find(s => s.id === parseInt(sectionId));
                    if (sectionData) {
                        for (const q of sectionData.questions) {
                            currentQNum++;
                            if (currentQNum === questionNumberOverall) {
                                foundAns = sectionState.answers.find(a => a.questionId === q.id);
                                break outerAnswerLoop;
                            }
                        }
                    }
                }

                if (foundAns) {
                    const question = getQuestionById(foundAns.questionId);
                    if (question) {
                        if (question.type === 'sentenceCompletion' || question.type === 'sentenceRestructuring') {
                            if (foundAns.selectedOptionIndex !== null && foundAns.selectedOptionIndex !== undefined) {
                                displayAnswer = String.fromCharCode(97 + foundAns.selectedOptionIndex);
                            }
                        } else if (question.type === 'errorIdentification') {
                            displayAnswer = foundAns.selectedErrorPartId || '-';
                        } else if (question.type === 'paragraphEditing') {
                            // For simplicity, just mark as attempted if any gap has an answer
                            displayAnswer = Object.values(foundAns.selectedGapAnswers || {}).some(val => val !== null) ? 'C' : '-'; // C for completed
                        }
                    }
                }
                body += `<tr><td>${questionNumberOverall}</td><td>${displayAnswer.toUpperCase()}</td></tr>`;
            }
        }
        body += '</tbody></table></div>';
    }
    body += '</div></div>'; 

    const printWindow = generatePrintWindowContent('TOEFL Grammar Score Sheet', body, scoreSheetStyles);
    setTimeout(() => printWindow?.print(), 500);
  };
  
  const detailedFeedbackStyles = `
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; color: #333; }
    /* Styles similar to reading test, green tones */
    .container { max-width: 800px; margin: auto; }
    h1, h2, h3 { color: #00693E; } /* Green for titles */
    h1 { font-size: 24px; text-align: center; margin-bottom: 20px; }
    .user-info { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 5px; background-color: #e6fff2; } /* Light green bg */
    .user-info p { margin: 5px 0; font-size: 14px; }
    .score-summary { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
    .question-review { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; page-break-inside: avoid;}
    .question-review p, .question-review div { margin: 3px 0; }
    .question-text { font-weight: bold; }
    .user-answer-text { font-style: italic; }
    .correct-symbol { color: green; font-weight: bold; }
    .incorrect-symbol { color: red; font-weight: bold; }
    .correct-answer-text { font-weight: bold; background-color: #d4edda; padding: 2px 4px; border-radius: 3px; }
    .explanation-text { font-size: 0.9em; color: #555; margin-top: 5px; padding-left: 10px; border-left: 2px solid #00693E;}
    .options-list { list-style-type: none; padding-left: 0; }
    .options-list li { margin-bottom: 3px; }
    .sentence-part { display: inline; }
    .underlined-error { text-decoration: line-through; color: red; }
    .correct-error-choice { background-color: #d4edda; padding: 1px 3px; border-radius: 2px; }
    @page { size: A4; margin: 20mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none; }
    }
  `;

  const handleDownloadDetailedFeedback = () => {
    setShowFeedbackDialog(false);
    if (!userInfo || !testState) return;

    let body = '<div class="container">';
    body += '<h1>TOEFL Grammar - Detailed Feedback</h1>';

    body += '<div class="user-info">';
    body += `<h3>Información del Estudiante</h3>`;
    body += `<p><strong>Nombre:</strong> ${userInfo.nombre} ${userInfo.apellidoPaterno} ${userInfo.apellidoMaterno}</p>`;
    body += `<p><strong>Grado:</strong> ${userInfo.grado} | <strong>Grupo:</strong> ${userInfo.grupo}</p>`;
    body += `<p><strong>Carrera:</strong> ${userInfo.carrera}</p>`;
    body += `<p><strong>Fecha:</strong> ${currentDate}</p>`;
    body += '</div>';

    body += `<div class="score-summary">Puntuación Total: ${score} / ${totalQuestions} (${((score/totalQuestions)*100).toFixed(1)}%)</div>`;
    
    body += '<h2>Revisión Detallada</h2>';
    let questionNumberOverall = 0;
    toeflGrammarTestSections.forEach(section => {
      body += `<h3>${section.title}</h3>`;
      section.questions.forEach(q => {
        questionNumberOverall++;
        const userAnswer = testState.sectionStates[section.id]?.answers.find(a => a.questionId === q.id);
        const correct = isAnswerCorrect(q, userAnswer);

        body += '<div class="question-review">';
        body += `<p class="question-text">${questionNumberOverall}. `;
        
        if (q.type === 'sentenceCompletion' || q.type === 'sentenceRestructuring') {
            body += `${q.questionText.replace('___', '_____')} </p>`;
            if (q.type === 'sentenceRestructuring' && q.originalSentence) {
                body += `<p><em>Oración Original: ${q.originalSentence}</em></p>`
            }
            body += '<ul class="options-list">';
            q.options.forEach((opt, index) => {
              let liContent = `${String.fromCharCode(97 + index)}) ${opt.text}`;
              const isSelected = userAnswer?.selectedOptionIndex === index;
              if (isSelected) {
                liContent = `<span class="user-answer-text">${liContent} ${correct ? '<span class="correct-symbol">✓</span>' : '<span class="incorrect-symbol">✗</span>'} (Tu respuesta)</span>`;
              }
              if (opt.isCorrect) {
                liContent = `<span class="correct-answer-text">${liContent}</span>`;
              }
              body += `<li>${liContent}</li>`;
            });
            body += '</ul>';
        } else if (q.type === 'errorIdentification') {
            body += `Identifica el error: </p><p>`;
            q.sentenceParts.forEach(part => {
                let partText = part.text;
                if (userAnswer?.selectedErrorPartId === part.id && part.id === q.errorPartId) { // Correctly identified error
                    partText = `<span class="user-answer-text correct-error-choice">${part.text} (${part.id}) ✓</span>`;
                } else if (userAnswer?.selectedErrorPartId === part.id && part.id !== q.errorPartId) { // Incorrectly identified as error
                    partText = `<span class="user-answer-text underlined-error">${part.text} (${part.id}) ✗</span>`;
                } else if (part.id === q.errorPartId) { // The actual error, not selected by user or correctly selected
                     partText = `<span class="correct-answer-text">${part.text} (${part.id})</span>`;
                } else {
                     partText = `${part.text} (${part.id})`;
                }
                body += `<span class="sentence-part">${partText}</span> `;
            });
            body += `</p>`;
        } else if (q.type === 'paragraphEditing') {
            body += `Edita el párrafo: </p><p class="text-base whitespace-pre-line">${q.paragraphText}</p>`;
             Object.entries(q.gaps).forEach(([gapNum, gapData]) => {
                body += `<div><strong>Gap [${gapNum}]${gapData.prompt ? `: ${gapData.prompt}` : ''}:</strong> `;
                const userGapAns = userAnswer?.selectedGapAnswers?.[gapNum];
                const correctGapAns = gapData.options.find(opt => opt.isCorrect)?.text;
                if (userGapAns) {
                    body += `<span class="user-answer-text">${userGapAns} ${userGapAns === correctGapAns ? '<span class="correct-symbol">✓</span>' : '<span class="incorrect-symbol">✗</span>'}</span>`;
                } else {
                    body += `<span>(No respondiste)</span>`;
                }
                if (userGapAns !== correctGapAns) {
                    body += ` <span class="correct-answer-text">(Correcto: ${correctGapAns})</span>`;
                }
                body += `</div>`;
            });
        }

        if (q.explanation) {
           body += `<p class="explanation-text"><strong>Explicación (Respuesta Correcta):</strong> ${q.explanation}</p>`;
        }
        body += '</div>';
      });
    });
    body += '</div>'; 

    const printWindow = generatePrintWindowContent('TOEFL Grammar Detailed Feedback', body, detailedFeedbackStyles);
    setTimeout(() => printWindow?.print(), 500);
  };

  const handlePlayAgain = () => {
    sessionStorage.removeItem('toeflGrammarUserInfo');
    localStorage.removeItem('toeflGrammarTestState');
    router.push('/toefl-grammar/start');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  // Placeholder for competency breakdown
  const CompetencyBreakdown = () => {
    // This would involve iterating through testState.sectionStates,
    // matching answers to questions from toeflGrammarTestSections,
    // and categorizing based on question.category.
    // For now, a simple placeholder.
    const categories = ['Subject-Verb Agreement', 'Basic Tenses', 'Modifiers', 'Parallelism', 'Reduction Clauses', 'Inversions', 'Transition Words', 'Cohesion', 'Mixed Concepts', 'Word Order'];
    const analysis: { [key: string]: { correct: number, total: number } } = {};

    if (testState) {
        categories.forEach(cat => analysis[cat] = { correct: 0, total: 0 });
        toeflGrammarTestSections.forEach(sectionData => {
            const sectionAnswers = testState.sectionStates[sectionData.id]?.answers || [];
            sectionData.questions.forEach(q => {
                if (analysis[q.category]) {
                    analysis[q.category].total++;
                    const userAnswer = sectionAnswers.find(ans => ans.questionId === q.id);
                    if (isAnswerCorrect(q, userAnswer)) {
                        analysis[q.category].correct++;
                    }
                }
            });
        });
    }
    
    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 text-center text-primary">Desglose de Competencias</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {Object.entries(analysis).map(([category, data]) => (
                    data.total > 0 && (
                        <li key={category}>
                            {category}: {data.correct} de {data.total} correctas ({data.total > 0 ? ((data.correct / data.total) * 100).toFixed(0) : 0}%)
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};


  if (!isPageDataLoaded && !currentDate) { 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <Card className="w-full max-w-md text-center">
                <CardHeader><CardTitle className="text-2xl text-primary">Cargando Resultados de Gramática...</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground mb-6">Por favor espere.</p></CardContent>
            </Card>
        </div>
    );
  }
  if (isPageDataLoaded && !userInfo && !testState) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <Card className="w-full max-w-md text-center opacity-100 translate-y-0"> 
                <CardHeader><CardTitle className="text-2xl text-primary">No se Encontraron Resultados de Gramática</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">Parece que no has completado la prueba de gramática o tu sesión ha expirado.</p>
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
          tabIndex={-1} 
          className={cn(
            "w-full max-w-4xl mx-auto relative z-10 scroll-mt-5", 
            "transition-all duration-700 ease-out",
            isPageDataLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Resultados de Prueba de Gramática TOEFL</CardTitle>
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
                Tu Puntuación: <span className="text-accent">{score}</span> / {totalQuestions} ({totalQuestions > 0 ? ((score/totalQuestions)*100).toFixed(1) : 0}%)
            </p>
          </CardHeader>
          <CardContent>
            <CompetencyBreakdown />
            <h3 className="text-xl font-semibold mb-4 mt-6 text-center text-primary">Revisa Tus Respuestas</h3>
            <Accordion type="single" collapsible className="w-full">
              {toeflGrammarTestSections.map(section => (
                <AccordionItem value={`section-grammar-${section.id}`} key={`grammar-${section.id}`}>
                  <AccordionTrigger className="text-lg hover:no-underline text-accent">{section.title}</AccordionTrigger>
                  <AccordionContent>
                    {section.questions.map((q, qIndexInSection) => {
                      const userAnswer = testState?.sectionStates[section.id]?.answers.find(a => a.questionId === q.id);
                      const correct = isAnswerCorrect(q, userAnswer);
                      const overallQuestionNumber = (section.id - 1) * QUESTIONS_PER_GRAMMAR_SECTION + qIndexInSection + 1;

                      return (
                        <div key={q.id} className="mb-6 p-4 border-b border-border last:border-b-0">
                          <p className="font-semibold text-foreground">{overallQuestionNumber}. {
                            q.type === 'sentenceCompletion' ? q.questionText.replace('___', '_____') :
                            q.type === 'sentenceRestructuring' ? q.prompt :
                            q.type === 'errorIdentification' ? 'Identifica el error:' :
                            q.type === 'paragraphEditing' ? 'Edita el párrafo:' :
                            'Pregunta'
                          }</p>
                          {q.type === 'sentenceRestructuring' && <p className="text-sm text-muted-foreground italic">Oración original: {q.originalSentence}</p>}
                          {q.type === 'errorIdentification' && 
                            <p className="text-foreground my-1">
                                {q.sentenceParts.map(part => (
                                    <span key={part.id} className={cn(
                                        "sentence-part",
                                        userAnswer?.selectedErrorPartId === part.id && part.id === q.errorPartId && "bg-green-100 dark:bg-green-800/70 text-green-700 dark:text-green-300 font-bold", // Correctly identified error
                                        userAnswer?.selectedErrorPartId === part.id && part.id !== q.errorPartId && "bg-red-100 dark:bg-red-900/70 text-red-700 dark:text-red-300 line-through", // Incorrectly identified
                                        userAnswer?.selectedErrorPartId !== part.id && part.id === q.errorPartId && "bg-yellow-100 dark:bg-yellow-800/70 text-yellow-700 dark:text-yellow-400 font-bold" // Actual error, not selected
                                    )}>
                                        {part.text} ({part.id}){' '}
                                    </span>
                                ))}
                            </p>
                          }
                           {q.type === 'paragraphEditing' && <p className="text-base whitespace-pre-line my-1">{q.paragraphText}</p>}


                          { (q.type === 'sentenceCompletion' || q.type === 'sentenceRestructuring') &&
                            <ul className="list-none pl-0 mt-2 space-y-1">
                              {q.options.map((opt, index) => (
                                <li
                                  key={index}
                                  className={cn(
                                    "p-2 rounded-md",
                                    opt.isCorrect ? "bg-green-100 dark:bg-green-800/70 text-green-700 dark:text-green-300 font-bold" : 
                                    (userAnswer?.selectedOptionIndex === index && !opt.isCorrect) ? "bg-red-100 dark:bg-red-900/70 text-red-700 dark:text-red-300 line-through" :
                                    "bg-muted/50 text-muted-foreground"
                                  )}
                                >
                                  {String.fromCharCode(97 + index)}) {opt.text}
                                  {userAnswer?.selectedOptionIndex === index && 
                                    (correct ? <span className="font-bold ml-2 text-green-600 dark:text-green-400">(Tu respuesta ✓)</span> : <span className="font-bold ml-2 text-red-600 dark:text-red-400">(Tu respuesta ✗)</span>)
                                  }
                                  {opt.isCorrect && userAnswer?.selectedOptionIndex !== index && <span className="font-bold ml-2">(Respuesta Correcta)</span>}
                                </li>
                              ))}
                            </ul>
                          }
                          { q.type === 'paragraphEditing' && 
                            <div className="mt-2 space-y-1">
                                {Object.entries(q.gaps).map(([gapNum, gapData]) => {
                                    const userGapAnsText = userAnswer?.selectedGapAnswers?.[gapNum];
                                    const correctGapOpt = gapData.options.find(opt => opt.isCorrect);
                                    const isGapCorrect = userGapAnsText === correctGapOpt?.text;
                                    return (
                                        <div key={gapNum} className="text-sm">
                                            <strong>Gap [{gapNum}]:</strong> Tu respuesta: <span className={cn(isGapCorrect ? "text-green-600" : "text-red-600")}>{userGapAnsText || "(sin respuesta)"} {isGapCorrect ? "✓" : "✗"}</span>.
                                            {!isGapCorrect && <span className="text-green-700 font-semibold"> Correcta: {correctGapOpt?.text}</span>}
                                        </div>
                                    );
                                })}
                            </div>
                          }
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
              <Tooltip><TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button onClick={() => setShowScoreSheetDialog(true)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                      <Printer className="mr-2 h-4 w-4"/> Imprimir Hoja de Puntaje
                    </Button>
                  </AlertDialogTrigger>
              </TooltipTrigger><TooltipContent><p>Genera una hoja de respuestas con tu información y puntaje (monocromático).</p></TooltipContent></Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Confirmar Impresión</AlertDialogTitle><AlertDialogDescription>Se abrirá el diálogo de impresión para tu hoja de puntaje. ¿Continuar?</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handlePrintScoreSheet}>Imprimir</AlertDialogAction></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
               <Tooltip><TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                     <Button onClick={() => setShowFeedbackDialog(true)} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                       <FileText className="mr-2 h-4 w-4"/> Descargar Feedback Detallado
                     </Button>
                  </AlertDialogTrigger>
               </TooltipTrigger><TooltipContent><p>Genera un PDF con preguntas, tus respuestas, correctas y explicaciones.</p></TooltipContent></Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Confirmar Descarga</AlertDialogTitle><AlertDialogDescription>Se abrirá el diálogo de impresión para tu reporte detallado. ¿Continuar?</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDownloadDetailedFeedback}>Descargar</AlertDialogAction></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Tooltip><TooltipTrigger asChild><Button onClick={handlePlayAgain} variant="outline" className="w-full sm:w-auto"><RotateCcw className="mr-2 h-4 w-4"/> Jugar de Nuevo</Button></TooltipTrigger><TooltipContent><p>Reinicia la prueba de gramática.</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button onClick={handleGoHome} variant="outline" className="w-full sm:w-auto"><Home className="mr-2 h-4 w-4"/>Ir al Inicio</Button></TooltipTrigger><TooltipContent><p>Vuelve a la página principal de juegos.</p></TooltipContent></Tooltip>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default ToeflGrammarResultsPage;
