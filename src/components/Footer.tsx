import React from 'react';
import { Award, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-[#111719] border-t border-[#344448] text-[#A4B2AF] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Context */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#192326] border border-[#344448] flex items-center justify-center text-[#D6F36A] font-bold text-base">
                S+
              </div>
              <span className="text-xl font-bold tracking-tight text-[#F3F5F0]">
                Saber<span className="text-[#D6F36A]">+</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#A4B2AF]">
              Plataforma digital dedicada à capacitação prática de jovens moçambicanos com cursos focados no mercado de trabalho, empreendedorismo e criação de valor real.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#75C9B7]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Maputo, Moçambique</span>
            </div>
          </div>

          {/* Col 2: Cursos e Categorias */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3F5F0]">
              Cursos Disponíveis
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setCurrentView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  Excel do Zero
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  CapCut para Computador
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  CapCut para Celular
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  Maquiagem para Iniciantes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  Curso de Cutilagem
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  Cursos de Manicure e Pedicure
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navegação */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3F5F0]">
              Plataforma
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setCurrentView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  Sobre a Saber+
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D6F36A] transition-colors text-left"
                >
                  Área do Aluno
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Apoio e Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3F5F0]">
              Apoio & Contacto
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D6F36A] shrink-0" />
                <span>apoio@saberplus.mz</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#75C9B7] shrink-0" />
                <span>+258 84 900 1200 / +258 87 900 1200</span>
              </div>
              <p className="text-[11px] text-[#A4B2AF]/80 pt-1">
                Atendimento de Segunda a Sexta, das 08h às 17h (Hora de Maputo).
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#344448] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-left">
            <p>© {new Date().getFullYear()} Saber+ Academy. Todos os direitos reservados.</p>
            <p className="text-[11px] text-[#A4B2AF]/70 mt-0.5">
              Capacitação prática orientada ao mercado de trabalho e empreendedorismo em Moçambique.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => alert("Termos de Utilização:\nA Saber+ fornece acesso a conteúdos educativos para capacitação técnica. Os utilizadores comprometem-se a utilizar a plataforma para fins de aprendizagem individual respeitando os direitos de autor dos materiais.")}
              className="hover:text-[#F3F5F0] transition-colors"
            >
              Termos de Utilização
            </button>
            <span aria-hidden="true">·</span>
            <button 
              onClick={() => alert("Política de Privacidade:\nOs dados de progresso e informações dos alunos são protegidos e utilizados estritamente para a gestão formativa e acompanhamento do aluno.")}
              className="hover:text-[#F3F5F0] transition-colors"
            >
              Privacidade
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
