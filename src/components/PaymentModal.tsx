import React, { useState } from 'react';
import { Course } from '../types';
import { Check, Info, PhoneCall, ShieldAlert, Smartphone, X } from 'lucide-react';

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  onConfirmEnrollment: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose, onConfirmEnrollment }) => {
  const [method, setMethod] = useState<'mpesa' | 'emola'>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reference, setReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isFree = course.price === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFree) {
      onConfirmEnrollment();
      return;
    }

    setIsSubmitting(true);
    // Real instruction flow for Mozambique mobile money
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#192326] border border-[#344448] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#344448] bg-[#111719]">
          <h3 className="text-base font-bold text-[#F3F5F0]">
            {isFree ? 'Inscrição Gratuita' : 'Inscrição no Curso'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[#A4B2AF] hover:text-[#F3F5F0] hover:bg-[#202D30] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#202D30] border border-[#344448]">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-16 h-16 object-cover rounded-lg shrink-0 border border-[#344448]"
            />
            <div className="space-y-1">
              <span className="text-xs text-[#75C9B7]">{course.category}</span>
              <h4 className="text-sm font-bold text-[#F3F5F0]">{course.title}</h4>
              <div className="text-xs font-mono text-[#D6F36A] font-semibold">
                {isFree ? '100% Gratuito (Acesso Imediato)' : `${course.price.toLocaleString('pt-MZ')} MZN`}
              </div>
            </div>
          </div>

          {isFree ? (
            <div className="space-y-4">
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                Este curso foi disponibilizado sem custos de inscrição para capacitação de jovens e estudantes. Ao confirmar, terás acesso imediato a todas as aulas, exercícios e ao exame final de certificação.
              </p>
              <button
                onClick={onConfirmEnrollment}
                className="w-full py-3 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-sm rounded-xl transition-colors shadow-lg"
              >
                Confirmar e Começar Agora
              </button>
            </div>
          ) : submitted ? (
            <div className="p-4 rounded-xl bg-[#202D30] border border-[#75C9B7]/40 space-y-3 text-center">
              <div className="w-10 h-10 rounded-full bg-[#75C9B7]/20 text-[#75C9B7] flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#F3F5F0]">Comprovativo Registado</h4>
              <p className="text-xs text-[#A4B2AF] leading-relaxed">
                O teu pedido de inscrição com a referência <span className="font-mono text-[#D6F36A]">{reference || 'Pendente'}</span> foi submetido. A equipa pedagógica activará a tua conta assim que o pagamento M-Pesa / e-Mola for conciliado pelo sistema.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#192326] border border-[#344448] text-[#F3F5F0] text-xs font-semibold rounded-lg hover:border-[#D6F36A] transition-colors"
              >
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A4B2AF] mb-2">
                  Método de Pagamento Móvel (Moçambique)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMethod('mpesa')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                      method === 'mpesa'
                        ? 'border-[#D6F36A] bg-[#202D30] text-[#F3F5F0]'
                        : 'border-[#344448] bg-[#111719] text-[#A4B2AF] hover:border-[#75C9B7]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-xs font-bold">M-Pesa</div>
                      <div className="text-[10px] text-[#A4B2AF]">Vodacom Moçambique</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('emola')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                      method === 'emola'
                        ? 'border-[#D6F36A] bg-[#202D30] text-[#F3F5F0]'
                        : 'border-[#344448] bg-[#111719] text-[#A4B2AF] hover:border-[#75C9B7]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold">e-Mola</div>
                      <div className="text-[10px] text-[#A4B2AF]">Movitel Moçambique</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-3.5 rounded-xl bg-[#111719] border border-[#344448] text-xs space-y-1.5 text-[#A4B2AF]">
                <div className="flex items-center gap-1.5 text-[#F3F5F0] font-semibold">
                  <Info className="w-4 h-4 text-[#75C9B7]" />
                  <span>Instruções de Pagamento:</span>
                </div>
                {method === 'mpesa' ? (
                  <p className="text-[11px] leading-relaxed">
                    1. No teu telemóvel Vodacom, digita <strong className="text-[#D6F36A]">*150#</strong><br />
                    2. Escolhe Transferir Dinheiro / Pagar Serviços<br />
                    3. Número da Conta Saber+: <strong className="text-[#F3F5F0]">84 900 1200</strong><br />
                    4. Valor exacto: <strong className="text-[#D6F36A]">{course.price} MZN</strong>
                  </p>
                ) : (
                  <p className="text-[11px] leading-relaxed">
                    1. No teu telemóvel Movitel, digita <strong className="text-[#D6F36A]">*898#</strong><br />
                    2. Selecciona Transferência e-Mola<br />
                    3. Número da Conta Saber+: <strong className="text-[#F3F5F0]">86 900 1200</strong><br />
                    4. Valor exacto: <strong className="text-[#D6F36A]">{course.price} MZN</strong>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                  O teu número de celular {method === 'mpesa' ? 'Vodacom (84/85)' : 'Movitel (86/87)'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={method === 'mpesa' ? '84 123 4567' : '86 123 4567'}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111719] border border-[#344448] text-[#F3F5F0] text-xs focus:border-[#D6F36A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4B2AF] mb-1">
                  Código de Transacção / Mensagem SMS Recebida
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 8J92KL9102"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111719] border border-[#344448] text-[#F3F5F0] text-xs focus:border-[#D6F36A] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold text-xs rounded-xl transition-colors shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'A verificar transacção...' : 'Submeter Comprovativo para Validação'}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
