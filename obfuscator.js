function obfuscate() {
  const inputCode = document.getElementById("input").value;

  if (!inputCode) {
    alert("Please paste some Lua code to obfuscate!");
    return;
  }

  // Step 1: Minify the Lua Code
  const minifiedCode = inputCode
    .replace(/--.*?\n/g, "") // Remove comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/\s*([=\(\)\{\},;])\s*/g, "$1") // Remove spaces around operators
    .trim();

  // Step 2: Rename Variables with Obscure Names
  const renamedVariables = {};
  let variableCounter = 0;

  let obfuscatedCode = minifiedCode
    .replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, (match) => {
      if (!renamedVariables[match]) {
        renamedVariables[match] = `_${Math.random().toString(36).substr(2, 8)}`;
      }
      return renamedVariables[match];
    })

    // Step 3: Encrypt Strings with Layered Encoding
    .replace(/"([^"]*)"|'([^']*)'/g, (match, p1, p2) => {
      const str = p1 || p2;
      const encrypted = Array.from(str)
        .map((char) => `string.char(${char.charCodeAt(0) ^ 0x55})`)
        .join(" .. ");
      return `(${encrypted})`;
    });

  // Step 4: Insert Extensive Junk Code
  const junkLine = () => {
    const randomChars = Array.from({ length: Math.random() * 100 + 50 }, () => {
      const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
      return pool[Math.floor(Math.random() * pool.length)];
    }).join("");
    return `-- ${randomChars}\n`;
  };

  const junkBlock = Array.from({ length: 100 + Math.random() * 200 })
    .map(junkLine)
    .join("");

  obfuscatedCode = `${junkBlock}${obfuscatedCode}${junkBlock}`;

  // Step 5: Add Runtime Control Flow Obfuscation
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

  // Step 6: Add a Recursive Execution Layer with More Junk Code
  const recursiveCode = `
    local function recursiveLayer(n)
      if n <= 0 then
        ${wrappedCode}
      else
        -- Recursive Junk Layer
        ${junkBlock}
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