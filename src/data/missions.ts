export interface Mission {
  id: number;
  title: string;
  story: string;
  objective: string;
  startingCode: string;
  expectedOutput?: string;
  hints: string[];
}

// Grouped by Language -> Story Theme -> Missions[]
export const missionsData: Record<string, Record<string, Mission[]>> = {
  python: {
    cyberpunk: [
      {
        id: 1,
        title: "Initialize System Grid",
        story: "You enter the neon-lit back alley connecting to the central mainframe. Your cybernetic implant buzzes. 'We need to bypass the gateway protocol,' whispers your handler. 'Declare an access token to proceed.'",
        objective: "Declare an integer variable named `access_token` and set it to 1010.",
        startingCode: "# Initialize your access token below\n",
        hints: ["In Python, you simply write the variable name, an equals sign, and the value."]
      }
    ],
    fantasy: [
      {
        id: 1,
        title: "The First Enchantment",
        story: "The ancient tome reveals its secrets in glowing runes. 'Before drawing power from the leylines, an apprentice must center their core,' reads the master archmage. 'Focus your mana.'",
        objective: "Declare an integer variable named `mana_core` and set it to 1010.",
        startingCode: "# Focus your mana core below\n",
        hints: ["In Python, you simply write the variable name, an equals sign, and the value."]
      }
    ]
  },
  c: {
    cyberpunk: [
      {
        id: 1,
        title: "Initialize System Grid",
        story: "You enter the neon-lit back alley connecting to the central mainframe. Your cybernetic implant buzzes. 'We need to bypass the gateway protocol,' whispers your handler. 'Declare an access token to proceed.'",
        objective: "Declare an integer variable named `access_token` and set it to 1010.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Initialize your access_token here\n    \n    return 0;\n}\n",
        hints: ["In C, you must specify the type 'int' before the variable name."]
      }
    ],
    fantasy: [
      {
        id: 1,
        title: "The First Enchantment",
        story: "The ancient tome reveals its secrets in glowing runes. 'Before drawing power from the leylines, an apprentice must center their core,' reads the master archmage. 'Focus your mana.'",
        objective: "Declare an integer variable named `mana_core` and set it to 1010.",
        startingCode: "#include <stdio.h>\n\nint main() {\n    // Focus your mana_core here\n    \n    return 0;\n}\n",
        hints: ["In C, you must specify the type 'int' before the variable name."]
      }
    ]
  }
};
