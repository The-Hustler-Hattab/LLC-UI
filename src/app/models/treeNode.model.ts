

export interface FolderNode {
    data: {
      name: string;
      type: "Folder";
    };
    children: (FolderNode | FileNode)[];
}


export interface FileNode {
    data: {
      name: string;
      path: string;
      type: "File";
    };
}

export type TreeNode = FolderNode | FileNode;
