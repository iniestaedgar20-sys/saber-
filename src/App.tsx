import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CoursesCatalogPage } from './pages/CoursesCatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ClassroomPage } from './pages/ClassroomPage';
import { QuizPage } from './pages/QuizPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { AuthPages } from './pages/AuthPages';
import { TutorChatbot } from './components/TutorChatbot';

function MainApp() {
  const { currentUser } = useApp();
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-excel-zero');

  const handleNavigate = (view: string, courseId?: string) => {
    if (courseId) {
      setSelectedCourseId(courseId);
    }

    // Map any legacy or landing views directly to dashboard
    if (view === 'home' || view === 'about' || view === 'admin') {
      setCurrentView('dashboard');
      return;
    }

    setCurrentView(view);
  };

  // If user is not authenticated: Allow exploring courses or show clean AuthPages
  if (!currentUser) {
    if (currentView === 'courses' || currentView === 'course-detail') {
      return (
        <div className="min-h-screen flex flex-col bg-[#111719] text-[#F3F5F0]">
          {/* Guest Clean Header */}
          <header className="sticky top-0 z-40 bg-[#111719] border-b border-[#344448]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
              <button 
                onClick={() => handleNavigate('courses')}
                className="flex items-center gap-2.5 text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#192326] border border-[#344448] flex items-center justify-center text-[#D6F36A] font-black text-lg group-hover:border-[#D6F36A] transition-colors shadow">
                  S+
                </div>
                <div className="text-base font-black tracking-tight text-[#F3F5F0]">
                  Saber<span className="text-[#D6F36A]">+</span>
                </div>
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleNavigate('login')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#192326] transition-colors"
                >
                  Entrar
                </button>
                <button
                  onClick={() => handleNavigate('register')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] transition-all shadow"
                >
                  Criar Conta
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 pb-10">
            {currentView === 'courses' && (
              <CoursesCatalogPage onNavigate={handleNavigate} />
            )}
            {currentView === 'course-detail' && (
              <CourseDetailPage 
                courseId={selectedCourseId} 
                onNavigate={handleNavigate} 
              />
            )}
          </main>

          <TutorChatbot 
            activeCourseId={selectedCourseId} 
            onNavigate={handleNavigate} 
          />
        </div>
      );
    }

    const authMode = currentView === 'login' ? 'login' : 'register';
    return (
      <div className="min-h-screen bg-[#111719] text-[#F3F5F0]">
        <AuthPages mode={authMode} onNavigate={handleNavigate} />
        <TutorChatbot 
          activeCourseId={selectedCourseId} 
          onNavigate={handleNavigate} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111719] text-[#F3F5F0]">
      {/* Tab Navigation Header */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={(view) => handleNavigate(view)} 
      />

      {/* Main Tab Content Area (No slideshow scrolling - dedicated tabs) */}
      <main className="flex-1 pb-10">
        {currentView === 'dashboard' && (
          <StudentDashboardPage onNavigate={handleNavigate} initialTab="overview" />
        )}

        {currentView === 'courses' && (
          <CoursesCatalogPage onNavigate={handleNavigate} />
        )}

        {currentView === 'course-detail' && (
          <CourseDetailPage 
            courseId={selectedCourseId} 
            onNavigate={handleNavigate} 
          />
        )}

        {currentView === 'classroom' && (
          <ClassroomPage 
            courseId={selectedCourseId} 
            onNavigate={handleNavigate} 
          />
        )}

        {currentView === 'quiz' && (
          <QuizPage 
            courseId={selectedCourseId} 
            onNavigate={handleNavigate} 
          />
        )}

        {currentView === 'profile' && (
          <StudentDashboardPage onNavigate={handleNavigate} initialTab="profile" />
        )}
      </main>

      {/* Student AI Tutor Chatbot */}
      <TutorChatbot 
        activeCourseId={selectedCourseId} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
