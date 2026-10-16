import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Check, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Download, 
  Edit3, 
  FileText, 
  Layers, 
  Lock, 
  Play, 
  Save, 
  Sparkles,
  ExternalLink,
  Bot 
} from 'lucide-react';

interface ClassroomPageProps {
  courseId: string;
  onNavigate: (view: string, courseId?: string) => void;
}

export const ClassroomPage: React.FC<ClassroomPageProps> = ({ courseId, onNavigate }) => {
  const { 
    courses, 
    currentUser, 
    getEnrollment, 
    markLessonComplete, 
    setLastAccessedLesson, 
    savePersonalNote, 
    getPersonalNote
  } = useApp();

  const course = courses.find(c => c.id === courseId);
  const enrollment = getEnrollment(courseId);

  // Collect all lessons in a flat ordered array
  const allLessons = React.useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title })));
  }, [course]);

  // Determine current active lesson
  const [currentLessonId, setCurrentLessonId] = useState<string>(() => {
    if (enrollment?.lastAccessedLessonId) {
      return enrollment.lastAccessedLessonId;
    }
    return allLessons[0]?.id || '';
  });

  // Keep note text synchronized
  const [noteContent, setNoteContent] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  // Sync initial note when lesson changes
  useEffect(() => {
    if (currentLessonId) {
      const savedNote = getPersonalNote(currentLessonId);
      setNoteContent(savedNote);
      setNoteSaved(false);
      setLastAccessedLesson(courseId, currentLessonId);
    }
  }, [currentLessonId, courseId]);

  if (!course || !currentUser || !enrollment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#F3F5F0]">Sessão de aula não disponível</h2>
        <p className="text-xs text-[#A4B2AF]">Precisas de estar inscrito neste curso para aceder às aulas.</p>
        <button
          onClick={() => onNavigate('course-detail', courseId)}
          className="px-4 py-2 bg-[#D6F36A] text-[#111719] text-xs font-bold rounded-lg"
        >
          Ver Página do Curso
        </button>
      </div>
    );
  }

  const currentLesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCompleted = enrollment.completedLessonIds.includes(currentLesson.id);
  const totalCompleted = enrollment.completedLessonIds.length;
  const progressPercent = Math.round((totalCompleted / allLessons.length) * 100);

  // All lessons finished? Can take quiz
  const allLessonsDone = allLessons.every(l => enrollment.completedLessonIds.includes(l.id));



  const handleToggleComplete = () => {
    markLessonComplete(courseId, currentLesson.id, !isCompleted);
  };

  const handleSaveNote = () => {
    savePersonalNote(courseId, currentLesson.id, noteContent);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Breadcrumb & Progress Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#192326] border border-[#344448]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 rounded-lg bg-[#202D30] text-[#A4B2AF] hover:text-[#F3F5F0] transition-colors border border-[#344448]"
            title="Voltar ao Painel"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-[11px] text-[#75C9B7] font-semibold">
              {course.title}
            </div>
            <h1 className="text-sm sm:text-base font-bold text-[#F3F5F0]">
              {currentLesson.title}
            </h1>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="w-36 sm:w-48 space-y-1">
            <div className="flex justify-between text-[11px] text-[#A4B2AF]">
              <span>Progresso geral</span>
              <span className="font-mono text-[#D6F36A] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-[#111719] rounded-full overflow-hidden border border-[#344448]">
              <div 
                className="h-full bg-[#D6F36A] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Final Quiz / Completion Status */}
          {enrollment.isCompleted ? (
            <span className="px-3 py-1.5 text-xs font-bold bg-[#75C9B7]/20 text-[#75C9B7] rounded-lg border border-[#75C9B7]/30 flex items-center gap-1.5 shrink-0">
              <Check className="w-3.5 h-3.5" />
              <span>Curso Concluído</span>
            </span>
          ) : allLessonsDone ? (
            <button
              onClick={() => onNavigate('quiz', course.id)}
              className="px-3 py-1.5 text-xs font-bold bg-[#75C9B7] text-[#111719] rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Avaliação Final</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Main Grid: Video Player on Left, Playlist & Notes on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Player & Lesson Content) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* YouTube Video Embed Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-[#344448] shadow-2xl">
            <iframe
              key={currentLesson.videoId}
              src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&controls=1&showinfo=0&disablekb=0`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Action Bar (Previous, Complete, Next) */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#192326] border border-[#344448]">
            <div className="flex items-center gap-2">
              <button
                disabled={!prevLesson}
                onClick={() => prevLesson && setCurrentLessonId(prevLesson.id)}
                className="px-3.5 py-2 rounded-lg bg-[#202D30] text-xs font-semibold text-[#F3F5F0] border border-[#344448] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#75C9B7] transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Aula anterior</span>
              </button>

              <button
                disabled={!nextLesson}
                onClick={() => nextLesson && setCurrentLessonId(nextLesson.id)}
                className="px-3.5 py-2 rounded-lg bg-[#202D30] text-xs font-semibold text-[#F3F5F0] border border-[#344448] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#75C9B7] transition-colors flex items-center gap-1.5"
              >
                <span>Próxima aula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-tutor-question', {
                      detail: {
                        question: `Tenho uma dúvida na ${currentLesson.title} do curso ${course.title}. Podes explicar-me os passos principais desta aula?`
                      }
                    })
                  );
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#202D30] hover:bg-[#202D30]/80 text-[#D6F36A] border border-[#D6F36A]/40 transition-all flex items-center gap-2 shadow-sm"
                title="Tirar dúvida desta aula com o Tutor IA"
              >
                <Bot className="w-4 h-4 text-[#D6F36A]" />
                <span className="hidden sm:inline">Dúvidas da Aula? Perguntar ao Tutor IA</span>
                <span className="sm:hidden">Tutor IA</span>
              </button>

              <button
                onClick={handleToggleComplete}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-[#75C9B7] text-[#111719]'
                    : 'bg-[#202D30] text-[#D6F36A] border border-[#D6F36A] hover:bg-[#D6F36A] hover:text-[#111719]'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{isCompleted ? 'Concluída ✓' : 'Marcar como concluída'}</span>
              </button>
            </div>
          </div>

          {/* Lesson Details & Description */}
          <div className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#75C9B7]">
                {currentLesson.moduleTitle}
              </span>
              <span className="text-xs text-[#A4B2AF] font-mono">
                Duração estimada: {currentLesson.durationMinutes} minutos
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#F3F5F0]">
              {currentLesson.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#A4B2AF] leading-relaxed">
              {currentLesson.description}
            </p>

            {/* Complementary Materials */}
            {currentLesson.resources && currentLesson.resources.length > 0 && (
              <div className="pt-4 border-t border-[#344448] space-y-2">
                <h3 className="text-xs font-bold text-[#F3F5F0] uppercase tracking-wider">
                  Materiais Complementares
                </h3>
                <div className="space-y-2">
                  {currentLesson.resources.map((res, i) => {
                    const isExternal = res.url.startsWith('http');
                    return (
                      <div 
                        key={i}
                        className="p-3 rounded-lg bg-[#202D30] border border-[#344448] flex items-center justify-between text-xs hover:border-[#75C9B7] transition-colors"
                      >
                        <div className="flex items-center gap-2 text-[#F3F5F0]">
                          <FileText className="w-4 h-4 text-[#D6F36A] shrink-0" />
                          <span>{res.title}</span>
                        </div>
                        {isExternal ? (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#75C9B7] hover:text-[#D6F36A] font-semibold flex items-center gap-1 shrink-0"
                          >
                            <span>Abrir</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-[#75C9B7] font-semibold">
                            Disponível
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Final Assessment Notice when completed */}
          {allLessonsDone && !enrollment.isCompleted && (
            <div className="p-6 rounded-2xl bg-[#202D30] border border-[#D6F36A] space-y-3">
              <div className="flex items-center gap-2 text-[#D6F36A]">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-sm font-bold text-[#F3F5F0]">Parabéns! Completaste todas as aulas práticas</h3>
              </div>
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                Agora só precisas de realizar a Avaliação Final para testar as tuas competências e consolidar a conclusão do curso na Saber+ Academy.
              </p>
              <button
                onClick={() => onNavigate('quiz', course.id)}
                className="px-5 py-2.5 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors"
              >
                Iniciar Avaliação Final Agora
              </button>
            </div>
          )}

          {enrollment.isCompleted && (
            <div className="p-6 rounded-2xl bg-[#202D30] border border-[#75C9B7] space-y-3">
              <div className="flex items-center gap-2 text-[#75C9B7]">
                <CheckCircle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-[#F3F5F0]">Curso Concluído com Sucesso!</h3>
              </div>
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                Concluíste com êxito todas as aulas e a avaliação prática deste curso. Podes rever qualquer módulo quando precisares de consultar as técnicas no teu dia a dia.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 bg-[#192326] hover:bg-[#111719] text-[#F3F5F0] border border-[#344448] font-semibold text-xs rounded-xl transition-colors"
                >
                  Voltar ao Meu Painel
                </button>
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-4 py-2 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors"
                >
                  Explorar Novos Cursos
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Curriculum Playlist & Personal Notes */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Module & Lessons Playlist */}
          <div className="rounded-2xl bg-[#192326] border border-[#344448] overflow-hidden">
            <div className="p-4 border-b border-[#344448] bg-[#111719] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D6F36A]" />
                <h3 className="text-xs font-bold text-[#F3F5F0] uppercase tracking-wider">
                  Conteúdo do Curso
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#A4B2AF]">
                {totalCompleted}/{allLessons.length} concluídas
              </span>
            </div>

            <div className="max-h-[460px] overflow-y-auto divide-y divide-[#344448]">
              {course.modules.map((module) => (
                <div key={module.id} className="p-2">
                  <div className="px-2 py-1.5 text-xs font-bold text-[#75C9B7]">
                    {module.title}
                  </div>
                  <div className="space-y-1">
                    {module.lessons.map(lesson => {
                      const active = lesson.id === currentLesson.id;
                      const done = enrollment.completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLessonId(lesson.id)}
                          className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors flex items-start gap-2.5 ${
                            active
                              ? 'bg-[#202D30] text-[#D6F36A] font-semibold border border-[#344448]'
                              : 'text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#202D30]/50'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {done ? (
                              <CheckCircle className="w-4 h-4 text-[#75C9B7]" />
                            ) : active ? (
                              <Play className="w-3.5 h-3.5 text-[#D6F36A] fill-current" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-[#344448]" />
                            )}
                          </div>
                          <div className="flex-1 leading-snug">
                            <span className={done && !active ? 'line-through text-[#A4B2AF]/70' : ''}>
                              {lesson.title}
                            </span>
                            <div className="text-[10px] text-[#A4B2AF]/70 mt-0.5 font-mono">
                              {lesson.durationMinutes} min
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Notes Box (Persisted) */}
          <div className="p-5 rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F3F5F0]">
                <Edit3 className="w-4 h-4 text-[#D6F36A]" />
                <span>As Minhas Notas Pessoais</span>
              </div>
              {noteSaved && (
                <span className="text-[11px] text-[#75C9B7] flex items-center gap-1 font-semibold">
                  <Check className="w-3 h-3" /> Gravado
                </span>
              )}
            </div>

            <p className="text-[11px] text-[#A4B2AF] leading-relaxed">
              Escreve notas para esta aula. As tuas notas são salvas automaticamente e ficam disponíveis no teu perfil.
            </p>

            <textarea
              rows={4}
              placeholder="Ex: Anotar comandos, passos importantes, dúvidas para rever..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full p-3 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] placeholder:text-[#A4B2AF]/50 focus:outline-none focus:border-[#75C9B7] resize-none"
            />

            <button
              onClick={handleSaveNote}
              className="w-full py-2 bg-[#202D30] hover:bg-[#202D30]/80 text-[#F3F5F0] text-xs font-semibold rounded-lg border border-[#344448] hover:border-[#D6F36A] transition-colors flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#D6F36A]" />
              <span>Guardar Notas da Aula</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
