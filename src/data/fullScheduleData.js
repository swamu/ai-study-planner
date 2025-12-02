// Flexible Week-Based Study Plan
// No fixed dates - start and pause whenever you want!
// Each month = 4 focused weeks

export const scheduleData = {
  months: [
    {
      id: 1,
      name: "Month 1",
      theme: "GenAI Foundations + HLD Basics + Easy DSA",
      weeks: [
        {
          id: 1, name: "Week 1", difficulty: "EASY",
          categories: [
            { name: "GenAI", goal: "LLM Basics", tasks: ["What are LLMs?", "Tokens & Tokenization", "Attention basics"], resources: "https://platform.openai.com/docs/guides" },
            { name: "HLD", goal: "System Design Intro", tasks: ["Client-Server model", "Latency vs Throughput"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Arrays & HashMap", tasks: ["Two Sum (LC 1)", "Valid Parentheses (LC 20)"], resources: "https://leetcode.com/problems/two-sum/" }
          ]
        },
        {
          id: 2, name: "Week 2", difficulty: "EASY",
          categories: [
            { name: "GenAI", goal: "Embeddings", tasks: ["Understanding embeddings", "Cosine similarity", "Basic embedding script"], resources: "https://platform.openai.com/docs/guides/embeddings" },
            { name: "HLD", goal: "Databases", tasks: ["SQL vs NoSQL", "Read/write patterns"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Sliding Window", tasks: ["Maximum Subarray (LC 53)", "Longest Substring (LC 3)"], resources: "https://leetcode.com/problems/maximum-subarray/" }
          ]
        },
        {
          id: 3, name: "Week 3", difficulty: "MODERATE",
          categories: [
            { name: "GenAI", goal: "Vector Databases", tasks: ["What is vector DB?", "FAISS vs Chroma", "Build simple index"], resources: "https://github.com/facebookresearch/faiss" },
            { name: "HLD", goal: "Caching", tasks: ["LRU/LFU", "Redis basics"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Two Pointers", tasks: ["Group Anagrams (LC 49)", "3Sum (LC 15)"], resources: "https://leetcode.com/problems/group-anagrams/" }
          ]
        },
        {
          id: 4, name: "Week 4", difficulty: "MODERATE",
          categories: [
            { name: "GenAI", goal: "API Integration", tasks: ["OpenAI API basics", "Build simple chat"], resources: "https://platform.openai.com/docs/api-reference" },
            { name: "HLD", goal: "Load Balancing", tasks: ["Round robin", "Consistent hashing"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Practice", tasks: ["Merge Intervals (LC 56)", "Insert Interval (LC 57)"], resources: "https://leetcode.com/problems/merge-intervals/" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Month 2",
      theme: "RAG Pipeline + System Design Patterns + DSA Medium",
      weeks: [
        {
          id: 1, name: "Week 1", difficulty: "MODERATE",
          categories: [
            { name: "GenAI", goal: "RAG Introduction", tasks: ["Chunking basics", "Indexing workflow", "Query→Answer flow"], resources: "https://www.pinecone.io/learn/retrieval-augmented-generation/" },
            { name: "HLD", goal: "URL Shortener", tasks: ["Hashing strategy", "DB schema", "Redirection flow"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Trees", tasks: ["Binary Tree Level Order (LC 102)", "Validate BST (LC 98)"], resources: "https://leetcode.com/problems/binary-tree-level-order-traversal/" }
          ]
        },
        {
          id: 2, name: "Week 2", difficulty: "MODERATE",
          categories: [
            { name: "GenAI", goal: "RAG Practice", tasks: ["Build simple RAG", "Test retrieval quality"], resources: "" },
            { name: "HLD", goal: "Networking", tasks: ["HTTP vs WebSockets", "DNS & Load Balancing"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Linked Lists", tasks: ["Reverse Linked List (LC 206)", "Cycle Detection (LC 141)"], resources: "https://leetcode.com/problems/reverse-linked-list/" }
          ]
        },
        {
          id: 3, name: "Week 3", difficulty: "MODERATE",
          categories: [
            { name: "GenAI", goal: "Chunking Strategies", tasks: ["Experiment with chunk sizes", "Overlap strategies"], resources: "https://www.pinecone.io/learn/chunking-strategies/" },
            { name: "HLD", goal: "Caching Patterns", tasks: ["Cache invalidation", "Redis clusters"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Stack/Queue", tasks: ["Min Stack (LC 155)", "Daily Temperatures (LC 739)"], resources: "https://leetcode.com/problems/min-stack/" }
          ]
        },
        {
          id: 4, name: "Week 4", difficulty: "HARD",
          categories: [
            { name: "GenAI", goal: "Hybrid Search", tasks: ["Sparse + dense retrieval", "Try reranker"], resources: "https://www.pinecone.io/learn/hybrid-search/" },
            { name: "HLD", goal: "Consistency", tasks: ["Strong vs eventual", "Quorums & replication"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Harder Problems", tasks: ["Trapping Rain Water (LC 42)", "Product of Array (LC 238)"], resources: "https://leetcode.com/problems/trapping-rain-water/" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Month 3",
      theme: "Advanced RAG + DB Internals + Dynamic Programming Intro",
      weeks: [
        {
          id: 1, name: "Week 1", difficulty: "MODERATE",
          categories: [
            { name: "GenAI", goal: "Advanced RAG", tasks: ["Query transformations", "Metadata filtering", "Context window management"], resources: "https://docs.llamaindex.ai/en/stable/" },
            { name: "HLD", goal: "Database Internals", tasks: ["B-trees & indexes", "ACID properties"], resources: "Your HLD Course" },
            { name: "DSA", goal: "DP Intro", tasks: ["Climbing Stairs (LC 70)", "House Robber (LC 198)"], resources: "https://leetcode.com/problems/climbing-stairs/" }
          ]
        },
        {
          id: 2, name: "Week 2", difficulty: "HARD",
          categories: [
            { name: "GenAI", goal: "Eval & Metrics", tasks: ["Precision/recall for RAG", "Context relevance", "Answer quality"], resources: "https://docs.ragas.io/" },
            { name: "HLD", goal: "Sharding", tasks: ["Horizontal vs vertical", "Consistent hashing deep dive"], resources: "Your HLD Course" },
            { name: "DSA", goal: "DP Medium", tasks: ["Coin Change (LC 322)", "Longest Common Subsequence (LC 1143)"], resources: "https://leetcode.com/problems/coin-change/" }
          ]
        },
        {
          id: 3, name: "Week 3", difficulty: "MODERATE",
          categories: [
            { name: "GenAI", goal: "Prompt Engineering", tasks: ["Few-shot learning", "Chain-of-thought", "RAG-specific prompts"], resources: "https://www.promptingguide.ai/" },
            { name: "HLD", goal: "Case Study: Twitter", tasks: ["Tweet storage", "Timeline generation", "Fan-out"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Graphs Intro", tasks: ["Number of Islands (LC 200)", "Clone Graph (LC 133)"], resources: "https://leetcode.com/problems/number-of-islands/" }
          ]
        },
        {
          id: 4, name: "Week 4", difficulty: "MODERATE",
          categories: [
            { name: "GenAI", goal: "Production RAG", tasks: ["Error handling", "Fallbacks", "Logging"], resources: "" },
            { name: "HLD", goal: "Message Queues", tasks: ["Kafka basics", "Pub-sub patterns"], resources: "Your HLD Course" },
            { name: "DSA", goal: "BFS/DFS", tasks: ["Course Schedule (LC 207)", "Word Ladder (LC 127)"], resources: "https://leetcode.com/problems/course-schedule/" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Month 4",
      theme: "Agentic AI Foundations + HLD Case Studies + DP Mastery",
      weeks: [
        {
          id: 1, name: "Week 1", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "What are Agents?", tasks: ["Agent architecture", "ReAct pattern", "Tool usage"], resources: "https://python.langchain.com/docs/modules/agents/" },
            { name: "HLD", goal: "Design: Instagram", tasks: ["Image storage", "Feed generation", "Followers graph"], resources: "Your HLD Course" },
            { name: "DSA", goal: "DP Practice", tasks: ["Unique Paths (LC 62)", "Edit Distance (LC 72)"], resources: "https://leetcode.com/problems/unique-paths/" }
          ]
        },
        {
          id: 2, name: "Week 2", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Tool Calling", tasks: ["Function calling API", "Build calculator agent"], resources: "https://platform.openai.com/docs/guides/function-calling" },
            { name: "HLD", goal: "Design: Uber", tasks: ["Location tracking", "Driver matching", "ETA calculation"], resources: "Your HLD Course" },
            { name: "DSA", goal: "DP 2D", tasks: ["Min Path Sum (LC 64)", "Longest Palindrome Substring (LC 5)"], resources: "https://leetcode.com/problems/minimum-path-sum/" }
          ]
        },
        {
          id: 3, name: "Week 3", difficulty: "HARD",
          categories: [
            { name: "Agentic AI", goal: "Memory Systems", tasks: ["Short-term memory", "Long-term memory", "Conversation state"], resources: "https://python.langchain.com/docs/modules/memory/" },
            { name: "HLD", goal: "Design: Netflix", tasks: ["Video streaming", "CDN", "Recommendations"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Hard DP", tasks: ["Best Time to Buy Stock IV (LC 188)", "Word Break II (LC 140)"], resources: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/" }
          ]
        },
        {
          id: 4, name: "Week 4", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Build Simple Agent", tasks: ["Research agent", "Test with real queries"], resources: "https://langchain-ai.github.io/langgraph/" },
            { name: "HLD", goal: "Design: Gmail", tasks: ["Email storage", "Search", "Spam detection"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Review", tasks: ["Revisit 5 hardest DP problems"], resources: "" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Month 5",
      theme: "Agent Workflows + Advanced System Design + Graph Algorithms",
      weeks: [
        {
          id: 1, name: "Week 1", difficulty: "HARD",
          categories: [
            { name: "Agentic AI", goal: "Multi-step Workflows", tasks: ["Planning agents", "Task decomposition"], resources: "https://langchain-ai.github.io/langgraph/how-tos/" },
            { name: "HLD", goal: "Design: WhatsApp", tasks: ["Message delivery", "End-to-end encryption", "Group chats"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Advanced Graphs", tasks: ["Network Delay Time (LC 743)", "Cheapest Flights (LC 787)"], resources: "https://leetcode.com/problems/network-delay-time/" }
          ]
        },
        {
          id: 2, name: "Week 2", difficulty: "HARD",
          categories: [
            { name: "Agentic AI", goal: "Error Handling", tasks: ["Retries", "Fallback strategies", "Validation"], resources: "" },
            { name: "HLD", goal: "Design: YouTube", tasks: ["Video upload", "Processing", "Streaming"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Shortest Path", tasks: ["Dijkstra implementation", "Bellman-Ford (LC 787)"], resources: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" }
          ]
        },
        {
          id: 3, name: "Week 3", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Agent Tools", tasks: ["Web search integration", "Database query tool", "API calling"], resources: "https://python.langchain.com/docs/modules/tools/" },
            { name: "HLD", goal: "Design: Dropbox", tasks: ["File sync", "Chunking", "Conflict resolution"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Union Find", tasks: ["Number of Connected Components (LC 323)", "Redundant Connection (LC 684)"], resources: "https://leetcode.com/problems/redundant-connection/" }
          ]
        },
        {
          id: 4, name: "Week 4", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Agent Practice", tasks: ["Build data analysis agent", "Test & refine"], resources: "" },
            { name: "HLD", goal: "Design: Zoom", tasks: ["WebRTC", "Video processing", "Screen sharing"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Topological Sort", tasks: ["Course Schedule II (LC 210)", "Alien Dictionary (LC 269)"], resources: "https://leetcode.com/problems/course-schedule-ii/" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "Month 6",
      theme: "Multi-Agent Systems + Distributed Systems + Advanced DSA",
      weeks: [
        {
          id: 1, name: "Week 1", difficulty: "HARD",
          categories: [
            { name: "Agentic AI", goal: "Multi-Agent Basics", tasks: ["Agent communication", "Coordination patterns"], resources: "https://microsoft.github.io/autogen/" },
            { name: "HLD", goal: "Distributed Systems", tasks: ["CAP theorem", "Consensus algorithms"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Advanced Trees", tasks: ["Serialize Binary Tree (LC 297)", "Binary Tree Cameras (LC 968)"], resources: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" }
          ]
        },
        {
          id: 2, name: "Week 2", difficulty: "HARD",
          categories: [
            { name: "Agentic AI", goal: "Delegation", tasks: ["Manager-worker pattern", "Task routing"], resources: "" },
            { name: "HLD", goal: "Kafka Deep Dive", tasks: ["Partitions", "Replication", "Consumer groups"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Tries", tasks: ["Implement Trie (LC 208)", "Word Search II (LC 212)"], resources: "https://leetcode.com/problems/implement-trie-prefix-tree/" }
          ]
        },
        {
          id: 3, name: "Week 3", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Evaluation", tasks: ["Agent benchmarking", "Success metrics"], resources: "https://github.com/openai/evals" },
            { name: "HLD", goal: "Design: Slack", tasks: ["Real-time messaging", "Channels", "Presence"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Heaps", tasks: ["Kth Largest Element (LC 215)", "Merge K Lists (LC 23)"], resources: "https://leetcode.com/problems/kth-largest-element-in-an-array/" }
          ]
        },
        {
          id: 4, name: "Week 4", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Build Multi-Agent", tasks: ["Research + writing agents", "Coordinator"], resources: "" },
            { name: "HLD", goal: "Rate Limiting", tasks: ["Token bucket", "Leaky bucket", "Sliding window"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Binary Search Advanced", tasks: ["Find Peak Element (LC 162)", "Search in Rotated Array (LC 33)"], resources: "https://leetcode.com/problems/find-peak-element/" }
          ]
        }
      ]
    },
    {
      id: 7,
      name: "Month 7",
      theme: "Production Agents + Scaling Systems + Mixed DSA Practice",
      weeks: [
        {
          id: 1, name: "Week 1", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Production Patterns", tasks: ["Monitoring", "Logging", "Cost tracking"], resources: "" },
            { name: "HLD", goal: "Microservices", tasks: ["Service discovery", "API Gateway", "Circuit breaker"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Mixed Practice", tasks: ["3 random medium problems"], resources: "https://leetcode.com/problemset/" }
          ]
        },
        {
          id: 2, name: "Week 2", difficulty: "HARD",
          categories: [
            { name: "Agentic AI", goal: "Safety & Guardrails", tasks: ["Input validation", "Output filtering", "Hallucination detection"], resources: "https://www.guardrailsai.com/" },
            { name: "HLD", goal: "Design: Spotify", tasks: ["Music storage", "Streaming", "Recommendations"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Hard Mixed", tasks: ["2 hard problems"], resources: "https://leetcode.com/problemset/" }
          ]
        },
        {
          id: 3, name: "Week 3", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Agent Optimization", tasks: ["Reduce API calls", "Caching strategies", "Parallel execution"], resources: "" },
            { name: "HLD", goal: "Design: Airbnb", tasks: ["Search & filters", "Booking system", "Payments"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Pattern Review", tasks: ["Revisit weak patterns"], resources: "" }
          ]
        },
        {
          id: 4, name: "Week 4", difficulty: "MODERATE",
          categories: [
            { name: "Agentic AI", goal: "Advanced Project", tasks: ["Build complex multi-agent system"], resources: "" },
            { name: "HLD", goal: "Design: TikTok", tasks: ["Video upload", "Feed algorithm", "Scaling"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Weak Spots", tasks: ["Focus on struggled topics"], resources: "" }
          ]
        }
      ]
    },
    {
      id: 8,
      name: "Month 8",
      theme: "Integration + Real Projects + Advanced Patterns",
      weeks: [
        {
          id: 1, name: "Week 1", difficulty: "MODERATE",
          categories: [
            { name: "Project", goal: "Project Planning", tasks: ["Design RAG + Agent system", "Architecture diagram"], resources: "" },
            { name: "HLD", goal: "Design: LinkedIn", tasks: ["Connections graph", "Feed", "Job search"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Project-Related", tasks: ["Data structures for project"], resources: "" }
          ]
        },
        {
          id: 2, name: "Week 2", difficulty: "HARD",
          categories: [
            { name: "Project", goal: "Core Implementation", tasks: ["Build RAG pipeline", "Integrate agents"], resources: "" },
            { name: "HLD", goal: "Design: Pinterest", tasks: ["Image storage", "Board system", "Recommendations"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Algorithm Design", tasks: ["Design efficient algos for project"], resources: "" }
          ]
        },
        {
          id: 3, name: "Week 3", difficulty: "MODERATE",
          categories: [
            { name: "Project", goal: "Features & UI", tasks: ["Add features", "Build interface"], resources: "" },
            { name: "HLD", goal: "Design: Reddit", tasks: ["Voting system", "Comments", "Subreddits"], resources: "Your HLD Course" },
            { name: "DSA", goal: "Optimization", tasks: ["Optimize project performance"], resources: "" }
          ]
        },
        {
          id: 4, name: "Week 4", difficulty: "EASY",
          categories: [
            { name: "Project", goal: "Testing & Docs", tasks: ["Write tests", "Documentation", "README"], resources: "" },
            { name: "HLD", goal: "Review", tasks: ["Revisit 5 important designs"], resources: "" },
            { name: "DSA", goal: "Light Practice", tasks: ["1-2 easy problems daily"], resources: "" }
          ]
        }
      ]
    }
  ],
  
  // Separate section for final prep, mocks, and portfolio
  finalPrep: {
    name: "Final Prep & Portfolio",
    description: "Interview preparation, portfolio projects, and job applications - do these when ready!",
    sections: [
      {
        id: 1,
        name: "Portfolio Projects",
        tasks: [
          "Build 3 production-ready projects",
          "RAG chat application with UI",
          "Multi-agent workflow system",
          "End-to-end GenAI application"
        ],
        estimatedWeeks: "4-6 weeks"
      },
      {
        id: 2,
        name: "Mock Interviews",
        tasks: [
          "5+ DSA mock interviews",
          "3+ System Design mocks",
          "2+ Agentic AI discussions",
          "Behavioral interview prep"
        ],
        estimatedWeeks: "2-3 weeks"
      },
      {
        id: 3,
        name: "Resume & Portfolio",
        tasks: [
          "Update resume with projects",
          "Polish GitHub repositories",
          "Create demo videos",
          "Write technical blog posts",
          "LinkedIn optimization"
        ],
        estimatedWeeks: "1-2 weeks"
      },
      {
        id: 4,
        name: "Applications",
        tasks: [
          "Research target companies",
          "Tailor resumes per company",
          "Write cover letters",
          "Submit applications",
          "Network with engineers"
        ],
        estimatedWeeks: "Ongoing"
      }
    ]
  }
};
