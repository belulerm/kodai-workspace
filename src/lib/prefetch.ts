let prefetched = false;

export const prefetchWorkspace = () => {
  if (prefetched) return;
  prefetched = true;
  import('../pages/Workspace');
  import('../components/workspace/CodeEditor');
};
