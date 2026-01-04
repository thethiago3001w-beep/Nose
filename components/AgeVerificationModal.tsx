import React from 'react';

interface AgeVerificationProps {
  onVerify: () => void;
  onExit: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationProps> = ({ onVerify, onExit }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn transition-all duration-500">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-700 p-8 rounded shadow-2xl shadow-black text-center relative scale-100 hover:scale-[1.01] transition-transform duration-300">
        
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 font-bold text-4xl tracking-tighter select-none">
          <span className="text-white tracking-tighter mr-[1px]">Ph</span>
          <span className="bg-brand-orange text-black px-2 py-0.5 rounded-[4px] leading-tight flex items-center justify-center">hub</span>
        </div>

        <h1 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
          Este es un Sitio Web para adultos
        </h1>

        <div className="border-t border-zinc-700 my-4"></div>

        <h2 className="text-lg font-bold text-gray-300 mb-2">Notice to Users</h2>

        <p className="text-gray-400 text-xs leading-relaxed mb-6 text-justify">
          Este sitio web contiene material restringido a menores de edad, que incluye POCA ROPA y representaciones explícitas de actividad sexual. Al entrar, afirma que tiene por lo menos 18 años de edad o la mayoría de edad en la jurisdicción desde que está accediendo el sitio web y que da consentimiento en ver contenido sexualmente explícito.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onVerify}
            className="w-full bg-brand-orange hover:bg-white hover:text-black text-black font-bold text-base py-3 rounded-sm transition-colors uppercase tracking-wide"
          >
            Si tengo más de 18
          </button>
          
          <button 
            onClick={onExit}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-bold text-base py-3 rounded-sm transition-colors uppercase tracking-wide border border-zinc-700"
          >
            No, no tengo más de 18 salir
          </button>
        </div>

        <div className="mt-6 pt-3 border-t border-zinc-800">
           <h3 className="text-[10px] font-bold text-gray-500 uppercase">Aviso a las fuerzas del orden</h3>
           <p className="text-[9px] text-gray-600 mt-1">
             El proveedor de este sitio web cumple con las regulaciones 18 U.S.C. § 2257.
           </p>
        </div>

      </div>
    </div>
  );
};

export default AgeVerificationModal;