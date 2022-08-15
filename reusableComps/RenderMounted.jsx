import { useEffect, useState } from "react";

const RenderMounted = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return children;
};

export default RenderMounted;
