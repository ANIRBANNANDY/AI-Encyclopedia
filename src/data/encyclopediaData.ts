import { Category, Topic, TopicExplanation } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'foundations',
    title: '1. Foundations',
    difficulty: 'Beginner',
    description: 'The fundamental building blocks of modern AI, representations, and computation.',
    iconName: 'Sparkles',
    color: 'emerald',
    topics: [
      {
        id: 'tokens',
        title: 'Tokens',
        categoryId: 'foundations',
        difficulty: 'Beginner',
        estimatedReadTime: '4 min',
        tags: ['BPE', 'Tokenization', 'Vocabulary', 'Encoding'],
        quickSummary: 'The discrete atomic numerical pieces (words, subwords, syllables) that language models read and write.',
        suggestedQuestions: [
          'Why do LLMs struggle with counting letters in words?',
          'How does Byte-Pair Encoding (BPE) actually work?',
          'What is the difference between a token and a word across languages?'
        ]
      },
      {
        id: 'embeddings',
        title: 'Embeddings',
        categoryId: 'foundations',
        difficulty: 'Beginner',
        estimatedReadTime: '5 min',
        tags: ['Semantic Space', 'Vectors', 'Cosine Similarity'],
        quickSummary: 'Dense numerical representations that map qualitative human concepts into continuous geometric meaning.',
        suggestedQuestions: [
          'How does vector arithmetic like King - Man + Woman = Queen work?',
          'Why are embeddings high-dimensional (like 1536 or 3072 dimensions)?',
          'How do multimodal embeddings connect images and text?'
        ]
      },
      {
        id: 'vectors',
        title: 'Vectors & Vector Spaces',
        categoryId: 'foundations',
        difficulty: 'Beginner',
        estimatedReadTime: '4 min',
        tags: ['Linear Algebra', 'Dimensionality', 'Coordinates'],
        quickSummary: 'Arrays of numbers acting as coordinates in high-dimensional semantic spaces where proximity equals conceptual similarity.',
        suggestedQuestions: [
          'What is the curse of dimensionality in vector spaces?',
          'How does Cosine Similarity differ from Euclidean distance?',
          'Can we visualize 1536-dimensional space using UMAP or t-SNE?'
        ]
      },
      {
        id: 'neural-nets',
        title: 'Neural Networks',
        categoryId: 'foundations',
        difficulty: 'Beginner',
        estimatedReadTime: '6 min',
        tags: ['Perceptron', 'Backpropagation', 'Activation Functions', 'Weights'],
        quickSummary: 'Interconnected layers of mathematical calculation nodes inspired by biological neurons that learn functions from data.',
        suggestedQuestions: [
          'What role do activation functions like ReLU and GELU play?',
          'How does gradient descent update billions of weights?',
          'Why are deep networks so much more capable than shallow ones?'
        ]
      },
      {
        id: 'training-vs-inference',
        title: 'Training vs. Inference',
        categoryId: 'foundations',
        difficulty: 'Beginner',
        estimatedReadTime: '5 min',
        tags: ['Compute', 'Epochs', 'Forward Pass', 'GPU Clusters'],
        quickSummary: 'The profound operational dichotomy between teaching a model (months, millions of dollars) and executing it (milliseconds, cents).',
        suggestedQuestions: [
          'Why does training require so much more GPU memory than inference?',
          'What is the difference between pre-training and post-training?',
          'How does inference batching lower serving costs?'
        ]
      }
    ]
  },
  {
    id: 'architecture',
    title: '2. Architecture & Core Concepts',
    difficulty: 'Intermediate',
    description: 'The revolutionary structural mechanisms that power modern large language models.',
    iconName: 'Cpu',
    color: 'cyan',
    topics: [
      {
        id: 'transformers',
        title: 'Transformers',
        categoryId: 'architecture',
        difficulty: 'Intermediate',
        estimatedReadTime: '7 min',
        tags: ['Attention is All You Need', 'Encoder-Decoder', 'FeedForward'],
        quickSummary: 'The dominant deep learning architecture that processes all input tokens in parallel using self-attention mechanisms.',
        suggestedQuestions: [
          'Why did Transformers replace RNNs and LSTMs almost overnight?',
          'What is the difference between Encoder-only, Decoder-only, and Encoder-Decoder?',
          'What are residual connections and layer normalization inside a Transformer block?'
        ]
      },
      {
        id: 'self-attention',
        title: 'Self-Attention & Multi-Head Attention',
        categoryId: 'architecture',
        difficulty: 'Intermediate',
        estimatedReadTime: '8 min',
        tags: ['Query-Key-Value', 'Softmax', 'Dot-Product', 'Heads'],
        quickSummary: 'The mathematical spotlight allowing every token to dynamically weigh and reference every other token in the sequence.',
        suggestedQuestions: [
          'What is the exact intuition behind Query, Key, and Value vectors?',
          'Why does self-attention have O(N^2) quadratic complexity?',
          'Why do we need multiple attention heads instead of just one big one?'
        ]
      },
      {
        id: 'kv-cache',
        title: 'KV Cache (Key-Value Cache)',
        categoryId: 'architecture',
        difficulty: 'Intermediate',
        estimatedReadTime: '6 min',
        tags: ['Inference Acceleration', 'VRAM', 'Autoregressive', 'PagedAttention'],
        quickSummary: 'Memory optimization storing past attention keys and values so generating next tokens does not recompute history.',
        suggestedQuestions: [
          'Why does KV cache become the main memory bottleneck at long context lengths?',
          'How does PagedAttention (vLLM) solve memory fragmentation?',
          'What is the difference between Multi-Head Attention (MHA) and Grouped-Query Attention (GQA)?'
        ]
      },
      {
        id: 'context-windows',
        title: 'Context Windows',
        categoryId: 'architecture',
        difficulty: 'Intermediate',
        estimatedReadTime: '5 min',
        tags: ['RoPE', 'Needle in a Haystack', 'Attention Limits', '1M+ Tokens'],
        quickSummary: 'The active working memory span an LLM can attend to during a single generation request.',
        suggestedQuestions: [
          'How did models scale from 2K tokens to 1M+ and 2M+ tokens?',
          'What is the "Lost in the Middle" phenomenon in large context windows?',
          'How does Rotary Position Embedding (RoPE) extrapolate sequence lengths?'
        ]
      }
    ]
  },
  {
    id: 'engineering',
    title: '3. LLM Capabilities & Engineering',
    difficulty: 'Intermediate',
    description: 'Techniques for steering, formatting, and prompting foundation models effectively.',
    iconName: 'Terminal',
    color: 'blue',
    topics: [
      {
        id: 'prompting',
        title: 'Prompting & Prompt Engineering',
        categoryId: 'engineering',
        difficulty: 'Intermediate',
        estimatedReadTime: '5 min',
        tags: ['Zero-Shot', 'Directives', 'Delimiters', 'Formatting'],
        quickSummary: 'The art and science of constructing instructions and context to elicit accurate, structured responses from LLMs.',
        suggestedQuestions: [
          'What is the most effective prompt structure for complex tasks?',
          'Why are markdown delimiters (###, XML tags) so powerful for steering models?',
          'What is the difference between instruction following and text completion?'
        ]
      },
      {
        id: 'few-shot',
        title: 'Few-Shot Learning & In-Context Learning',
        categoryId: 'engineering',
        difficulty: 'Intermediate',
        estimatedReadTime: '5 min',
        tags: ['Examples', 'Demonstrations', 'Pattern Matching', 'Zero vs Few'],
        quickSummary: 'Guiding an LLM by providing 2 to 5 exemplary input-output pairs inside the prompt without modifying weights.',
        suggestedQuestions: [
          'How does the order of few-shot examples bias model responses?',
          'When does few-shot prompting outperform fine-tuning?',
          'How many few-shot examples are optimal before diminishing returns hit?'
        ]
      },
      {
        id: 'cot',
        title: 'Chain-of-Thought (CoT) & Reasoning',
        categoryId: 'engineering',
        difficulty: 'Intermediate',
        estimatedReadTime: '6 min',
        tags: ['Step-by-Step', 'Tree of Thoughts', 'Thinking Tokens', 'Reasoning'],
        quickSummary: 'Prompting the model to write out intermediate calculation steps before concluding, dramatically boosting logic and math.',
        suggestedQuestions: [
          'Why does "Let\'s think step by step" increase accuracy on math benchmarks?',
          'How do modern reasoning models (o1, Gemini 2.5/3 thinking) automate CoT?',
          'What is the difference between Chain-of-Thought and Tree-of-Thoughts (ToT)?'
        ]
      },
      {
        id: 'system-prompts',
        title: 'System Prompts & Personas',
        categoryId: 'engineering',
        difficulty: 'Intermediate',
        estimatedReadTime: '5 min',
        tags: ['Meta-Instructions', 'Guardrails', 'Persona', 'Role-Playing'],
        quickSummary: 'Persistent foundational directives positioned before user turns that dictate tone, boundaries, tool availability, and identity.',
        suggestedQuestions: [
          'How do models differentiate system instructions from user inputs under the hood?',
          'Can a user prompt completely override a system prompt (Jailbreaking)?',
          'How do production systems format and version system prompts?'
        ]
      }
    ]
  },
  {
    id: 'systems',
    title: '4. Systems & Data Integration',
    difficulty: 'Advanced',
    description: 'Grounding models on proprietary live data through retrieval, vector databases, and hybrid pipelines.',
    iconName: 'Database',
    color: 'amber',
    topics: [
      {
        id: 'rag',
        title: 'RAG (Retrieval-Augmented Generation)',
        categoryId: 'systems',
        difficulty: 'Advanced',
        estimatedReadTime: '7 min',
        tags: ['Grounding', 'Hallucination Mitigation', 'External Knowledge', 'Context Injection'],
        quickSummary: 'Dynamically fetching relevant passages from external document repositories to ground an LLM\'s answer in factual sources.',
        suggestedQuestions: [
          'How do you prevent hallucinations in RAG systems?',
          'What is Corrective RAG (CRAG) and Self-RAG?',
          'What is the trade-off between RAG and long-context models?'
        ]
      },
      {
        id: 'vector-dbs',
        title: 'Vector Databases',
        categoryId: 'systems',
        difficulty: 'Advanced',
        estimatedReadTime: '6 min',
        tags: ['HNSW', 'Pinecone', 'Chroma', 'Milvus', 'ANN Search'],
        quickSummary: 'Specialized databases engineered for indexing, filtering, and Approximate Nearest Neighbor (ANN) search over millions of vectors.',
        suggestedQuestions: [
          'How does the Hierarchical Navigable Small World (HNSW) graph algorithm work?',
          'Why is exact k-Nearest Neighbors impossible at scale for real-time apps?',
          'How does metadata filtering work alongside vector similarity?'
        ]
      },
      {
        id: 'hybrid-search',
        title: 'Hybrid Search (Dense + Sparse / BM25)',
        categoryId: 'systems',
        difficulty: 'Advanced',
        estimatedReadTime: '6 min',
        tags: ['BM25', 'Reciprocal Rank Fusion (RRF)', 'Re-ranking', 'Cross-Encoders'],
        quickSummary: 'Combining exact keyword matching (BM25) with semantic vector search (Dense) and reciprocal rank fusion for superior recall.',
        suggestedQuestions: [
          'Why does pure vector search fail on product SKUs, acronyms, and part numbers?',
          'How does Reciprocal Rank Fusion (RRF) combine ranking scores without normalisation issues?',
          'What role does a cross-encoder re-ranker play at the end of the pipeline?'
        ]
      },
      {
        id: 'chunking',
        title: 'Chunking & Document Processing',
        categoryId: 'systems',
        difficulty: 'Advanced',
        estimatedReadTime: '5 min',
        tags: ['Overlap', 'Semantic Chunking', 'Recursive Splitting', 'Context Preservation'],
        quickSummary: 'Strategies for segmenting raw documents into cohesive semantic units that preserve meaning without exceeding embedding windows.',
        suggestedQuestions: [
          'What happens if your chunk size is too small or too large?',
          'How does semantic chunking compare to fixed-size recursive splitting?',
          'What is parent-document retrieval and late chunking?'
        ]
      }
    ]
  },
  {
    id: 'fine-tuning',
    title: '5. Fine-Tuning & Alignment',
    difficulty: 'Advanced',
    description: 'Customizing weights, adapting domain knowledge, and aligning model behavior with human intent.',
    iconName: 'Wrench',
    color: 'purple',
    topics: [
      {
        id: 'lora',
        title: 'LoRA (Low-Rank Adaptation)',
        categoryId: 'fine-tuning',
        difficulty: 'Advanced',
        estimatedReadTime: '7 min',
        tags: ['PEFT', 'Matrix Decomposition', 'Rank r', 'Parameter-Efficient'],
        quickSummary: 'Parameter-efficient fine-tuning that freezes base weights and trains two low-rank matrix decomposition adapter matrices.',
        suggestedQuestions: [
          'Why does decomposing a weight delta into W = A x B save so much VRAM?',
          'How do you merge LoRA weights back into the base model for zero-overhead inference?',
          'What is rank r and alpha scaling in LoRA configuration?'
        ]
      },
      {
        id: 'qlora',
        title: 'QLoRA (Quantized LoRA)',
        categoryId: 'fine-tuning',
        difficulty: 'Advanced',
        estimatedReadTime: '6 min',
        tags: ['4-bit NormalFloat', 'Double Quantization', 'Paged Optimizers', 'Consumer GPUs'],
        quickSummary: 'Fine-tuning a base model compressed into 4-bit NormalFloat precision with 16-bit LoRA adapters on a single consumer GPU.',
        suggestedQuestions: [
          'What makes NF4 (NormalFloat4) mathematically optimal for neural weights?',
          'How does double quantization shave off additional VRAM?',
          'What is the performance trade-off between standard 16-bit LoRA and 4-bit QLoRA?'
        ]
      },
      {
        id: 'rlhf',
        title: 'RLHF (Reinforcement Learning from Human Feedback)',
        categoryId: 'fine-tuning',
        difficulty: 'Advanced',
        estimatedReadTime: '8 min',
        tags: ['Reward Model', 'PPO', 'KL Penalty', 'Alignment'],
        quickSummary: 'Training a reward model on human pairwise preferences, then optimizing the policy using PPO to produce helpful, harmless outputs.',
        suggestedQuestions: [
          'Why does RLHF use a KL-divergence penalty against the original reference model?',
          'What is "reward hacking" in RLHF and how is it prevented?',
          'Why has RLHF historically been notoriously unstable to train?'
        ]
      },
      {
        id: 'dpo',
        title: 'DPO (Direct Preference Optimization)',
        categoryId: 'fine-tuning',
        difficulty: 'Advanced',
        estimatedReadTime: '7 min',
        tags: ['Offline Optimization', 'Closed-Form Loss', 'Stable Alignment', 'No Reward Model'],
        quickSummary: 'Mathematical alignment algorithm that implicitly optimizes the reward function directly on preference pairs without training a separate reward model or PPO loop.',
        suggestedQuestions: [
          'How did DPO mathematically eliminate the need for a separate reward model?',
          'Why is DPO substantially faster and more stable than PPO?',
          'What are the limitations of DPO compared to online RL methods?'
        ]
      },
      {
        id: 'quantization',
        title: 'Quantization (GGUF, AWQ, GPTQ, FP8)',
        categoryId: 'fine-tuning',
        difficulty: 'Advanced',
        estimatedReadTime: '6 min',
        tags: ['Bits & Precision', 'AWQ', 'GGUF / llama.cpp', 'Memory Bandwidth'],
        quickSummary: 'Compressing 16-bit floating point model weights into 8-bit, 4-bit, or even 2-bit representations to slash VRAM and accelerate memory bandwidth.',
        suggestedQuestions: [
          'Why is inference predominantly memory-bandwidth bound rather than compute bound?',
          'How does Activation-Aware Weight Quantization (AWQ) protect salient outlier weights?',
          'What is the practical difference between post-training quantization (PTQ) and quantization-aware training (QAT)?'
        ]
      }
    ]
  },
  {
    id: 'agents',
    title: '6. Production & Advanced Agentic AI',
    difficulty: 'Expert',
    description: 'Autonomous systems, reasoning loops, multi-agent swarms, tool execution, and production guardrails.',
    iconName: 'Bot',
    color: 'rose',
    topics: [
      {
        id: 'ai-agents',
        title: 'AI Agents & Reasoning Loops',
        categoryId: 'agents',
        difficulty: 'Expert',
        estimatedReadTime: '8 min',
        tags: ['ReAct', 'Plan-and-Solve', 'Autonomous Loop', 'State Machine'],
        quickSummary: 'Autonomous architectures where an LLM repeatedly reasons, chooses actions, observes environment feedback, and adjusts its plan until completing a goal.',
        suggestedQuestions: [
          'What is the core ReAct (Reason + Act) loop and how does it prevent endless loops?',
          'How do long-term memory systems (scratchpads, episodic memory) work in agents?',
          'What are the primary failure modes of autonomous agents in production?'
        ]
      },
      {
        id: 'tool-calling',
        title: 'Tool Calling & Structured Outputs',
        categoryId: 'agents',
        difficulty: 'Expert',
        estimatedReadTime: '7 min',
        tags: ['Function Calling', 'JSON Schema', 'Grammar-Constrained Decoding', 'APIs'],
        quickSummary: 'The mechanism allowing LLMs to emit deterministic API arguments matching a JSON schema to interact with external programs and databases.',
        suggestedQuestions: [
          'How does the model know when to execute a tool vs when to answer directly?',
          'How does grammar-constrained decoding guarantee valid JSON syntax at generation time?',
          'How do you handle tool error execution and loop the trace back to the agent?'
        ]
      },
      {
        id: 'multi-agent-swarms',
        title: 'Multi-Agent Swarms & Orchestration',
        categoryId: 'agents',
        difficulty: 'Expert',
        estimatedReadTime: '8 min',
        tags: ['Handoffs', 'Hierarchical Orchestration', 'Peer-to-Peer', 'Debate'],
        quickSummary: 'Collaborative architectures of specialized AI agents coordinating via routers, supervisors, or peer handoffs to execute complex workflows.',
        suggestedQuestions: [
          'When is a multi-agent system genuinely superior to a single prompt with multiple tools?',
          'How do you manage state sharing and context explosion between communicating agents?',
          'What is the supervisor pattern vs choreographic swarm handoffs?'
        ]
      },
      {
        id: 'evaluation',
        title: 'LLM Evaluation & Benchmarking',
        categoryId: 'agents',
        difficulty: 'Expert',
        estimatedReadTime: '7 min',
        tags: ['LLM-as-a-Judge', 'Ragas', 'Golden Datasets', 'MMLU', 'HumanEval'],
        quickSummary: 'Systematic methodologies, synthetic datasets, and LLM-as-a-Judge frameworks to quantify accuracy, hallucinations, and regression in production.',
        suggestedQuestions: [
          'How do you calibrate an LLM-as-a-judge to minimize position and verbosity bias?',
          'What are the core metrics for RAG evaluation (Faithfulness, Answer Relevance, Context Recall)?',
          'Why do standard benchmarks (MMLU, GSM8K) suffer from data contamination?'
        ]
      },
      {
        id: 'guardrails',
        title: 'Guardrails & Safety Alignment',
        categoryId: 'agents',
        difficulty: 'Expert',
        estimatedReadTime: '6 min',
        tags: ['Input/Output Filtering', 'Prompt Injection', 'PII Masking', 'Llama Guard'],
        quickSummary: 'Deterministic and model-based security layers that intercept malicious prompt injections, redact PII, and block harmful generations before delivery.',
        suggestedQuestions: [
          'What is the difference between direct prompt injection and indirect prompt injection?',
          'How do classifier guardrails (like Llama Guard) evaluate latency vs security?',
          'Can prompt engineering alone ever guarantee complete security against jailbreaks?'
        ]
      }
    ]
  }
];

// Curated default encyclopedic explanations for instant loading & rock-solid offline reliability
export const DEFAULT_EXPLANATIONS: Record<string, Record<string, TopicExplanation>> = {
  tokens: {
    analogy: {
      topicTitle: 'Tokens',
      mode: 'analogy',
      summary: 'Tokens are like modular Lego bricks or Scrabble tiles: words are snapped into standardized chunks that an AI engine can mechanically count and index.',
      whatIsIt: 'Tokens are the atomic units of text that Large Language Models process. Computers cannot understand raw letters or squiggles; they can only process numbers. Tokenization is the translation layer that breaks human sentences down into standard puzzle pieces, assigns each unique piece a specific integer ID, and passes those IDs to the neural network.',
      howItWorks: 'When you submit text, a tokenizer looks at the stream of characters and cuts it up using algorithms like Byte-Pair Encoding (BPE). Common words like "apple" become a single token. Uncommon words or technical words like "unconstitutional" are sliced into multiple subword pieces ("un-", "constitut-", "ional"). Each token piece matches an index in a fixed dictionary of ~32,000 to ~256,000 tokens.',
      coreAnalogy: {
        title: 'The Scrabble Tile & Lego Factory',
        story: 'Imagine walking into a world-class postal warehouse that only accepts standardized plastic shipping crates. If you bring a small envelope, they put it into crate #412. If you bring an enormous couch, they do not build a custom giant container; instead, they disassemble the couch into four standardized cushions, two armrests, and three wooden legs, placing each into its own numbered crate. The AI inside the warehouse never sees the original sofa—it only sees crates #104, #88, #92, and #14.',
        breakdown: [
          { realWorld: 'Pre-cut standard wooden Lego bricks', aiConcept: 'Pre-computed subword tokens in the tokenizer vocabulary' },
          { realWorld: 'Catalog serial numbers stamped on every brick', aiConcept: 'Unique integer Token IDs (e.g. 15496 for "language")' },
          { realWorld: 'Snapping blocks together to build a castle', aiConcept: 'Assembling token sequences to form coherent sentences' },
          { realWorld: 'Chopping an irregular shape into tiny pieces', aiConcept: 'Splitting unfamiliar or misspelled words into byte-level chunks' }
        ]
      },
      pitfalls: [
        {
          misconception: 'A token is always exactly one word.',
          reality: 'On average in English, 1 token is approximately 0.75 words (or ~4 characters). Common words are 1 token, but punctuation, spaces, and rare words often take several tokens.'
        },
        {
          misconception: 'Language models read individual letters like humans do.',
          reality: 'Models see integers representing token chunks. This is why models famously struggle with questions like "How many \'r\'s are in strawberry?"—they see the token for "strawberry" as a single atomic ID rather than individual characters.'
        }
      ],
      productionUse: {
        summary: 'Tokenization governs the billing, memory footprint, and latency of every commercial AI API on the planet.',
        examples: [
          { companyOrCase: 'OpenAI, Google & Anthropic Billing', application: 'All major frontier model providers bill users per million input/output tokens rather than characters or seconds.' },
          { companyOrCase: 'Hugging Face Tokenizers (Rust)', application: 'High-speed Rust implementations that tokenize gigabytes of raw training data in seconds across distributed nodes.' }
        ]
      },
      technicalSnippet: `// Example tokenization snippet
// Text: "Indivisibility" -> Tokenizer -> ["Ind", "ivis", "ibility"] -> [4129, 8820, 1934]
// Rough conversion heuristic:
const estimatedTokens = Math.ceil(text.length / 4);
const costUSD = (estimatedTokens / 1_000_000) * 0.15;`,
      keyTakeaways: [
        'Tokens are the numerical bridge between raw human language and matrix mathematics.',
        'Token counts dictate API cost, VRAM usage, and context window limits.',
        'Subword tokenization prevents the vocabulary from blowing up to infinite size.'
      ]
    },
    layman: {
      topicTitle: 'Tokens',
      mode: 'layman',
      summary: 'Tokens are the bite-sized building blocks of language that AI models read and write, roughly equal to 3/4 of a word.',
      whatIsIt: 'When humans read, our brains effortlessly process words, punctuation, and idioms. Computers, however, only understand math and numbers. A token is a chunk of text—sometimes a whole word, sometimes just a syllable or a few letters—that the AI translates into a number so it can perform calculations.',
      howItWorks: 'Before an AI sees your prompt, an automated program called a tokenizer chops up your sentence. Frequent words like "the", "cat", or "happy" get their own single token. Rare or complex words get broken into pieces: "extraordinary" might become "extra" + "ordinary". Even spaces and punctuation marks get their own tokens. The AI then processes this sequence of numbers and outputs one token at a time.',
      coreAnalogy: {
        title: 'The Currency Exchange of Words',
        story: 'Think of tokens as standardized foreign exchange currency notes. You arrive at an international airport with goods, spices, and clothing. The local automated vending machines cannot accept physical apples or silk; they only accept coins of values 1, 5, 10, and 50 cents. The exchange booth converts everything you bring into a handful of exact coins. The machine calculates the total value of those coins and dispenses your purchase.',
        breakdown: [
          { realWorld: 'Your original suitcase of goods', aiConcept: 'The raw text prompt you type' },
          { realWorld: 'The automated coin converter booth', aiConcept: 'The Tokenizer (BPE/WordPiece)' },
          { realWorld: 'Standardized coins with denominations', aiConcept: 'Numerical token IDs' },
          { realWorld: 'The vending machine dispensing one snack item', aiConcept: 'The model predicting the next token' }
        ]
      },
      pitfalls: [
        {
          misconception: 'If a sentence has 10 words, it always takes 10 tokens.',
          reality: 'A 10-word sentence might take 12 to 18 tokens if it contains punctuation, numbers, emojis, or uncommon words.'
        },
        {
          misconception: 'Different AI models use the exact same tokens.',
          reality: 'Each model family (GPT, Gemini, Llama, Claude) has its own custom tokenizer vocabulary trained with different cutoffs and languages.'
        }
      ],
      productionUse: {
        summary: 'Understanding tokens is essential for controlling software budgets, prompt engineering, and context window management.',
        examples: [
          { companyOrCase: 'Enterprise Chatbot Cost Control', application: 'Companies trim conversational history to avoid consuming expensive token budgets.' },
          { companyOrCase: 'Multilingual Applications', application: 'Non-English languages often require 2-3x more tokens per word, requiring budget compensation.' }
        ]
      },
      technicalSnippet: `// Standard English rule of thumb:
// 1 token ≈ 4 characters
// 1 token ≈ 0.75 words
// 100 tokens ≈ 75 words
// 1,000 tokens ≈ 750 words (approx. 1 single-spaced page)`,
      keyTakeaways: [
        'Tokens are numbers that stand in for words or subwords.',
        'Token count directly determines generation speed and operating cost.',
        'Non-Latin scripts (Arabic, Hindi, Japanese) usually require more tokens per sentence.'
      ]
    },
    technical: {
      topicTitle: 'Tokens',
      mode: 'technical',
      summary: 'Discrete categorical integer identifiers generated via statistical subword algorithms (Byte-Pair Encoding, WordPiece, Unigram) mapping text into model vocabulary V.',
      whatIsIt: 'In Transformer architectures, tokens represent elements of a finite vocabulary |V| (typically between 32,000 and 256,000). A tokenizer function maps an arbitrary unicode string S -> T = [t_1, t_2, ..., t_n], where each t_i in {0, 1, ..., |V|-1}. This discretization bridges unbounded continuous character strings to categorical input distributions for embedding matrix lookups.',
      howItWorks: 'Modern tokenizers predominantly use Byte-Pair Encoding (BPE) or Byte-level BPE. Training begins with a base vocabulary of individual bytes (256 values) plus special tokens (<BOS>, <EOS>, <PAD>). The algorithm iteratively counts adjacent character/token pairs across a massive corpus, merging the most frequent pair into a new composite token until reaching target vocabulary size |V|. Inference uses greedy longest-match prefix trees or priority queues.',
      coreAnalogy: {
        title: 'Lossless Huffman-Style Prefix Compression Dictionary',
        story: 'Consider an optimal data-compression codebook. Rather than sending 8-bit ASCII characters individually or reserving a gigabyte table for every possible million-letter chemical compound, the codebook indexes the 100,000 most statistically probable n-grams. High-entropy segments collapse into frequent indices, while out-of-vocabulary anomalies gracefully fall back to base UTF-8 byte tokens.',
        breakdown: [
          { realWorld: 'Dynamic frequency-ranked compression table', aiConcept: 'Vocabulary dictionary V with rank-ordered merge rules' },
          { realWorld: 'Fallback byte-level transmission', aiConcept: 'Byte-level fallback avoiding <UNK> (unknown) token errors' },
          { realWorld: 'Vector index lookup in memory table', aiConcept: 'Input embedding matrix lookup W_E in R^(|V| x d_model)' }
        ]
      },
      pitfalls: [
        {
          misconception: 'BPE handles numbers and math cleanly by default.',
          reality: 'Unless regex splits digits individually (e.g. GPT-4 / Llama 3 tokenizers), numbers like "12345" get merged inconsistently as ["12", "345"] or ["123", "45"], severely corrupting arithmetic ability.'
        },
        {
          misconception: 'Token count is proportional to character length across all languages.',
          reality: 'Due to Latin-centric pre-training corpora, English achieves ~4 chars/token, whereas Telugu or Thai may degrade to <1.5 chars/token, resulting in 3x higher inference latency and cost.'
        }
      ],
      productionUse: {
        summary: 'Directly impacts inference latency (memory bandwidth), context window exhaustion, and training throughput.',
        examples: [
          { companyOrCase: 'Llama 3 & Gemini 1.5/2.5 Vocab Expansion', application: 'Expanded vocabulary from 32K to 128K-256K tokens, yielding 15-20% higher compression efficiency and lower latency per sequence.' },
          { companyOrCase: 'Tiktoken & Hugging Face Tokenizers', application: 'Native C++/Rust multithreaded tokenization serving high-throughput inference gateways.' }
        ]
      },
      technicalSnippet: `// BPE Conceptual Step
def bpe_merge(vocab, pair):
    new_vocab = {}
    bigram = re.escape(' '.join(pair))
    pattern = re.compile(r'(?<!\S)' + bigram + r'(?!\S)')
    for word in vocab:
        w_out = pattern.sub(''.join(pair), word)
        new_vocab[w_out] = vocab[word]
    return new_vocab`,
      keyTakeaways: [
        'Discretizes unbounded string input into finite integers for the embedding layer lookup.',
        'Larger vocabulary reduces sequence length L (faster autoregressive steps) at the cost of larger embedding matrices.',
        'Byte-level fallback guarantees zero out-of-vocabulary (<UNK>) runtime crashes.'
      ]
    }
  },
  transformers: {
    analogy: {
      topicTitle: 'Transformers',
      mode: 'analogy',
      summary: 'A Transformer is an ultra-fast modern factory assembly line where every worker can see and communicate with all other workers at the same instant.',
      whatIsIt: 'The Transformer is the breakthrough neural network architecture introduced by Google researchers in the famous 2017 paper "Attention Is All You Need". Before Transformers, AI read sentences one word after another like an old cassette tape. Transformers process the entire book simultaneously, analyzing how every word relates to every other word at the exact same moment.',
      howItWorks: 'A Transformer consists of stacked layers of self-attention blocks and feed-forward networks. As text enters, it is turned into vectors with position stamps. In each layer, attention heads cast spotlight beams connecting related words across the entire document. The representations get richer and more nuanced with each layer until the model predicts the next token.',
      coreAnalogy: {
        title: 'The Modern Open-Plan Trading Floor vs. The Telephone Game',
        story: 'Old neural networks were like playing the Telephone Game in kindergarten: Student 1 whispers to Student 2, who whispers to Student 3. By Student 100, the message is mangled and forgotten. A Transformer is like an open-plan Wall Street trading floor. When news breaks, all 50 traders look up at the master screens together. Trader A immediately shouts across the floor to Trader K, while Trader G cross-references data with Trader B. Information propagates instantaneously across the whole room without waiting in a single-file line.',
        breakdown: [
          { realWorld: 'Traders looking at each other across the open floor', aiConcept: 'Self-Attention connecting tokens regardless of distance' },
          { realWorld: 'The desk badge telling where each trader sits', aiConcept: 'Positional encodings preserving sequential order' },
          { realWorld: 'Individual traders analyzing specific data points', aiConcept: 'Feed-forward neural layers processing attended signals' },
          { realWorld: 'Multiple trading desks focusing on commodities, tech, and bonds', aiConcept: 'Multi-Head Attention capturing syntactic, semantic, and factual relationships' }
        ]
      },
      pitfalls: [
        {
          misconception: 'Transformers only work on written text.',
          reality: 'Transformers are universal foundation architectures powering Vision Transformers (ViT) for images, audio models (Whisper), protein folding (AlphaFold), and robotics.'
        },
        {
          misconception: 'Transformers understand words the same way humans do.',
          reality: 'They perform high-dimensional matrix multiplications and statistical pattern matching; they have no consciousness or internal physical grounding.'
        }
      ],
      productionUse: {
        summary: 'Virtually all leading modern AI models (GPT-4o, Gemini 2.5, Claude 3.5, Llama 3) are decoder-only Transformer variants.',
        examples: [
          { companyOrCase: 'Google Search & Gemini', application: 'Core ranking algorithms and generative answer engines powered by Transformer encoders and decoders.' },
          { companyOrCase: 'Tesla Full Self-Driving', application: 'Occupancy networks and trajectory planning using spatial-temporal Vision Transformers.' }
        ]
      },
      technicalSnippet: `// Standard Transformer Block Architecture:
// Input -> LayerNorm -> MultiHeadAttention + Residual Connection
//       -> LayerNorm -> FeedForwardNetwork (SwiGLU/GELU) + Residual Connection
// Output = x + FFN(LayerNorm(x + MHA(LayerNorm(x))))`,
      keyTakeaways: [
        'Eliminated sequential processing constraints, allowing massive parallel training on GPU clusters.',
        'Self-attention captures long-range dependencies across thousands of tokens.',
        'Forms the architectural backbone of modern Generative AI and frontier LLMs.'
      ]
    },
    layman: {
      topicTitle: 'Transformers',
      mode: 'layman',
      summary: 'The revolutionary AI architecture that powers ChatGPT, Gemini, and modern language AI by looking at all words at once.',
      whatIsIt: 'In 2017, AI researchers invented the Transformer architecture. Before this, language programs read text left-to-right, one word at a time, often forgetting the beginning of a paragraph by the time they reached the end. Transformers look at an entire page at once, figuring out which words are connected to each other no matter how far apart they are.',
      howItWorks: 'Imagine reading the word "bank". Is it a river bank or a financial bank? An older AI had to remember what came before. A Transformer looks at all the surrounding words simultaneously: if it spots "water", "fishing", and "mud", it instantly knows "bank" means river bank. It repeats this across dozens of layers to build a deep understanding.',
      coreAnalogy: {
        title: 'The Synchronized Detective Squad',
        story: 'Imagine investigating a crime mystery with a team of detectives. In the old days, Detective 1 inspected clue #1, wrote notes, and handed them to Detective 2 hours later. In a Transformer squad, all detectives stand in the room together examining the crime board simultaneously. Whenever one detective points to a muddy footprint, another detective immediately links it to the suspect\'s boots, while a third detective connects the timestamp on a train ticket. Everything clicks together at once.',
        breakdown: [
          { realWorld: 'The crime board with all clues visible at once', aiConcept: 'The full token context processed in parallel' },
          { realWorld: 'Detectives drawing red strings between related clues', aiConcept: 'Self-Attention weights connecting relevant words' },
          { realWorld: 'Individual detectives analyzing specific details in private', aiConcept: 'Feed-forward network layers' }
        ]
      },
      pitfalls: [
        {
          misconception: 'Transformers are smarter because they have more memory.',
          reality: 'They are smarter because their parallel architecture allows them to be trained on hundreds of thousands of GPUs across trillions of words.'
        },
        {
          misconception: 'A Transformer reads sentences sequentially like humans.',
          reality: 'It evaluates all positions in parallel in a single matrix multiplication during training.'
        }
      ],
      productionUse: {
        summary: 'Transformers are the standard engine under the hood of almost every consumer AI tool today.',
        examples: [
          { companyOrCase: 'ChatGPT & Microsoft Copilot', application: 'Generates code, essays, summaries, and conversational responses.' },
          { companyOrCase: 'DeepL & Google Translate', application: 'Translates nuanced idioms accurately by considering complete context.' }
        ]
      },
      technicalSnippet: `// Key insight of Attention:
// Score(word1, word2) = How much word1 should care about word2.
// In "The animal didn't cross the street because it was too tired",
// Attention links "it" strongly to "animal" (not "street").`,
      keyTakeaways: [
        'Processes entire sentences simultaneously rather than word-by-word.',
        'Uses self-attention to resolve ambiguity from context.',
        'Scales effortlessly across thousands of GPUs, unlocking modern AI.'
      ]
    },
    technical: {
      topicTitle: 'Transformers',
      mode: 'technical',
      summary: 'A deep feed-forward neural architecture based on stacked Multi-Head Self-Attention and position-wise Feed-Forward Networks with residual stream connections.',
      whatIsIt: 'Introduced by Vaswani et al. (2017), the Transformer eliminates recurrent and convolutional inductive biases in favor of dot-product attention. Operating over sequence matrices X in R^(N x d_model), it applies affine projections to form Query (Q), Key (K), and Value (V) matrices, computing non-local token interactions with O(1) sequential operations during training.',
      howItWorks: 'A standard Decoder-only Transformer layer executes: 1) Pre-LayerNorm (or RMSNorm) over the residual stream; 2) Causal Multi-Head Self-Attention with Rotary Position Embeddings (RoPE); 3) Residual addition (x = x + MHA(Norm(x))); 4) Pre-LayerNorm; 5) Multi-layer Perceptron (typically SwiGLU / GeGLU with 8/3 expansion ratio); 6) Second residual addition.',
      coreAnalogy: {
        title: 'High-Dimensional Graph Convolution with Dynamic Edge Weights',
        story: 'Consider an arbitrary fully-connected directed graph where every token represents a node. Unlike static graph neural networks with fixed adjacency matrices, the Transformer dynamically derives the complete adjacency matrix at every layer via the softmax(QK^T / sqrt(d_k)) kernel, propagating node features along dynamically weighted edges in a single matrix multiplication step.',
        breakdown: [
          { realWorld: 'Dynamic edge-weight calculation between nodes', aiConcept: 'Softmax attention matrix A = softmax(Q K^T / sqrt(d_k))' },
          { realWorld: 'Unbroken high-speed backbone bus', aiConcept: 'Residual stream identity highway preventing vanishing gradients' },
          { realWorld: 'Non-linear localized processing per node', aiConcept: 'Position-wise Feed-Forward Network (FFN/MLP)' }
        ]
      },
      pitfalls: [
        {
          misconception: 'Standard self-attention memory scales linearly with sequence length.',
          reality: 'Vanilla self-attention exhibits O(N^2) quadratic time and space complexity due to the N x N attention matrix calculation, requiring FlashAttention, sliding windows, or linear approximations for ultra-long sequences.'
        },
        {
          misconception: 'Transformers naturally understand word order.',
          reality: 'Self-attention is completely permutation invariant. Without positional representations (Sinusoidal, Learned, or RoPE), the model treats "Dog bites man" and "Man bites dog" identically.'
        }
      ],
      productionUse: {
        summary: 'Dominates modern frontier foundation models, computer vision, and speech synthesis.',
        examples: [
          { companyOrCase: 'FlashAttention-2 & vLLM', application: 'IO-aware GPU kernel optimizations fusing softmax and matrix multiplies to accelerate Transformer throughput.' },
          { companyOrCase: 'OpenAI, Anthropic, Google Frontiers', application: 'Massive scale decoder-only clusters trained on up to 100,000 H100 GPUs.' }
        ]
      },
      technicalSnippet: `import torch
import torch.nn as nn
import math

class ScaledDotProductAttention(nn.Module):
    def forward(self, q, k, v, mask=None):
        d_k = q.size(-1)
        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        p_attn = torch.softmax(scores, dim=-1)
        return torch.matmul(p_attn, v), p_attn`,
      keyTakeaways: [
        'Replaced recurrence with dot-product attention, enabling complete training parallelization.',
        'The residual stream acts as an additive memory bus across all layers.',
        'Quadratic complexity O(N^2) is mitigated by FlashAttention and FlashDecoding kernels.'
      ]
    }
  },
  rag: {
    analogy: {
      topicTitle: 'RAG (Retrieval-Augmented Generation)',
      mode: 'analogy',
      summary: 'RAG turns an AI from a student taking a closed-book exam relying purely on memory into an open-book researcher with instant library access.',
      whatIsIt: 'Retrieval-Augmented Generation (RAG) is a technique that connects an LLM to external data sources (like company handbooks, customer records, or live news). Instead of relying solely on facts frozen in the model\'s weights during its training months ago, RAG fetches the most relevant factual documents on the fly and glues them into the prompt before generating the answer.',
      howItWorks: 'When a user asks a question, the RAG system converts the question into a mathematical vector, searches a Vector Database for matching text chunks, retrieves the top 3-5 most relevant passages, and feeds both the user question and the retrieved excerpts into the model: "Answer this question using only the provided excerpts."',
      coreAnalogy: {
        title: 'The High-Stakes Legal Courtroom & Paralegal',
        story: 'Imagine a brilliant trial attorney who has a sharp mind for argumentation and logic, but cannot possibly memorize every single city ordinance, tax code revision, and precedent case filed this morning. Beside the attorney sits a lightning-fast paralegal. When the judge asks a specific technical question about Section 44B, the paralegal sprints into the law library, pulls the exact three relevant binders, flips to the highlighted paragraphs, and slips them under the attorney\'s nose. The attorney reads the real facts and delivers a flawless, grounded closing statement.',
        breakdown: [
          { realWorld: 'The brilliant trial attorney delivering the speech', aiConcept: 'The Large Language Model (e.g. Gemini 2.5 Flash)' },
          { realWorld: 'The lightning-fast research paralegal', aiConcept: 'The Retriever & Embedding Model' },
          { realWorld: 'The massive law library archives', aiConcept: 'The Vector Database & Document Store' },
          { realWorld: 'The 3 highlighted binders placed on the desk', aiConcept: 'The retrieved context window injected into the prompt' }
        ]
      },
      pitfalls: [
        {
          misconception: 'RAG replaces the need for fine-tuning completely.',
          reality: 'RAG is unbeatable for factual knowledge retrieval and dynamic updates, but fine-tuning is still needed when you want to change the model\'s tone, style, syntax, or internal reasoning patterns.'
        },
        {
          misconception: 'If you have RAG, your system will never hallucinate.',
          reality: 'If the retriever pulls irrelevant chunks, or if the prompt is poorly engineered, the model can still misinterpret the excerpts or hallucinate missing facts.'
        }
      ],
      productionUse: {
        summary: 'The standard architectural pattern for 90%+ of all enterprise AI applications.',
        examples: [
          { companyOrCase: 'Morgan Stanley Wealth Management', application: 'Financial advisors querying 100,000+ proprietary research reports in real-time.' },
          { companyOrCase: 'Customer Support Copilots (Zendesk, Intercom)', application: 'Resolving customer tickets accurately by citing internal knowledge base articles.' }
        ]
      },
      technicalSnippet: `// Standard RAG flow:
// 1. queryVector = embed(userQuery)
// 2. relevantDocs = vectorDb.search(queryVector, topK=4)
// 3. prompt = \`Context: \${relevantDocs.join("\\n")}\\nQuestion: \${userQuery}\\nAnswer:\`
// 4. response = llm.generate(prompt)`,
      keyTakeaways: [
        'Eliminates the cost of continuous model retraining for live or proprietary data.',
        'Drastically reduces hallucinations by anchoring answers to source citations.',
        'Allows granular access control (users only retrieve documents they have permissions for).'
      ]
    },
    layman: {
      topicTitle: 'RAG (Retrieval-Augmented Generation)',
      mode: 'layman',
      summary: 'RAG lets an AI search your private files and documents before answering, so it always gives up-to-date and factual answers.',
      whatIsIt: 'Even the most advanced AI models have a cutoff date—they know nothing about events that happened yesterday or the private PDF files stored on your company drive. RAG fixes this. It acts like a search engine built directly into the AI: first it finds the right information in your documents, then it hands those pages to the AI to write a clear answer.',
      howItWorks: 'Step 1: Your documents are sliced into short paragraphs and indexed. Step 2: When you ask a question, the system searches your library for the paragraphs that match your topic. Step 3: It sends those paragraphs to the AI along with your question. Step 4: The AI synthesizes the answer, citing the exact documents it used.',
      coreAnalogy: {
        title: 'The Open-Book Exam',
        story: 'Think back to school exams. A closed-book test forces you to rely on memory—if you forget an equation, you guess or fail. In an open-book test, you bring your textbook. When a question asks about the Treaty of Versailles, you don\'t guess; you open Chapter 4, find page 112, read the verified dates, and write down an accurate answer.',
        breakdown: [
          { realWorld: 'Your textbook on the desk', aiConcept: 'Your company database or document collection' },
          { realWorld: 'Looking up keywords in the index at the back of the book', aiConcept: 'Vector search finding relevant paragraphs' },
          { realWorld: 'Writing down an answer citing Chapter 4, page 112', aiConcept: 'The AI generating an answer with source citations' }
        ]
      },
      pitfalls: [
        {
          misconception: 'You can just dump an entire 1,000-page book into one search query.',
          reality: 'Documents must be carefully chopped into clean, bite-sized sections (chunking) so the search engine can pinpoint the exact answers.'
        },
        {
          misconception: 'RAG is slow and takes minutes.',
          reality: 'Modern vector searches run in under 20 milliseconds, delivering total response times nearly identical to standard AI queries.'
        }
      ],
      productionUse: {
        summary: 'Powers enterprise search, medical diagnosis assistants, and internal HR wikis.',
        examples: [
          { companyOrCase: 'Internal Company HR Portals', application: 'Employees asking "What is our parental leave policy in Germany?" and getting the exact policy answer.' },
          { companyOrCase: 'Legal Document Discovery', application: 'Attorneys searching millions of discovery emails for specific keywords and semantic concepts.' }
        ]
      },
      technicalSnippet: `User: "What was our Q3 revenue growth in Europe?"
RAG Retriever: Fetches "Q3-2024-Financial-Report.pdf", page 14
Injected Prompt: "Based strictly on page 14: 'Europe grew 18.4% YoY', answer the question."
AI Output: "According to the Q3 financial report, European revenue grew 18.4% YoY."`,
      keyTakeaways: [
        'Enables AI to access fresh, private, and changing data.',
        'Provides verifiable links and source citations for trust.',
        'Much cheaper and faster than fine-tuning or retraining.'
      ]
    },
    technical: {
      topicTitle: 'RAG (Retrieval-Augmented Generation)',
      mode: 'technical',
      summary: 'A hybrid architecture coupling dense/sparse information retrieval systems with conditional sequence generation via augmented context prompts.',
      whatIsIt: 'Formulated by Lewis et al. (2020), RAG delegates knowledge storage to an external non-parametric index rather than relying exclusively on parametric neural weights. By decoupling factual retrieval from generative reasoning, systems achieve deterministic knowledge updates, auditable source attribution, and mitigation of epistemic hallucinations.',
      howItWorks: 'The standard RAG pipeline operates across two decoupled phases: 1) Offline Ingestion: Text T is chunked via recursive or semantic splitters into {c_i}, encoded into embedding vectors e_i = E(c_i), and indexed in a vector DB (HNSW index). 2) Online Querying: User query q is mapped to e_q = E(q). Approximate Nearest Neighbor (ANN) search computes similarity (e.g. cosine / inner product) to retrieve top-k chunks. A cross-encoder re-ranker rescores candidates before injecting them into the system prompt.',
      coreAnalogy: {
        title: 'CPU Cache Hierarchy (L1 Registers vs L3 / DRAM Page Tables)',
        story: 'Parametric weights act like ultra-fast L1/L2 on-chip registers: fixed capacity, extremely high bandwidth, but prohibitively expensive to resize. The RAG vector store functions as DRAM / virtual memory: virtually unbounded, easily writable and swapped out at runtime, accessed via a memory controller (the retriever) on demand when cache misses occur.',
        breakdown: [
          { realWorld: 'L1/L2 On-chip CPU cache registers', aiConcept: 'Parametric LLM weights W' },
          { realWorld: 'DRAM page tables and SSD storage', aiConcept: 'Non-parametric vector database (Pinecone/Milvus/Qdrant)' },
          { realWorld: 'Direct Memory Access (DMA) bus transfer', aiConcept: 'Context injection into prompt payload' }
        ]
      },
      pitfalls: [
        {
          misconception: 'Pure vector similarity search is always superior to lexical search.',
          reality: 'Dense embeddings frequently struggle with exact product serial numbers, alphanumeric identifiers, and rare proper nouns. Production RAG requires Hybrid Search (Dense + BM25) combined via Reciprocal Rank Fusion (RRF).'
        },
        {
          misconception: 'Increasing top-k chunks always improves answer quality.',
          reality: 'Excessive context induces the "Lost in the Middle" degradation and increases token latency. Precision retrieval with re-ranking (e.g. Cohere ReRank, bge-reranker) consistently outperforms brute-force top-k.'
        }
      ],
      productionUse: {
        summary: 'De-facto enterprise production design for domain-grounded generative services.',
        examples: [
          { companyOrCase: 'Enterprise Copilots (GitHub, Microsoft 365)', application: 'Indexing codebases and enterprise knowledge graphs for grounded autocompletion and synthesis.' },
          { companyOrCase: 'LlamaIndex & LangChain Orchestrators', application: 'Multi-stage retrieval pipelines supporting metadata filtering, HyDE, and agentic query routing.' }
        ]
      },
      technicalSnippet: `// Production RAG Pipeline Pattern:
async function hybridRAG(query: string, topK = 5) {
  const [denseResults, sparseResults] = await Promise.all([
    vectorIndex.query({ vector: await embed(query), topK: 20 }),
    bm25Index.search(query, { topK: 20 })
  ]);
  const fused = reciprocalRankFusion([denseResults, sparseResults]);
  const reranked = await cohereRerank.rerank({ query, documents: fused.slice(0, 15), topN: topK });
  return await llm.generate({ context: reranked, prompt: query });
}`,
      keyTakeaways: [
        'Decouples non-parametric knowledge storage from parametric reasoning.',
        'Requires hybrid search (BM25 + Dense) and cross-encoder re-ranking for production recall.',
        'Significantly reduces hallucination rates while providing verifiable citations.'
      ]
    }
  }
};

// Helper to construct fallback explanation for any topic not explicitly customized above
export function getFallbackExplanation(topic: Topic, mode: 'analogy' | 'layman' | 'technical'): TopicExplanation {
  // If we already have a curated entry, return it
  if (DEFAULT_EXPLANATIONS[topic.id]?.[mode]) {
    return DEFAULT_EXPLANATIONS[topic.id][mode];
  }

  // Otherwise generate an intelligent structured fallback
  if (mode === 'analogy') {
    return {
      topicTitle: topic.title,
      mode: 'analogy',
      summary: `${topic.title} can be understood through the lens of everyday physical systems, coordinating specialized tasks like a well-run organization.`,
      whatIsIt: `${topic.title} is an essential concept in modern AI systems (${topic.categoryId}) that addresses how machines represent, process, or optimize intelligent behavior.`,
      howItWorks: `Just as complex machines coordinate specialized gears, ${topic.title} works by defining clear boundaries, computing intermediate states, and guiding the model toward efficient outputs.`,
      coreAnalogy: {
        title: `The Grand Orchestra & Master Conductor`,
        story: `Imagine a world-class symphony orchestra. Every musician has practiced their sheet music, but without a unified tempo and directional cues, the result would be cacophony. ${topic.title} acts as the conductor's baton—aligning distinct components, synchronizing timings, and ensuring every note contributes to the grand symphony.`,
        breakdown: [
          { realWorld: 'The Conductor raising the baton', aiConcept: 'The guiding signal or algorithm orchestrating the process' },
          { realWorld: 'Individual violinists and cellists', aiConcept: 'Specialized parameters, tokens, or agent nodes' },
          { realWorld: 'The harmonious acoustic music in the hall', aiConcept: 'The coherent, optimized output delivered to the user' }
        ]
      },
      pitfalls: [
        {
          misconception: `Assuming ${topic.title} operates independently without contextual tuning.`,
          reality: `It must be calibrated within the broader pipeline alongside hardware constraints and data distributions.`
        },
        {
          misconception: `Believing that higher scale alone solves every bottleneck associated with ${topic.title}.`,
          reality: `Algorithmic design and disciplined architecture matter far more than brute-force scaling.`
        }
      ],
      productionUse: {
        summary: `Widely implemented across enterprise AI platforms and frontier research labs.`,
        examples: [
          { companyOrCase: 'Frontier AI Labs (Google, OpenAI, Anthropic)', application: `Applied in daily training runs, inference serving clusters, and model evaluation suites.` },
          { companyOrCase: 'Production Cloud Infrastructure', application: `Optimizes latency, inference costs, and reasoning reliability in production.` }
        ]
      },
      technicalSnippet: `// Conceptual architecture representation for ${topic.title}
// Category: ${topic.categoryId} | Difficulty: ${topic.difficulty}
interface ${topic.title.replace(/[^a-zA-Z]/g, '')}Pipeline {
  input: TensorSequence;
  execute(): Promise<OptimizedOutput>;
}`,
      keyTakeaways: [
        `Crucial component of the modern ${topic.categoryId} ecosystem.`,
        `Balances computational efficiency with expressive power.`,
        `Can be queried live via Gemini 2.5 Flash using the 'Regenerate' button.`
      ]
    };
  } else if (mode === 'layman') {
    return {
      topicTitle: topic.title,
      mode: 'layman',
      summary: `${topic.title} is a core AI technique designed to make artificial intelligence more accurate, efficient, and reliable.`,
      whatIsIt: `${topic.title} is an important topic in artificial intelligence. It solves a specific problem that arose when engineers tried to teach computers to understand language and solve problems.`,
      howItWorks: `Instead of treating everything as a mystery, ${topic.title} breaks the problem into straightforward steps: receiving input, analyzing the patterns based on prior learning, and delivering a clean answer.`,
      coreAnalogy: {
        title: `The Master Chef's Recipe Binder`,
        story: `Imagine running a busy restaurant kitchen. If the chef had to guess ingredients every time an order came in, dinner would be a disaster. Instead, the kitchen has standard recipe binders with clear measurements and preparation steps. ${topic.title} provides that exact structure for AI models.`,
        breakdown: [
          { realWorld: 'The tested recipe card', aiConcept: 'The standardized methodology or structure' },
          { realWorld: 'The chef measuring spices accurately', aiConcept: 'The algorithm computing values without guesswork' },
          { realWorld: 'The delicious meal delivered to the customer', aiConcept: 'The final, high-quality AI response' }
        ]
      },
      pitfalls: [
        {
          misconception: `It requires advanced coding skills for regular users to benefit from.`,
          reality: `Most modern tools implement ${topic.title} automatically under the hood.`
        }
      ],
      productionUse: {
        summary: `Standard practice across modern tech products and online services.`,
        examples: [
          { companyOrCase: 'Consumer AI Apps', application: 'Provides smooth, fast, and sensible answers in everyday chatbots.' },
          { companyOrCase: 'Enterprise Software', application: 'Ensures business systems give consistent and trustworthy answers.' }
        ]
      },
      technicalSnippet: `// High-level conceptual summary:
// ${topic.title} -> Processes input -> Applies algorithmic rules -> Returns verified result`,
      keyTakeaways: [
        `Fundamental building block for understanding ${topic.categoryId}.`,
        `Designed to make AI systems faster, smarter, and easier to use.`,
        `Click 'Ask a Follow-Up' below to explore any specific question about this topic!`
      ]
    };
  } else {
    return {
      topicTitle: topic.title,
      mode: 'technical',
      summary: `Formal algorithmic and computational specification of ${topic.title} within deep learning pipelines.`,
      whatIsIt: `${topic.title} constitutes a critical mechanism within modern machine learning architectures, specifically categorized under ${topic.categoryId}.`,
      howItWorks: `Operates via structured tensor transformations, parameter updates, or mathematical projection operations designed to optimize convergence, inference efficiency, or representation fidelity.`,
      coreAnalogy: {
        title: `Decoupled Distributed Compute Pipeline`,
        story: `Analogous to an asynchronous memory bus in high-performance computing, where intermediate compute stages buffer outputs to prevent memory stalls and maximize arithmetic intensity.`,
        breakdown: [
          { realWorld: 'Memory buffer and DMA bus', aiConcept: 'Activation caching and state storage' },
          { realWorld: 'Hardware arithmetic logic units', aiConcept: 'Matrix multiplication and non-linear activation kernels' }
        ]
      },
      pitfalls: [
        {
          misconception: `Assuming asymptotic complexity dominates real-world performance.`,
          reality: `In modern GPU architectures, memory bandwidth and kernel fusion frequently dominate wall-clock execution over raw FLOPs.`
        }
      ],
      productionUse: {
        summary: `Integral to high-throughput inference engines and distributed training frameworks.`,
        examples: [
          { companyOrCase: 'Distributed Training Frameworks', application: `Integrated into Megatron-LM, PyTorch FSDP, and vLLM serving stacks.` }
        ]
      },
      technicalSnippet: `# Pseudocode implementation snippet for ${topic.title}
def execute_pipeline(inputs: torch.Tensor, config: dict) -> torch.Tensor:
    # 1. Dimension validation and projection
    x = project_embeddings(inputs)
    # 2. Main algorithmic transformation
    outputs = apply_transform(x, config)
    return outputs`,
      keyTakeaways: [
        `Addresses primary computational and architectural bottlenecks in ${topic.categoryId}.`,
        `Heavily optimized for modern tensor acceleration hardware (NVIDIA Hopper/Blackwell, Google TPU).`,
        `Use 'Regenerate' to fetch full dynamic technical formulation via Gemini 2.5 Flash.`
      ]
    };
  }
}
