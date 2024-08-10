import { statusColors } from "./CharacterStatusIndicator.constants";

export const getStatusColor = (status) => statusColors[status] || "gray";
