import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  LayoutDashboard, 
  LogOut, 
  Play, 
  Settings, 
  Star, 
  User as UserIcon, 
  ArrowRight,
  Bookmark,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
  Sparkles,
  Bot
} from 'lucide-react';

interface StudentDashboardPageProps {
  onNavigate: (view: string, courseId?: string) => void;
  initialTab?: 'overview' | 'my-courses' | 'favorites' | 'profile' | 'help';
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({ onNavigate, initialTab = 'overview' }) => {
  const { 
    currentUser, 
    courses, 
    enrollments, 
    bookmarks, 
    logout,
    updateProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'my-courses' | 'favorites' | 'profile' | 'help'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Profile edit states
  const [name, setName] = useState(currentUser?.name || '');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [location, setLocation] = useState(currentUser?.location || 'Maputo, Moçambique');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#F3F5F0]">Sessão Necessária</h2>
        <p className="text-xs text-[#A4B2AF]">Inicia sessão para acederes ao teu painel de aluno.</p>
        <button
          onClick={() => onNavigate('login')}
          className="px-5 py-2.5 bg-[#D6F36A] text-[#111719] text-xs font-bold rounded-lg"
        >
          Iniciar Sessão
        </button>
      </div>
    );
  }

  // Student specific data
  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);
  const completedCount = userEnrollments.filter(e => e.isCompleted).length;

  // Find enrolled course objects
  const enrolledCoursesWithProgress = userEnrollments.map(enr => {
    const course = courses.find(c => c.id === enr.courseId);
    if (!course) return null;

    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = enr.completedLessonIds.length;
    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Find last accessed lesson title
    const allCourseLessons = course.modules.flatMap(m => m.lessons);
    const lastLesson = allCourseLessons.find(l => l.id === enr.lastAccessedLessonId) || allCourseLessons[0];

    return {
      course,
      enrollment: enr,
      totalLessons,
      completedLessons,
      progress,
      lastLesson
    };
  }).filter(Boolean);

  // Resume item: first active incomplete course or first course
  const courseToResume = enrolledCoursesWithProgress.find(item => item && item.progress < 100) || enrolledCoursesWithProgress[0];

  const bookmarkedCourses = courses.filter(c => bookmarks.includes(c.id));
  const recommendedCourses = courses.filter(c => !userEnrollments.some(e => e.courseId === c.id));

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      displayName,
      phone,
      location,
      bio
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-4">
          
          {/* User Brief */}
          <div className="p-5 rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#202D30] border border-[#D6F36A] flex items-center justify-center text-[#D6F36A] font-bold text-base">
                {currentUser.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-[#F3F5F0] truncate">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-[#A4B2AF] truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#344448] flex items-center justify-between text-[11px] text-[#75C9B7]">
              <span>Aluno Verificado</span>
              <span className="font-mono">{currentUser.location || 'Moçambique'}</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-2 rounded-2xl bg-[#192326] border border-[#344448] space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#202D30] text-[#D6F36A] shadow-sm'
                  : 'text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#202D30]/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão geral</span>
            </button>

            <button
              onClick={() => setActiveTab('my-courses')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === 'my-courses'
                  ? 'bg-[#202D30] text-[#D6F36A] shadow-sm'
                  : 'text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#202D30]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Os meus cursos</span>
              </div>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#111719] text-[#A4B2AF]">
                {userEnrollments.length}
              </span>
            </button>



            <button
              onClick={() => setActiveTab('favorites')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-[#202D30] text-[#D6F36A] shadow-sm'
                  : 'text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#202D30]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4" />
                <span>Favoritos</span>
              </div>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#111719] text-[#A4B2AF]">
                {bookmarks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#202D30] text-[#D6F36A] shadow-sm'
                  : 'text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#202D30]/50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Perfil e definições</span>
            </button>

            <button
              onClick={() => setActiveTab('help')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'help'
                  ? 'bg-[#202D30] text-[#D6F36A] shadow-sm'
                  : 'text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#202D30]/50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ajuda e Perguntas</span>
            </button>

            <div className="pt-2 border-t border-[#344448]">
              <button
                onClick={() => { logout(); }}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Terminar sessão</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#202D30]/60 border border-[#344448] text-xs space-y-2">
            <span className="font-bold text-[#F3F5F0] block">Queres aprender mais?</span>
            <p className="text-[11px] text-[#A4B2AF] leading-relaxed">
              Explora o catálogo com novos conteúdos e exercícios práticos em Moçambique.
            </p>
            <button
              onClick={() => onNavigate('courses')}
              className="text-[#D6F36A] hover:underline text-xs font-semibold flex items-center gap-1 pt-1"
            >
              <span>Ver todos os cursos</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: VISÃO GERAL */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Welcome Message */}
              <div className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-2">
                <span className="text-xs font-mono text-[#75C9B7]">Painel Pessoal</span>
                <h1 className="text-2xl font-extrabold text-[#F3F5F0]">
                  Olá, {currentUser.displayName}! Bem-vindo à tua jornada de aprendizagem.
                </h1>
                <p className="text-xs text-[#A4B2AF]">
                  Acompanha aqui o teu progresso em tempo real e retoma as aulas onde paraste para dominar as tuas competências práticas.
                </p>
              </div>

              {/* KPI Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#202D30] border border-[#344448]">
                  <span className="text-[#A4B2AF] text-[11px] block">Cursos em Andamento</span>
                  <span className="text-2xl font-black text-[#D6F36A] font-mono mt-1 block">
                    {userEnrollments.length - completedCount}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#202D30] border border-[#344448]">
                  <span className="text-[#A4B2AF] text-[11px] block">Cursos Concluídos</span>
                  <span className="text-2xl font-black text-[#75C9B7] font-mono mt-1 block">
                    {completedCount}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#202D30] border border-[#344448]">
                  <span className="text-[#A4B2AF] text-[11px] block">Aulas Assistidas</span>
                  <span className="text-2xl font-black text-[#D6F36A] font-mono mt-1 block">
                    {userEnrollments.reduce((sum, e) => sum + e.completedLessonIds.length, 0)}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#202D30] border border-[#344448]">
                  <span className="text-[#A4B2AF] text-[11px] block">Cursos Favoritos</span>
                  <span className="text-2xl font-black text-[#F3F5F0] font-mono mt-1 block">
                    {bookmarks.length}
                  </span>
                </div>
              </div>

              {/* Continue Learning Focal Banner */}
              {courseToResume ? (
                <div className="p-6 rounded-2xl bg-[#192326] border border-[#D6F36A]/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#D6F36A] uppercase tracking-wider">
                      Continuar a Aprender
                    </span>
                    <span className="text-xs font-mono text-[#A4B2AF]">
                      {courseToResume.progress}% concluído
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#F3F5F0]">
                        {courseToResume.course.title}
                      </h3>
                      <p className="text-xs text-[#A4B2AF]">
                        Última aula: <strong className="text-[#F3F5F0]">{courseToResume.lastLesson?.title}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate('classroom', courseToResume.course.id)}
                      className="px-5 py-2.5 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Retomar Aula</span>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[#111719] rounded-full overflow-hidden border border-[#344448]">
                    <div 
                      className="h-full bg-[#D6F36A] transition-all duration-300"
                      style={{ width: `${courseToResume.progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#192326] border border-[#344448] text-center space-y-3">
                  <h3 className="text-sm font-bold text-[#F3F5F0]">Ainda não estás inscrito em nenhum curso</h3>
                  <p className="text-xs text-[#A4B2AF]">Descobre os cursos disponíveis e começa hoje mesmo a aprender competências práticas.</p>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="px-4 py-2 bg-[#D6F36A] text-[#111719] text-xs font-bold rounded-lg"
                  >
                    Explorar Catálogo
                  </button>
                </div>
              )}

              {/* Student AI Tutor Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#192326] to-[#202D30] border border-[#D6F36A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#111719] border border-[#D6F36A] flex items-center justify-center text-[#D6F36A] shrink-0 shadow">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#F3F5F0]">
                        Tutor Saber+ IA de Dúvidas
                      </h3>
                      <span className="text-[10px] font-bold text-[#75C9B7] bg-[#75C9B7]/15 px-2 py-0.5 rounded-full border border-[#75C9B7]/30">
                        Sempre Disponível
                      </span>
                    </div>
                    <p className="text-xs text-[#A4B2AF] max-w-xl">
                      Ficaste com dúvidas numa fórmula do Excel, corte no CapCut ou passo de cutilagem? O teu assistente IA explica passo a passo qualquer detalhe.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-tutor-question'))}
                  className="px-4 py-2.5 rounded-xl bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg hover:scale-[1.02] active:scale-95"
                >
                  <Bot className="w-4 h-4" />
                  <span>Tirar Dúvida Agora</span>
                </button>
              </div>

              {/* Active Courses List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#F3F5F0]">
                    Cursos em andamento
                  </h2>
                  <button
                    onClick={() => setActiveTab('my-courses')}
                    className="text-xs text-[#75C9B7] hover:underline"
                  >
                    Ver todos
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCoursesWithProgress.map(item => {
                    if (!item) return null;
                    return (
                      <div 
                        key={item.course.id}
                        className="p-5 rounded-xl bg-[#202D30] border border-[#344448] space-y-4 hover:border-[#75C9B7] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[11px] text-[#75C9B7]">{item.course.category}</span>
                            <h4 className="text-sm font-bold text-[#F3F5F0] mt-0.5">{item.course.title}</h4>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#D6F36A]">
                            {item.progress}%
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] text-[#A4B2AF]">
                            <span>{item.completedLessons} de {item.totalLessons} aulas</span>
                            <span>{item.course.durationEstimate}</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#111719] rounded-full overflow-hidden">
                            <div className="h-full bg-[#D6F36A]" style={{ width: `${item.progress}%` }} />
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <button
                            onClick={() => onNavigate('classroom', item.course.id)}
                            className="text-xs font-bold text-[#D6F36A] hover:underline flex items-center gap-1"
                          >
                            <span>Abrir Aulas</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          {item.progress === 100 && (
                            <span className="text-[11px] text-[#75C9B7] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Concluído
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Courses Section */}
              {recommendedCourses.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-[#344448]">
                  <h2 className="text-lg font-bold text-[#F3F5F0]">
                    Cursos recomendados para ti
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedCourses.slice(0, 2).map(c => (
                      <div 
                        key={c.id}
                        onClick={() => onNavigate('course-detail', c.id)}
                        className="p-4 rounded-xl bg-[#192326] border border-[#344448] hover:border-[#D6F36A] transition-colors cursor-pointer flex items-center gap-4"
                      >
                        <img 
                          src={c.thumbnail} 
                          alt={c.title} 
                          className="w-16 h-16 rounded-lg object-cover shrink-0" 
                        />
                        <div className="overflow-hidden space-y-1">
                          <span className="text-[10px] text-[#75C9B7]">{c.category}</span>
                          <h4 className="text-xs font-bold text-[#F3F5F0] truncate">{c.title}</h4>
                          <div className="text-[11px] text-[#D6F36A] font-mono">
                            {c.price === 0 ? 'Gratuito' : `${c.price} MZN`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: OS MEUS CURSOS */}
          {activeTab === 'my-courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#F3F5F0]">Os meus cursos</h2>
                  <p className="text-xs text-[#A4B2AF]">Todos os cursos onde estás actualmente inscrito.</p>
                </div>
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-3.5 py-1.5 bg-[#D6F36A] text-[#111719] text-xs font-bold rounded-lg hover:bg-[#c2e256] transition-colors"
                >
                  Inscrever em mais cursos
                </button>
              </div>

              {enrolledCoursesWithProgress.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCoursesWithProgress.map(item => {
                    if (!item) return null;
                    return (
                      <div 
                        key={item.course.id}
                        className="rounded-2xl bg-[#202D30] border border-[#344448] overflow-hidden flex flex-col justify-between"
                      >
                        <div className="aspect-video bg-[#192326] relative">
                          <img 
                            src={item.course.thumbnail} 
                            alt={item.course.title}
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-xs text-[#D6F36A] font-bold">
                            {item.progress}%
                          </div>
                        </div>

                        <div className="p-5 space-y-4">
                          <div>
                            <span className="text-[11px] text-[#75C9B7]">{item.course.category}</span>
                            <h3 className="text-base font-bold text-[#F3F5F0] mt-0.5">{item.course.title}</h3>
                            <p className="text-xs text-[#A4B2AF] line-clamp-2 mt-1">{item.course.shortDescription}</p>
                          </div>

                          <div className="w-full h-2 bg-[#111719] rounded-full overflow-hidden">
                            <div className="h-full bg-[#D6F36A]" style={{ width: `${item.progress}%` }} />
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#344448]">
                            <span className="text-[11px] text-[#A4B2AF]">
                              {item.completedLessons} de {item.totalLessons} aulas concluídas
                            </span>
                            <button
                              onClick={() => onNavigate('classroom', item.course.id)}
                              className="px-3.5 py-1.5 bg-[#192326] hover:bg-[#D6F36A] hover:text-[#111719] text-[#D6F36A] border border-[#344448] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                            >
                              <span>Aceder</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
                  <BookOpen className="w-8 h-8 text-[#A4B2AF] mx-auto" />
                  <h3 className="text-sm font-bold text-[#F3F5F0]">Nenhuma inscrição activa</h3>
                  <p className="text-xs text-[#A4B2AF]">Ainda não tens cursos no teu registo de aprendizagem.</p>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="px-4 py-2 bg-[#D6F36A] text-[#111719] text-xs font-bold rounded-lg"
                  >
                    Ver Catálogo de Cursos
                  </button>
                </div>
              )}
            </div>
          )}



          {/* TAB 4: FAVORITOS */}
          {activeTab === 'favorites' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#F3F5F0]">Cursos favoritos</h2>
                <p className="text-xs text-[#A4B2AF]">Cursos que guardaste para assistir mais tarde.</p>
              </div>

              {bookmarkedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookmarkedCourses.map(course => (
                    <div 
                      key={course.id}
                      className="p-5 rounded-2xl bg-[#202D30] border border-[#344448] flex items-center gap-4 hover:border-[#75C9B7] transition-colors"
                    >
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0" 
                      />
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] text-[#75C9B7]">{course.category}</span>
                        <h4 className="text-sm font-bold text-[#F3F5F0]">{course.title}</h4>
                        <div className="text-xs font-mono text-[#D6F36A] font-semibold">
                          {course.price === 0 ? 'Gratuito' : `${course.price} MZN`}
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigate('course-detail', course.id)}
                        className="p-2 rounded-lg bg-[#192326] text-[#D6F36A] hover:bg-[#D6F36A] hover:text-[#111719] transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
                  <Bookmark className="w-8 h-8 text-[#A4B2AF] mx-auto" />
                  <h3 className="text-sm font-bold text-[#F3F5F0]">Nenhum favorito guardado</h3>
                  <p className="text-xs text-[#A4B2AF]">Clica no ícone de marcador num curso para guardá-lo aqui.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PERFIL E DEFINIÇÕES */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#F3F5F0]">Perfil e Definições</h2>
                <p className="text-xs text-[#A4B2AF]">Gere os teus dados de identificação e preferências de conta.</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-5">
                {savedSuccess && (
                  <div className="p-3.5 rounded-xl bg-[#75C9B7]/15 border border-[#75C9B7] text-[#75C9B7] text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Os teus dados de perfil foram actualizados com sucesso!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A4B2AF] mb-1.5">
                      Nome Completo do Aluno
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#111719] border border-[#344448] text-[#F3F5F0] text-xs focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A4B2AF] mb-1.5">
                      Nome de Apresentação (como queres ser tratado)
                    </label>
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#111719] border border-[#344448] text-[#F3F5F0] text-xs focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A4B2AF] mb-1.5">
                      Endereço de E-mail
                    </label>
                    <input
                      type="email"
                      disabled
                      value={currentUser.email}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#202D30]/60 border border-[#344448] text-[#A4B2AF] text-xs cursor-not-allowed"
                    />
                    <span className="text-[10px] text-[#A4B2AF] mt-1 block">O e-mail é utilizado para verificação de conta.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A4B2AF] mb-1.5">
                      Contacto Telefónico / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={phone}
                      placeholder="+258 84 123 4567"
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#111719] border border-[#344448] text-[#F3F5F0] text-xs focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A4B2AF] mb-1.5">
                      Localização / Província em Moçambique
                    </label>
                    <input
                      type="text"
                      value={location}
                      placeholder="Ex: Maputo Cidade, Beira, Nampula"
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#111719] border border-[#344448] text-[#F3F5F0] text-xs focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A4B2AF] mb-1.5">
                      Data de Registo na Plataforma
                    </label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.joinedAt}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#202D30]/60 border border-[#344448] text-[#A4B2AF] text-xs font-mono cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A4B2AF] mb-1.5">
                    Breve Biografia / Objectivo Profissional
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Conta um pouco sobre ti e que competências queres desenvolver..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111719] border border-[#344448] text-[#F3F5F0] text-xs focus:outline-none focus:border-[#D6F36A] resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] text-xs font-bold rounded-xl transition-colors shadow-lg"
                  >
                    Guardar Alterações
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: AJUDA */}
          {activeTab === 'help' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#F3F5F0]">Centro de Ajuda & Perguntas Frequentes</h2>
                <p className="text-xs text-[#A4B2AF]">Respostas rápidas às dúvidas mais comuns sobre a plataforma Saber+.</p>
              </div>

              <div className="space-y-3">
                <div className="p-5 rounded-xl bg-[#192326] border border-[#344448] space-y-2">
                  <h4 className="text-sm font-bold text-[#F3F5F0]">Como acompanho a conclusão do curso?</h4>
                  <p className="text-xs text-[#A4B2AF] leading-relaxed">
                    À medida que assistes às aulas práticas, clica em "Marcar como concluída". No final, podes realizar a avaliação final prática para testar o teu conhecimento e o curso ficará 100% concluído no teu painel.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#192326] border border-[#344448] space-y-2">
                  <h4 className="text-sm font-bold text-[#F3F5F0]">O app tem foco exclusivo no aprendizado prático?</h4>
                  <p className="text-xs text-[#A4B2AF] leading-relaxed">
                    Sim! A Saber+ foi criada especificamente para que aprendas competências reais e práticas sem barreiras, focando 100% na tua evolução profissional e autonomia.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#192326] border border-[#344448] space-y-2">
                  <h4 className="text-sm font-bold text-[#F3F5F0]">Posso assistir às aulas no meu telemóvel?</h4>
                  <p className="text-xs text-[#A4B2AF] leading-relaxed">
                    Sim. Toda a plataforma é 100% responsiva e optimizada para ligações móveis em Moçambique, permitindo pausar e retomar quando quiseres.
                  </p>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
