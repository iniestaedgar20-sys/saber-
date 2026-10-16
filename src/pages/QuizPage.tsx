import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  XCircle,
  BookOpen
} from 'lucide-react';

interface QuizPageProps {
  courseId: string;
  onNavigate: (view: string, courseId?: string) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ courseId, onNavigate }) => {
  const { courses, currentUser, submitQuiz, getEnrollment } = useApp();

  const course = courses.find(c => c.id === courseId);
  const enrollment = getEnrollment(courseId);

  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionIndex: number]: number }>({});
  const [result, setResult] = useState<{
    submitted: boolean;
    passed: boolean;
    score: number;
  }>({
    submitted: false,
    passed: false,
    score: 0
  });

  if (!course || !currentUser || !enrollment) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#F3F5F0]">Avaliação Indisponível</h2>
        <p className="text-xs text-[#A4B2AF]">Precisas de estar inscrito para realizar esta avaliação.</p>
        <button
          onClick={() => onNavigate('courses')}
          className="px-4 py-2 bg-[#D6F36A] text-[#111719] text-xs font-bold rounded-lg"
        >
          Voltar aos Cursos
        </button>
      </div>
    );
  }

  const questions = course.finalQuiz;
  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  const handleSelect = (qIdx: number, optionIdx: number) => {
    if (result.submitted) return; // locked after submission
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered) return;

    const answerArray = questions.map((_, idx) => selectedAnswers[idx]);
    const quizOutcome = submitQuiz(courseId, answerArray);

    setResult({
      submitted: true,
      passed: quizOutcome.passed,
      score: quizOutcome.score
    });

    if (quizOutcome.passed) {
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6F36A', '#75C9B7', '#F3F5F0']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setResult({ submitted: false, passed: false, score: 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate('classroom', course.id)}
        className="flex items-center gap-2 text-xs font-semibold text-[#A4B2AF] hover:text-[#D6F36A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar à Sala de Aula</span>
      </button>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#75C9B7] font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Avaliação Oficial de Conhecimentos</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#F3F5F0]">
          Avaliação Final: {course.title}
        </h1>

        <p className="text-xs text-[#A4B2AF] leading-relaxed">
          Esta avaliação é composta por {questions.length} questões práticas baseadas nos módulos ministrados. 
          O critério para aprovação e conclusão com êxito deste curso é de <strong className="text-[#D6F36A]">{course.passingScorePercent}%</strong> (acertar no mínimo {Math.ceil((course.passingScorePercent / 100) * questions.length)} das {questions.length} perguntas).
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#A4B2AF]">
          <span>Aluno: <strong className="text-[#F3F5F0]">{currentUser.name}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Critério: <strong className="text-[#D6F36A]">{course.passingScorePercent}%</strong></span>
        </div>
      </div>

      {/* Result Card if submitted */}
      {result.submitted && (
        <div className={`p-6 rounded-2xl border space-y-4 ${
          result.passed 
            ? 'bg-[#202D30] border-[#D6F36A]' 
            : 'bg-[#192326] border-red-500/50'
        }`}>
          <div className="flex items-center gap-3">
            {result.passed ? (
              <div className="w-12 h-12 rounded-xl bg-[#D6F36A]/20 text-[#D6F36A] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <XCircle className="w-7 h-7" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-[#F3F5F0]">
                {result.passed ? 'Parabéns! Concluíste o Curso com Sucesso!' : 'Aproveitamento Insuficiente'}
              </h2>
              <p className="text-xs text-[#A4B2AF]">
                A tua pontuação final foi de <span className="font-mono text-base font-bold text-[#F3F5F0]">{result.score}%</span>.
                {result.passed ? ' Dominaste as competências práticas deste curso com aproveitamento completo!' : ` Necessitas de pelo menos ${course.passingScorePercent}% para aprovação.`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {result.passed ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-5 py-2.5 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors shadow-lg flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ir para o Meu Painel</span>
                </button>

                <button
                  onClick={() => onNavigate('courses')}
                  className="px-4 py-2.5 bg-[#192326] text-[#F3F5F0] hover:border-[#D6F36A] border border-[#344448] font-semibold text-xs rounded-xl transition-colors"
                >
                  Explorar Outros Cursos
                </button>

                <button
                  onClick={() => onNavigate('classroom', course.id)}
                  className="px-4 py-2.5 bg-[#202D30] text-[#A4B2AF] hover:text-[#F3F5F0] border border-[#344448] font-semibold text-xs rounded-xl transition-colors"
                >
                  Rever Aulas
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleRetry}
                  className="px-5 py-2.5 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tentar Novamente a Avaliação</span>
                </button>

                <button
                  onClick={() => onNavigate('classroom', course.id)}
                  className="px-4 py-2.5 bg-[#202D30] text-[#A4B2AF] hover:text-[#F3F5F0] border border-[#344448] font-semibold text-xs rounded-xl transition-colors"
                >
                  Rever Aulas do Curso
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedOption = selectedAnswers[qIdx];
          const isCorrect = selectedOption === q.correctAnswerIndex;

          return (
            <div 
              key={q.id}
              className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-mono text-[#75C9B7] font-semibold">
                  Questão {qIdx + 1} de {questions.length}
                </span>
                {result.submitted && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {isCorrect ? 'Correcta' : 'Incorrecta'}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-[#F3F5F0] leading-snug">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  let optionStyle = 'border-[#344448] bg-[#202D30]/60 hover:border-[#D6F36A]/50 text-[#F3F5F0]';

                  if (isSelected) {
                    optionStyle = 'border-[#D6F36A] bg-[#202D30] text-[#F3F5F0] ring-1 ring-[#D6F36A]';
                  }

                  if (result.submitted) {
                    if (optIdx === q.correctAnswerIndex) {
                      optionStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-red-500 bg-red-500/10 text-red-300';
                    } else {
                      optionStyle = 'border-[#344448]/50 opacity-60 text-[#A4B2AF]';
                    }
                  }

                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-xs cursor-pointer flex items-center gap-3 transition-all ${optionStyle}`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? 'border-[#D6F36A] bg-[#D6F36A]' 
                          : 'border-[#344448]'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#111719]" />}
                      </div>
                      <span className="leading-relaxed flex-1">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {result.submitted && (
                <div className="pt-3 border-t border-[#344448] text-xs text-[#A4B2AF] space-y-1">
                  <div className="font-semibold text-[#75C9B7]">Explicação pedagógica:</div>
                  <p className="leading-relaxed text-[11px]">{q.explanation}</p>
                </div>
              )}

            </div>
          );
        })}

        {/* Submit Bar */}
        {!result.submitted && (
          <div className="p-4 rounded-2xl bg-[#192326] border border-[#344448] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#A4B2AF]">
              Respondidas: <strong className="text-[#F3F5F0] font-mono">{Object.keys(selectedAnswers).length}</strong> de <span className="font-mono">{questions.length}</span>
            </div>

            <button
              type="submit"
              disabled={!allAnswered}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-lg ${
                allAnswered
                  ? 'bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] cursor-pointer'
                  : 'bg-[#202D30] text-[#A4B2AF]/50 border border-[#344448] cursor-not-allowed'
              }`}
            >
              {allAnswered ? 'Submeter Avaliação e Concluir' : 'Responde a todas as questões para submeter'}
            </button>
          </div>
        )}

      </form>

    </div>
  );
};
