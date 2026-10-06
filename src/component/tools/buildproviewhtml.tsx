interface interFile {
    Name: string;
    Kind: string;
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle;
    children?: interFile[];
    isOpen?: boolean;
  }
  
export const findFile = (files: interFile[], name: string): interFile | null => {
    for (const f of files) {
      if (f.Name === name) return f;
      if (f.children) {
        const found = findFile(f.children, name);
        if (found) return found;
      }
    }
    return null;
  };

export async function buildPreviewHtml(htmlContent: string, allFiles: interFile[]): Promise<string> {
  const findFile = (files: interFile[], name: string): interFile | null => {
    for (const f of files) {
      if (f.Name === name) return f;
      if (f.children) {
        const found = findFile(f.children, name);
        if (found) return found;
      }
    }
    return null;
  };

  const readFileContent = async (file: interFile): Promise<string> => {
    const handle = file.handle as FileSystemFileHandle;
    const fileObj = await handle.getFile();
    return await fileObj.text();
  };

  let result = htmlContent;

  const linkRegex = /<link[^>]+href=["']([^"']+)["'][^>]*>/g;
  let match;
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const cssFile = findFile(allFiles, match[1]);
    if (cssFile) {
      const cssContent = await readFileContent(cssFile);
      result = result.replace(match[0], `<style>${cssContent}</style>`);
    }
  }

  const scriptRegex = /<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/g;
  while ((match = scriptRegex.exec(htmlContent)) !== null) {
    const jsFile = findFile(allFiles, match[1]);
    if (jsFile) {
      const jsContent = await readFileContent(jsFile);
      result = result.replace(match[0], `<script>${jsContent}<\/script>`);
    }
  }

  return result;
}