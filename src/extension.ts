import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  // Registra o comando para poder ativar manualmente também
  let disposable = vscode.commands.registerCommand(
    "extension.openReadme",
    async () => {
      await openReadmeFile();
    }
  );

  context.subscriptions.push(disposable);

  // Abre o README automaticamente quando a extensão é ativada
  openReadmeFile();
}

async function openReadmeFile() {
  try {
    if (!vscode.workspace.workspaceFolders) {
      vscode.window.showInformationMessage("Nenhum workspace aberto.");
      return;
    }

    const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const readmePath = vscode.Uri.file(path.join(rootPath, "README.md"));

    try {
      await vscode.workspace.fs.stat(readmePath);
      await vscode.commands.executeCommand("markdown.showPreview", readmePath);
    } catch (error) {
      vscode.window.showInformationMessage(
        "Arquivo README.md não encontrado no workspace."
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage("Erro ao abrir README.md: " + error);
  }
}

export function deactivate() {}
