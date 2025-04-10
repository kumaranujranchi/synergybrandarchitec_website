// Simple in-memory visitor counter implementation
let visitorCount = 0;

export const incrementVisitorCount = (): number => {
  visitorCount++;
  return visitorCount;
};

export const getVisitorCount = (): number => {
  return visitorCount;
};