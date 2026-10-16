import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  KeyRound, 
  Lock, 
  LogIn, 
  Mail, 
  Sparkles, 
  User as UserIcon, 
  UserPlus,
  PlayCircle,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface AuthPageProps {
  mode: 'get-started' | 'login' | 'register' | 'forgot-password';
  onNavigate: (view: string) => void;
}

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const AuthPages: React.FC<AuthPageProps> = ({ mode: initialMode, onNavigate }) => {
  const { login, loginWithGoogle, register, resetPassword } = useApp();

  const [activeTab, setActiveTab] = useState<'get-started' | 'login' | 'register' | 'forgot-password'>(initialMode);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  // Login / Register fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Forgot password specific fields
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [newPassword, setNewPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(email, password);
    if (res.success) {
      onNavigate('dashboard');
    } else {
      setErrorMsg(res.error || 'Credenciais inválidas.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('A palavra-passe deve conter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('As palavras-passe não coincidem.');
      return;
    }

    const res = register(name, displayName, email, password);
    if (res.success) {
      onNavigate('dashboard');
    } else {
      setErrorMsg(res.error || 'Erro ao criar a conta.');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (resetStep === 1) {
      if (!email.trim()) {
        setErrorMsg('Por favor insere o teu e-mail.');
        return;
      }
      setResetStep(2);
    } else {
      if (newPassword.length < 6) {
        setErrorMsg('A nova palavra-passe deve ter pelo menos 6 caracteres.');
        return;
      }
      const res = resetPassword(email, newPassword);
      if (res.success) {
        setSuccessMsg('Palavra-passe alterada com sucesso! Podes agora iniciar sessão.');
        setTimeout(() => {
          setActiveTab('login');
          setResetStep(1);
          setSuccessMsg('');
        }, 1500);
      } else {
        setErrorMsg(res.error || 'Erro ao redefinir a palavra-passe.');
      }
    }
  };

  // Google Sign-in Handler
  const handleGoogleSignIn = (selectedEmail?: string, selectedName?: string) => {
    setShowGoogleModal(false);
    loginWithGoogle(selectedEmail || 'iniestaedgar20@gmail.com', selectedName || 'Edgar Iniesta');
    onNavigate('dashboard');
  };

  // Demo Student Login
  const handleDemoStudentLogin = () => {
    login('iniestaedgar20@gmail.com', 'password123');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#111719] px-4 py-8 text-[#F3F5F0]">
      <div className="w-full max-w-md space-y-5">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#192326] border border-[#344448] flex items-center justify-center text-[#D6F36A] font-extrabold text-2xl mx-auto shadow-xl">
            S+
          </div>
          <h1 className="text-2xl font-black text-[#F3F5F0] tracking-tight">
            Saber<span className="text-[#D6F36A]">+</span>
          </h1>
          <p className="text-xs text-[#A4B2AF]">
            Plataforma de Competências Práticas para Jovens
          </p>
        </div>

        {/* Auth Dashboard Container with Tabs */}
        <div className="rounded-3xl bg-[#192326] border border-[#344448] shadow-2xl overflow-hidden">
          
          {/* Dashboard Tab Selector */}
          {activeTab !== 'forgot-password' && (
            <div className="grid grid-cols-3 border-b border-[#344448] bg-[#141B1D]">
              <button
                type="button"
                onClick={() => { setActiveTab('get-started'); setErrorMsg(''); }}
                className={`py-3 text-xs font-bold transition-colors ${
                  activeTab === 'get-started'
                    ? 'text-[#D6F36A] border-b-2 border-[#D6F36A] bg-[#192326]'
                    : 'text-[#A4B2AF] hover:text-[#F3F5F0]'
                }`}
              >
                Começar
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
                className={`py-3 text-xs font-bold transition-colors ${
                  activeTab === 'login'
                    ? 'text-[#D6F36A] border-b-2 border-[#D6F36A] bg-[#192326]'
                    : 'text-[#A4B2AF] hover:text-[#F3F5F0]'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                className={`py-3 text-xs font-bold transition-colors ${
                  activeTab === 'register'
                    ? 'text-[#D6F36A] border-b-2 border-[#D6F36A] bg-[#192326]'
                    : 'text-[#A4B2AF] hover:text-[#F3F5F0]'
                }`}
              >
                Criar Conta
              </button>
            </div>
          )}

          <div className="p-6 sm:p-7 space-y-5">
            
            {/* Feedback Messages */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-[#75C9B7]/15 border border-[#75C9B7]/30 text-xs text-[#75C9B7]">
                {successMsg}
              </div>
            )}

            {/* TAB 1: GET STARTED */}
            {activeTab === 'get-started' && (
              <div className="space-y-5">
                <div className="text-center space-y-1">
                  <h2 className="text-lg font-bold text-[#F3F5F0]">
                    Inicia a tua aprendizagem prática
                  </h2>
                  <p className="text-xs text-[#A4B2AF]">
                    Formação objectiva em abas completas, sem desvios nem slideshows longos.
                  </p>
                </div>

                {/* Key Benefits Pills */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#202D30] border border-[#344448] flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-[#D6F36A] shrink-0" />
                    <div className="text-xs">
                      <strong className="text-[#F3F5F0] block">Aulas 100% em Vídeo Prático</strong>
                      <span className="text-[#A4B2AF]">Aprende passo a passo com aulas organizadas por número.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#202D30] border border-[#344448] flex items-center gap-3">
                    <Layers className="w-5 h-5 text-[#75C9B7] shrink-0" />
                    <div className="text-xs">
                      <strong className="text-[#F3F5F0] block">Dashboard em Abas Directas</strong>
                      <span className="text-[#A4B2AF]">Sem rolagens infinitas; navega directo para o que queres.</span>
                    </div>
                  </div>
                </div>

                {/* Google Sign In Call to Action */}
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#F3F5F0] hover:bg-white text-[#111719] font-bold text-xs flex items-center justify-center gap-2.5 transition-colors shadow-lg"
                >
                  <GoogleIcon />
                  <span>Continuar com o Google</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="w-full py-2.5 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors text-center"
                  >
                    Criar Conta
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="w-full py-2.5 bg-[#202D30] hover:bg-[#202D30]/80 text-[#F3F5F0] border border-[#344448] font-semibold text-xs rounded-xl transition-colors text-center"
                  >
                    Já tenho conta
                  </button>
                </div>

                {/* Quick Student Access */}
                <div className="pt-2 border-t border-[#344448] text-center">
                  <button
                    type="button"
                    onClick={handleDemoStudentLogin}
                    className="text-[11px] text-[#A4B2AF] hover:text-[#D6F36A] transition-colors"
                  >
                    Acesso rápido de teste: <span className="underline font-semibold text-[#D6F36A]">Entrar como Aluno Demo</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: LOGIN */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Google Action */}
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F3F5F0] hover:bg-white text-[#111719] font-bold text-xs flex items-center justify-center gap-2.5 transition-colors shadow"
                >
                  <GoogleIcon />
                  <span>Continuar com o Google</span>
                </button>

                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 h-px bg-[#344448]" />
                  <span className="text-[10px] text-[#A4B2AF] uppercase tracking-wider">ou e-mail</span>
                  <div className="flex-1 h-px bg-[#344448]" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                    Endereço de E-mail
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A4B2AF] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="teu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] placeholder:text-[#A4B2AF]/50 focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#A4B2AF]">
                      Palavra-passe
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTab('forgot-password')}
                      className="text-[11px] text-[#75C9B7] hover:underline"
                    >
                      Esqueceste a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#A4B2AF] absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] placeholder:text-[#A4B2AF]/50 focus:outline-none focus:border-[#D6F36A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-[#A4B2AF] hover:text-[#F3F5F0]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Entrar no Painel</span>
                </button>

                {/* Quick Student Access */}
                <div className="pt-3 border-t border-[#344448] space-y-2 text-center">
                  <button
                    type="button"
                    onClick={handleDemoStudentLogin}
                    className="w-full py-2 bg-[#202D30] hover:bg-[#202D30]/80 text-[#D6F36A] border border-[#344448] rounded-lg text-xs font-semibold"
                  >
                    Entrar com Conta de Demonstração
                  </button>
                  <div className="text-xs text-[#A4B2AF]">
                    Não tens uma conta?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="font-bold text-[#D6F36A] hover:underline"
                    >
                      Criar conta gratuita
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 3: REGISTER */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                
                {/* Google Action */}
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F3F5F0] hover:bg-white text-[#111719] font-bold text-xs flex items-center justify-center gap-2.5 transition-colors shadow"
                >
                  <GoogleIcon />
                  <span>Continuar com o Google</span>
                </button>

                <div className="flex items-center gap-2 my-1.5">
                  <div className="flex-1 h-px bg-[#344448]" />
                  <span className="text-[10px] text-[#A4B2AF] uppercase tracking-wider">ou preenche os dados</span>
                  <div className="flex-1 h-px bg-[#344448]" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#A4B2AF] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Edgar Iniesta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] placeholder:text-[#A4B2AF]/50 focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                    Endereço de E-mail
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A4B2AF] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="teu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] placeholder:text-[#A4B2AF]/50 focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                      Palavra-passe
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Mínimo 6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                      Confirmar
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Repetir"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] focus:outline-none focus:border-[#D6F36A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Criar Conta e Aceder</span>
                </button>

                <div className="text-center pt-2 text-xs text-[#A4B2AF]">
                  Já tens conta?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="font-bold text-[#D6F36A] hover:underline"
                  >
                    Iniciar sessão
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: FORGOT PASSWORD */}
            {activeTab === 'forgot-password' && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-bold text-[#F3F5F0]">Recuperar Palavra-passe</h3>
                  <p className="text-xs text-[#A4B2AF]">Redefine o acesso à tua conta de aluno.</p>
                </div>

                {resetStep === 1 ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                        Endereço de E-mail da Conta
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="teu.email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] focus:outline-none focus:border-[#D6F36A]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#D6F36A] text-[#111719] font-bold text-xs rounded-xl hover:bg-[#c2e256] transition-colors"
                    >
                      Avançar para Nova Senha
                    </button>
                  </>
                ) : (
                  <>
                    <div className="p-2.5 rounded-lg bg-[#202D30] text-xs text-[#75C9B7]">
                      A redefinir para: <strong>{email}</strong>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                        Nova Palavra-passe
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Mínimo 6 caracteres"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#111719] border border-[#344448] rounded-xl text-xs text-[#F3F5F0] focus:outline-none focus:border-[#D6F36A]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#D6F36A] text-[#111719] font-bold text-xs rounded-xl hover:bg-[#c2e256] transition-colors"
                    >
                      Salvar Nova Senha
                    </button>
                  </>
                )}

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                    className="text-xs text-[#A4B2AF] hover:text-[#F3F5F0]"
                  >
                    Voltar ao Login
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Google Account Picker Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#192326] border border-[#344448] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <GoogleIcon />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F3F5F0]">Iniciar Sessão com o Google</h3>
                <p className="text-[11px] text-[#A4B2AF]">Escolhe uma conta para continuar na Saber+</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#344448]">
              {/* Primary Detected Google Account */}
              <button
                type="button"
                onClick={() => handleGoogleSignIn('iniestaedgar20@gmail.com', 'Edgar Iniesta')}
                className="w-full p-3 rounded-xl bg-[#202D30] hover:bg-[#202D30]/80 border border-[#344448] flex items-center gap-3 text-left transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#D6F36A] text-[#111719] font-bold flex items-center justify-center shrink-0 text-sm">
                  E
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-[#F3F5F0]">Edgar Iniesta</div>
                  <div className="text-[11px] text-[#A4B2AF] truncate">iniestaedgar20@gmail.com</div>
                </div>
              </button>

              {/* Custom Google account input toggle */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Outro e-mail @gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#111719] border border-[#344448] rounded-lg text-xs text-[#F3F5F0] placeholder:text-[#A4B2AF]/50 focus:outline-none focus:border-[#D6F36A]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customGoogleEmail.trim()) {
                        handleGoogleSignIn(customGoogleEmail.trim());
                      }
                    }}
                    className="px-3 py-2 bg-[#D6F36A] text-[#111719] font-bold text-xs rounded-lg hover:bg-[#c2e256]"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="px-3 py-1.5 text-xs text-[#A4B2AF] hover:text-[#F3F5F0]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
