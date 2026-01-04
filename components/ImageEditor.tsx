import React, { useState, useRef } from 'react';
import { Aperture, Upload, Sparkles, Download, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Remove Data URI prefix for API
      const base64Data = selectedImage.split(',')[1];
      
      const resultBase64 = await editImageWithGemini(base64Data, mimeType, prompt);
      
      // Add Data URI prefix back for display
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err: any) {
      setError(err.message || "Failed to process image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-[calc(100vh-80px)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
          <Aperture className="text-brand-orange" size={32} />
          VidHub AI Studio
        </h1>
        <p className="text-gray-400 mt-2">
          Transform your thumbnails and photos using Gemini 2.5 Flash Image. Upload a picture and tell our AI how to edit it.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div 
            onClick={triggerFileSelect}
            className={`
              border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer transition-all
              ${selectedImage ? 'border-brand-orange/50 bg-black' : 'border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 hover:border-brand-orange'}
            `}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Original" className="h-full w-full object-contain rounded-xl" />
            ) : (
              <div className="text-center p-6">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Upload Image</h3>
                <p className="text-sm text-gray-400">Click to browse or drag and drop</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Edit Instruction
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 'Add a neon cyberpunk filter', 'Make it look like a vintage poster', 'Add a cat in the corner'"
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange h-32 resize-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Powered by Gemini
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !prompt || isLoading}
              className={`
                w-full mt-4 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                ${!selectedImage || !prompt || isLoading 
                  ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-brand-orange text-black hover:bg-yellow-500 shadow-lg shadow-brand-orange/20'}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Edit
                </>
              )}
            </button>
            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-900 text-red-400 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col h-full">
           <div className={`
              flex-1 border-2 border-zinc-800 bg-black rounded-2xl overflow-hidden relative flex items-center justify-center min-h-[320px] lg:min-h-auto
              ${generatedImage ? 'border-brand-orange shadow-2xl shadow-brand-orange/10' : ''}
           `}>
             {generatedImage ? (
               <img src={generatedImage} alt="AI Generated" className="w-full h-full object-contain" />
             ) : (
               <div className="text-center p-8 opacity-40">
                 {isLoading ? (
                    <div className="flex flex-col items-center">
                       <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4"></div>
                       <p className="text-brand-orange animate-pulse font-medium">Creating masterpiece...</p>
                    </div>
                 ) : (
                    <>
                       <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                       <p className="text-gray-500 text-lg">Your generated image will appear here</p>
                    </>
                 )}
               </div>
             )}
           </div>

           {generatedImage && (
             <div className="mt-6 flex justify-end">
               <a 
                 href={generatedImage} 
                 download="vidhub-edit.png"
                 className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
               >
                 <Download size={20} />
                 Download
               </a>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;