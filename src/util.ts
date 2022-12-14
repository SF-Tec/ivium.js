export const getIviumDllPath = () => {
  const architecture = process.arch === 'x64' ? '64' : '';

  return `${__dirname}\\dlls\\Ivium_remdriver${architecture}.dll`;
};
