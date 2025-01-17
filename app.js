document.getElementById('obfuscateButton').addEventListener('click', () => {
    const inputCode = document.getElementById('inputCode').value;
    const obfuscatedCode = obfuscateLuaCode(inputCode);
    document.getElementById('outputCode').value = obfuscatedCode;
});