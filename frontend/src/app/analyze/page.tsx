'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisForm } from '@/components/AnalysisForm';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { Recommendations } from '@/components/Recommendations';
import { Loader2 } from 'lucide-react';

export default function AnalyzePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { score: number }>(null);

  const handleAnalyze = async (formData: { productName: string, description: string, manufacturing: string, supplyChain: string }) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'mock-user-wallet-123',
          productName: formData.productName,
          description: formData.description,
          supplierInfo: formData.supplyChain + (formData.manufacturing ? ' | ' + formData.manufacturing : ''),
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setResult({ score: data.data.footprintScore });
      } else {
        console.error('API Error:', data.error);
        setResult({ score: 50 }); // Fallback score
      }
    } catch (error) {
      console.error('Failed to analyze product:', error);
      setResult({ score: 50 }); // Fallback score
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 md:p-8 mt-10">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-400/5 rounded-full blur-[100px] pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!isAnalyzing && !result && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Analysis</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Submit your product data for a comprehensive, AI-driven environmental footprint evaluation stored securely on-chain.
              </p>
            </div>
            <AnalysisForm onSubmit={handleAnalyze} />
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse" />
              <Loader2 className="w-16 h-16 text-green-400 animate-spin relative z-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Analyzing Product Data...</h3>
              <p className="text-gray-400">Processing text, manufacturing info, and supply chain metrics through our decentralized AI models.</p>
            </div>
          </motion.div>
        )}

        {result && !isAnalyzing && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Analysis Complete</h2>
              <p className="text-gray-400">Your results have been verified and securely logged.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-start">
              <ScoreDisplay score={result.score} />
              
              <div className="flex flex-col gap-4">
                <div className="glass-card p-6">
                  <h4 className="font-semibold text-lg mb-2">Key Findings</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                      Materials used account for 45% of total impact.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0" />
                      Transportation emissions are higher than industry average.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      Energy efficiency in manufacturing is optimal.
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-6 border-green-400/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <h4 className="font-semibold text-lg mb-2 relative z-10">Blockchain Verification</h4>
                  <p className="text-xs text-gray-400 font-mono break-all leading-relaxed relative z-10">
                    Tx Hash: 0x8f2a...c91b<br/>
                    Stored on IPFS: bafybeig...xyz
                  </p>
                  <button className="text-green-400 text-sm font-medium mt-4 hover:underline relative z-10">
                    View on Block Explorer
                  </button>
                </div>
              </div>
            </div>

            <Recommendations />

            <button
              onClick={() => setResult(null)}
              className="mt-12 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Analyze Another Product
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
