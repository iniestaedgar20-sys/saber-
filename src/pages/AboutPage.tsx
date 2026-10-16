import React from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Users 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#75C9B7]">
          <span>Moçambique</span>
          <span aria-hidden="true">·</span>
          <span>Capacitação Digital e Técnica</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5F0] tracking-tight">
          Sobre a Saber+ Academy
        </h1>

        <p className="text-sm text-[#A4B2AF] leading-relaxed">
          Nascemos com um propósito claro: capacitar os jovens moçambicanos com competências práticas que abrem portas reais de emprego, freelancing e criação do próprio negócio.
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#202D30] text-[#D6F36A] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#F3F5F0]">Competências da Vida Real</h3>
          <p className="text-xs text-[#A4B2AF] leading-relaxed">
            Eliminamos teorias desnecessárias. Cada módulo é focado em ferramentas que as empresas realmente utilizam: folhas de cálculo, edição profissional de vídeo e estética aplicada.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#202D30] text-[#75C9B7] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#F3F5F0]">Acessível no Telemóvel</h3>
          <p className="text-xs text-[#A4B2AF] leading-relaxed">
            Sabemos que nem todos têm computadores de topo. Toda a plataforma funciona no telemóvel com consumo eficiente de dados móveis em qualquer província do país.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#192326] border border-[#344448] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#202D30] text-[#D6F36A] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#F3F5F0]">Resultados Práticos</h3>
          <p className="text-xs text-[#A4B2AF] leading-relaxed">
            Foco no que realmente interessa: cada aula é um passo directo para executares tarefas profissionais com segurança, sem complicações burocráticas.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="p-8 rounded-3xl bg-[#192326] border border-[#344448] space-y-6">
        <h2 className="text-xl font-bold text-[#F3F5F0]">O Nosso Compromisso Pedagógico</h2>
        
        <div className="space-y-4 text-xs text-[#A4B2AF] leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#D6F36A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F3F5F0] block">Sem promessas irrealistas:</strong>
              Não prometemos enriquecimento rápido nem títulos fictícios. Ensinamos o uso concreto de ferramentas de trabalho que geram valor demonstrável.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#D6F36A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F3F5F0] block">Respeito pelos criadores e direitos de autor:</strong>
              Incorporamos vídeos através dos canais oficiais autorizados dos produtores de conteúdo, respeitando as directrizes de transparência digital.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#D6F36A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F3F5F0] block">Inclusão financeira local:</strong>
              Para formações especializadas, apoiamos pagamentos móveis que os moçambicanos usam diariamente (M-Pesa e e-Mola).
            </div>
          </div>
        </div>
      </div>

      {/* Location & Contact */}
      <div className="p-8 rounded-3xl bg-[#202D30] border border-[#344448] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#75C9B7]">
            <MapPin className="w-4 h-4" />
            <span>Maputo · Moçambique</span>
          </div>
          <h3 className="text-lg font-bold text-[#F3F5F0]">Tens dúvidas ou queres ser nosso parceiro pedagógico?</h3>
          <p className="text-xs text-[#A4B2AF]">A nossa equipa responde em menos de 24 horas úteis.</p>
        </div>

        <button
          onClick={() => onNavigate('courses')}
          className="px-6 py-3 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors shrink-0 shadow-lg"
        >
          Explorar Cursos Agora
        </button>
      </div>

    </div>
  );
};
