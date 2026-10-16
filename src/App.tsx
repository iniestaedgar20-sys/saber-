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

  // If user explicitly logged out, render AuthPages
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#111719] text-[#F3F5F0]">
        <AuthPages mode="login" onNavigate={handleNavigate} />
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
