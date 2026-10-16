import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentModal } from '../components/PaymentModal';
import { 
  ArrowLeft, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  PlayCircle, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Users
} from 'lucide-react';

interface CourseDetailPageProps {
  courseId: string;
  onNavigate: (view: string, courseId?: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onNavigate }) => {
  const { courses, isEnrolled, enrollCourse, currentUser } = useApp();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(['mod-exc-1', 'mod-cpc-1', 'mod-cpm-1', 'mod-mak-1']);

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#F3F5F0]">Curso não encontrado</h2>
        <p className="text-xs text-[#A4B2AF]">O curso solicitado não existe ou foi temporariamente despublicado.</p>
        <button
          onClick={() => onNavigate('courses')}
          className="px-4 py-2 bg-[#D6F36A] text-[#111719] text-xs font-bold rounded-lg"
        >
          Voltar ao Catálogo
        </button>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  const toggleModule = (modId: string) => {
    setOpenModuleIds(prev => 
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  const handleEnrollClick = () => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }

    if (enrolled) {
      onNavigate('classroom', course.id);
      return;
    }

    if (course.price === 0) {
      enrollCourse(course.id);
      onNavigate('classroom', course.id);
    } else {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate('courses')}
        className="flex items-center gap-2 text-xs font-semibold text-[#A4B2AF] hover:text-[#D6F36A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao Catálogo de Cursos</span>
      </button>

      {/* Hero Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex items-center gap-2 text-xs text-[#A4B2AF]">
            <span className="text-[#75C9B7] font-semibold">{course.category}</span>
            <span aria-hidden="true">·</span>
            <span>{course.level}</span>
            <span aria-hidden="true">·</span>
            <span>{course.durationEstimate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5F0] tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-[#A4B2AF] leading-relaxed">
            {course.fullDescription}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#192326] border border-[#344448] text-xs">
            <div>
              <span className="text-[#A4B2AF] block text-[11px]">Total de Aulas</span>
              <span className="text-sm font-bold text-[#F3F5F0] font-mono mt-0.5 block">{totalLessons} aulas</span>
            </div>
            <div>
              <span className="text-[#A4B2AF] block text-[11px]">Módulos</span>
              <span className="text-sm font-bold text-[#F3F5F0] font-mono mt-0.5 block">{course.modules.length} módulos</span>
            </div>
            <div>
              <span className="text-[#A4B2AF] block text-[11px]">Metodologia</span>
              <span className="text-sm font-bold text-[#D6F36A] mt-0.5 block">100% Prática</span>
            </div>
            <div>
              <span className="text-[#A4B2AF] block text-[11px]">Critério Mínimo</span>
              <span className="text-sm font-bold text-[#75C9B7] font-mono mt-0.5 block">{course.passingScorePercent}% exame</span>
            </div>
          </div>

        </div>

        {/* Right Column: Enrollment Box */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="p-6 rounded-2xl bg-[#202D30] border border-[#344448] space-y-5 shadow-xl">
            <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#192326] relative border border-[#344448]">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[11px] text-[#A4B2AF] block">Investimento:</span>
                <span className="text-2xl font-black text-[#D6F36A] font-mono">
                  {course.price === 0 ? 'Gratuito' : `${course.price.toLocaleString('pt-MZ')} MZN`}
                </span>
              </div>
              <span className="text-xs text-[#75C9B7] font-semibold">Acesso Completo</span>
            </div>

            <button
              onClick={handleEnrollClick}
              className={`w-full py-3.5 px-4 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                enrolled
                  ? 'bg-[#192326] text-[#D6F36A] border border-[#D6F36A] hover:bg-[#D6F36A] hover:text-[#111719]'
                  : 'bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719]'
              }`}
            >
              {enrolled ? (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Continuar a Aprender</span>
                </>
              ) : course.price === 0 ? (
                <>
                  <BookOpen className="w-4 h-4" />
                  <span>Inscrever-se Gratuitamente</span>
                </>
              ) : (
                <>
                  <span>Inscrever-se com M-Pesa / e-Mola</span>
                </>
              )}
            </button>

            <div className="space-y-2 pt-2 border-t border-[#344448] text-xs text-[#A4B2AF]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#75C9B7] shrink-0" />
                <span>Acesso vitalício aos vídeos oficiais</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#75C9B7] shrink-0" />
                <span>Passo a passo prático para a vida real</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#75C9B7] shrink-0" />
                <span>Estuda ao teu próprio ritmo sem prazos rígidos</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Course Program & Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#344448]">
        
        {/* Left Section: Objectives & Curriculum */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Learning Objectives */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#F3F5F0] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#D6F36A]" />
              <span>O que vais aprender neste curso</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.objectives.map((obj, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#192326] border border-[#344448] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#75C9B7] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#F3F5F0] leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Modules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#F3F5F0] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#75C9B7]" />
                <span>Programa e Conteúdo das Aulas</span>
              </h2>
              <span className="text-xs text-[#A4B2AF]">
                {course.modules.length} módulos · {totalLessons} aulas
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.map(module => {
                const isOpen = openModuleIds.includes(module.id);
                return (
                  <div key={module.id} className="rounded-xl border border-[#344448] bg-[#192326] overflow-hidden">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-[#202D30] transition-colors"
                    >
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-[#F3F5F0]">
                          {module.title}
                        </span>
                        <div className="text-xs text-[#A4B2AF]">
                          {module.lessons.length} aulas
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#A4B2AF]" /> : <ChevronDown className="w-4 h-4 text-[#A4B2AF]" />}
                    </button>

                    {isOpen && (
                      <div className="divide-y divide-[#344448] border-t border-[#344448] bg-[#111719]/40">
                        {module.lessons.map(lesson => (
                          <div key={lesson.id} className="p-3.5 flex items-start justify-between gap-4 text-xs">
                            <div className="flex items-start gap-3">
                              <PlayCircle className="w-4 h-4 text-[#A4B2AF] shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <div className="font-semibold text-[#F3F5F0]">
                                  {lesson.title}
                                </div>
                                <p className="text-[11px] text-[#A4B2AF] leading-relaxed">
                                  {lesson.description}
                                </p>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono text-[#A4B2AF] shrink-0">
                              {lesson.durationMinutes} min
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Requirements & Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
              <h3 className="text-sm font-bold text-[#F3F5F0] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#75C9B7]" />
                <span>Requisitos</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#A4B2AF]">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D6F36A] font-bold">·</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
              <h3 className="text-sm font-bold text-[#F3F5F0] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D6F36A]" />
                <span>Público-alvo</span>
              </h3>
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                {course.targetAudience}
              </p>
            </div>
          </div>

        </div>

        {/* Right Section: Learning Policy */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-4">
            <div className="flex items-center gap-2 text-[#D6F36A]">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm font-bold text-[#F3F5F0]">Metodologia Prática</h3>
            </div>
            <p className="text-xs text-[#A4B2AF] leading-relaxed">
              O objectivo principal da plataforma é a tua aprendizagem autónoma e domínio de competências práticas para o mercado de trabalho e pequenos negócios.
            </p>
            <div className="p-3 rounded-lg bg-[#202D30] border border-[#344448] text-[11px] text-[#A4B2AF] space-y-1">
              <div className="font-semibold text-[#F3F5F0]">Acesso Livre e Ilimitado:</div>
              <div>Podes assistir e rever todas as aulas ao teu próprio ritmo sem custos.</div>
            </div>
          </div>
        </div>

      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          course={course}
          onClose={() => setShowPaymentModal(false)}
          onConfirmEnrollment={() => {
            enrollCourse(course.id);
            setShowPaymentModal(false);
            onNavigate('classroom', course.id);
          }}
        />
      )}

    </div>
  );
};
