import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  LogOut, 
  LayoutDashboard, 
  Menu, 
  X,
  PlayCircle,
  CheckCircle2,
  User as UserIcon,
  Sparkles,
  Bot
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenCourse?: (courseId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  if (!currentUser) {
    return null; // When not logged in, only the Get Started / Auth Dashboard is shown
  }

  const tabs = [
    { id: 'dashboard', label: 'Meu Painel', icon: LayoutDashboard },
    { id: 'courses', label: 'Cursos', icon: BookOpen },
    { id: 'classroom', label: 'Sala de Aula', icon: PlayCircle },
    { id: 'quiz', label: 'Avaliação', icon: CheckCircle2 },
    { id: 'profile', label: 'Perfil', icon: UserIcon },
  ];

  const isTabActive = (id: string) => {
    if (id === 'courses' && currentView === 'course-detail') return true;
    return currentView === id;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#111719] border-b border-[#344448]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand badge */}
        <button 
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-none rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-[#192326] border border-[#344448] flex items-center justify-center text-[#D6F36A] font-black text-lg group-hover:border-[#D6F36A] transition-colors shadow">
            S+
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-[#F3F5F0] whitespace-nowrap">
              Saber<span className="text-[#D6F36A]">+</span>
            </div>
          </div>
        </button>

        {/* Zone 2: Full Tab Navigation (NO slideshow scrolling) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-[#192326] border border-[#344448]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isTabActive(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#202D30] text-[#D6F36A] shadow-sm border border-[#344448]'
                    : 'text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#202D30]/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#D6F36A]' : 'text-[#A4B2AF]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: User status, Tutor IA & Logout */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-tutor-question'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#202D30] hover:bg-[#202D30]/80 text-[#D6F36A] border border-[#D6F36A]/40 text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
            title="Abrir Tutor de Dúvidas IA"
          >
            <Bot className="w-4 h-4 text-[#D6F36A]" />
            <span>Tutor IA</span>
          </button>

          <button
            onClick={() => handleNavClick('profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#192326] border border-[#344448] hover:border-[#75C9B7] text-left transition-colors"
          >
            <div className="w-6 h-6 rounded-lg bg-[#202D30] border border-[#D6F36A] text-[#D6F36A] flex items-center justify-center text-[11px] font-bold">
              {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="text-xs">
              <span className="font-semibold text-[#F3F5F0] block leading-tight">{currentUser.displayName}</span>
              <span className="text-[10px] text-[#75C9B7] block leading-none">Aluno</span>
            </div>
          </button>

          <button
            onClick={logout}
            title="Terminar sessão"
            className="p-2 text-[#A4B2AF] hover:text-red-400 hover:bg-[#192326] rounded-xl transition-colors border border-transparent hover:border-[#344448]"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#A4B2AF] hover:text-[#F3F5F0] bg-[#192326] border border-[#344448] rounded-xl transition-colors"
            aria-label="Abrir abas"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile drawer with direct tabs */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#344448] bg-[#141B1D] px-4 py-3 space-y-2">
          <div className="text-[11px] font-semibold text-[#A4B2AF] px-2 py-1">
            Abas de Navegação
          </div>
          <div className="grid grid-cols-1 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isTabActive(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    active
                      ? 'bg-[#202D30] text-[#D6F36A] border border-[#344448]'
                      : 'text-[#A4B2AF] hover:text-[#F3F5F0]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#D6F36A]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-tutor-question'));
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold bg-[#202D30] text-[#D6F36A] border border-[#D6F36A]/40 text-left"
            >
              <Bot className="w-4 h-4 text-[#D6F36A]" />
              <span>Tutor IA (Tirar Dúvidas)</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#344448] flex items-center justify-between px-2">
            <span className="text-xs text-[#A4B2AF]">Sessão: {currentUser.name}</span>
            <button
              onClick={() => { logout(); setMobileMenuOpen(false); }}
              className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
