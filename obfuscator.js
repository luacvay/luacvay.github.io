function obfuscate() {
  const inputCode = document.getElementById("input").value;

  if (!inputCode) {
    alert("Please paste some Lua code to obfuscate!");
    return;
  }

  // Step 1: Rename Variables with Obscure Names
  const renamedVariables = {};
  let variableCounter = 0;

  let obfuscatedCode = inputCode
    .replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, (match) => {
      if (!renamedVariables[match]) {
        renamedVariables[match] = `_${Math.random().toString(36).substr(2, 8)}`;
      }
      return renamedVariables[match];
    })

    // Step 2: Encrypt Strings with Layered Encoding
    .replace(/"([^"]*)"|'([^']*)'/g, (match, p1, p2) => {
      const str = p1 || p2;
      const encrypted = Array.from(str)
        .map((char) => `string.char(${char.charCodeAt(0) ^ 0x55})`)
        .join(" .. ");
      return `".." .. (${encrypted}) .. ".."`;
    });

  // Step 3: Insert Junk Code
  const junkCode = `
    local function junk()
      for i = 1, math.random(10, 100) do
        _junkVar${Math.random().toString(36).substr(2, 8)} = math.random()
      end
    end
    junk()
  `;
  obfuscatedCode = obfuscatedCode.split(";").join(`; ${junkCode}`);

  // Step 4: Add Runtime Control Flow Obfuscation
  const wrappedCode = `
    local function _hiddenExec()
      local _key = 0xAA
      local function decrypt(val) return val ~ _key end
      local codes = "${Buffer.from(obfuscatedCode).toString("base64")}"
      local decoded = loadstring(codes:gsub(".", function(c)
        return string.char(decrypt(string.byte(c)))
      end))
      decoded()
    end
    _hiddenExec()
  `;

  // Step 5: Add a Layer of Recursive Control Flow
  const recursiveCode = `
    local function recursiveLayer(n)
      if n <= 0 then
        ${wrappedCode}
      else
        recursiveLayer(n - 1)
      end
    end
    recursiveLayer(math.random(5, 10))
  `;

  // Final Output
  document.getElementById("output").innerText = recursiveCode;
}

function clearFields() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}