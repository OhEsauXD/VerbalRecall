
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toeflTestSections, UserInfo, ToeflAnswer, ToeflQuestion } from '@/lib/toeflTestData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const ToeflResultsPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [answers, setAnswers] = useState<ToeflAnswer[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem('toeflUserInfo');
    const storedTestState = localStorage.getItem('toeflTestState');

    if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
    if (storedTestState) {
      const testState = JSON.parse(storedTestState);
      setAnswers(testState.answers || []);
      
      let correctAnswers = 0;
      (testState.answers || []).forEach((ans: ToeflAnswer) => {
        const section = toeflTestSections.find(s => s.questions.some(q => q.id === ans.questionId));
        const question = section?.questions.find(q => q.id === ans.questionId);
        if (question && question.options[ans.selectedOptionIndex!]?.isCorrect) {
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

  const handleDownloadPdf = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>TOEFL Practice Test Results</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; color: #333; }
        h1, h2, h3 { color: #003566; }
        .user-info p, .question-item p { margin: 5px 0; }
        .user-info { border-bottom: 1px solid #ccc; padding-bottom: 15px; margin-bottom: 20px; }
        .question-item { margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dotted #eee; }
        .correct-answer { color: green; font-weight: bold; }
        .user-answer.incorrect { color: red; }
        .explanation { font-style: italic; color: #555; font-size: 0.9em; margin-top: 5px; }
        .options-list { list-style-type: none; padding-left: 0; }
        .options-list li { margin-bottom: 3px; }
      `);
      printWindow.document.write('</style></head><body>');
      printWindow.document.write('<h1>TOEFL Practice Test Results</h1>');

      if (userInfo) {
        printWindow.document.write('<div class="user-info">');
        printWindow.document.write('<h2>User Information</h2>');
        printWindow.document.write(`<p><strong>Name:</strong> ${userInfo.nombre} ${userInfo.apellidoPaterno} ${userInfo.apellidoMaterno}</p>`);
        printWindow.document.write(`<p><strong>Grado:</strong> ${userInfo.grado}</p>`);
        printWindow.document.write(`<p><strong>Grupo:</strong> ${userInfo.grupo}</p>`);
        printWindow.document.write(`<p><strong>Carrera:</strong> ${userInfo.carrera}</p>`);
        printWindow.document.write('</div>');
      }

      printWindow.document.write(`<h2>Score: ${score} / ${toeflTestSections.reduce((sum, sec) => sum + sec.questions.length, 0)}</h2>`);
      
      printWindow.document.write('<h3>Questions & Answers</h3>');
      let questionNumber = 1;
      toeflTestSections.forEach(section => {
        printWindow.document.write(`<h4>Section: ${section.topic}</h4>`);
        section.questions.forEach(q => {
          const userAnswer = answers.find(a => a.questionId === q.id);
          const selectedOptionIndex = userAnswer?.selectedOptionIndex;
          
          printWindow.document.write('<div class="question-item">');
          printWindow.document.write(`<p><strong>${questionNumber}. ${q.questionText}</strong></p>`);
          printWindow.document.write('<ul class="options-list">');
          q.options.forEach((opt, index) => {
            let liClass = '';
            if (opt.isCorrect) liClass = 'correct-answer';
            else if (selectedOptionIndex === index && !opt.isCorrect) liClass = 'user-answer incorrect';
            
            printWindow.document.write(`<li class="${liClass}">${String.fromCharCode(97 + index)}) ${opt.text} ${opt.isCorrect ? '(Correct)' : ''} ${selectedOptionIndex === index && !opt.isCorrect ? '(Your Answer)' : ''}</li>`);
          });
          printWindow.document.write('</ul>');
          printWindow.document.write(`<p class="explanation">Explanation: ${q.explanation}</p>`);
          printWindow.document.write('</div>');
          questionNumber++;
        });
      });

      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Could not open print window. Please check your browser settings.');
    }
  };

  const handlePlayAgain = () => {
    sessionStorage.removeItem('toeflUserInfo');
    localStorage.removeItem('toeflTestState');
    router.push('/toefl-practice/start');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (!userInfo && answers.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">No Results Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">It seems you haven't completed the test or your session has expired.</p>
                    <Button onClick={handleGoHome} className="w-full">Go to Home</Button>
                </CardContent>
            </Card>
        </div>
    );
  }


  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">TOEFL Practice Test Results</CardTitle>
          {userInfo && (
            <CardDescription className="text-muted-foreground mt-2">
              Results for: {userInfo.nombre} {userInfo.apellidoPaterno} {userInfo.apellidoMaterno} ({userInfo.carrera} - {userInfo.grado}{userInfo.grupo})
            </CardDescription>
          )}
          <p className="text-2xl font-semibold mt-4">Your Score: <span className="text-accent">{score}</span> / {toeflTestSections.reduce((sum, sec) => sum + sec.questions.length, 0)}</p>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-center text-primary">Review Your Answers</h3>
          <Accordion type="single" collapsible className="w-full">
            {toeflTestSections.map(section => (
              <AccordionItem value={`section-${section.id}`} key={section.id}>
                <AccordionTrigger className="text-lg hover:no-underline text-accent">{section.topic}</AccordionTrigger>
                <AccordionContent>
                  {section.questions.map((q, qIndex) => {
                    const userAnswer = answers.find(a => a.questionId === q.id);
                    const selectedOptionIndex = userAnswer?.selectedOptionIndex;
                    return (
                      <div key={q.id} className="mb-6 p-4 border-b border-border last:border-b-0">
                        <p className="font-semibold text-foreground">{qIndex + 1}. {q.questionText}</p>
                        <ul className="list-none pl-0 mt-2 space-y-1">
                          {q.options.map((opt, index) => (
                            <li
                              key={index}
                              className={cn(
                                "p-2 rounded-md",
                                opt.isCorrect ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : 
                                (selectedOptionIndex === index && !opt.isCorrect) ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 line-through" :
                                "bg-muted/50 text-muted-foreground"
                              )}
                            >
                              {String.fromCharCode(97 + index)}) {opt.text}
                              {opt.isCorrect && <span className="font-bold ml-2">(Correct Answer)</span>}
                              {selectedOptionIndex === index && !opt.isCorrect && <span className="font-bold ml-2">(Your Answer)</span>}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-sm text-muted-foreground italic">Explanation: {q.explanation}</p>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 p-6">
          <Button onClick={handleDownloadPdf} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">Download PDF</Button>
          <Button onClick={handlePlayAgain} variant="outline" className="w-full sm:w-auto">Play Again</Button>
          <Button onClick={handleGoHome} variant="outline" className="w-full sm:w-auto">Go to Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ToeflResultsPage;

    