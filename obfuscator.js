function obfuscate() {
    const inputCode = document.getElementById("inputCode").value;

    if (!inputCode.trim()) {
        alert("Please enter LuaU code to obfuscate!");
        return;
    }

    // Custom VM and encoding logic
    const encode = (str) => {
        const key = 129; // Simple XOR key
        return str
            .split("")
            .map((char) => char.charCodeAt(0) ^ key)
            .map((code) => String.fromCharCode(code))
            .join("");
    };

    const createVM = (encodedCode) => {
        return `
local encoded = "${encodedCode}"
local decode = function(data)
    local key = 129
    local result = ""
    for i = 1, #data do
        local char = data:sub(i, i)
        result = result .. string.char(string.byte(char) ~ key)
    end
    return result
end

local chunk = load(decode(encoded))
chunk()
`;
    };

    // Obfuscation process
    const encodedCode = encode(inputCode);
    const obfuscatedScript = createVM(encodedCode);

    // Display obfuscated code
    const outputCode = document.getElementById("outputCode");
    outputCode.textContent = obfuscatedScript;
}