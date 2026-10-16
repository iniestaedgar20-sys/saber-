import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  Check, 
  X,
  Layers,
  Sparkles
} from 'lucide-react';

interface CoursesCatalogPageProps {
  onNavigate: (view: string, courseId?: string) => void;
}

export const CoursesCatalogPage: React.FC<CoursesCatalogPageProps> = ({ onNavigate }) => {
  const { courses, isEnrolled, bookmarks, toggleBookmark } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Must be published (admins can see drafts in admin panel)
      if (!course.isPublished) return false;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.shortDescription.toLowerCase().includes(query) || course.fullDescription.toLowerCase().includes(query);
        const matchesCategory = course.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
      }

      // Category match
      if (selectedCategory !== 'all' && course.category !== selectedCategory) {
        return false;
      }

      // Level match
      if (selectedLevel !== 'all' && course.level !== selectedLevel) {
        return false;
      }

      // Price match
      if (selectedPrice === 'free' && course.price > 0) return false;
      if (selectedPrice === 'paid' && course.price === 0) return false;

      return true;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedPrice]);

  const categories = [
    { id: 'all', label: 'Todas as Categorias' },
    { id: 'Tecnologia e produtividade', label: 'Tecnologia e Produtividade' },
    { id: 'Beleza', label: 'Beleza e Estética' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-[#75C9B7] tracking-wider uppercase">
          Catálogo Oficial
        </div>
        <h1 className="text-3xl font-extrabold text-[#F3F5F0] tracking-tight">
          Cursos Práticos
        </h1>
        <p className="text-sm text-[#A4B2AF] max-w-2xl">
          Competências práticas leccionadas passo a passo, organizadas em módulos com acompanhamento de progresso e foco na aplicação real.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4 p-5 rounded-2xl bg-[#192326] border border-[#344448]">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#A4B2AF] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Pesquisar por título, ferramenta (Excel, CapCut, Maquiagem) ou competência..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] placeholder:text-[#A4B2AF]/70 focus:outline-none focus:border-[#D6F36A]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-[#A4B2AF] hover:text-[#F3F5F0]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#111719] rounded-xl border border-[#344448]">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#202D30] text-[#D6F36A] font-bold shadow-sm'
                    : 'text-[#A4B2AF] hover:text-[#F3F5F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Level and Price dropdowns */}
          <div className="flex items-center gap-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-1.5 bg-[#111719] border border-[#344448] rounded-lg text-xs text-[#F3F5F0] focus:outline-none focus:border-[#75C9B7]"
            >
              <option value="all">Nível: Todos</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermédio">Intermédio</option>
              <option value="Avançado">Avançado</option>
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-3 py-1.5 bg-[#111719] border border-[#344448] rounded-lg text-xs text-[#F3F5F0] focus:outline-none focus:border-[#75C9B7]"
            >
              <option value="all">Preço: Todos</option>
              <option value="free">Apenas Gratuitos</option>
              <option value="paid">Pagos (MZN)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#A4B2AF] px-1">
        <span>A mostrar <strong className="text-[#F3F5F0] font-mono">{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'curso' : 'cursos'}</span>
        {(searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedPrice !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSelectedPrice('all');
            }}
            className="text-[#75C9B7] hover:underline"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const enrolled = isEnrolled(course.id);
            const bookmarked = bookmarks.includes(course.id);

            return (
              <div
                key={course.id}
                className="group rounded-2xl bg-[#202D30] border border-[#344448] hover:border-[#75C9B7] transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Media */}
                <div className="relative aspect-[16/10] bg-[#192326] overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-[#111719]/85 backdrop-blur-md rounded text-[11px] font-semibold text-[#F3F5F0]">
                      {course.level}
                    </span>
                    {enrolled && (
                      <span className="px-2 py-0.5 bg-[#75C9B7] text-[#111719] rounded text-[11px] font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Inscrito
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(course.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors ${
                      bookmarked 
                        ? 'bg-[#D6F36A] text-[#111719]' 
                        : 'bg-[#111719]/75 text-[#A4B2AF] hover:text-[#F3F5F0]'
                    }`}
                    title={bookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-[#111719]/85 backdrop-blur-md rounded text-xs font-mono text-[#D6F36A] font-bold">
                    {course.price === 0 ? 'Gratuito' : `${course.price} MZN`}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#A4B2AF]">
                      <span>{course.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{totalLessons} aulas</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.modules.length} módulos</span>
                    </div>

                    <h3 
                      onClick={() => onNavigate('course-detail', course.id)}
                      className="text-lg font-bold text-[#F3F5F0] hover:text-[#D6F36A] transition-colors cursor-pointer leading-snug"
                    >
                      {course.title}
                    </h3>

                    <p className="text-xs text-[#A4B2AF] line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#344448] flex items-center justify-between text-xs">
                    <span className="text-[#A4B2AF] text-[11px]">
                      {course.durationEstimate}
                    </span>

                    <button
                      onClick={() => onNavigate(enrolled ? 'classroom' : 'course-detail', course.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                        enrolled
                          ? 'bg-[#192326] text-[#D6F36A] border border-[#344448] hover:border-[#D6F36A]'
                          : 'bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719]'
                      }`}
                    >
                      <span>{enrolled ? 'Continuar' : 'Ver Detalhes'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
          <BookOpen className="w-8 h-8 text-[#A4B2AF] mx-auto" />
          <h3 className="text-base font-bold text-[#F3F5F0]">Nenhum curso encontrado</h3>
          <p className="text-xs text-[#A4B2AF] max-w-sm mx-auto">
            Não foram encontrados cursos que correspondam aos termos de pesquisa ou filtros seleccionados.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSelectedPrice('all');
            }}
            className="px-4 py-2 bg-[#202D30] text-[#D6F36A] text-xs font-semibold rounded-lg border border-[#344448] hover:border-[#D6F36A] transition-colors"
          >
            Ver todos os cursos
          </button>
        </div>
      )}

    </div>
  );
};
