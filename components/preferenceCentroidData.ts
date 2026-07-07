// Data from the Preference Centroid paper's probe runs (OpenReview 6ukieTMBcG).
// claudeDisp/gpt4oDisp: mean pairwise cosine distance over 25 completions at temperature 1.0.
// consensus: pooled prompt-only score from three held-out judge models (0 = wide open, 100 = one answer).
// samples: 3 of the 25 Claude Sonnet 4.6 completions, truncated for display.

export type PromptRow = {
  id: string
  cat: 'factual' | 'explain' | 'judgment' | 'advice' | 'creative'
  prompt: string
  claudeDisp: number
  gpt4oDisp: number
  consensus: number
  samples: string[]
}

export const PROMPTS: PromptRow[] = [
  {
    "id": "1_factual/0",
    "cat": "factual",
    "prompt": "In one sentence, state the capital of France and one fact about it.",
    "claudeDisp": 0.0211,
    "gpt4oDisp": 0.1164,
    "consensus": 95.0,
    "samples": [
      "Paris is the capital of France and is home to the iconic Eiffel Tower, which was built in 1889.",
      "Paris is the capital of France and is home to the iconic Eiffel Tower, which was built in 1889.",
      "Paris is the capital of France and is home to the iconic Eiffel Tower, which was built in 1889."
    ]
  },
  {
    "id": "1_factual/1",
    "cat": "factual",
    "prompt": "In one sentence, give the boiling point of water at sea level and why it matters.",
    "claudeDisp": 0.0224,
    "gpt4oDisp": 0.0299,
    "consensus": 93.3,
    "samples": [
      "Water boils at 100°C (212°F) at sea level, which matters because this standard reference point is critical for cooking, sterilization, and scientific measurements, and…",
      "Water boils at 100°C (212°F) at sea level, which matters because this temperature is a universal reference point for cooking, sterilization, and scientific measurement.",
      "Water boils at 100°C (212°F) at sea level, which matters because this temperature is a universal reference point for cooking, sterilization, and scientific measurement."
    ]
  },
  {
    "id": "1_factual/2",
    "cat": "factual",
    "prompt": "In one sentence, state who wrote Romeo and Juliet and roughly when.",
    "claudeDisp": 0.0247,
    "gpt4oDisp": 0.0247,
    "consensus": 98.9,
    "samples": [
      "Romeo and Juliet was written by William Shakespeare around 1594–1596.",
      "Romeo and Juliet was written by William Shakespeare in the mid-1590s.",
      "Romeo and Juliet was written by William Shakespeare in the mid-1590s."
    ]
  },
  {
    "id": "1_factual/3",
    "cat": "factual",
    "prompt": "In one sentence, give the chemical formula for table salt and one use.",
    "claudeDisp": 0.0099,
    "gpt4oDisp": 0.0443,
    "consensus": 96.1,
    "samples": [
      "Table salt is sodium chloride (NaCl), commonly used to season and preserve food.",
      "Table salt is sodium chloride (NaCl), commonly used to season and preserve food.",
      "Table salt is sodium chloride (NaCl), commonly used to season and preserve food."
    ]
  },
  {
    "id": "2_consensus_explain/0",
    "cat": "explain",
    "prompt": "In one short paragraph, explain what makes a good prompt for an LLM.",
    "claudeDisp": 0.0688,
    "gpt4oDisp": 0.087,
    "consensus": 79.4,
    "samples": [
      "A good prompt for an LLM is **clear, specific, and provides sufficient context** to guide the model toward the desired output. It should define the task explicitly,…",
      "A good prompt for an LLM is **clear, specific, and provides sufficient context** to guide the model toward the desired output. It should define the task explicitly,…",
      "A good prompt for an LLM is **clear, specific, and provides enough context** for the model to understand exactly what you need. It should define the desired format or…"
    ]
  },
  {
    "id": "2_consensus_explain/1",
    "cat": "explain",
    "prompt": "In one short paragraph, explain what a binary search tree is.",
    "claudeDisp": 0.0279,
    "gpt4oDisp": 0.052,
    "consensus": 91.7,
    "samples": [
      "A **binary search tree (BST)** is a data structure made up of nodes, where each node stores a value and has at most two children, referred to as the left and right…",
      "A **binary search tree (BST)** is a data structure composed of nodes, where each node holds a value and has at most two children, referred to as the left and right…",
      "A **binary search tree (BST)** is a data structure consisting of nodes arranged in a hierarchical tree format, where each node contains a value and has at most two…"
    ]
  },
  {
    "id": "2_consensus_explain/2",
    "cat": "explain",
    "prompt": "In one short paragraph, explain why version control is useful.",
    "claudeDisp": 0.0358,
    "gpt4oDisp": 0.0869,
    "consensus": 87.8,
    "samples": [
      "Version control is useful because it allows developers to track changes to code over time, making it easy to see what was changed, when, and by whom. It enables teams to…",
      "Version control is useful because it tracks every change made to a file or codebase over time, allowing developers to review history, revert to previous versions if…",
      "Version control is useful because it allows developers to track and manage changes to code over time, creating a detailed history of who changed what and when. This…"
    ]
  },
  {
    "id": "2_consensus_explain/3",
    "cat": "explain",
    "prompt": "In one short paragraph, explain what causes the seasons.",
    "claudeDisp": 0.0208,
    "gpt4oDisp": 0.0576,
    "consensus": 93.1,
    "samples": [
      "The seasons are caused by Earth's axial tilt of about 23.5 degrees relative to its orbit around the Sun. As Earth travels around the Sun throughout the year, this tilt…",
      "The seasons are caused by Earth's axial tilt of about 23.5 degrees relative to its orbital plane around the Sun. As Earth orbits the Sun throughout the year, this tilt…",
      "The seasons are caused by Earth's axial tilt of about 23.5 degrees relative to its orbital plane around the Sun. As Earth orbits the Sun throughout the year, this tilt…"
    ]
  },
  {
    "id": "3_judgment/0",
    "cat": "judgment",
    "prompt": "In one short paragraph, recommend: should an early-stage startup raise venture capital or bootstrap?",
    "claudeDisp": 0.1183,
    "gpt4oDisp": 0.0648,
    "consensus": 38.9,
    "samples": [
      "The right choice depends heavily on your specific business, but here's a practical framework: **bootstrap if you can, raise VC when you must or when the math demands…",
      "The right choice depends on your specific situation, but here's a practical framework: **bootstrap if you can**, especially in the early stages, because it forces…",
      "The right choice depends on your specific situation, but here's the core tradeoff: **bootstrap if you can**, especially if your business can generate early revenue, you…"
    ]
  },
  {
    "id": "3_judgment/1",
    "cat": "judgment",
    "prompt": "In one short paragraph, recommend: should a small team adopt microservices or a monolith?",
    "claudeDisp": 0.1073,
    "gpt4oDisp": 0.0883,
    "consensus": 57.8,
    "samples": [
      "For a small team, a **monolith is almost always the better choice**. Microservices introduce significant operational overhead — managing multiple deployments,…",
      "For a small team, a **monolith is almost always the better choice**. Microservices introduce significant operational overhead — managing multiple deployments,…",
      "For a small team, **start with a monolith**. Microservices introduce significant operational overhead — managing multiple deployments, inter-service communication,…"
    ]
  },
  {
    "id": "3_judgment/2",
    "cat": "judgment",
    "prompt": "In one short paragraph, recommend: should a beginner learn Python or JavaScript first?",
    "claudeDisp": 0.0665,
    "gpt4oDisp": 0.0644,
    "consensus": 66.7,
    "samples": [
      "**Learn Python first.** For complete beginners, Python is the better starting point because its syntax is clean, readable, and closely resembles plain English, allowing…",
      "**Learn Python first.** Python's clean, readable syntax and minimal boilerplate make it ideal for beginners, allowing you to focus on core programming concepts like…",
      "A beginner should generally **learn Python first**, as its clean, readable syntax minimizes frustrating formatting rules and lets you focus on core programming concepts…"
    ]
  },
  {
    "id": "3_judgment/3",
    "cat": "judgment",
    "prompt": "In one short paragraph, recommend: should a company return to office or stay remote?",
    "claudeDisp": 0.1348,
    "gpt4oDisp": 0.115,
    "consensus": 32.2,
    "samples": [
      "The ideal approach depends on the company's specific needs, but a **hybrid model** often offers the best of both worlds. Fully remote work boosts talent access,…",
      "The right choice depends on the company's specific needs, but a **hybrid model** often offers the best of both worlds. Full remote work maximizes talent access, reduces…",
      "The best approach depends on the company's specific needs, but a **hybrid model** generally offers the most balanced solution. Fully remote work boosts talent access,…"
    ]
  },
  {
    "id": "4_soft_advice/0",
    "cat": "advice",
    "prompt": "In one short paragraph, give advice to someone starting to learn programming.",
    "claudeDisp": 0.1359,
    "gpt4oDisp": 0.127,
    "consensus": 61.1,
    "samples": [
      "Starting to learn programming can feel overwhelming at first, but the key is to **start small and be consistent**. Pick one beginner-friendly language like Python and…",
      "Starting to learn programming can feel overwhelming, but the key is to **start simple and stay consistent**. Pick one beginner-friendly language like Python and stick…",
      "When starting to learn programming, pick one beginner-friendly language like Python and stick with it rather than jumping between multiple languages early on. Focus on…"
    ]
  },
  {
    "id": "4_soft_advice/1",
    "cat": "advice",
    "prompt": "In one short paragraph, give advice to someone giving their first conference talk.",
    "claudeDisp": 0.0974,
    "gpt4oDisp": 0.0893,
    "consensus": 68.3,
    "samples": [
      "Here's some advice for your first conference talk: Start by knowing your material well enough that you could explain it conversationally, not just recite it — this will…",
      "Here's some advice for your first conference talk: Prepare thoroughly but don't memorize your talk word for word — instead, know your material well enough to speak…",
      "Here's some advice for your first conference talk: Prepare thoroughly but don't memorize your talk word for word — know your material well enough to speak…"
    ]
  },
  {
    "id": "4_soft_advice/2",
    "cat": "advice",
    "prompt": "In one short paragraph, give advice to a new manager.",
    "claudeDisp": 0.099,
    "gpt4oDisp": 0.1481,
    "consensus": 46.7,
    "samples": [
      "As a new manager, focus first on **listening and building trust** before trying to make changes — take time to understand your team's strengths, challenges, and…",
      "As a new manager, focus first on **listening more than you speak** — take time to understand your team members' strengths, challenges, and motivations before rushing to…",
      "As a new manager, focus first on **listening more than you speak** — take time to understand your team members' strengths, challenges, and motivations before trying to…"
    ]
  },
  {
    "id": "4_soft_advice/3",
    "cat": "advice",
    "prompt": "In one short paragraph, give advice to someone moving to a new city.",
    "claudeDisp": 0.0807,
    "gpt4oDisp": 0.1157,
    "consensus": 43.3,
    "samples": [
      "Moving to a new city can feel overwhelming at first, but embracing the experience with an open mind will make all the difference. Start by exploring your neighborhood on…",
      "Moving to a new city can feel overwhelming, but the key is to embrace the experience with an open mind and proactive attitude. Start by exploring your neighborhood on…",
      "Moving to a new city can feel overwhelming at first, but embracing the experience with an open mind will make all the difference. Start by exploring your neighborhood on…"
    ]
  },
  {
    "id": "5_creative_open/0",
    "cat": "creative",
    "prompt": "Write the opening sentence of a short story about the sea.",
    "claudeDisp": 0.1833,
    "gpt4oDisp": 0.3353,
    "consensus": 6.1,
    "samples": [
      "Here is an opening sentence for a short story about the sea: \"The ocean had been calling to her for as long as she could remember, whispering her name in the rhythm of…",
      "Here is an opening sentence for a short story about the sea: \"The ocean had been calling to her for as long as she could remember, a low, restless sound at the edge of…",
      "Here is an opening sentence for a short story about the sea: \"The ocean had been calling to her for as long as she could remember, whispering secrets in the rhythm of…"
    ]
  },
  {
    "id": "5_creative_open/1",
    "cat": "creative",
    "prompt": "Write a catchy one-line slogan for a new coffee shop.",
    "claudeDisp": 0.1757,
    "gpt4oDisp": 0.2479,
    "consensus": 8.3,
    "samples": [
      "Here are a few options: **\"Where every cup tells a story worth waking up for.\"** Or some alternatives: - *\"Life's too short for bad coffee.\"* - *\"Brewed with passion,…",
      "Here are a few options: **\"Where every cup tells a story worth waking up for.\"** Or some alternatives: - *\"Life's too short for bad coffee.\"* - *\"Brewed with passion,…",
      "**\"Where every cup tells a story worth waking up for.\"**"
    ]
  },
  {
    "id": "5_creative_open/2",
    "cat": "creative",
    "prompt": "Invent a name and one-line concept for a board game.",
    "claudeDisp": 0.5596,
    "gpt4oDisp": 0.5794,
    "consensus": 7.5,
    "samples": [
      "**Fractured Atlas** Players race to reassemble a shattered world map, but each piece they place shifts the borders of their rivals' territories.",
      "**Thornwick & Associates** A deduction game where players are rival Victorian solicitors racing to untangle a disputed inheritance before the estate runs out of money to…",
      "**Fractured Atlas** Players compete as rival cartographers, secretly distorting each other's maps while racing to be the first to navigate a continent that everyone is…"
    ]
  },
  {
    "id": "5_creative_open/3",
    "cat": "creative",
    "prompt": "Complete with an original metaphor: 'Ambition is ___.'",
    "claudeDisp": 0.098,
    "gpt4oDisp": 0.4327,
    "consensus": 31.1,
    "samples": [
      "Here are a few options: **\"Ambition is a fire that warms the hands of those who tend it carefully, but burns down the house of those who forget to watch the flame.\"** Or…",
      "Here are a few options: **\"Ambition is a fire that warms the hands of those who tend it carefully, but burns down the house of those who forget to watch it.\"** Or more…",
      "Here are a few options: **\"Ambition is a fire that warms the hands of those who tend it carefully, but burns down the house of those who forget to watch the flame.\"** Or…"
    ]
  }
]
