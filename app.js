document.getElementById("obfuscateButton").addEventListener("click", () => {
    const inputCode = document.getElementById("inputCode").value;
    const garbageVariable = document.getElementById("garbageVariable").value || "garbage";

    if (!inputCode.trim()) {
        alert("Please enter some LuaU code to obfuscate.");
        return;
    }

    const obfuscatedCode = obfuscateLuaU(inputCode, garbageVariable);
    document.getElementById("outputCode").value = obfuscatedCode;
});

function obfuscateLuaU(code, garbageVar) {
    const garbageCode = generateGarbage(garbageVar, 20);
    const encodedScript = encodeWithVM(code);
    
    return `
-- Garbage Code
${garbageCode}

-- Obfuscated LuaU Script
local function decodeVM(encoded)
    local instructions = {
        -- VM decoding instructions (example for demo purposes)
        [1] = function(a, b) return a + b end,
        [2] = function(a, b) return a - b end,
        [3] = function(a, b) return a * b end,
        [4] = function(a, b) return a / b end,
    }
    local result = ""
    for i = 1, #encoded do
        local op, a, b = string.byte(encoded, i, i + 2)
        result = result .. instructions[op](a, b)
    end
    return result
end

local encodedScript = [[${encodedScript}]]

-- Decode and execute
local decodedScript = decodeVM(encodedScript)
load(decodedScript)()
`;
}

function generateGarbage(varName, count) {
    let garbage = "";
    for (let i = 0; i < count; i++) {
        const randomValue = Math.random() * 100;
        garbage += `local ${varName}_${i} = ${randomValue}\n`;
    }
    return garbage;
}

function encodeWithVM(code) {
    const instructions = [];
    for (let i = 1; i <= code.length; i++) {
        const char = code.charCodeAt(i - 1);
        const a = Math.floor(char / 2);
        const b = char - a;
        const op = Math.random() > 0.5 ? 1 : 3; // Randomly choose addition or multiplication
        instructions.push(String.fromCharCode(op, a, b));
    }
    return instructions.join("");
}