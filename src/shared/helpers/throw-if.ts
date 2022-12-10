export const throwIf = (e: Error, clause: boolean) => {
  if (clause) {
    throw e;
  }
};
