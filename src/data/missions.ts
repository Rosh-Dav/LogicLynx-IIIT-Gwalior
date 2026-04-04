export interface StoryNode {
  text: string;
  bgImage?: string;
  characterName?: string;
  characterImage?: string;
}

export interface Mission {
  id: number;
  title: string;
  storyNodes: StoryNode[];
  objective: string;
  startingCode: string;
  expectedOutput?: string;
  hints: string[];
  successLine?: string;
  errorLine?: string;
}

// Grouped by Language -> Story Theme -> Missions[]
export const missionsData: Record<string, Record<string, Mission[]>> = {
  python: {
    cyberpunk: [
      {
        id: 1,
        title: "Initialize System Grid",
        storyNodes: [
          { text: "You enter the neon-lit back alley connecting to the central mainframe. Your cybernetic implant buzzes.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "'We need to bypass the gateway protocol,' whispers your handler. 'Declare an access token to proceed.'", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "A variable is like an empty data chip. You must assign it a specific label so the framework knows how to reference it using an equals sign. For example, `status = 1` stores the number 1 inside the label 'status'.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Declare an integer variable named `access_token` and set it to 1010.",
        startingCode: "# Initialize your access token below\n",
        hints: ["In Python, you simply write the variable name, an equals sign, and the value."],
        successLine: "Access granted. Excellent execution, NetRunner. The firewall is down.",
        errorLine: "Syntax rejected. You've hit an exception. Review your variable initialization."
      }
    ],
    fantasy: [
      {
        id: 1,
        title: "The First Enchantment",
        storyNodes: [
          { text: "The ancient tome reveals its secrets in glowing runes.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'Before drawing power from the leylines, an apprentice must center their core,' reads the master archmage. 'Focus your mana.'", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "Think of a variable as an ancient magical vessel. You must grant it a true name, and then fill it with energy using an equals sign. For example, `runes = 1` binds the number 1 to the word 'runes'.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Declare an integer variable named `mana_core` and set it to 1010.",
        startingCode: "# Focus your mana core below\n",
        hints: ["In Python, you simply write the variable name, an equals sign, and the value."],
        successLine: "Incredible. The leylines flow perfectly through your spell. The gate opens.",
        errorLine: "Your mana fizzled. Check your enchantments carefully; magic requires exact phrasing."
      }
    ]
  },
  c: {
    cyberpunk: [
      {
        id: 1,
        title: "Initialize System Grid",
        storyNodes: [
          { text: "You enter the neon-lit back alley connecting to the central mainframe. Your cybernetic implant buzzes.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "'We need to bypass the gateway protocol,' whispers your handler. 'Declare an access token to proceed.'", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" },
          { text: "A variable is like an empty data chip. You must first declare its data type (like `int`) and label, then assign it using an equals sign. For example, `int status = 1;` initializes the integer 1 into 'status'.", bgImage: "/cyberpunk-bg.jpg", characterName: "THE HANDLER", characterImage: "/avatars/handler.png" }
        ],
        objective: "Declare an integer variable named `access_token` and set it to 1010.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Initialize your access_token here\n    \n    return 0;\n}\n",
        hints: ["In C, you must specify the type 'int' before the variable name."],
        successLine: "Access granted. Excellent execution, NetRunner. The firewall is down.",
        errorLine: "Syntax rejected. You've hit an exception. Review your variable initialization."
      }
    ],
    fantasy: [
      {
        id: 1,
        title: "The First Enchantment",
        storyNodes: [
          { text: "The ancient tome reveals its secrets in glowing runes.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "'Before drawing power from the leylines, an apprentice must center their core,' reads the master archmage. 'Focus your mana.'", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" },
          { text: "Think of a variable as an ancient magical vessel. You must decree its composition (like `int`), grant it a true name, and fill it using an equals sign. For example, `int runes = 1;` binds 1 into the 'runes' vessel.", bgImage: "/fantasy-bg.jpg", characterName: "ARCHMAGE VORDRID", characterImage: "/avatars/archmage.png" }
        ],
        objective: "Declare an integer variable named `mana_core` and set it to 1010.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Focus your mana_core here\n    \n    return 0;\n}\n",
        hints: ["In C, you must specify the type 'int' before the variable name."],
        successLine: "Incredible. The leylines flow perfectly through your spell. The gate opens.",
        errorLine: "Your mana fizzled. Check your enchantments carefully; magic requires exact phrasing."
      }
    ]
  }
};
