import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Award, 
  Sparkles, 
  Video, 
  Smartphone, 
  Monitor, 
  CheckCheck,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string, courseId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { courses, currentUser } = useApp();

  const publishedCourses = courses.filter(c => c.isPublished);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-2 text-xs font-semibold text-[#75C9B7]">
                <span>Plataforma Moçambicana de Capacitação</span>
                <span aria-hidden="true">·</span>
                <span>Educação Prática</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F5F0] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Aprende competências que podes usar na vida real.
              </h1>

              <p className="text-base sm:text-lg text-[#A4B2AF] leading-relaxed max-w-xl">
                Cursos práticos, aulas organizadas e acompanhamento contínuo para o teu progresso. Desenvolvido para jovens que querem destacar-se no mercado de trabalho e no empreendedorismo em Moçambique.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-6 py-3.5 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2 group shrink-0"
                >
                  <span>Explorar cursos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3.5 bg-[#192326] hover:bg-[#202D30] text-[#F3F5F0] font-semibold text-sm rounded-xl border border-[#344448] transition-colors flex items-center gap-2 shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-[#75C9B7]" />
                  <span>Sobre a Saber+</span>
                </button>
              </div>

              {/* Unboxed Proof metadata */}
              <div className="pt-6 border-t border-[#344448] flex flex-wrap items-center gap-6 text-xs text-[#A4B2AF]">
                <div className="flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4 text-[#D6F36A]" />
                  <span>Aulas reais passo a passo</span>
                </div>
                <span aria-hidden="true" className="text-[#344448]">/</span>
                <div className="flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4 text-[#D6F36A]" />
                  <span>Competências práticas para a vida real</span>
                </div>
                <span aria-hidden="true" className="text-[#344448]">/</span>
                <div className="flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4 text-[#D6F36A]" />
                  <span>Sem mensalidades ocultas</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#344448] shadow-2xl bg-[#192326]">
                <img 
                  src="/src/assets/images/hero_saber_plus_1792013688408.jpg" 
                  alt="Jovens estudantes no espaço Saber+ a aprender competências práticas"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111719] via-transparent to-transparent opacity-80" />
                
                {/* Micro info overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#192326]/90 backdrop-blur-md border border-[#344448] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F3F5F0]">Formação Prática em Moçambique</span>
                    <span className="font-mono text-[#D6F36A] font-semibold">100% Online</span>
                  </div>
                  <p className="text-[11px] text-[#A4B2AF]">
                    Aprende no teu próprio horário através do telemóvel ou computador.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Cursos Populares */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#75C9B7] tracking-wider uppercase">
              Catálogo em Destaque
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5F0] tracking-tight mt-1">
              Cursos populares
            </h2>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-[#D6F36A] hover:underline flex items-center gap-1 self-start md:self-auto"
          >
            <span>Ver todos os {publishedCourses.length} cursos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedCourses.map(course => {
            const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

            return (
              <div 
                key={course.id}
                onClick={() => onNavigate('course-detail', course.id)}
                className="group cursor-pointer rounded-2xl bg-[#202D30] border border-[#344448] hover:border-[#75C9B7] transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] relative overflow-hidden bg-[#192326]">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-[#111719]/80 backdrop-blur-md rounded text-[11px] font-semibold text-[#F3F5F0]">
                    {course.level}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-[#111719]/80 backdrop-blur-md rounded text-[11px] font-mono text-[#D6F36A] font-bold">
                    {course.price === 0 ? 'Gratuito' : `${course.price} MZN`}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#A4B2AF] mb-1.5">
                      <span>{course.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{totalLessons} aulas</span>
                    </div>

                    <h3 className="text-base font-bold text-[#F3F5F0] group-hover:text-[#D6F36A] transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-[#A4B2AF] line-clamp-2 mt-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#344448] flex items-center justify-between text-xs">
                    <span className="text-[#A4B2AF] text-[11px]">
                      {course.durationEstimate}
                    </span>
                    <span className="font-semibold text-[#75C9B7] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Ver curso <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Categorias de Aprendizagem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#75C9B7] tracking-wider uppercase">
            Áreas de Especialização
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5F0] tracking-tight mt-1">
            Categorias de aprendizagem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tech & Productivity */}
          <div 
            onClick={() => onNavigate('courses')}
            className="cursor-pointer p-6 rounded-2xl bg-[#192326] border border-[#344448] hover:border-[#D6F36A] transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#202D30] border border-[#344448] flex items-center justify-center text-[#D6F36A] group-hover:bg-[#D6F36A] group-hover:text-[#111719] transition-colors">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F3F5F0] group-hover:text-[#D6F36A] transition-colors">
                Tecnologia e produtividade
              </h3>
              <p className="text-xs text-[#A4B2AF] mt-1 leading-relaxed">
                Cursos estruturados para dominar as ferramentas digitais mais requisitadas por empresas e criadores de conteúdo: Excel, CapCut para Computador e CapCut para Celular.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#75C9B7]">
              <span>3 cursos práticos</span>
              <span aria-hidden="true">·</span>
              <span>26 aulas organizadas</span>
            </div>
          </div>

          {/* Beauty */}
          <div 
            onClick={() => onNavigate('courses')}
            className="cursor-pointer p-6 rounded-2xl bg-[#192326] border border-[#344448] hover:border-[#75C9B7] transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#202D30] border border-[#344448] flex items-center justify-center text-[#75C9B7] group-hover:bg-[#75C9B7] group-hover:text-[#111719] transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F3F5F0] group-hover:text-[#75C9B7] transition-colors">
                Beleza e Estética
              </h3>
              <p className="text-xs text-[#A4B2AF] mt-1 leading-relaxed">
                Técnicas profissionais de maquiagem para iniciantes, preparação e higienização da pele, identificação de tons e produção de visuais para eventos e dia a dia.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#75C9B7]">
              <span>1 curso completo</span>
              <span aria-hidden="true">·</span>
              <span>15 aulas detalhadas</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Como Funciona */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-3xl bg-[#192326] border border-[#344448] p-8 sm:p-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#75C9B7]">
              Simplicidade e Foco
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5F0] tracking-tight">
              Como funciona a tua jornada na Saber+
            </h2>
            <p className="text-xs sm:text-sm text-[#A4B2AF]">
              Uma experiência desenhada para aprenderes sem complicações técnicas e comprovares o teu conhecimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="text-2xl font-black text-[#D6F36A] font-mono">01</div>
              <h3 className="text-base font-bold text-[#F3F5F0]">
                Escolhe o teu curso
              </h3>
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                Navega pelo catálogo e inscreve-te no curso alinhado com os teus objectivos imediatos de trabalho ou projecto.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="text-2xl font-black text-[#D6F36A] font-mono">02</div>
              <h3 className="text-base font-bold text-[#F3F5F0]">
                Assiste às aulas
              </h3>
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                Aulas organizadas em módulos lógicos com vídeos de alta qualidade, anotações pessoais e exercícios complementares.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="text-2xl font-black text-[#D6F36A] font-mono">03</div>
              <h3 className="text-base font-bold text-[#F3F5F0]">
                Conclui as actividades
              </h3>
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                Marca o teu progresso real e realiza a avaliação final com perguntas práticas sobre o conteúdo ministrado.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3">
              <div className="text-2xl font-black text-[#D6F36A] font-mono">04</div>
              <h3 className="text-base font-bold text-[#F3F5F0]">
                Domina a prática e conclui o curso
              </h3>
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                Ao atingires o critério de aprovação (80%), concluis o curso com aproveitamento e estás preparado para aplicar as tuas competências na vida real.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Testemunhos Reais de Alunos em Moçambique */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#75C9B7] tracking-wider uppercase">
            Comunidade de Alunos
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5F0] tracking-tight mt-1">
            Experiências de quem já está a aprender
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#202D30] border border-[#344448] flex flex-col justify-between space-y-4">
            <p className="text-xs text-[#F3F5F0] leading-relaxed">
              "Sempre tive dificuldades com fórmulas no Excel. Com a organização em módulos curtos da Saber+, finalmente consegui automatizar os relatórios de caixa da papelaria onde trabalho em Maputo."
            </p>
            <div className="pt-3 border-t border-[#344448]">
              <div className="text-xs font-bold text-[#D6F36A]">Lucas Sitoe</div>
              <div className="text-[11px] text-[#A4B2AF]">Aluno do curso Excel do Zero · Maputo</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#202D30] border border-[#344448] flex flex-col justify-between space-y-4">
            <p className="text-xs text-[#F3F5F0] leading-relaxed">
              "Aprender CapCut para telemóvel transformou a divulgação dos meus serviços de tranças no Instagram. As aulas sobre sincronização de batida e legendas automáticas foram directas ao assunto."
            </p>
            <div className="pt-3 border-t border-[#344448]">
              <div className="text-xs font-bold text-[#D6F36A]">Amina Machava</div>
              <div className="text-[11px] text-[#A4B2AF]">Criadora de Conteúdo & Empreendedora · Beira</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#202D30] border border-[#344448] flex flex-col justify-between space-y-4">
            <p className="text-xs text-[#F3F5F0] leading-relaxed">
              "A metodologia prática e as aulas organizadas permitiram-me desenvolver habilidades reais e criar um portfólio sólido para um estágio na área de marketing digital."
            </p>
            <div className="pt-3 border-t border-[#344448]">
              <div className="text-xs font-bold text-[#D6F36A]">Celso Machel</div>
              <div className="text-[11px] text-[#A4B2AF]">Estudante Universitário · Nampula</div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#192326] border border-[#D6F36A]/30 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5F0] tracking-tight">
              Pronto para impulsionar o teu conhecimento?
            </h2>
            <p className="text-xs sm:text-sm text-[#A4B2AF]">
              Cria a tua conta gratuita em segundos, assiste às aulas no teu telemóvel ou computador e domina competências práticas para o teu futuro.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onNavigate(currentUser ? 'dashboard' : 'register')}
              className="px-7 py-3.5 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-sm rounded-xl transition-all shadow-lg"
            >
              {currentUser ? 'Aceder ao Meu Painel' : 'Começar Gratuitamente'}
            </button>
            
            <button
              onClick={() => onNavigate('courses')}
              className="px-7 py-3.5 bg-[#202D30] hover:bg-[#202D30]/80 text-[#F3F5F0] font-semibold text-sm rounded-xl border border-[#344448] transition-colors"
            >
              Explorar Catálogo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
