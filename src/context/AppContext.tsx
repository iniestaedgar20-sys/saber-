import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Course, Enrollment, Certificate, PersonalNote } from '../types';
import { INITIAL_COURSES, INITIAL_USERS } from '../data/coursesData';

interface AppContextType {
  currentUser: User | null;
  courses: Course[];
  enrollments: Enrollment[];
  certificates: Certificate[];
  personalNotes: PersonalNote[];
  bookmarks: string[];
  
  // Auth
  login: (email: string, password?: string) => { success: boolean; error?: string };
  loginWithGoogle: (email?: string, name?: string) => { success: boolean; error?: string };
  register: (name: string, displayName: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  resetPassword: (email: string, newPassword: string) => { success: boolean; error?: string };

  // Student Actions
  enrollCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  getEnrollment: (courseId: string) => Enrollment | undefined;
  markLessonComplete: (courseId: string, lessonId: string, completed: boolean) => void;
  setLastAccessedLesson: (courseId: string, lessonId: string) => void;
  savePersonalNote: (courseId: string, lessonId: string, content: string) => void;
  getPersonalNote: (lessonId: string) => string;
  submitQuiz: (courseId: string, userAnswers: number[]) => { passed: boolean; score: number };
  toggleBookmark: (courseId: string) => void;
  isBookmarked: (courseId: string) => boolean;
  
  // Public Verification & Search
  getCertificateByCode: (code: string) => Certificate | undefined;

  // Admin Actions
  adminSaveCourse: (course: Course) => void;
  adminDeleteCourse: (courseId: string) => void;
  adminTogglePublish: (courseId: string) => void;
  adminRevokeCertificate: (code: string) => void;
  adminReissueCertificate: (code: string) => void;
  allUsers: User[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'saberplus_users_v2',
  CURRENT_USER: 'saberplus_current_user_v2',
  COURSES: 'saberplus_courses_v2',
  ENROLLMENTS: 'saberplus_enrollments_v2',
  CERTIFICATES: 'saberplus_certificates_v2',
  NOTES: 'saberplus_notes_v2',
  BOOKMARKS: 'saberplus_bookmarks_v2',
};

// Clean legacy localStorage keys to ensure complete privacy
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('saberplus_users_v1');
    localStorage.removeItem('saberplus_current_user_v1');
    localStorage.removeItem('saberplus_enrollments_v1');
  } catch {
    // ignore
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Users list (starts clean; new users save their own accounts here)
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // 2. Current User (starts completely clean with NO pre-authenticated user)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  // 3. Courses (always aligned with INITIAL_COURSES)
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  // 4. Enrollments (starts clean; each user enrolls in their chosen courses)
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Certificates
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Notes
  const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'note-1',
          userId: 'user-student-demo',
          courseId: 'course-excel-zero',
          lessonId: 'les-exc-1',
          content: 'Lembrar de usar o atalho Ctrl + PageDown para navegar entre as folhas da pasta de trabalho.',
          updatedAt: '2026-03-05 14:20'
        }
      ];
    } catch {
      return [];
    }
  });

  // 7. Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : ['course-makeup-beginner'];
    } catch {
      return [];
    }
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(personalNotes));
  }, [personalNotes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Auth operations
  const login = (email: string, password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, error: 'Utilizador não encontrado com este endereço de e-mail.' };
    }
    if (password && user.password && user.password !== password) {
      return { success: false, error: 'Palavra-passe incorrecta. Verifica os dados ou recupera a tua senha.' };
    }
    setCurrentUser(user);
    return { success: true };
  };

  const loginWithGoogle = (email?: string, name?: string) => {
    if (!email || !email.trim()) {
      return { success: false, error: 'Por favor introduz o teu e-mail Google.' };
    }
    const targetEmail = email.trim().toLowerCase();
    let user = users.find(u => u.email.toLowerCase() === targetEmail);
    if (!user) {
      const defaultName = name?.trim() || (targetEmail.includes('@') ? targetEmail.split('@')[0] : 'Estudante');
      const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
      user = {
        id: `user-google-${Date.now()}`,
        name: formattedName,
        displayName: formattedName.split(' ')[0],
        email: targetEmail,
        role: 'student',
        location: 'Moçambique',
        joinedAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [...prev, user!]);
    }
    setCurrentUser(user);
    return { success: true };
  };

  const register = (name: string, displayName: string, email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Já existe uma conta registada com este e-mail.' };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      displayName: displayName.trim() || name.trim().split(' ')[0],
      email: cleanEmail,
      password: password,
      role: 'student',
      location: 'Moçambique',
      joinedAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  const resetPassword = (email: string, newPassword: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!exists) {
      return { success: false, error: 'Nenhum utilizador encontrado com este endereço de e-mail.' };
    }
    setUsers(prev => prev.map(u => u.email.toLowerCase() === cleanEmail ? { ...u, password: newPassword } : u));
    if (currentUser?.email.toLowerCase() === cleanEmail) {
      setCurrentUser(prev => prev ? { ...prev, password: newPassword } : null);
    }
    return { success: true };
  };

  // Student Enrollment & Progress
  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return enrollments.some(e => e.userId === currentUser.id && e.courseId === courseId);
  };

  const getEnrollment = (courseId: string) => {
    if (!currentUser) return undefined;
    return enrollments.find(e => e.userId === currentUser.id && e.courseId === courseId);
  };

  const enrollCourse = (courseId: string) => {
    if (!currentUser) return;
    if (isEnrolled(courseId)) return;

    const course = courses.find(c => c.id === courseId);
    const firstLessonId = course?.modules[0]?.lessons[0]?.id;

    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      userId: currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      lastAccessedLessonId: firstLessonId,
      completedLessonIds: [],
      quizAttempts: [],
      isCompleted: false
    };

    setEnrollments(prev => [...prev, newEnrollment]);
  };

  const markLessonComplete = (courseId: string, lessonId: string, completed: boolean) => {
    if (!currentUser) return;

    setEnrollments(prev => prev.map(enr => {
      if (enr.userId !== currentUser.id || enr.courseId !== courseId) return enr;

      let newCompleted = [...enr.completedLessonIds];
      if (completed) {
        if (!newCompleted.includes(lessonId)) {
          newCompleted.push(lessonId);
        }
      } else {
        newCompleted = newCompleted.filter(id => id !== lessonId);
      }

      return {
        ...enr,
        completedLessonIds: newCompleted,
        lastAccessedLessonId: lessonId
      };
    }));
  };

  const setLastAccessedLesson = (courseId: string, lessonId: string) => {
    if (!currentUser) return;
    setEnrollments(prev => prev.map(enr => {
      if (enr.userId === currentUser.id && enr.courseId === courseId) {
        return { ...enr, lastAccessedLessonId: lessonId };
      }
      return enr;
    }));
  };

  const savePersonalNote = (courseId: string, lessonId: string, content: string) => {
    if (!currentUser) return;
    const now = new Date().toLocaleString('pt-MZ');
    setPersonalNotes(prev => {
      const existing = prev.find(n => n.userId === currentUser.id && n.lessonId === lessonId);
      if (existing) {
        return prev.map(n => n.id === existing.id ? { ...n, content, updatedAt: now } : n);
      } else {
        return [
          ...prev,
          {
            id: `note-${Date.now()}`,
            userId: currentUser.id,
            courseId,
            lessonId,
            content,
            updatedAt: now
          }
        ];
      }
    });
  };

  const getPersonalNote = (lessonId: string) => {
    if (!currentUser) return '';
    const note = personalNotes.find(n => n.userId === currentUser.id && n.lessonId === lessonId);
    return note ? note.content : '';
  };

  const submitQuiz = (courseId: string, userAnswers: number[]) => {
    if (!currentUser) return { passed: false, score: 0 };
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.finalQuiz.length) return { passed: false, score: 0 };

    let correctCount = 0;
    course.finalQuiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / course.finalQuiz.length) * 100);
    const passed = score >= course.passingScorePercent;
    const attemptDate = new Date().toISOString().split('T')[0];

    // Update enrollment state (100% course completion recorded, without certificates)
    setEnrollments(prev => prev.map(enr => {
      if (enr.userId === currentUser.id && enr.courseId === courseId) {
        const attempts = [...enr.quizAttempts, { date: attemptDate, score, passed }];
        return {
          ...enr,
          quizAttempts: attempts,
          isCompleted: passed ? true : enr.isCompleted,
          completedAt: passed ? attemptDate : enr.completedAt
        };
      }
      return enr;
    }));

    return { passed, score };
  };

  const toggleBookmark = (courseId: string) => {
    setBookmarks(prev => 
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const isBookmarked = (courseId: string) => bookmarks.includes(courseId);

  // Certificate Verification
  const getCertificateByCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    return certificates.find(c => c.code.toUpperCase() === cleanCode);
  };

  // Admin Actions
  const adminSaveCourse = (updatedCourse: Course) => {
    setCourses(prev => {
      const idx = prev.findIndex(c => c.id === updatedCourse.id);
      if (idx >= 0) {
        const newArr = [...prev];
        newArr[idx] = updatedCourse;
        return newArr;
      }
      return [updatedCourse, ...prev];
    });
  };

  const adminDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const adminTogglePublish = (courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, isPublished: !c.isPublished } : c));
  };

  const adminRevokeCertificate = (code: string) => {
    setCertificates(prev => prev.map(c => c.code === code ? { ...c, isValid: false } : c));
  };

  const adminReissueCertificate = (code: string) => {
    setCertificates(prev => prev.map(c => c.code === code ? { ...c, isValid: true } : c));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        courses,
        enrollments,
        certificates,
        personalNotes,
        bookmarks,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        resetPassword,
        enrollCourse,
        isEnrolled,
        getEnrollment,
        markLessonComplete,
        setLastAccessedLesson,
        savePersonalNote,
        getPersonalNote,
        submitQuiz,
        toggleBookmark,
        isBookmarked,
        getCertificateByCode,
        adminSaveCourse,
        adminDeleteCourse,
        adminTogglePublish,
        adminRevokeCertificate,
        adminReissueCertificate,
        allUsers: users
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
