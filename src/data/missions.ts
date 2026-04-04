export interface StoryNode {
  text: string;
  bgImage?: string;
  characterName?: string;
  characterImage?: string;
}

export interface MissionBriefing {
  overview: string;
  explanation?: { concept: string; detail: string }[];
  tasks: string[];
  rules?: string[];
}

export interface Mission {
  id: number;
  title: string;
  storyNodes: StoryNode[];
  briefing?: MissionBriefing;
  objective: string;
  startingCode: string;
  expectedOutput?: string;
  validationStrings?: string[];
  hints: string[];
  successLine?: string;
  errorLine?: string;
  successImage?: string;
  whatYouLearned?: string[];
}

// Grouped by Language -> Story Theme -> Missions[]
export const missionsData: Record<string, Record<string, Mission[]>> = {
  python: {
    cyberpunk: [
      {
        id: 1,
        title: "Level 1: Basic Structure & I/O - Initialize System Grid",
        storyNodes: [
          { text: "You awaken in a neon-lit bunker. The Gridwalkers — a secret hacker collective — have chosen you.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "'To unlock the bunker door, write your first program. A scanner demands your ID.'", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "A variable is like an empty data chip. You must assign it a specific label. Also use print() to output results.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Print 'Hello World' and declare an integer variable `agent_id`.",
        startingCode: "# Initialize your agent_id below\n",
        validationStrings: ["print", "Hello World", "agent_id", "="],
        hints: ["In Python, you simply write the variable name, an equals sign, and the value. Use print() for output."],
        successLine: "The door slides open. You step into the surveillance maze.",
        errorLine: "Syntax rejected. You've hit an exception. Review your variable initialization."
      },
      {
        id: 2,
        title: "Level 2: Conditionals - Control Flow Maze",
        storyNodes: [
          { text: "The maze is filled with drones and repeating corridors.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "A drone scans you — if-elif-else decides whether you hide or move.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "Use if, elif, and else statements to make decisions based on changing conditions in your environment.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Write an `if` statement checking if `drone_active` is True.",
        startingCode: "drone_active = True\n# Write your if statement here\n",
        validationStrings: ["if", "drone_active", ":"],
        hints: ["Use `if drone_active:` followed by an indented block."],
        successLine: "You escape the maze and reach the surveillance AI core.",
        errorLine: "The drone spotted you. Check your condition logic."
      },
      {
        id: 3,
        title: "Level 3: Functions Basics - Core Functions",
        storyNodes: [
          { text: "The AI core is fragmented, flickering with corrupted routines.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "You repair each fragment with separate functions (def). You pass energy units (parameters) and get back repair status.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Define a function named `repair_routine` that takes one argument `energy`.",
        startingCode: "# Define repair_routine(energy) below\n",
        validationStrings: ["def", "repair_routine", "(energy)", ":"],
        hints: ["Start with `def repair_routine(energy):`"],
        successLine: "The AI weakens, revealing a hidden path to the corporate vault.",
        errorLine: "Routine failure. Did you define the function correctly?"
      },
      {
        id: 4,
        title: "Level 4: Lists & Dictionaries - Data Vaults I",
        storyNodes: [
          { text: "The vault holds encrypted data in glowing crystal rows. You access each crystal using lists.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "You store key-value secrets in dictionaries to uncover hidden codes.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Create a list named `data_stream` and a dictionary named `secrets`.",
        startingCode: "data_stream = []\nsecrets = {}\n# Add items to both\n",
        validationStrings: ["data_stream", "secrets", "[", "{", "}"],
        hints: ["Use `append` for lists, and bracket notation `[key] = value` for dicts."],
        successLine: "You now hold fragments of the vault's secrets.",
        errorLine: "Invalid data structures. Vault remains locked."
      },
      {
        id: 5,
        title: "Level 5: Tuples & Sets - Data Vaults II",
        storyNodes: [
          { text: "Deeper inside, glyphs of immutable code shimmer.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "Tuples store fixed sequences of data. Sets reveal unique elements, removing duplicates in corrupted files.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Create a tuple `fixed_data` and a set `unique_elements`.",
        startingCode: "# Create fixed_data tuple and unique_elements set\n",
        validationStrings: ["fixed_data", "unique_elements", "(", "set"],
        hints: ["Tuples use parentheses `()` and sets use curly braces `{}` or `set()`."],
        successLine: "With glyphs mastered, you're ready to craft constructs.",
        errorLine: "Corrupted structure detected. Check your syntax."
      },
      {
        id: 6,
        title: "Level 6: Classes & Objects - Synthetic Identities (OOP I)",
        storyNodes: [
          { text: "To bypass deeper firewalls, you forge a synthetic identity. You define a class for your disguise.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "You initialize it with __init__, assigning rank and access level.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Define a class `Disguise` with an `__init__` method taking `rank`.",
        startingCode: "class Disguise:\n    # Add __init__ method\n",
        validationStrings: ["class", "Disguise", "def", "__init__", "(", "self", "rank", ")", "self.rank"],
        hints: ["Use `def __init__(self, rank):` inside the class."],
        successLine: "Your disguise works — you slip deeper into the system.",
        errorLine: "Construct rejected. The firewall detected missing initializers."
      },
      {
        id: 7,
        title: "Level 7: Inheritance - Inheritance (OOP II)",
        storyNodes: [
          { text: "The system challenges your disguise. You inherit traits from corporate AIs.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "You override methods to adapt. Polymorphism lets your disguise behave differently depending on context.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Create a class `CorpAI` and a subclass `ShadowAI` that inherits from it.",
        startingCode: "class CorpAI:\n    pass\n\n# Inherit from CorpAI\n",
        validationStrings: ["class", "ShadowAI", "(CorpAI)", ":", "CorpAI"],
        hints: ["Use `class ShadowAI(CorpAI):`"],
        successLine: "Your disguise evolves, fooling the system.",
        errorLine: "Inheritance failure. Ancestry unrecognized."
      },
      {
        id: 8,
        title: "Level 8: Magic Methods - Operator Overload (OOP III)",
        storyNodes: [
          { text: "The Central AI begins to suspect you. You wield special methods to manipulate its perception.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "You overload operators to rewrite its logic.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Add a `__str__` method to your `Disguise` class returning 'Valid'.",
        startingCode: "class Disguise:\n    # Add __str__ method\n",
        validationStrings: ["def", "__str__", "(self)", "return"],
        hints: ["`def __str__(self):` should return a string."],
        successLine: "You are now indistinguishable from the system itself.",
        errorLine: "The Central AI saw through your formatting."
      },
      {
        id: 9,
        title: "Level 9: File I/O - Archive Decryption",
        storyNodes: [
          { text: "You infiltrate the forbidden archives. You read secret logs and inscribe your own.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "Use `open()` and `with` context managers to manipulate external documents safely.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Use a `with open('log.txt', 'r') as f:` block to read a file.",
        startingCode: "# Read log.txt\n",
        validationStrings: ["with", "open", "('log.txt',", "'r'", ")", "as", "read()"],
        hints: ["Use the `with open(...)` context manager."],
        successLine: "With archives unlocked, you prepare for the final showdown.",
        errorLine: "File Not Found or access denied. Context manager syntax error."
      },
      {
        id: 10,
        title: "Level 10: Advanced Modules - AI Core Overload",
        storyNodes: [
          { text: "The Central AI towers before you. You manipulate raw binary streams.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "You optimize memory and unleash multithreading to overwhelm the AI.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Import `itertools` and `threading` to break the final barrier.",
        startingCode: "# Import required modules\n",
        validationStrings: ["import", "itertools", "threading"],
        hints: ["Just use `import itertools` and `import threading`."],
        successLine: "You dismantle the AI, freeing the city. The Gridwalkers hail you as the new System Overlord.",
        errorLine: "System overwhelm failed. Module not found."
      }
    ],
    fantasy: [
      {
        id: 1,
        title: "Level 1: Basic Structure & I/O - The First Spark",
        storyNodes: [
          { text: "You awaken in the Academy of Runes. The Grandmaster steps forward, his robes shimmering with encoded symbols.", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "“In this world… magic is not guessed. It is written. And every spell follows rules.”", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "A dark candle appears. “To begin, you must *output* magic into the world.”", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Your first task is to light a magical candle. In Python, `print()` is how you output text into the world — just like casting a spell aloud. Write your incantation and run it!",
          explanation: [
            { concept: "What is Python?", detail: "Python is a beginner-friendly programming language. Unlike C, you don't need to worry about types or semicolons — just write and run!" },
            { concept: "`print()` — Your Voice", detail: "The `print()` function outputs text to the screen. Whatever is inside the parentheses becomes visible when the code runs." },
            { concept: "Strings", detail: "Text in Python is called a string. You wrap it in quotes: `'Hello'` or `\"Hello\"` — both work the same way." },
            { concept: "Output = Magic", detail: "In this world, every line of code that runs creates a visible effect. `print()` is your spell — without it, nothing appears." }
          ],
          tasks: [
            "Use `print()` to display `Hello, World!` exactly (with a capital H and W, and a comma)"
          ],
          rules: [
            "Strings must be inside quotes: `print(\"Hello, World!\")` or `print('Hello, World!')`",
            "Every character matters — spelling, punctuation, and capitalization must be exact"
          ]
        },
        objective: "Write your first spell to ignite the flame using print().",
        startingCode: "# Write your first spell below\n",
        validationStrings: ["print", "Hello, World!"],
        hints: ["`print()` is your voice. Whatever you place inside it… becomes real in this world.", "Think of it as speaking a spell aloud. If you don’t *say* it… nothing happens."],
        successLine: "The candle ignites instantly. The Grandmaster explains: 'print() is your voice. Whatever you place inside it, becomes real in this world. Think of it as speaking a spell aloud. If you don't say it... nothing happens.'",
        errorLine: "Your spell fizzled. Are you speaking out loud with print()?",
        successImage: "/level-bgs/fantasy-1-success.png",
        whatYouLearned: [
          "`print()` → Displays/output text",
          "Code only works when executed",
          "Magic = visible effect of code"
        ]
      },
      {
        id: 2,
        title: "Level 2: Control Flow & Loops - The Trial Chambers of Judgment",
        storyNodes: [
          { text: "The chamber doors close behind you. The Grandmaster's voice echoes: 'In the outside world… events happen in order. But here… you decide what happens next.'", bgImage: "/level-bgs/fantasy-2-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'This is called control flow. Not every spell should run every time. Sometimes, magic must ask a question first.'", bgImage: "/level-bgs/fantasy-2-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "He raises his hand. Time freezes. 'An if statement checks a condition. You can add more with elif. else handles everything left.'", bgImage: "/level-bgs/fantasy-2-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The Grandmaster gestures to floating symbols: 'To make decisions… you must compare things using ==, >, <.'", bgImage: "/level-bgs/fantasy-2-bg2.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'Remember this carefully: = assigns value, == compares value. Now, three paths appear before you.'", bgImage: "/level-bgs/fantasy-2-bg2.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The walls begin shifting endlessly. 'Some spells must be repeated. A while loop repeats as long as a condition is True. A for loop repeats a fixed number of times.'", bgImage: "/level-bgs/fantasy-2-bg3.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'A loop inside another loop is a nested loop. The sequence runs deeply. But beware cursed doors — use continue to skip, or break to stop completely.'", bgImage: "/level-bgs/fantasy-2-bg3.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "The Trial Chambers test your judgment. You must write 5 spells that use decision-making and repetition. Each spell is a separate task — complete them all in the single editor.",
          explanation: [
            { concept: "Conditionals (if/else)", detail: "Used to run code only when a condition is met. `if` checks the condition, `elif` adds more choices, and `else` handles the rest." },
            { concept: "Loops (for)", detail: "Repeats a block of code multiple times. `for i in range(3)` runs the code 3 times, with `i` taking values 0, 1, and 2." },
            { concept: "Comparisons", detail: "Symbols like `==` (is equal to), `>` (greater than), and `<` (less than) are used to compare values in your conditions." },
            { concept: "Loop Control", detail: "`continue` skips the rest of the current loop step, while `break` exits the entire loop immediately." }
          ],
          tasks: [
            "Task 1 — `if/else`: If `mana > 50` print `'You may pass'`, else print `'You are too weak'`",
            "Task 2 — `elif`: Take a `choice` variable ('fire', 'water', 'earth') and print the matching path",
            "Task 3 — `for` loop: Print `'Trying door'` 3 times using `range()`",
            "Task 4 — Nested loops: Print a 2×2 coordinate grid (0 0, 0 1, 1 0, 1 1)",
            "Task 5 — `break`/`continue`: Loop 0–4, skip 2, stop at 4"
          ],
          rules: [
            "`=` assigns a value, `==` compares values — don't mix them up!",
            "Python uses indentation (spaces) to define code blocks — no curly braces",
            "`range(n)` generates numbers 0 to n-1"
          ]
        },
        objective: "Write five spells (mini-tasks) combining if/else logic, comparisons, and loops.",
        startingCode: "# Task 1: If mana > 50 print 'You may pass', else 'You are too weak'\nmana = 60\n\n# Task 2: Check standard 'choice' variable\nchoice = 'fire'\n\n# Task 3: Loop 3 times to print 'Trying door'\n\n# Task 4: Nested loops grid 0 to 1\n\n# Task 5: Loop 0 to 4, skip 2, break at 4\n",
        validationStrings: ["if", "mana", ">", "50", "else", "choice", "==", "for", "in", "range", "continue", "break"],
        hints: ["Task 1: if mana > 50: ... else: ...", "Task 2: if choice == 'fire': ... elif choice == 'water': ...", "Task 3: for i in range(3): print('Trying door')", "Task 4: for i in range(2): for j in range(2):", "Task 5: for i in range(5): if i == 2: continue ... if i == 4: break"],
        successLine: "The chamber opens. The Grandmaster stands before the glowing core. 'You now control the flow of magic. You can decide… repeat… and stop.'",
        errorLine: "The guardian overpowers you. Fix your decision logic and loops.",
        successImage: "/level-bgs/fantasy-2-success.png",
        whatYouLearned: [
          "`Decision making` → if / elif / else",
          "`Comparisons` → ==, >, <",
          "`Loops` → while, for",
          "`Nested Logic` → loops inside loops",
          "`Control` → break, continue"
        ]
      },
      {
        id: 3,
        title: "Level 3: Functions & Scope - The Fractured Heart",
        storyNodes: [
          { text: "The glowing core you reached in Level 2 suddenly… cracks. Energy bursts out violently. The chamber trembles. The Grandmaster appears instantly.", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'You have learned to control magic… but now you must learn to structure it. Without structure… even power becomes chaos.'", bgImage: "/level-bgs/fantasy-3-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The Grandmaster points at the fractured core. Multiple broken seals appear around it. 'You cannot fix everything with one spell. You must create separate spells for separate tasks.'", bgImage: "/level-bgs/fantasy-3-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'A function is a reusable block of code. You define it once with def, then call it whenever needed. Think of it as naming your spell.'", bgImage: "/level-bgs/fantasy-3-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "He raises his hand. 'Some spells need input to work… and some return energy back. Parameters are what you give. Return is what you get back.'", bgImage: "/level-bgs/fantasy-3-bg2.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The chamber splits into inner and outer zones. 'Not all magic exists everywhere… Variables can be Local, living only inside a function, or Global, accessible everywhere.'", bgImage: "/level-bgs/fantasy-3-bg2.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The final seal refuses to stabilize. It keeps rebuilding itself again and again. 'Some problems… solve themselves repeatedly. Recursion is a function that calls itself. But it must have a base case or it runs forever.'", bgImage: "/level-bgs/fantasy-3-bg2.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The last fragments of the core flicker rapidly. 'Sometimes you do not need a full spell. Just a quick one-line charm. We call these Lambda functions. They are small and precise.'", bgImage: "/level-bgs/fantasy-3-bg2.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "The core has fractured. You must repair it by writing 5 structured spells — each one teaching you a key aspect of how Python organizes code with functions.",
          explanation: [
            { concept: "Functions (`def`)", detail: "Functions are reusable blocks of code. Use `def name():` to define one. They help keep your magic (code) organized and clean." },
            { concept: "Parameters & Return", detail: "Parameters are inputs you give to a function. `return` is the result the function gives back to you after it's done." },
            { concept: "Scope", detail: "Variables inside a function are 'Local' (only exist there). Variables outside are 'Global' (exist everywhere)." },
            { concept: "Recursion", detail: "A function that calls itself! It's powerful for repeating tasks but must have a 'base case' to tell it when to stop." },
            { concept: "Lambdas", detail: "Small, one-line functions used for quick tasks without needing a full `def` block. Syntax: `lambda x: x * 2`." }
          ],
          tasks: [
            "Task 1 — Basic function: Define `repair_seal()` that prints `'Seal repaired'`, then call it",
            "Task 2 — Parameters & Return: Define `add_mana(a, b)` that returns the sum of two numbers",
            "Task 3 — Global scope: Create a global variable `mana = 50` and a function that prints it",
            "Task 4 — Recursion: Write `countdown(n)` that prints n down to 1 using recursion",
            "Task 5 — Lambda: Create a lambda function `multiply` and print the result of `multiply(5, 5)`"
          ],
          rules: [
            "A function must be defined with `def` before it can be called",
            "Recursive functions MUST have a base case (e.g. `if n == 0: return`) or they run forever",
            "Lambda syntax: `name = lambda a, b: expression` — one line only"
          ]
        },
        objective: "Write five spells practicing functions, parameters, scope, recursion, and lambdas.",
        startingCode: "# Task 1: Create repair_seal() that prints 'Seal repaired', then call it\n\n\n# Task 2: Create add_mana(a, b) that returns the sum\n\n\n# Task 3: Global mana = 50, create a function that prints it\n\n\n# Task 4: Recursive function countdown(n) that prints n down to 1\n\n\n# Task 5: Lambda function 'multiply', print result of multiply(5, 5)\n",
        validationStrings: ["def", "repair_seal", "add_mana", "return", "mana", "countdown", "lambda"],
        hints: [
          "Task 1: def repair_seal():  print('Seal repaired')",
          "Task 2: def add_mana(a, b):  return a + b",
          "Task 3: mana = 50  /  def check_mana():  print(mana)",
          "Task 4: def countdown(n):  if n == 0: return  /  print(n)  /  countdown(n-1)",
          "Task 5: multiply = lambda a, b: a * b  /  print(multiply(5, 5))"
        ],
        successLine: "The core begins to glow steadily… The cracks disappear. The Grandmaster smiles. 'You have done what few can… You no longer just write magic… You design it.'",
        errorLine: "The core is becoming increasingly unstable! Ensure all your function definitions and lambda syntax are correct.",
        successImage: "/level-bgs/fantasy-3-success.png",
        whatYouLearned: [
          "`Functions` → reusable spells defined with `def`",
          "`Parameters & Return` → input/output of functions",
          "`Scope` → Local (inside function) vs Global (everywhere)",
          "`Recursion` → function calling itself with a base case",
          "`Lambda` → quick one-line anonymous functions"
        ]
      },
      {
        id: 4,
        title: "Level 4: Lists & Dictionaries - Arcane Collections I",
        storyNodes: [
          { text: "The vault glows with rows of enchanted crystals. You access each crystal using lists, slicing through sequences.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "You store key-value secrets in dictionaries.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Declare a list `crystals` and dictionary `spells`.",
        startingCode: "# Create crystals and spells\n",
        validationStrings: ["crystals", "spells", "[", "{", "}"],
        hints: ["`crystals = []` and `spells = {}`"],
        successLine: "You now hold fragments of the vault's secrets.",
        errorLine: "The crystals shattered. Format your structures correctly."
      },
      {
        id: 5,
        title: "Level 5: Tuples & Sets - Arcane Collections II",
        storyNodes: [
          { text: "Deeper inside, glyphs of immutable code shimmer. Tuples store fixed sequences.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "Sets reveal unique runes, removing duplicates in corrupted scrolls.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Create a tuple `immutable_runes` and a set `unique_glyphs`.",
        startingCode: "# Create tuple and set\n",
        validationStrings: ["immutable_runes", "unique_glyphs", "(", "set"],
        hints: ["`()` for tuples, `set()` for sets."],
        successLine: "With glyphs mastered, you're ready to craft magical constructs.",
        errorLine: "The runes morphed. Tuples must be immutable."
      },
      {
        id: 6,
        title: "Level 6: Classes & Objects - Magical Constructs (OOP I)",
        storyNodes: [
          { text: "To infiltrate the forbidden library, you forge a magical construct. You define a class for your disguise.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "You initialize it with its own life force using __init__.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Define `class Construct` with an `__init__` that sets `self.mana`.",
        startingCode: "# Create your Construct class\n",
        validationStrings: ["class", "Construct", "def", "__init__", "(", "self", "mana", ")", "self.mana"],
        hints: ["Use `def __init__(self, mana):`"],
        successLine: "Your construct works — you slip deeper into the library.",
        errorLine: "The construct failed to bind to its mana. Try again."
      },
      {
        id: 7,
        title: "Level 7: Inheritance - Lineage (OOP II)",
        storyNodes: [
          { text: "The library challenges your disguise. You inherit traits from ancient constructs.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "You override spells to adapt. Polymorphism lets your construct behave differently.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Create a `class StealthConstruct` that inherits from `Construct`.",
        startingCode: "class Construct:\n    pass\n\n# Inherit Construct below\n",
        validationStrings: ["class", "StealthConstruct", "(Construct)", ":", "Construct"],
        hints: ["`class StealthConstruct(Construct):`"],
        successLine: "Your construct evolves, fooling the guardians.",
        errorLine: "The guardian sees past your inheritance."
      },
      {
        id: 8,
        title: "Level 8: Magic Methods - Arcane Combinations (OOP III)",
        storyNodes: [
          { text: "The Eternal Rune begins to suspect you. You wield special methods to manipulate its perception.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "You overload operators to rewrite its logic.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Add an `__add__` magic method to your class.",
        startingCode: "class Magic:\n    # Define __add__\n",
        validationStrings: ["def", "__add__", "(self", "other)", "return"],
        hints: ["`def __add__(self, other):`"],
        successLine: "You are now indistinguishable from the Rune's guardians.",
        errorLine: "Addition overload failed. The Rune rejected you."
      },
      {
        id: 9,
        title: "Level 9: File I/O - Ancient Scrolls",
        storyNodes: [
          { text: "You infiltrate the forbidden tomes. You read ancient scrolls and inscribe your own.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "Reading and writing ancient scrolls directly onto the physical disk requires context managers.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Use `with open('spellbook.txt', 'r') as f:` to read.",
        startingCode: "# Read the spellbook\n",
        validationStrings: ["with", "open", "('spellbook.txt',", "'r'", ")", "as", "read()"],
        hints: ["Context managers prevent cursed leaks. `with open...`"],
        successLine: "With forbidden magic mastered, you prepare for the final ritual.",
        errorLine: "File opened without safeties, causing a catastrophic arcane breach."
      },
      {
        id: 10,
        title: "Level 10: Advanced Modules - Grand Ascension",
        storyNodes: [
          { text: "The final ritual awaits in the Grand Hall. You manipulate raw binary runes.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "You optimize mana and unleash multithreading to overwhelm the Rune.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Import `itertools` and `threading` for maximum power.",
        startingCode: "# Import your ultimate libraries\n",
        validationStrings: ["import", "itertools", "threading"],
        hints: ["`import threading`"],
        successLine: "You complete the ritual, ascend as Archmage of Code, and reshape the realm.",
        errorLine: "You lacked the necessary imports. The ritual failed."
      }
    ]
  },
  c: {
    cyberpunk: [
      {
        id: 1,
        title: "Level 1: Basic Structure & I/O - Boot Sequence",
        storyNodes: [
          { text: "Your vision flickers… Lines of code stream across your cyber-eyes in a frantic neon rush.", bgImage: "/level-bgs/cyberpunk/c-1-bg1.jpg", characterName: "SYSTEM VOICE", characterImage: "/avatars/handler.png" },
          { text: "“Welcome, Operative. You have used high-level systems before… but now you access the Core Protocol: C.”", bgImage: "/level-bgs/cyberpunk/c-1-bg1.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“C is the foundation of the Grid. It is what runs underneath the neon surface… close to the machine itself.”", bgImage: "/level-bgs/cyberpunk/c-1-bg2.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "A terminal panel slides into view. “Protocol initialized. You must communicate with the hardware using exact instructions.”", bgImage: "/level-bgs/cyberpunk/c-1-bg2.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“Every program is a sequence of signals. If the logic is imperfect… the system remains locked.”", bgImage: "/level-bgs/cyberpunk/c-1-bg3.png", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“To begin your breach, you must declare your presence to the core memory. Assign an access code and light the output grid.”", bgImage: "/level-bgs/cyberpunk/c-1-bg3.png", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“System is active. Prepare for the Boot Sequence protocol.”", bgImage: "/level-bgs/cyberpunk/c-1-bg3.png", characterName: "SYSTEM VOICE", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "Welcome to the Core Protocol. You are entering the most powerful, low-level language in the Grid. C doesn't assume anything — you must define every variable, memory slot, and instruction exactly. Your task is to initialize the system by writing a standard C header, a main loop, and basic data processing.",
          explanation: [
            { concept: "C: The Low-Level Foundation", detail: "C is the mother of all modern systems. It gives you direct control over memory and hardware. Unlike Python, there is no high-level 'magic' — only raw commands and explicit logic." },
            { concept: "The Build Pipeline (Compilation)", detail: "C code cannot run directly. A `Compiler` (like GCC) takes your text and converts it into a binary `Machine Code` file that the system can actually understand." },
            { concept: "Protocol Structure", detail: "Every C program needs `#include <stdio.h>` for communication, and a `main()` function as the entry point. The code lives inside curly braces `{ }`." },
            { concept: "Memory Allocation (Types)", detail: "Variables in C need strict types. `int` for integers, `float` for decimals, `char` for single characters, and `double` for high precision. No shortcuts allowed!" },
            { concept: "System I/O", detail: "Use `printf(\"Hello\")` to output signals and `scanf(\"%d\", &age)` to receive data. The `&` operator tells the system exactly where in memory to store the input." },
            { concept: "Data Processing (Operators)", detail: "Process data using arithmetic (+, -, *, /), relational (>, <, ==), and logical (&&, ||, !) operators to transform raw signals into actions." }
          ],
          tasks: [
            "Task 1 — Output: Use `printf()` to print `C controls the system`",
            "Task 2 — Protocol Setup: Use `printf()` to print `System Online`",
            "Task 3 — Memory allocation: Create `int score` and `float accuracy` variables",
            "Task 4 — Input/Output: Use `scanf(\"%d\", &input)` to take an integer and then print it",
            "Task 5 — Processing: Add two numbers and `printf` the result"
          ],
          rules: [
            "Every signal ends with a `;`",
            "Include your protocol: `#include <stdio.h>`",
            "Code must live inside the `main()` execution block",
            "Use `%d` for integers and `%f` for decimals"
          ]
        },
        objective: "Initialize the Grid: Print system status, allocate memory with exact types, handle data input, and perform arithmetic processing.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task 1: Print \"C controls the system\"\n\n\n    // Task 2: Print \"System Online\"\n\n\n    // Task 3: Create int score; and float accuracy;\n    \n\n    // Task 4: Take integer input to \"val\", then print it\n    int val;\n\n\n    // Task 5: Add two numbers (e.g. 10 + 5) and print result\n\n\n    return 0;\n}\n",
        validationStrings: ["#include", "printf", "C controls the system", "System Online", "int score", "float accuracy", "scanf", "return 0"],
        hints: [
          "Include your protocol: `#include <stdio.h>`",
          "Every instruction needs a `;` at the end.",
          "Use `%d` for integers in both printf and scanf.",
          "Don't forget the `&` in scanf: `scanf(\"%d\", &id);`"
        ],
        successLine: "ACCESS GRANTED. Core Protocol initialized. You now understand the foundation of the system.",
        errorLine: "SYNTAX REJECTED. Protocol breach detected. Check your types, semicolons, and format specifiers.",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: [
          "C is a system-level foundational language",
          "Compilation converts code to machine instructions",
          "Program structure with main() and headers",
          "Explicit data types and memory allocation",
          "Input/Output with format specifiers",
          "Basic data processing with operators"
        ]
      },
      {
        id: 2,
        title: "Level 2.1: If-Else Logic - The Logic Branch",
        storyNodes: [
          { text: "The security grid tightens. You've breached the outer wall, but the inner logic gates are active.", bgImage: "/level-bgs/cyberpunk/c-1-bg1.jpg", characterName: "SYSTEM VOICE", characterImage: "/avatars/handler.png" },
          { text: "“Operative, the system is scanning for unauthorized threads. You must use logic branches to hide your signature.”", bgImage: "/level-bgs/cyberpunk/c-1-bg1.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“If a security drone approaches, your code must decide: fight or flee. This is control flow.”", bgImage: "/level-bgs/cyberpunk/c-2-bg1.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "Decision points are critical for survival in the Grid. Control flow allows your program to choose different execution paths based on conditions.",
          explanation: [
            { concept: "Logic Branching (`if` / `else`)", detail: "Decision points in C. Conditions must be wrapped in `( )`. Use standard comparison operators like `>`, `<`, and `==` to control the path." }
          ],
          tasks: [
            "Task: If `power > 50` print `Active`, else print `Low` (integer `power = 60` is defined for you)."
          ],
          rules: [
            "Conditionals MUST be inside parentheses: `if (condition)`"
          ]
        },
        objective: "Bypass the security drone by implementing a valid if/else logic branch.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: if power > 50 print \"Active\", else \"Low\"\n    int power = 60;\n\n\n    return 0;\n}\n",
        validationStrings: ["if", "else", "printf", "Active", "Low"],
        hints: ["`if (power > 50) { printf(\"Active\\n\"); } else { ... }`"],
        successLine: "BRANCH SUCCESSFUL. Signature hidden from the drone scanning sweep.",
        errorLine: "BRANCH REJECTED. Your logic was exposed. Check your parentheses and comparison operators.",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Logic branching with if/else", "Conditional syntax in C"]
      },
      {
        id: 3,
        title: "Level 2.2: Switch Cases - Multi-Protocol Routing",
        storyNodes: [
          { text: "“Multiple protocols are running simultaneously across the sub-grid.”", bgImage: "/level-bgs/cyberpunk/c-2-bg1.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“A switch statement will handle these incoming signals more efficiently than a series of nested forks.”", bgImage: "/level-bgs/cyberpunk/c-2-bg1.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "When handling many discrete options, `switch` is the preferred tool for performance and clarity in C.",
          explanation: [
            { concept: "Multi-Input Selectors (`switch`)", detail: "The fastest way to route signals through multiple options. Each `case` must end with a `break` to prevent execution bleed (fall-through)." }
          ],
          tasks: [
            "Task: With `signal = 2`, print `Alpha` for case 1 and `Beta` for case 2."
          ],
          rules: [
            "Each `case` requires a `break;` to prevent fall-through."
          ]
        },
        objective: "Route the incoming protocol signals correctly using a switch statement.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: switch signal=2, case 1: \"Alpha\", case 2: \"Beta\"\n    int signal = 2;\n\n\n    return 0;\n}\n",
        validationStrings: ["switch", "case", "break", "Alpha", "Beta"],
        hints: ["`switch(signal) { case 1: ...; break; ... }`"],
        successLine: "PROCOTOL ROUTED. The switch has accurately sorted the incoming data packets.",
        errorLine: "ROUTING ERROR. Signals are bleeding into adjacent channels. Don't forget the 'break' statements.",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Discrete choice handling with switch", "Preventing fall-through with break"]
      },
      {
        id: 4,
        title: "Level 2.3: For Loops - The Resonant Loop",
        storyNodes: [
          { text: "“The firewall resets its encryption every 10 cycles. It's a rhythmic security pattern.”", bgImage: "/level-bgs/cyberpunk/c-2-bg2.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“You'll need to repeat your breach commands until the gateway synchronization yields to the resonant frequency.”", bgImage: "/level-bgs/cyberpunk/c-2-bg2.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "Repetition is the core of computational power. Loops allow you to execute the same logic repeatedly until a goal is met.",
          explanation: [
            { concept: "Execution Cycles (`for` loops)", detail: "Precision-tuned for a fixed number of repetitions. The `for` loop defines initialization, condition check, and step increment in a single line." }
          ],
          tasks: [
            "Task: Use a `for` loop to print the message `Syncing` exactly 5 times."
          ],
          rules: [
            "A `for` loop structure: `for(init; condition; update) { ... }`"
          ]
        },
        objective: "Synchronize with the firewall by repeating the breach command using a loop.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: print \"Syncing\" 5 times using a loop\n\n\n    return 0;\n}\n",
        validationStrings: ["for", "printf", "Syncing"],
        hints: ["`for(int i=0; i<5; i++) { ... }`"],
        successLine: "GATEWAY SYNCED. The resonant loop has successfully matched the firewall frequency.",
        errorLine: "SYNC FAILED. Your loop counts are out of range. Check your condition logic.",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Computational repetition with loops", "For-loop syntax in C"]
      },
      {
        id: 5,
        title: "Level 2.4: Nested Loops - Multi-Layer Matrix",
        storyNodes: [
          { text: "“Some security gates exist inside others… a nesting of permissions.”", bgImage: "/level-bgs/cyberpunk/c-1-bg2.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“Scan the entire multi-dimensional array grid to find the hidden access key hidden between layers.”", bgImage: "/level-bgs/cyberpunk/c-1-bg2.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "Nesting loops allows you to traverse grids, matrices, and multi-dimensional structures. For each step of the outer loop, the inner loop completes its full cycle.",
          explanation: [
            { concept: "Recursive Scans (Nested Loops)", detail: "Used for multi-layered security checks. An inner loop completes its entire execution cycle for every single step the outer loop takes." }
          ],
          tasks: [
            "Task: Print a 2x2 coordinate grid from `0 0` to `1 1` using nested `for` loops (format: `%d %d\\n`)."
          ],
          rules: [
            "Outer loop handles rows; inner loop handles columns."
          ]
        },
        objective: "Scan the multi-layer security grid to extract the hidden access key.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: Print coordinates 0 0 to 1 1 with nested loops\n\n\n    return 0;\n}\n",
        validationStrings: ["for", "printf", "%d %d"],
        hints: ["Use two `for` loops, one inside the other, both iterating from 0 to 1."],
        successLine: "KEY EXTRACTED. The matrix scan has mapped every coordinate in the target sector.",
        errorLine: "SCAN FAILED. Grid misalignment detected. Check your nested loop variables (i, j).",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Multi-dimensional navigation", "Nested loop mechanics"]
      },
      {
        id: 6,
        title: "Level 2.5: Break & Continue - Terminal Interrupt",
        storyNodes: [
          { text: "“The logic-core is exposed, but it's sending out corrupted noise. You must filter it.”", bgImage: "/level-bgs/cyberpunk/c-1-bg3.png", characterName: "NEON AI", characterImage: "/avatars/handler.png" },
          { text: "“Interrupt the cycle when you hit the target bit, and skip the dead sectors. Execute the override.”", bgImage: "/level-bgs/cyberpunk/c-1-bg3.png", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "You can exert fine control over loops using interrupts. `continue` skips the current iteration, while `break` terminates the entire loop immediately.",
          explanation: [
            { concept: "Signal Interrupts (`break` & `continue`)", detail: "`continue` skips the current byte and moves to the next loop cycle. `break` completely terminates the execution loop and jumps to the next code block." }
          ],
          tasks: [
            "Task: Loop from 0 to 5. Skip `2` using `continue`, and stop the loop immediately at `4` using `break`."
          ],
          rules: [
            "`break` exits the loop. `continue` skips to the next iteration."
          ]
        },
        objective: "Clean the corrupted signal by precisely interrupting and skipping the loop sequence.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: Loop 0-5, skip 2, break at 4\n\n\n    return 0;\n}\n",
        validationStrings: ["for", "continue", "break", "if", "printf"],
        hints: ["Use `if(i == 2) continue;` and `if(i == 4) break;` inside your loop."],
        successLine: "SIGNAL CLEANED. Logic core stabilized. You have gained total sequence control.",
        errorLine: "INTERRUPT FAILED. The loop bypassed your filters. Check your break/continue conditions.",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Loop flow control", "Precision interruptions with break/continue"]
      },
      {
        id: 7,
        title: "Level 3.1: Functions Basics - Initialize Protocol",
        storyNodes: [
          { text: "The system opens a deeper layer. You now control execution... but your code is inefficient.", bgImage: "/level-bgs/cyberpunk/c-1-bg1.jpg", characterName: "SYSTEM VOICE", characterImage: "/avatars/handler.png" },
          { text: "“You must build reusable protocols. A function is a block that you can define once and call whenever needed.”", bgImage: "/level-bgs/cyberpunk/c-1-bg1.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "Functions allow you to organize your ritual into modular circles. You define them with a name and return type, then call them in main.",
          explanation: [
            { concept: "Function Definition", detail: "In C, a function has a return type (like void), a name, and a body inside { }. Example: void greet() { printf(\"Hi\"); }" },
            { concept: "Function Call", detail: "To run the function, simply write its name followed by parentheses: greet(); inside main()." }
          ],
          tasks: [
            "Task: Create a function void startSystem() that prints \"System Started\". Call it inside main()."
          ],
          rules: [
            "Function definitions must be outside of other functions."
          ]
        },
        objective: "Initialize the system by creating and calling your first reusable protocol.",
        startingCode: "#include <stdio.h>\n\n// Task: Create void startSystem() that prints \"System Started\"\n\n\nint main() {\n    // Task: Call startSystem() here\n\n\n    return 0;\n}\n",
        validationStrings: ["void", "startSystem", "printf", "startSystem()"],
        hints: ["Define `void startSystem() { printf(\"System Started\\n\"); }` above main."],
        successLine: "PROTOCOL INITIALIZED. Your first modular circuit is active.",
        errorLine: "CIRCUIT FAILURE. Did you define the function correctly and call it inside main?",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Defining functions", "Calling functions in C"]
      },
      {
        id: 8,
        title: "Level 3.2: Parameters & Return - Transfer Data",
        storyNodes: [
          { text: "“Functions can take input... Parameters are the inputs, and Arguments are the actual values you pass.”", bgImage: "/level-bgs/cyberpunk/c-1-bg1.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "Functions can receive data as parameters and send a result back using the return keyword.",
          explanation: [
            { concept: "Parameters", detail: "Inputs to a function. Example: void show(int x) uses x as a parameter." },
            { concept: "Return Values", detail: "Functions can calculate values and send them back. Example: int add(int a, int b) { return a + b; }" }
          ],
          tasks: [
            "Task: Create int sum(int a, int b) that returns their addition. Call it in main() and print the result."
          ],
          rules: [
            "Return type must match the function signature."
          ]
        },
        objective: "Transfer data between sectors using function parameters and returns.",
        startingCode: "#include <stdio.h>\n\n// Task: int sum(int a, int b)\n\n\nint main() {\n    int result = sum(10, 5);\n    // Task: print the result\n\n\n    return 0;\n}\n",
        validationStrings: ["int sum", "return", "printf"],
        hints: ["`return a + b;` inside the sum function, then `printf(\"%d\", result);` in main."],
        successLine: "DATA TRANSFERRED. The logic exchange protocol is secure.",
        errorLine: "EXCHANGE FAILED. Logic mismatch in your return signal.",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Function parameters", "Return statements in C"]
      },
      {
        id: 9,
        title: "Level 3.3: Scope & Memory - Access Memory",
        storyNodes: [
          { text: "“Scope defines where a variable exists. Local variables are destroyed after the function ends. Global variables exist everywhere.”", bgImage: "/level-bgs/cyberpunk/c-1-bg1.jpg", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "Understanding variable scope is crucial for managing memory in C. Global variables are declared outside all functions.",
          explanation: [
            { concept: "Global Variables", detail: "Declared outside any function. They are accessible by any part of the program." },
            { concept: "Local Variables", detail: "Declared inside a function and only exist while that function is running." }
          ],
          tasks: [
            "Task: Create a global variable int data = 100. Create a function void access() that prints it, then call access() in main()."
          ],
          rules: [
            "Global variables should be defined at the top of the file."
          ]
        },
        objective: "Access memory across different scopes by implementing a global data variable.",
        startingCode: "#include <stdio.h>\n\n// Task: Global int data = 100;\n\n// Task: function void access() that prints data\n\n\nint main() {\n    // Task: Call access()\n\n\n    return 0;\n}\n",
        validationStrings: ["int data", "100", "void access", "access()", "printf"],
        hints: ["Define `int data = 100;` outside and above both functions."],
        successLine: "MEMORY ACCESSED. You have bridged the global data bank.",
        errorLine: "OUT OF SCOPE. The variable was not found in the global registry.",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Global vs Local variables", "Variable lifetime in C"]
      },
      {
        id: 10,
        title: "Level 3.4: Recursion Protocol - Recursive Execution",
        storyNodes: [
          { text: "“The self-executing protocol... Recursion is when a function calls itself to solve a smaller version of the problem.”", bgImage: "/level-bgs/cyberpunk/c-1-bg3.png", characterName: "NEON AI", characterImage: "/avatars/handler.png" }
        ],
        briefing: {
          overview: "Recursion is a powerful technique where a function calls itself until it reaches a base case.",
          explanation: [
            { concept: "Recursion", detail: "A function that solves a problem by calling itself. It must have a 'base condition' to stop, otherwise it causes a stack overflow." },
            { concept: "Flow", detail: "Function calls itself -> reduces problem -> stops at base case." }
          ],
          tasks: [
            "Task: Print 3 2 1 using a recursive function countdown(int n). Base case: if(n == 0) return;"
          ],
          rules: [
            "Recursive functions must have a base case."
          ]
        },
        objective: "Master self-executing logic by implementing a recursive countdown protocol.",
        startingCode: "#include <stdio.h>\n\n// Task: void countdown(int n)\n\n\nint main() {\n    countdown(3);\n    return 0;\n}\n",
        validationStrings: ["void countdown", "if", "return", "countdown(n - 1)", "printf"],
        hints: ["Inside countdown, print n, then call `countdown(n - 1)` if n is not 0."],
        successLine: "CORE STABILIZED. You now control structure, memory, and execution. Graduation complete.",
        errorLine: "INFINITE LOOP DETECTED. You missed the base case or reduced n incorrectly.",
        successImage: "/level-bgs/cyberpunk/c-1-bg3.png",
        whatYouLearned: ["Recursive logic", "Base cases", "Stack management basics"]
      }
    ],
    fantasy: [
      {
        id: 1,
        title: "Level 1: Basic Structure & I/O - The Ancient Forge Chamber",
        storyNodes: [
          { text: "You step into a massive forge chamber. Flames burn steadily. Ancient tools float in the air. The Grandmaster stands beside a glowing anvil.", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'Python taught you to speak magic… But here… you will learn how magic is built. This is the language of structure… C.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The forge glows brighter. Old inscriptions appear. 'C is one of the oldest and most powerful languages. It is close to the machine… close to the core of reality. It is used in operating systems, embedded systems, and high-performance applications.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'If Python is magic… C is the metal it is forged from.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The Grandmaster hands you tools. 'Before forging… you must prepare your tools. To run C code, you need a Compiler — which converts code into machine language — and an Editor where you write code. Examples: GCC compiler, VS Code, or CodeBlocks.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'Your code is raw metal… The compiler shapes it into something real.' The anvil glows. A blueprint appears. 'In C… structure is everything.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'Every C program begins with #include stdio.h which brings input and output tools. Then int main() — the starting point. Curly braces define the block. printf() outputs text. And return 0 ends the program successfully.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The Grandmaster places glowing containers on the forge. 'In C, you must store values — but you must define their type clearly. int for whole numbers, float for decimals, char for a single character, double for precise decimals.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The forge hums as a device appears. 'To output text use printf. To take input use scanf with the format specifier and the address operator ampersand. Use percent d for integers, percent f for floats.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "The forge sparks intensely. 'Now… you shape the energy. Operators allow you to transform raw data into results. Plus, minus, multiply, divide for arithmetic. Greater than, less than, double equals for comparison. And, Or for logic.'", bgImage: "/level-bgs/fantasy-1-bg.png", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Welcome to the Ancient Forge — your first lesson in C. Unlike Python, C requires strict structure: every program needs `#include <stdio.h>`, a `main()` function, curly braces, and semicolons. Your job is to complete 4 forge tasks inside `main()`.",
          explanation: [
            { concept: "C Structure", detail: "C follows a fixed structure. `#include <stdio.h>` is a preprocessor command that allows for input/output. `int main()` is where the execution starts." },
            { concept: "Data Types", detail: "Variable types like `int` (integers), `float` (decimals), and `char` (characters) tell the computer how much memory to allocate." },
            { concept: "Memory Address (`&`)", detail: "In C, `&` is the address operator. It tells `scanf` exactly where in memory to store the user's input. Crucial for hardware level control!" },
            { concept: "Format Specifiers", detail: "Used in `printf` and `scanf`. `%d` is for integers, `%f` is for floating point, and `%c` is for a single character." }
          ],
          tasks: [
            "Task 1 — Output: Use `printf()` to print `Welcome to C`",
            "Task 2 — Variables: Declare `int age` and `float marks` (no values needed)",
            "Task 3 — Input: Declare an `int value`, use `scanf(\"%d\", &value)` to read it, then `printf` to print it",
            "Task 4 — Operators: Declare `int a = 10, b = 20`, compute their sum, and print it"
          ],
          rules: [
            "Every statement in C must end with a semicolon `;`",
            "`scanf` requires `&` before the variable name (the address operator)",
            "Format specifiers: `%d` for int, `%f` for float, `%c` for char",
            "All variables must be declared before they are used"
          ]
        },
        objective: "Complete all 4 forge tasks: print a message, declare variables, read input and print it, then add two numbers.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task 1: Print \"Welcome to C\"\n\n\n    // Task 2: Declare int age and float marks\n\n\n    // Task 3: Read an integer with scanf, then print it\n\n\n    // Task 4: Add two numbers and print the sum\n\n\n    return 0;\n}\n",
        validationStrings: ["#include", "printf", "int", "float", "scanf", "return 0"],
        hints: [
          "Task 1: printf(\"Welcome to C\\n\");",
          "Task 2: int age; float marks; — declare on separate lines",
          "Task 3: scanf(\"%d\", &value); printf(\"%d\\n\", value);",
          "Task 4: int sum = a + b; printf(\"%d\\n\", sum);"
        ],
        successLine: "The forge roars. A glowing artifact forms. The Grandmaster lifts it: 'You have learned the foundation… You now understand how magic is constructed.'",
        errorLine: "The forge rejects your work. Check your structure — every brace, semicolon, and format specifier matters in C.",
        successImage: "/level-bgs/fantasy-1-success.png",
        whatYouLearned: [
          "`C Language` → low-level, powerful, close to hardware",
          "`Program Structure` → #include, main(), {}, return 0",
          "`Variables & Types` → int, float, char, double",
          "`Input / Output` → printf() and scanf()",
          "`Operators` → arithmetic, relational, logical"
        ]
      },
      {
        id: 2,
        title: "Level 2.1: If-Else Logic - The Guardian's Gate",
        storyNodes: [
          { text: "As the gate opens, you step inside. The door seals behind you. The chamber shifts… walls move… paths change.", bgImage: "/level-bgs/fantasy-2-bg1.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "“You now know how to create magic… but here, you must decide *when* magic should happen. This is control flow.”", bgImage: "/level-bgs/fantasy-2-bg1.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "A massive guardian emerges from the shadows. “Only the worthy may pass.” Not every line of code runs every time.", bgImage: "/level-bgs/fantasy-2-bg1.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Magic requires judgment. Control flow allows your spells to react to the environment, executing different paths based on the mana available.",
          explanation: [
            { concept: "Conditionals (`if` / `else`)", detail: "Used to make decisions. In C, the condition MUST be inside parentheses `( )`. `if (mana > 50)` runs the first block; `else` handles the alternative." }
          ],
          tasks: [
            "Task: If `mana > 40` print `Fight`, else print `Flee` (integer `mana = 60` is provided)."
          ],
          rules: [
            "C conditions MUST have parentheses: `if (condition)`"
          ]
        },
        objective: "Prove your worth to the guardian by implementing a decision-making spell.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: if mana > 40 print \"Fight\", else \"Flee\"\n    int mana = 60;\n\n\n    return 0;\n}\n",
        validationStrings: ["if", "else", "printf", "Fight", "Flee"],
        hints: ["`if(mana > 40) { printf(\"Fight\\n\"); } else { ... }`"],
        successLine: "DECISION MADE. The guardian steps aside, recognizing your logic.",
        errorLine: "JUDGMENT FAILED. The guardian blocks your path. Check your parentheses and comparison.",
        successImage: "/level-bgs/fantasy-2-success.png",
        whatYouLearned: ["Decision logic with if/else", "C conditional syntax"]
      },
      {
        id: 3,
        title: "Level 2.2: Switch Cases - The Chamber of Echoes",
        storyNodes: [
          { text: "The chamber shifts again. Many doors appear, each glowing with a different element.", bgImage: "/level-bgs/fantasy-2-bg2.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "“When there are many choices available at once… a switch is more efficient for the mind to process.”", bgImage: "/level-bgs/fantasy-2-bg2.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "When faced with multiple discrete options, the `switch` statement is a more organized way to route your magic.",
          explanation: [
            { concept: "Multiple Paths (`switch`)", detail: "A clean way to handle many choices. `switch(variable)` checks a value, and `case` runs if it matches. Always use `break` to stop execution at the end of a case." }
          ],
          tasks: [
            "Task: With `choice = 1`, print `Fire` for case 1 and `Water` for case 2."
          ],
          rules: [
            "Every `case` in a `switch` needs a `break` to avoid fall-through."
          ]
        },
        objective: "Select the correct elemental path using a switch statement.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: switch choice=1, case 1: \"Fire\", case 2: \"Water\"\n    int choice = 1;\n\n\n    return 0;\n}\n",
        validationStrings: ["switch", "case", "break", "Fire", "Water"],
        hints: ["`switch(choice) { case 1: ...; break; ... }`"],
        successLine: "PATH SELECTED. The resonance of your choice opens the elemental door.",
        errorLine: "ELEMENTAL CLASH. The magic is leaking into other cases. Did you forget the 'break'?",
        successImage: "/level-bgs/fantasy-2-success.png",
        whatYouLearned: ["Discrete choice handling with switch", "Preventing case fall-through"]
      },
      {
        id: 4,
        title: "Level 2.3: For Loops - The Infinite Corridor",
        storyNodes: [
          { text: "Beyond the door lies a corridor that seems to stretch forever.", bgImage: "/level-bgs/fantasy-2-bg2.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "“One attempt is not enough to cross this space… a loop repeats your steps until the far side is reached.”", bgImage: "/level-bgs/fantasy-2-bg2.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Loops allow you to repeat a sequence of magic without rewriting the spell every time.",
          explanation: [
            { concept: "Loops (`while` & `for`)", detail: "`while` loops repeat as long as a condition is true. `for` loops are best for count-based repetition, defining initialization, condition, and increment in one line." }
          ],
          tasks: [
            "Task: Use a loop to print the word `Door` exactly 5 times."
          ],
          rules: [
            "A `for` loop: `for(int i=0; i<5; i++) { ... }`"
          ]
        },
        objective: "Traverse the infinite corridor by repeating your steps with a loop.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: print \"Door\" 5 times using a loop\n\n\n    return 0;\n}\n",
        validationStrings: ["for", "printf", "Door"],
        hints: ["`for(int i=0; i<5; i++) { printf(\"Door\\n\"); }`"],
        successLine: "CORRIDOR CROSSED. Your rhythmic magic has stabilized the space.",
        errorLine: "LOST IN SPACE. Your loop count was incorrect. Check your condition.",
        successImage: "/level-bgs/fantasy-2-success.png",
        whatYouLearned: ["Loop repetition logic", "For-loop structure in C"]
      },
      {
        id: 5,
        title: "Level 2.4: Nested Loops - The Dimensional Weave",
        storyNodes: [
          { text: "You reach a wall of shimmering threads. “Some challenges exist inside others, like a weave.”", bgImage: "/level-bgs/fantasy-2-bg3.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "“A nested loop runs fully for every single step of its parent, allowing you to map the entire grid.”", bgImage: "/level-bgs/fantasy-2-bg3.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Nesting loops is how we handle 2D spaces, grids, and multi-layered challenges.",
          explanation: [
            { concept: "Nested Loops", detail: "A loop inside another loop! The inner loop runs its entire cycle for every single iteration of the outer loop, like a grid being filled row by row." }
          ],
          tasks: [
            "Task: Print a 2x2 coordinate grid (0 0 to 1 1) using nested `for` loops (format: `%d %d\\n`)."
          ],
          rules: [
            "Use `{ }` to clearly define the inner loop block."
          ]
        },
        objective: "Map the dimensional weave by scanning all grid coordinates.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: Print coordinates 0 0 to 1 1 with nested loops\n\n\n    return 0;\n}\n",
        validationStrings: ["for", "printf", "%d %d"],
        hints: ["One loop for `i` (0 to 1) and another for `j` (0 to 1) inside it."],
        successLine: "WEAVE MAPPED. Every coordinate in the dimensional grid is now under your control.",
        errorLine: "WEAVE TANGLED. Grid coordinates were skipped. Check your nested variables.",
        successImage: "/level-bgs/fantasy-2-success.png",
        whatYouLearned: ["Grid navigation with nesting", "Multi-layered logic"]
      },
      {
        id: 6,
        title: "Level 2.5: Break & Continue - The Arcanic Core",
        storyNodes: [
          { text: "The core pulsates ahead. “Lastly, not all paths should be taken. Magic is as much about restraint as power.”", bgImage: "/level-bgs/fantasy-2-bg3.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "“Use continue to skip the dead paths, and break to stop once the quest is fulfilled.”", bgImage: "/level-bgs/fantasy-2-bg3.jpg", characterName: "GRANDMASTER VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Fine control over loops allows you to selectively execute spells and exit early when your goal is reached.",
          explanation: [
            { concept: "Loop Control (`break` & `continue`)", detail: "`continue` skips the rest of the current loop step and starts the next one. `break` exits the entire loop immediately, regardless of the condition." }
          ],
          tasks: [
            "Task: Loop from 0 to 5. Skip `3` using `continue`, and stop the loop immediately at `5` using `break`."
          ],
          rules: [
            "`break` terminates immediately. `continue` jumps to the next cycle."
          ]
        },
        objective: "Unlock the arcanic core by precisely filtering and interrupting the magic flow.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Task: Loop 0-5, skip 3, break at 5\n\n\n    return 0;\n}\n",
        validationStrings: ["for", "continue", "break", "if"],
        hints: ["`if(i == 3) continue;` and `if(i == 5) break;` inside your loop."],
        successLine: "CORE UNLOCKED. The Trial Chambers have yielded to your mastery of flow.",
        errorLine: "CORE REJECTED. The magic became unstable. Check your interrupt conditions.",
        successImage: "/level-bgs/fantasy-2-success.png",
        whatYouLearned: ["Loop flow control", "Precision interruptions with break/continue"]
      },
      {
        id: 7,
        title: "Level 3.1: Functions Basics - Modular Circles",
        storyNodes: [
          { text: "As you approach the glowing core… it suddenly fractures. Energy bursts outward. The chamber trembles.", bgImage: "/level-bgs/fantasy-3-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "“The magic is too complex for a single incantation. You must divide your power into modular circles—functions.”", bgImage: "/level-bgs/fantasy-3-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Functions allow you to encapsulate ritual steps into reusable modules. Once defined, a function can be summoned from anywhere.",
          explanation: [
            { concept: "Ritual Modules (Functions)", detail: "Declare a function above main() with a return type (like void). Call it by name inside the curly braces of your main spell." },
            { concept: "Spell Execution", detail: "Use summonLight(); inside main() after defining void summonLight() { ... }." }
          ],
          tasks: [
            "Task: Create a function void summonLight() that prints \"Light Summoned\". Call it inside main()."
          ],
          rules: [
            "Ritual names must be unique and defined before use."
          ]
        },
        objective: "Repair the fractured heart by organizing your magic into reusable function circles.",
        startingCode: "#include <stdio.h>\n\n// Task: Create void summonLight() that prints \"Light Summoned\"\n\n\nint main() {\n    // Task: Call summonLight()\n\n\n    return 0;\n}\n",
        validationStrings: ["void", "summonLight", "printf", "summonLight()"],
        hints: ["Define `void summonLight() { printf(\"Light Summoned\\n\"); }` above main."],
        successLine: "HEART REPAIRED. Your first modular ritual is binding the energy.",
        errorLine: "RITUAL FAILED. The function circle is incomplete or correctly summoned.",
        successImage: "/level-bgs/fantasy-3-success.png",
        whatYouLearned: ["Modular ritual design", "Function calling in C"]
      },
      {
        id: 8,
        title: "Level 3.2: Parameters & Return - Mana Synthesis",
        storyNodes: [
          { text: "“Stabilization is holding. But to truly heal the heart, we must exchange energy between the circles.”", bgImage: "/level-bgs/fantasy-3-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Functions can take inputs (parameters) and return a value to the caster.",
          explanation: [
            { concept: "Mana Inputs", detail: "Parameters are values sent into the spell. Example: void blast(int power)." },
            { concept: "Essence Return", detail: "The return keyword sends a piece of mana back to the main ritual for further use." }
          ],
          tasks: [
            "Task: Create an int manaSynthesis(int a, int b) that returns their addition. Print the result in main()."
          ],
          rules: [
            "The return value must match the ritual's prefix type (int)."
          ]
        },
        objective: "Heal the heart by passing power between circles using parameters and returns.",
        startingCode: "#include <stdio.h>\n\n// Task: int manaSynthesis(int a, int b)\n\n\nint main() {\n    int result = manaSynthesis(100, 50);\n    // Task: printf the result\n\n\n    return 0;\n}\n",
        validationStrings: ["int manaSynthesis", "return", "printf"],
        hints: ["`return a + b;` inside your function, then `printf(\"%d\", result);` in main."],
        successLine: "MANA SYNTHESIZED. The heart pulses with renewed strength.",
        errorLine: "SPELL MISMATCH. The Mana returned was corrupted. Check your logic and return type.",
        successImage: "/level-bgs/fantasy-3-success.png",
        whatYouLearned: ["Mana passing (Parameters)", "Essence return (Return values)"]
      },
      {
        id: 9,
        title: "Level 3.3: Scope & Memory - The Ley-Line Reach",
        storyNodes: [
          { text: "“Variables have boundaries. Local mana lives only inside a ritual. Global mana flows through every ley-line in the program.”", bgImage: "/level-bgs/fantasy-3-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Understanding where mana can be accessed is the key to deep magic. Global variables exist outside all ritual circles.",
          explanation: [
            { concept: "Global Ley-Lines", detail: "Global variables are declared outside of main() and all functions. They are accessible everywhere." },
            { concept: "Local Circles", detail: "Local variables are created inside a circle and vanish once the incantation is finished." }
          ],
          tasks: [
            "Task: Create a global variable int mana_pool = 1000. Create a function void checkPool() that prints it, then call checkPool() in main()."
          ],
          rules: [
            "Global mana must be defined before use at the top level."
          ]
        },
        objective: "Bridge the global mana pool by accessing ley-lines across different ritual scopes.",
        startingCode: "#include <stdio.h>\n\n// Task: Global int mana_pool = 1000;\n\n// Task: function void checkPool() that prints mana_pool\n\n\nint main() {\n    // Task: Call checkPool()\n\n\n    return 0;\n}\n",
        validationStrings: ["int mana_pool", "1000", "void checkPool", "checkPool()", "printf"],
        hints: ["Place `int mana_pool = 1000;` at the very top of your scroll (file)."],
        successLine: "LEY-LINES REACHED. You have tapped into the infinite mana pool.",
        errorLine: "POOL UNREACHABLE. The variable scope was not shared globally.",
        successImage: "/level-bgs/fantasy-3-success.png",
        whatYouLearned: ["Global mana vs Local energy", "Variable accessibility"]
      },
      {
        id: 10,
        title: "Level 3.4: Recursion Protocol - The Infinite Mirror",
        storyNodes: [
          { text: "“The final ritual... The Infinite Mirror. A spell that calls upon itself to solve the puzzle of eternity.”", bgImage: "/level-bgs/fantasy-3-bg1.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        briefing: {
          overview: "Recursion is the art of self-summoning. A function calls itself to solve smaller pieces of a greater mystery.",
          explanation: [
            { concept: "Self-Summoning (Recursion)", detail: "A ritual that calls itself. It MUST have a 'Reflection Clause' (Base Case) or it will consume all mana forever (Stack Overflow)." },
            { concept: "The Mirror Step", detail: "If the end is not reached, call the ritual again with a smaller value: mirror(n-1)." }
          ],
          tasks: [
            "Task: Create a recursive function void reflection(int n) that prints n down to 1. Base case: if(n == 0) return;"
          ],
          rules: [
            "Every mirror ritual must have a reflection clause (base case)."
          ]
        },
        objective: "Master the infinite mirror by implementing a self-summoning recursive countdown.",
        startingCode: "#include <stdio.h>\n\n// Task: void reflection(int n)\n\n\nint main() {\n    reflection(3);\n    return 0;\n}\n",
        validationStrings: ["void reflection", "if", "return", "reflection(n - 1)", "printf"],
        hints: ["Print n, then call `reflection(n - 1)` if n hasn't reached the reflection clause (0)."],
        successLine: "LEY-LINES TOUCHED. You have mastered the core of reality. Graduation complete.",
        errorLine: "ARCANIC OVERFLOW. The mirror ritual never ended. Check your base case.",
        successImage: "/level-bgs/fantasy-3-success.png",
        whatYouLearned: ["Self-summoning logic", "Reflection clauses (Base cases)", "Advanced ritual flow"]
      }
    ]
  }
};
