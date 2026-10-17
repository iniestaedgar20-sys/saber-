export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  displayName: string;
  email: string;
  password?: string;
  role: UserRole;
  location?: string;
  phone?: string;
  bio?: string;
  joinedAt: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  type?: 'pdf' | 'spreadsheet' | 'template' | 'guide';
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoId: string; // YouTube Video ID
  durationMinutes: number;
  order: number;
  isRequired: boolean;
  resources?: ResourceLink[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'Tecnologia e produtividade' | 'Beleza' | 'Gestão e Negócios' | 'Idiomas';
  level: 'Iniciante' | 'Intermédio' | 'Avançado';
  price: number; // in Mozambican Meticais (MZN). 0 = Gratuito
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  durationEstimate: string;
  objectives: string[];
  requirements: string[];
  targetAudience: string;
  isPublished: boolean;
  modules: Module[];
  finalQuiz: QuizQuestion[];
  passingScorePercent: number;
  featured?: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  lastAccessedLessonId?: string;
  completedLessonIds: string[];
  quizAttempts: {
    date: string;
    score: number;
    passed: boolean;
  }[];
  isCompleted: boolean;
  completedAt?: string;
  certificateId?: string;
}

export interface Certificate {
  id: string;
  code: string; // e.g. SBR-2026-EXC-8492
  enrollmentId: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  scorePercent: number;
  isValid: boolean;
  issuer: string;
  signatureTitle: string;
}

export interface PersonalNote {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  content: string;
  updatedAt: string;
}
