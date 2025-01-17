function obfuscate() {
  const inputCode = document.getElementById("input").value;

  if (!inputCode) {
    alert("Please paste some Lua code to obfuscate!");
    return;
  }

  // Step 1: Rename Variables
  const renamedVariables = {};
  let variableCounter = 0;

  const obfuscatedCode = inputCode
    .replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, (match) => {
      if (!renamedVariables[match]) {
        renamedVariables[match] = `_var${variableCounter++}`;
      }
      return renamedVariables[match];
    })

    // Step 2: Encode Strings
    .replace(/"([^"]*)"|'([^']*)'/g, (match, p1, p2) => {
      const str = p1 || p2;
      const encoded = Array.from(str)
        .map((char) => `\\${char.charCodeAt(0).toString(16)}`)
        .join("");
      return `"${encoded}"`;
    })

    // Step 3: Add Junk Code
    .replace(/;/g, () => {
      const junk = `_junkVar${Math.floor(Math.random() * 1e5)} = math.random();`;
      return `; ${junk}`;
    });

  // Step 4: Wrap Code in an Infinite Loop with Control Break
  const wrappedCode = `
    repeat
      local AX = math.random()
      if AX > 0.5 then
        ${obfuscatedCode}
        break
      end
    until false
  `;

  // Output the obfuscated code
  document.getElementById("output").innerText = wrappedCode;
}

function clearFields() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}