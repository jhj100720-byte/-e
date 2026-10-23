import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, AlertTriangle, UploadCloud, FileSearch, Award, CheckCircle2, 
  XCircle, Search, RefreshCw, Cpu, Factory, Building2, QrCode, FileText, Download, Lock
} from 'lucide-react';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [history, setHistory] = useState([
    {
      id: 'CERT-2026-9081',
      date: '2026-10-22',
      productName: '프리미엄 가죽 가방 (Factory Line A)',
      company: '글로벌 럭셔리 코리아',
      status: 'AUTHENTIC',
      score: 98,
      factory: '제1공장 (서울 성수)'
    },
    {
      id: 'CERT-2026-8812',
      date: '2026-10-21',
      productName: '스마트 무선 이어폰 S3',
      company: '테크트로닉스 인터내셔널',
      status: 'COUNTERFEIT',
      score: 18,
      factory: '미등록 카피 공장 (중국 칭다오 추정)'
    }
  ]);
  const [filter, setFilter] = useState('ALL');

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // 분석 시작
  const runAnalysis = () => {
    if (!selectedImage) return;
    setAnalyzing(true);

    setTimeout(() => {
      // 모의 AI 분석 결과 생성
      const isAuthentic = Math.random() > 0.4;
      const score = isAuthentic ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 30) + 10;
      
      const newResult = {
        id: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        productName: isAuthentic ? '정품 검증 승인 모델' : '의심 정황 발견 상품',
        company: isAuthentic ? '(주)공식인증제조사' : '미확인 유사 상호 업체',
        factory: isAuthentic ? '대한민국 경기도 안성 제2공장 (정식 등록)' : '해외 미등록 불법 제조소',
        status: isAuthentic ? 'AUTHENTIC' : 'COUNTERFEIT',
        score: score,
        details: {
          ocrFactoryName: isAuthentic ? 'ISO-9001 인증 제2공장 표기 일치' : '공장 레이블 폰트 불일치 및 불완전 시리얼',
          logoIntegrity: isAuthentic ? '공식 엠블럼 및 인쇄 패턴 100% 일치' : '로고 정밀도 부족 (가품 패턴 감지)',
          serialVerification: isAuthentic ? '중앙 DB 등록 시리얼 번호 확인' : '중앙 DB 미등록 번호',
          sealAuthenticity: isAuthentic ? '홀로그램 홀로텍 정품 인장 정상' : '위조 인쇄 엠보싱 미적용'
        }
      };

      setAnalysisResult(newResult);
      setHistory(prev => [newResult, ...prev]);
      setAnalyzing(false);
    }, 2500);
  };

  const filteredHistory = history.filter(item => {
    if (filter === 'AUTHENTIC') return item.status === 'AUTHENTIC';
    if (filter === 'COUNTERFEIT') return item.status === 'COUNTERFEIT';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                인터넷 상품 품질 인증 센터
              </h1>
              <p className="text-xs text-slate-400">Official Product Quality & Authenticity AI Verification Center</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-amber-400"/> 보안 데이터베이스 연동</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-emerald-400"/> 전국 공장/기업 DB 추적</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Section: Upload & Analysis */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-amber-400" />
              상품 및 기업/공장 표기 이미지 업로드
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              상품 라벨, 공장명, 기업명, 또는 제조 시리얼이 포함된 사진을 올리면 AI가 가품 여부를 정밀 분석합니다.
            </p>

            {/* Dropzone */}
            <div className="border-2 border-dashed border-slate-600 hover:border-amber-500/60 transition-colors rounded-xl p-6 text-center bg-slate-900/50 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
              {selectedImage ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <img src={selectedImage} alt="Uploaded Product" className="max-h-64 object-contain rounded-lg border border-slate-700 mb-4" />
                  <div className="flex gap-3">
                    <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-xs font-medium text-slate-200 transition">
                      다른 사진 변경
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                  <FileSearch className="w-12 h-12 text-slate-500 mb-3" />
                  <span className="text-sm font-medium text-slate-300">이미지 파일을 이곳에 드래그하거나 클릭하여 업로드</span>
                  <span className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP (최대 10MB)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            {/* Analysis Action */}
            <button
              onClick={runAnalysis}
              disabled={!selectedImage || analyzing}
              className={`w-full mt-5 py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                !selectedImage || analyzing 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              }`}
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  공장 DB 및 로고 정밀 분석 중...
                </>
              ) : (
                <>
                  <Cpu className="w-5 h-5" />
                  품질 및 정품 여부 AI 판별 실행
                </>
              )}
            </button>
          </div>

          {/* Analysis Report Box */}
          {analysisResult && (
            <div className={`rounded-2xl border p-6 backdrop-blur transition-all ${
              analysisResult.status === 'AUTHENTIC' 
                ? 'bg-emerald-950/30 border-emerald-500/40' 
                : 'bg-rose-950/30 border-rose-500/40'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {analysisResult.status === 'AUTHENTIC' ? (
                    <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400 border border-rose-500/30">
                      <XCircle className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      analysisResult.status === 'AUTHENTIC'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}>
                      {analysisResult.status === 'AUTHENTIC' ? '정품 검증 완료 (Authentic)' : '위조/가품 의심 (Counterfeit Alert)'}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 mt-1">
                      신뢰도 점수: {analysisResult.score} / 100
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-mono">{analysisResult.id}</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-4 pt-4 border-t border-slate-700/50">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <Factory className="w-3.5 h-3.5" /> 제조 공장 검증
                  </div>
                  <p className="text-slate-200 font-medium">{analysisResult.factory}</p>
                  <p className="text-xs text-slate-400 mt-1">{analysisResult.details.ocrFactoryName}</p>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <Building2 className="w-3.5 h-3.5" /> 등록 기업체
                  </div>
                  <p className="text-slate-200 font-medium">{analysisResult.company}</p>
                  <p className="text-xs text-slate-400 mt-1">{analysisResult.details.serialVerification}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right Section: Certificate & History */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          {/* Certificate View */}
          <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 rounded-2xl border border-amber-500/30 p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-400 pointer-events-none">
              <Award className="w-48 h-48" />
            </div>

            <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-amber-200">디지털 품질 인증서 발급 예시</h3>
              </div>
              <QrCode className="w-6 h-6 text-slate-400" />
            </div>

            {analysisResult ? (
              <div className="space-y-3 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">인증 번호</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">{analysisResult.id}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">상품 판별 상태</span>
                  <span className={`font-bold text-sm ${analysisResult.status === 'AUTHENTIC' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {analysisResult.status === 'AUTHENTIC' ? '국가/기관 기준 정품 승인' : '위조 상품 위험 경고'}
                  </span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">검증 일자</span>
                  <span className="text-slate-200">{analysisResult.date}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 text-xs">
                왼쪽에서 상품 이미지를 분석하면<br />실시간 정품 검증 인증서가 생성됩니다.
              </div>
            )}
          </div>

          {/* History Ledger */}
          <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-6 backdrop-blur flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-100 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-amber-400" /> Recent Scan Ledger
              </h3>
              <div className="flex gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
                <button 
                  onClick={() => setFilter('ALL')} 
                  className={`px-2 py-1 rounded ${filter === 'ALL' ? 'bg-slate-700 text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  전체
                </button>
                <button 
                  onClick={() => setFilter('AUTHENTIC')} 
                  className={`px-2 py-1 rounded ${filter === 'AUTHENTIC' ? 'bg-slate-700 text-emerald-400 font-bold' : 'text-slate-400'}`}
                >
                  정품
                </button>
                <button 
                  onClick={() => setFilter('COUNTERFEIT')} 
                  className={`px-2 py-1 rounded ${filter === 'COUNTERFEIT' ? 'bg-slate-700 text-rose-400 font-bold' : 'text-slate-400'}`}
                >
                  가품
                </button>
              </div>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1">
              {filteredHistory.map((item) => (
                <div key={item.id} className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs hover:border-slate-700 transition">
                  <div>
                    <div className="font-semibold text-slate-200">{item.productName}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{item.company} • {item.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                    item.status === 'AUTHENTIC' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {item.status === 'AUTHENTIC' ? '정품' : '위조'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
