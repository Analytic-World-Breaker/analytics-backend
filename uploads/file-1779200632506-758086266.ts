// src/engines/injection/bridge/types.ts

export type SOTChannel = "sot-cms";
export const SOT_CHANNEL: SOTChannel = "sot-cms";
export const SOT_VERSION = 1;

export type BBox = { x: number; y: number; width: number; height: number };

/* ---------- Parent -> Iframe ---------- */

export type DiscoverRequestMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_DISCOVER_REQUEST";
};

export type MeasureRequestMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_MEASURE_REQUEST";
  targetId: string;
};

export type SelectRequestMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_SELECT_REQUEST";
  targetId: string | null;
};

export type MoveRequestMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_MOVE_REQUEST";
  targetId: string;
  dx: number;
  dy: number;
};

export type ResizeRequestMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_RESIZE_REQUEST";
  targetId: string;
  dw: number;
  dy: number;
  handle: string;
};

export type ApplyPatchesMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_APPLY_PATCHES";
  targetId: string;
  patches: any[];
};

export type UndoRequestMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_UNDO_REQUEST";
};

export type RedoRequestMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_REDO_REQUEST";
};

export type ParentToIframeMessage =
  | DiscoverRequestMessage
  | MeasureRequestMessage
  | SelectRequestMessage
  | MoveRequestMessage
  | ResizeRequestMessage
  | ApplyPatchesMessage
  | UndoRequestMessage
  | RedoRequestMessage;

/* ---------- Iframe -> Parent ---------- */

export type IframeReadyMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_IFRAME_READY";
};

export type TargetClickMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_TARGET_CLICK";
  targetId: string;
};

export type MeasureResponseMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_MEASURE_RESPONSE";
  targetId: string;
  bbox: BBox;
};

export type DiscoverResponseMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_DISCOVER_RESPONSE";
  targets: Array<{
    id: string;
    label?: string;
    bbox: BBox;
    meta?: Record<string, any>;
  }>;
};

export type MoveAppliedMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_MOVE_APPLIED";
  targetId: string;
  dx: number;
  dy: number;
  bbox?: BBox;
};

export type ResizeAppliedMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_RESIZE_APPLIED";
  targetId: string;
  dw: number;
  dy: number;
  handle: string;
  bbox: BBox;
};

export type PatchesAppliedMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_PATCHES_APPLIED";
  targetId: string;
  bbox: BBox;
};

export type TextEditedMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_TEXT_EDITED";
  targetId: string;
  text: string;
};

export type ShortcutUndoMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_SHORTCUT_UNDO";
};

export type ShortcutRedoMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_SHORTCUT_REDO";
};

export type HistoryAppliedMessage = {
  channel: SOTChannel;
  version: number;
  type: "SOT_HISTORY_APPLIED";
  targetId: string | null;
  bbox?: BBox;
};

export type IframeToParentMessage =
  | IframeReadyMessage
  | DiscoverResponseMessage
  | TargetClickMessage
  | MeasureResponseMessage
  | MoveAppliedMessage
  | ResizeAppliedMessage
  | PatchesAppliedMessage
  | TextEditedMessage
  | ShortcutUndoMessage
  | ShortcutRedoMessage
  | HistoryAppliedMessage;
