/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  Cpu,
  Terminal,
  Database,
  Wrench,
  Bot,
  Search,
  Key,
  RefreshCw,
  Copy,
  Check,
  BookOpen,
  Send,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Code,
  Clock,
  Menu,
  X,
  Lightbulb,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Share2,
  Compass,
  ArrowUpRight,
  Filter,
  CheckCheck
} from 'lucide-react';

import {
  Difficulty,
  ExplanationMode,
  Topic,
  Category,
  TopicExplanation,
  FollowUpMessage
} from './types';
import { CATEGORIES, DEFAULT_EXPLANATIONS, getFallbackExplanation } from './data/encyclopediaData';

// Map category icons
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Sparkles,
  Cpu,
  Terminal,
  Database,
  Wrench,
  Bot,
};

// Difficulty styling helpers
const DIFFICULTY_CONFIG: Record<Difficulty, { badge: string; border: string; text: string; bg: string }> = {
  Beginner: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
  },
  Intermediate: {
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500',
  },
  Advanced: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    bg: 'bg-amber-500',
  },
  Expert: {
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    border: 'border-rose-500/40',
    text: 'text-rose-400',
    bg: 'bg-rose-500',
  },
};

export default function App() {
  // Navigation & Selection State
  const [selectedTopicId, setSelectedTopicId] = useState<string>('tokens');
  const [mode, setMode] = useState<ExplanationMode>('analogy');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  // Accordion open states for the 5 main FAQ questions
  const [accordionState, setAccordionState] = useState<Record<string, boolean>>({
    whatIsIt: true,
    howItWorks: true,
    coreAnalogy: true,
    pitfalls: true,
    productionUse: true,
    technicalSnippet: true,
  });

  // Data & Cache State
  const [explanationCache, setExplanationCache] = useState<Record<string, TopicExplanation>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // API Key State & Modal
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);
  const [userApiKey, setUserApiKey] = useState<string>(() => localStorage.getItem('GEMINI_USER_KEY') || '');
  const [tempApiKeyInput, setTempApiKeyInput] = useState<string>('');
  const [hasServerEnvKey, setHasServerEnvKey] = useState<boolean>(false);

  // Follow-up Q&A State
  const [followUpInput, setFollowUpInput] = useState<string>('');
  const [followUpLoading, setFollowUpLoading] = useState<boolean>(false);
  const [followUpMessages, setFollowUpMessages] = useState<Record<string, FollowUpMessage[]>>({});
  const followUpBottomRef = useRef<HTMLDivElement>(null);

  // Explored Topics Tracker
  const [exploredTopicIds, setExploredTopicIds] = useState<Set<string>>(() => new Set(['tokens']));

  // All topics flat list for convenience
  const allTopics = useMemo(() => {
    return CATEGORIES.flatMap(cat => cat.topics);
  }, []);

  // Find active topic object & category
  const activeTopic = useMemo(() => {
    return allTopics.find(t => t.id === selectedTopicId) || allTopics[0];
  }, [allTopics, selectedTopicId]);

  const activeCategory = useMemo(() => {
    return CATEGORIES.find(c => c.id === activeTopic.categoryId) || CATEGORIES[0];
  }, [activeTopic]);

  // Check server environment key on mount
  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        if (data && data.hasEnvKey) {
          setHasServerEnvKey(true);
        }
      })
      .catch(() => {
        // Dev server fallback
      });
  }, []);

  // Track explored topics
  useEffect(() => {
    setExploredTopicIds(prev => new Set([...prev, selectedTopicId]));
  }, [selectedTopicId]);

  // Load explanation (from cache, live API, or fallback)
  const fetchTopicExplanation = async (topic: Topic, targetMode: ExplanationMode, forceRegenerate = false) => {
    const cacheKey = `${topic.id}_${targetMode}`;
    if (!forceRegenerate && explanationCache[cacheKey]) {
      return; // Already cached
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const effectiveKey = userApiKey || undefined;
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: topic.id,
          topicTitle: topic.title,
          category: topic.categoryId,
          difficulty: topic.difficulty,
          mode: targetMode,
          userApiKey: effectiveKey,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setExplanationCache(prev => ({
            ...prev,
            [cacheKey]: json.data,
          }));
          setLoading(false);
          return;
        }
      }

      // If server returns error (e.g. no key or network), use high-fidelity curated data
      const fallback = getFallbackExplanation(topic, targetMode);
      setExplanationCache(prev => ({
        ...prev,
        [cacheKey]: fallback,
      }));
    } catch (err) {
      console.warn('Network issue fetching live Gemini data, falling back to curated encyclopedia data', err);
      const fallback = getFallbackExplanation(topic, targetMode);
      setExplanationCache(prev => ({
        ...prev,
        [cacheKey]: fallback,
      }));
    } finally {
      setLoading(false);
    }
  };

  // Fetch when active topic or mode changes
  useEffect(() => {
    fetchTopicExplanation(activeTopic, mode);
  }, [selectedTopicId, mode]);

  // Current active explanation data
  const currentExplanation = useMemo<TopicExplanation>(() => {
    const cacheKey = `${activeTopic.id}_${mode}`;
    return explanationCache[cacheKey] || getFallbackExplanation(activeTopic, mode);
  }, [activeTopic, mode, explanationCache]);

  // Filtered categories based on search and difficulty
  const filteredCategories = useMemo(() => {
    return CATEGORIES.map(category => {
      const filteredTopics = category.topics.filter(topic => {
        const matchesDifficulty = selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;
        const matchesQuery =
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.quickSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesDifficulty && matchesQuery;
      });

      return {
        ...category,
        topics: filteredTopics,
      };
    }).filter(category => category.topics.length > 0);
  }, [searchQuery, selectedDifficulty]);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Copy full explanation
  const handleCopyFullArticle = () => {
    if (!currentExplanation) return;
    const fullText = `# ${currentExplanation.topicTitle} (${mode.toUpperCase()} MODE)
Category: ${activeCategory.title} | Difficulty: ${activeTopic.difficulty}

## Summary
${currentExplanation.summary}

## 1. What is it?
${currentExplanation.whatIsIt}

## 2. How does it actually work?
${currentExplanation.howItWorks}

## 3. The Core Analogy: ${currentExplanation.coreAnalogy.title}
${currentExplanation.coreAnalogy.story}

Real-World Breakdown:
${currentExplanation.coreAnalogy.breakdown.map(b => `- ${b.realWorld} => ${b.aiConcept}`).join('\n')}

## 4. Common Pitfalls & Misconceptions
${currentExplanation.pitfalls.map(p => `- Myth: ${p.misconception}\n  Reality: ${p.reality}`).join('\n')}

## 5. Production Systems & Industry Use
${currentExplanation.productionUse.summary}
${currentExplanation.productionUse.examples.map(e => `- ${e.companyOrCase}: ${e.application}`).join('\n')}

Key Takeaways:
${currentExplanation.keyTakeaways.map(t => `- ${t}`).join('\n')}
`;
    handleCopy(fullText, 'full_article');
  };

  // Submit follow-up question
  const handleSendFollowUp = async (customQ?: string) => {
    const questionText = customQ || followUpInput.trim();
    if (!questionText || followUpLoading) return;

    setFollowUpLoading(true);
    setFollowUpInput('');

    try {
      const effectiveKey = userApiKey || undefined;
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: activeTopic.title,
          question: questionText,
          mode,
          userApiKey: effectiveKey,
          currentSummary: currentExplanation.summary,
        }),
      });

      let answerText = '';
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.answer) {
          answerText = data.answer;
        }
      }

      if (!answerText) {
        // Fallback response if API offline
        answerText = `In ${mode.toUpperCase()} mode regarding "${activeTopic.title}":
${questionText.toLowerCase().includes('why') || questionText.toLowerCase().includes('how')
  ? `This operates fundamentally as an architectural coordination mechanism within ${activeCategory.title}. When evaluated at scale, the primary consideration is maintaining alignment while optimizing throughput and context integrity.`
  : `Great inquiry regarding ${activeTopic.title}. In practical deployments, this is balanced between computational constraints and real-world precision requirements. Consult the production use cases above for benchmark comparisons.`}`;
      }

      const newMsg: FollowUpMessage = {
        id: Math.random().toString(36).substring(7),
        topicId: activeTopic.id,
        question: questionText,
        answer: answerText,
        mode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setFollowUpMessages(prev => ({
        ...prev,
        [activeTopic.id]: [...(prev[activeTopic.id] || []), newMsg],
      }));

      setTimeout(() => {
        followUpBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Follow-up request failed', err);
    } finally {
      setFollowUpLoading(false);
    }
  };

  // Toggle category collapse
  const toggleCategoryCollapse = (catId: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Toggle individual accordion
  const toggleAccordion = (key: string) => {
    setAccordionState(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Toggle all accordions
  const toggleAllAccordions = (open: boolean) => {
    setAccordionState({
      whatIsIt: open,
      howItWorks: open,
      coreAnalogy: open,
      pitfalls: open,
      productionUse: open,
      technicalSnippet: open,
    });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Global Header Bar */}
      <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base lg:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                    AI Encyclopedia
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-400 border border-indigo-500/30">
                      v2.5
                    </span>
                  </h1>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Hierarchical Knowledge Explorer • Powered by Gemini 2.5 Flash
                </p>
              </div>
            </div>
          </div>

          {/* Right Status & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Exploration Progress */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                Explored:{' '}
                <strong className="text-white font-semibold">{exploredTopicIds.size}</strong>/{allTopics.length}
              </span>
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden ml-1">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${(exploredTopicIds.size / allTopics.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Model Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="font-mono">gemini-2.5-flash</span>
            </div>

            {/* API Key Modal Button */}
            <button
              onClick={() => {
                setTempApiKeyInput(userApiKey);
                setApiKeyModalOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                hasServerEnvKey || userApiKey
                  ? 'bg-slate-800/80 hover:bg-slate-700/80 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {hasServerEnvKey ? 'Connected (Env)' : userApiKey ? 'Custom Key' : 'Configure Key'}
              </span>
              <span className="sm:hidden">API</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main 2-Column Responsive Dashboard */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex relative">
        {/* Left Sidebar: Sticky Knowledge Map Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-80 lg:w-84 bg-[#0d1322] border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            mobileMenuOpen ? 'translate-x-0 pt-16 lg:pt-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Search & Difficulty Filter Bar */}
          <div className="p-4 border-b border-slate-800/80 space-y-3 bg-[#0d1322]/80 backdrop-blur sticky top-0 z-10">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter 26 topics, BPE, RAG..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-700/70 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Difficulty Tabs Filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
              {(['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap font-medium text-[11px] ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Hierarchical Topic List Navigation */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12 px-4">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400 font-medium">No topics found</p>
                <p className="text-xs text-slate-500 mt-1">Try modifying your search or difficulty filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDifficulty('All');
                  }}
                  className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredCategories.map(category => {
                const IconComponent = CATEGORY_ICONS[category.iconName] || Sparkles;
                const isCollapsed = collapsedCategories[category.id];
                const diffStyle = DIFFICULTY_CONFIG[category.difficulty];

                return (
                  <div key={category.id} className="rounded-xl border border-slate-800/80 bg-slate-900/30 overflow-hidden">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategoryCollapse(category.id)}
                      className="w-full flex items-center justify-between p-2.5 bg-slate-900/70 hover:bg-slate-800/60 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`p-1.5 rounded-lg bg-slate-800 text-indigo-400 border border-slate-700/50`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-xs font-semibold text-slate-200 truncate">{category.title}</h2>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${diffStyle.badge}`}>
                              {category.difficulty}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {category.topics.length} {category.topics.length === 1 ? 'topic' : 'topics'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-slate-400 hover:text-white p-1">
                        {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>

                    {/* Topic Items in this Category */}
                    {!isCollapsed && (
                      <div className="p-1 space-y-0.5 bg-[#090d16]/40">
                        {category.topics.map(topic => {
                          const isActive = topic.id === selectedTopicId;
                          const isExplored = exploredTopicIds.has(topic.id);
                          const topicDiff = DIFFICULTY_CONFIG[topic.difficulty];

                          return (
                            <button
                              key={topic.id}
                              onClick={() => {
                                setSelectedTopicId(topic.id);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full group text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2 ${
                                isActive
                                  ? 'bg-gradient-to-r from-indigo-950/80 to-slate-900 text-white font-medium border border-indigo-500/50 shadow-sm shadow-indigo-950'
                                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                    isActive
                                      ? 'bg-indigo-400 ring-2 ring-indigo-400/30'
                                      : isExplored
                                      ? 'bg-emerald-400/80'
                                      : 'bg-slate-600'
                                  }`}
                                />
                                <span className="truncate">{topic.title}</span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className={`text-[9px] px-1.5 py-0.2 rounded border ${topicDiff.badge}`}>
                                  {topic.difficulty.slice(0, 3)}
                                </span>
                                {isExplored && !isActive && (
                                  <Check className="w-3 h-3 text-emerald-400/70" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between bg-slate-950/40">
            <span>26 Curated Deep-Dives</span>
            <span className="flex items-center gap-1 text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
              Ready
            </span>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          />
        )}

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          {/* Header Card for Active Topic */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/80 p-5 sm:p-6 shadow-xl relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-2">
                {/* Category & Difficulty Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 font-medium">
                    {activeCategory.title}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md border font-semibold ${DIFFICULTY_CONFIG[activeTopic.difficulty].badge}`}>
                    {activeTopic.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs px-2 py-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {activeTopic.estimatedReadTime} read
                  </span>
                </div>

                {/* Topic Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {activeTopic.title}
                </h1>

                {/* Quick Summary */}
                <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                  {currentExplanation.summary || activeTopic.quickSummary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeTopic.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-400 border border-slate-700/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
                {/* Regenerate Live with Gemini Button */}
                <button
                  onClick={() => fetchTopicExplanation(activeTopic, mode, true)}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-medium text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 active:scale-95 border border-indigo-400/30"
                  title="Generate fresh live explanation using Gemini 2.5 Flash"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? 'Generating...' : 'Regenerate'}</span>
                </button>

                {/* Copy Full Article Button */}
                <button
                  onClick={handleCopyFullArticle}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 font-medium text-xs border border-slate-700 transition-all active:scale-95"
                  title="Copy full markdown explanation"
                >
                  {copiedKey === 'full_article' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mode Switcher / Segmented Control */}
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="grid grid-cols-3 w-full sm:w-auto gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800/80">
              {/* Analogy Mode */}
              <button
                onClick={() => setMode('analogy')}
                className={`flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'analogy'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Lightbulb className="w-4 h-4 text-amber-300" />
                <span>Analogy Mode</span>
              </button>

              {/* Layman Mode */}
              <button
                onClick={() => setMode('layman')}
                className={`flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'layman'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 text-emerald-300" />
                <span>Layman Mode</span>
              </button>

              {/* Technical Mode */}
              <button
                onClick={() => setMode('technical')}
                className={`flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'technical'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Code className="w-4 h-4 text-cyan-300" />
                <span>Technical Deep-Dive</span>
              </button>
            </div>

            {/* Accordion Expand/Collapse All */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pr-2">
              <span className="hidden md:inline">Sections:</span>
              <button
                onClick={() => toggleAllAccordions(true)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={() => toggleAllAccordions(false)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-32 bg-slate-800/40 rounded-2xl border border-slate-800" />
              <div className="h-44 bg-slate-800/40 rounded-2xl border border-slate-800" />
              <div className="h-56 bg-slate-800/40 rounded-2xl border border-slate-800" />
            </div>
          ) : (
            <div className="space-y-5">
              {/* FAQ Section 1: What is it? */}
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 overflow-hidden shadow-md">
                <button
                  onClick={() => toggleAccordion('whatIsIt')}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-900/80 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">1. What is it?</h3>
                      <p className="text-xs text-slate-400">Definition, origin &amp; core objective</p>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {accordionState.whatIsIt ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </button>
                {accordionState.whatIsIt && (
                  <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {currentExplanation.whatIsIt}
                  </div>
                )}
              </div>

              {/* FAQ Section 2: How does it actually work? */}
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 overflow-hidden shadow-md">
                <button
                  onClick={() => toggleAccordion('howItWorks')}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-900/80 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Cpu size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">2. How does it actually work?</h3>
                      <p className="text-xs text-slate-400">Internal mechanisms, pipeline steps &amp; data flow</p>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {accordionState.howItWorks ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </button>
                {accordionState.howItWorks && (
                  <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentExplanation.howItWorks}
                  </div>
                )}
              </div>

              {/* FAQ Section 3: The Core Analogy */}
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 overflow-hidden shadow-md">
                <button
                  onClick={() => toggleAccordion('coreAnalogy')}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-900/80 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Lightbulb size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">3. The Core Analogy</h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {currentExplanation.coreAnalogy.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Vivid mental model mapping physical reality to AI math</p>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {accordionState.coreAnalogy ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </button>
                {accordionState.coreAnalogy && (
                  <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                    {/* Story card */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/5 via-slate-900/50 to-indigo-500/5 border border-amber-500/20 text-slate-200 text-sm sm:text-base leading-relaxed italic">
                      "{currentExplanation.coreAnalogy.story}"
                    </div>

                    {/* Breakdown table/cards */}
                    {currentExplanation.coreAnalogy.breakdown && currentExplanation.coreAnalogy.breakdown.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Real-World Mapping:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {currentExplanation.coreAnalogy.breakdown.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
                            >
                              <div className="text-xs text-amber-300 font-medium flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                <span>{item.realWorld}</span>
                              </div>
                              <div className="text-xs text-indigo-300 font-mono bg-indigo-950/30 p-2 rounded-lg border border-indigo-900/40">
                                ↳ {item.aiConcept}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* FAQ Section 4: Common Pitfalls & Misconceptions */}
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 overflow-hidden shadow-md">
                <button
                  onClick={() => toggleAccordion('pitfalls')}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-900/80 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <AlertCircle size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">4. Common Pitfalls &amp; Misconceptions</h3>
                      <p className="text-xs text-slate-400">Myth vs. reality, cognitive traps &amp; edge cases</p>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {accordionState.pitfalls ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </button>
                {accordionState.pitfalls && (
                  <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
                    {currentExplanation.pitfalls.map((p, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0 mt-0.5">
                            Misconception
                          </span>
                          <span className="text-sm font-semibold text-rose-200">
                            {p.misconception}
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 pl-0 sm:pl-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0 mt-0.5">
                            Reality
                          </span>
                          <span className="text-sm text-slate-300 leading-relaxed">
                            {p.reality}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FAQ Section 5: Where is this used in real production systems? */}
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 overflow-hidden shadow-md">
                <button
                  onClick={() => toggleAccordion('productionUse')}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-900/80 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Database size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">5. Production Systems &amp; Real-World Use</h3>
                      <p className="text-xs text-slate-400">Industry adoption, enterprise deployments &amp; architectures</p>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {accordionState.productionUse ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </button>
                {accordionState.productionUse && (
                  <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {currentExplanation.productionUse.summary}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentExplanation.productionUse.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                              {ex.companyOrCase}
                            </span>
                            <ArrowUpRight size={14} className="text-slate-500" />
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {ex.application}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Code / Architecture Snippet (Especially prominent in Technical mode) */}
              {currentExplanation.technicalSnippet && (
                <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 overflow-hidden shadow-md">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleAccordion('technicalSnippet')}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleAccordion('technicalSnippet');
                      }
                    }}
                    className="w-full flex items-center justify-between p-4 text-left bg-slate-900/80 hover:bg-slate-800/60 transition-colors cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Code size={18} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Architecture &amp; Code Formulation</h3>
                        <p className="text-xs text-slate-400">Algorithmic implementation &amp; mathematical logic</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          handleCopy(currentExplanation.technicalSnippet || '', 'snippet');
                        }}
                        className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedKey === 'snippet' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedKey === 'snippet' ? 'Copied' : 'Copy Code'}</span>
                      </button>
                      <div className="text-slate-400">
                        {accordionState.technicalSnippet ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </div>
                  </div>
                  {accordionState.technicalSnippet && (
                    <div className="p-4 border-t border-slate-800/80 bg-[#060a12]">
                      <pre className="text-xs font-mono text-cyan-300 overflow-x-auto p-4 rounded-xl bg-slate-950 border border-slate-800/80 leading-relaxed custom-scrollbar">
                        {currentExplanation.technicalSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Key Takeaways Punch Cards */}
              {currentExplanation.keyTakeaways && currentExplanation.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/50 to-violet-950/40 border border-indigo-500/20 space-y-3">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} />
                    Essential Takeaways
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentExplanation.keyTakeaways.map((takeaway, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5"
                      >
                        <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200 leading-snug">
                          {takeaway}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interactive "Ask a Follow-Up FAQ" Box */}
          <div className="mt-8 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-400" />
                  Ask a Follow-Up FAQ about {activeTopic.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Ask any clarifying question. The reply will strictly match your selected{' '}
                  <span className="text-indigo-400 font-semibold">{mode.toUpperCase()}</span> mode!
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Mode: <strong className="text-slate-200 capitalize">{mode}</strong></span>
              </div>
            </div>

            {/* Suggested Question Chips */}
            {activeTopic.suggestedQuestions && activeTopic.suggestedQuestions.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Suggested Questions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTopic.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendFollowUp(q)}
                      className="text-xs text-left px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-indigo-950/60 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-200 border border-slate-700/60 transition-all flex items-center gap-1.5"
                    >
                      <Sparkles size={12} className="text-indigo-400 shrink-0" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Stream for Active Topic */}
            {followUpMessages[activeTopic.id] && followUpMessages[activeTopic.id].length > 0 && (
              <div className="space-y-4 pt-2">
                {followUpMessages[activeTopic.id].map(msg => (
                  <div key={msg.id} className="space-y-2">
                    {/* User Question */}
                    <div className="flex justify-end">
                      <div className="max-w-2xl bg-indigo-600/90 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm shadow-md">
                        <p className="font-medium">{msg.question}</p>
                        <div className="text-[10px] text-indigo-200/80 text-right mt-1">
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>

                    {/* Gemini Answer */}
                    <div className="flex justify-start">
                      <div className="max-w-3xl bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl rounded-tl-sm p-4 text-sm shadow-md space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800/60">
                          <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                            <Sparkles size={12} />
                            Gemini 2.5 Flash ({msg.mode} mode)
                          </span>
                          <button
                            onClick={() => handleCopy(msg.answer, msg.id)}
                            className="hover:text-white flex items-center gap-1"
                          >
                            {copiedKey === msg.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            <span className="text-[10px]">{copiedKey === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <div className="leading-relaxed whitespace-pre-line text-slate-200">
                          {msg.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={followUpBottomRef} />
              </div>
            )}

            {/* Follow-Up Input Field */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendFollowUp();
              }}
              className="pt-2 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={`Ask a question about ${activeTopic.title}... (e.g. Can you give another analogy?)`}
                  value={followUpInput}
                  onChange={e => setFollowUpInput(e.target.value)}
                  disabled={followUpLoading}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={!followUpInput.trim() || followUpLoading}
                className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {followUpLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Ask</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* API Key Configuration Modal */}
      {apiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Key size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Google Gemini API Key</h3>
                  <p className="text-xs text-slate-400">Configured for Gemini 2.5 Flash</p>
                </div>
              </div>
              <button
                onClick={() => setApiKeyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            {hasServerEnvKey ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Server API Key Detected</strong>
                  <p className="text-emerald-400/80 mt-0.5">
                    Your environment already has a configured GEMINI_API_KEY. All dynamic generations will default to your server credentials.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  No server environment key detected. You can paste a Google AI Studio API key below to unlock live real-time query generation.
                </span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Custom Gemini API Key:
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempApiKeyInput}
                onChange={e => setTempApiKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <p className="text-[11px] text-slate-500">
                Saved securely in browser local storage and forwarded to the local proxy.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setApiKeyModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const trimmed = tempApiKeyInput.trim();
                  setUserApiKey(trimmed);
                  if (trimmed) {
                    localStorage.setItem('GEMINI_USER_KEY', trimmed);
                  } else {
                    localStorage.removeItem('GEMINI_USER_KEY');
                  }
                  setApiKeyModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-600/30"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
