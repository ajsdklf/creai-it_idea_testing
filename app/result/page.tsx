// app/result/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

// Import existing components
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import AnalysisResults from '../components/AnalysisResults';
import PopupCREAIIT from '../components/PopUpCREAIIT';
import LoadingSpinner from '../components/LoadingSpinner';
import { VCAnalysisResult } from '../types/analysis';

interface AnalysisInput {
  idea: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  target_customer: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  value_proposition: {
    content: string;
    provided: "true" | "false" | "partial";
  };
}

function ResultContent() {
  console.log('ResultContent component rendering');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VCAnalysisResult | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);

  const searchParams = useSearchParams();
  console.log('Search params received:', searchParams ? 'yes' : 'no');
  
  const idea = searchParams?.get('idea') || '';
  const targetCustomer = searchParams?.get('target_customer') || '';
  const valueProposition = searchParams?.get('value_proposition') || '';
  const messagesParam = searchParams?.get('messages') || '[]';
  
  console.log('URL Parameters:', {
    idea: idea ? `${idea.substring(0, 20)}...` : 'empty',
    targetCustomer: targetCustomer ? `${targetCustomer.substring(0, 20)}...` : 'empty',
    valueProposition: valueProposition ? `${valueProposition.substring(0, 20)}...` : 'empty',
    messagesParam: messagesParam ? `${messagesParam.substring(0, 20)}...` : 'empty'
  });

  const saveToRedis = async (
    messages?: Array<{ role: string; content: string }>,
    analysis?: {
      idea?: string;
      target_customer?: string;
      value_proposition?: string;
      etc?: string;
    },
    vcAnalysis?: VCAnalysisResult
  ) => {
    console.log('saveToRedis called with:', {
      messagesLength: messages?.length || 0,
      analysisProvided: !!analysis,
      vcAnalysisProvided: !!vcAnalysis
    });
    
    try {
      console.log('Attempting to get userData from localStorage');
      const userData = localStorage.getItem('userData');
      console.log('userData from localStorage:', userData ? 'found' : 'not found');
      
      const userName = userData ? JSON.parse(userData).userName : 'anonymous';
      console.log('userName resolved as:', userName);
      
      const payload = {
        userName,
        ...(messages?.length && { messages }),
        ...(analysis && { analysis }),
        ...(vcAnalysis && { vcAnalysis })
      };
      
      console.log('Payload prepared for Redis:', JSON.stringify(payload).substring(0, 100) + '...');

      console.log('Sending fetch request to /api/result_update');
      const response = await fetch('/api/result_update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      console.log('Fetch response received, status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response not OK:', response.status, response.statusText);
        console.error('Error data:', errorData);
        throw new Error(`Failed to save to Redis: ${errorData.error || response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Successfully saved to Redis:', responseData);
      return responseData;
    } catch (error) {
      console.error('Failed to save to Redis:', error instanceof Error ? error.message : String(error));
      console.error('Error details:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
      throw error;
    }
  };

  useEffect(() => {
    console.log('Messages useEffect triggered with messagesParam');
    // Parse messages from URL parameters
    try {
      console.log('Attempting to parse messagesParam:', messagesParam.substring(0, 30) + '...');
      const parsedMessages = JSON.parse(decodeURIComponent(messagesParam));
      console.log('Successfully parsed messages, count:', parsedMessages.length);
      setMessages(parsedMessages);
    } catch (error) {
      console.error('Failed to parse messages:', error instanceof Error ? error.message : String(error));
      console.error('Message param that failed to parse:', messagesParam);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
      setMessages([]);
    }
  }, [messagesParam]);

  useEffect(() => {
    console.log('Analysis useEffect triggered with idea, targetCustomer, valueProposition, messages');
    
    const fetchAnalysis = async () => {
      console.log('fetchAnalysis function called');
      try {
        const analysisInput: AnalysisInput = {
          idea: {
            content: idea,
            provided: idea ? "true" : "false"
          },
          target_customer: {
            content: targetCustomer,
            provided: targetCustomer ? "true" : "false"
          },
          value_proposition: {
            content: valueProposition,
            provided: valueProposition ? "true" : "false"
          }
        };

        console.log('Prepared analysisInput:', JSON.stringify(analysisInput, null, 2));
        console.log('Sending analysis request to /api/vc_analyzer');

        const response = await fetch('/api/vc_analyzer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ analysisInput })
        });
        
        console.log('API response received, status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API response error:', response.status, response.statusText);
          console.error('Error text:', errorText);
          throw new Error(`분석 요청에 실패했습니다. 상태 코드: ${response.status}`);
        }

        console.log('Parsing response JSON');
        const data = await response.json();
        console.log('Response data received:', data ? 'yes' : 'no');
        
        if (data.error) {
          console.error('API returned error in data:', data.error);
          throw new Error(data.error);
        }

        console.log('Analysis completed successfully, setting state');
        console.log('Analysis result structure:', JSON.stringify(Object.keys(data.analysis || {})));
        setAnalysisResult(data.analysis);
        setAnalysisComplete(true);
        setShowPopup(true);

        console.log('Calling saveToRedis with analysis results');
        try {
          await saveToRedis(
            messages,
            { idea, target_customer: targetCustomer, value_proposition: valueProposition },
            data.analysis
          );
          console.log('saveToRedis completed successfully');
        } catch (redisError) {
          console.error('Redis save failed but continuing with analysis display:', redisError);
          // Continue with analysis display even if Redis save fails
        }

      } catch (error) {
        console.error('Analysis failed:', error instanceof Error ? error.message : String(error));
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
        setError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
        setAnalysisComplete(true);
      }
    };

    if (idea || targetCustomer || valueProposition) {
      console.log('Analysis parameters found, initiating analysis');
      fetchAnalysis();
    } else {
      console.warn('No analysis parameters provided. Skipping analysis.');
      setError('분석을 위한 파라미터가 제공되지 않았습니다.');
      setAnalysisComplete(true);
    }
  }, [idea, targetCustomer, valueProposition, messages]);

  console.log('Current component state:', {
    analysisComplete,
    hasAnalysisResult: !!analysisResult,
    showPopup,
    hasError: !!error,
    messagesCount: messages.length
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-10">
        <button
          onClick={() => {
            console.log('Back button clicked');
            window.history.back();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md border border-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          <span className="hidden sm:inline">돌아가기</span>
        </button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {!analysisComplete ? (
            <div>
              <LoadingView />
              <div className="text-center text-gray-400 mt-4">
                <p>분석 중... 잠시만 기다려주세요.</p>
              </div>
            </div>
          ) : error ? (
            <div>
              <ErrorView errorMessage={error} />
              <div className="text-center text-gray-400 mt-4">
                <p>오류 세부 정보: {error}</p>
              </div>
            </div>
          ) : analysisResult ? (
            <div>
              <AnalysisResults 
                result={analysisResult} 
                onShowPopup={() => {
                  console.log('onShowPopup called from AnalysisResults');
                  setShowPopup(true);
                }} 
              />
            </div>
          ) : (
            <div className="text-center text-red-500 p-8 bg-gray-800 rounded-lg">
              <p>분석 결과가 없습니다. 분석은 완료되었지만 결과가 반환되지 않았습니다.</p>
            </div>
          )}

          {showPopup && !error && (
            <div>
              <PopupCREAIIT onClose={() => {
                console.log('PopupCREAIIT onClose called');
                setShowPopup(false);
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  console.log('ResultPage component rendering');
  return (
    <Suspense fallback={
      <div>
        <LoadingSpinner />
        <div className="text-center text-gray-400 mt-4">
          <p>페이지 로딩 중...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}