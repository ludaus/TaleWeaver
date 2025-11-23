// TaleWeaver shared types - AGPLv3
export type StoryTextBlock = {
  id: string;
  htmlContent: string;
  displayMode: "onEnter" | "onClickNext";
};

export type PlayerStoryNode = {
  id: string;
  title: string;
  nodeType: "ROOT" | "DEFAULT";
  positionX: number;
  positionY: number;
  textBlocks: StoryTextBlock[];
  outgoingLinks: PlayerStoryLink[];
};

export type PlayerStoryLink = {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  label?: string | null;
  orderIndex: number;
};

export type StoryVersionPayload = {
  id: string;
  name: string;
  description: string;
  nodes: PlayerStoryNode[];
};
