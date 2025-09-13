
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { generateStyledImage } from './services/geminiService';
import type { ImageData } from './types';

const App: React.FC = () => {
  const [subjectImage, setSubjectImage] = useState<{ file: File; preview: string } | null>(null);
  const [styleImage, setStyleImage] = useState<{ file: File; preview: string } | null>(null);
  const [prompt, setPrompt] = useState<string>("Analyze the artistic essence of the style image (focusing on color palette, texture, lighting, and brushstrokes) and apply it to the subject from the subject image. Do not simply copy the background or elements from the style image; the goal is to reimagine the subject in that specific artistic style.");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileToImageData = (file: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (base64String) {
          resolve({
            base64: base64String,
            mimeType: file.type,
          });
        } else {
          reject(new Error("Failed to convert file to base64."));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!subjectImage || !styleImage || !prompt) {
      setError('Please provide a subject image, a style image, and a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const subjectImageData = await fileToImageData(subjectImage.file);
      const styleImageData = await fileToImageData(styleImage.file);
      
      const resultBase64 = await generateStyledImage(subjectImageData, styleImageData, prompt);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);

    } catch (err) {
      console.error('Generation failed:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
    }
  }, [subjectImage, styleImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="bg-gray-800/50 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10 flex flex-col space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUploader
                title="Subject Image"
                onImageSelect={(file, preview) => setSubjectImage({ file, preview })}
                imagePreviewUrl={subjectImage?.preview}
              />
              <ImageUploader
                title="Style Image"
                onImageSelect={(file, preview) => setStyleImage({ file, preview })}
                imagePreviewUrl={styleImage?.preview}
              />
            </div>
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-indigo-300 mb-2">
                Prompt
              </label>
              <textarea
                id="prompt"
                rows={4}
                className="w-full bg-gray-900/70 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A cat in the style of Van Gogh's Starry Night"
              />
            </div>
            <div className="pt-2">
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !subjectImage || !styleImage}
              >
                {isLoading ? 'Generating...' : 'Generate Fusion'}
              </Button>
            </div>
          </div>

          {/* Display Panel */}
          <div className="bg-gray-800/50 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
            <GeneratedImageDisplay
              image={generatedImage}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
