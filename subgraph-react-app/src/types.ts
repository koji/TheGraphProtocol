export type UserType = {
  id: string;
  tokens: TokenType[];
  created: TokenType[];
};

export type TokenType = {
  id: string;
  tokenID: number;
  contentURI: string;
  tokenIPFSPath: string;
  name: string;
  createdAtTimestamp: number;
  creator: UserType;
  owner: UserType;
};

export type ContentData = {
  name: string;
  description: string;
  image: string;
};
