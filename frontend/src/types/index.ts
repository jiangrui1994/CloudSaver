export interface Resource {
  id: string;
  title: string;
  channel: string;
  channelId?: string;
  cloudLinks: string[];
  pubDate: string;
  cloudType: string;
  messageId?: string;
}

export interface ShareInfo {
  fileId: string;
  fileName: string;
  fileSize: number;
  fileIdToken?: string;
}

export interface ShareInfoResponse {
  data: {
    list: ShareInfo[];
    pwdId?: string;
    stoken?: string;
    shareCode?: string;
    receiveCode?: string;
  };
}

export interface Folder {
  cid: string;
  name: string;
  path?: Folder[];
}

export interface SaveFileParams {
  shareCode: string;
  receiveCode: string;
  fileId: string;
  folderId: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Save115FileParams {
  shareCode: string;
  receiveCode: string;
  fileId: string;
  folderId: string;
}

export interface SaveQuarkFileParams {
  fid_list: string[];
  fid_token_list: string[];
  to_pdir_fid: string;
  pwd_id: string;
  stoken: string;
  pdir_fid: string;
  scene: string;
}