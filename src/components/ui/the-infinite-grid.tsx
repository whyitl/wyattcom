"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import { FileTree } from "./file-tree";
import { FloatingWindow, Window } from "./floating-window";
import { TimeDisplay } from "./time-display";

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  extension?: string
}

const defaultFileStructure: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "button.tsx", type: "file", extension: "tsx" },
          { name: "card.tsx", type: "file", extension: "tsx" },
          { name: "input.tsx", type: "file", extension: "tsx" },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [
          { name: "use-theme.ts", type: "file", extension: "ts" },
          { name: "use-auth.ts", type: "file", extension: "ts" },
        ],
      },
      { name: "app.tsx", type: "file", extension: "tsx" },
      { name: "index.tsx", type: "file", extension: "tsx" },
    ],
  },
  {
    name: "about.md",
    type: "file",
    extension: "md",
  },
  {
    name: "instagram.txt",
    type: "file",
    extension: "txt",
  },
  {
    name: "linkedin.txt",
    type: "file",
    extension: "txt",
  },
  {
    name: "email-me.txt",
    type: "file",
    extension: "txt",
  },
  {
    name: "tucn-media.txt",
    type: "file",
    extension: "txt",
  },
  {
    name: "corrupted.dat",
    type: "file",
    extension: "dat",
  },
  {
    name: "block-game.game",
    type: "file",
    extension: "game",
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "logo.svg", type: "file", extension: "svg" },
      { name: "favicon.png", type: "file", extension: "png" },
    ],
  },
  { name: "package.json", type: "file", extension: "json" },
  { name: "README.md", type: "file", extension: "md" },
  { name: "styles.css", type: "file", extension: "css" },
]

const getTitleFromFileName = (fileName: string): string => {
  const titleMap: Record<string, string> = {
    "about.md": "About Me",
    "instagram.txt": "Instagram",
    "linkedin.txt": "LinkedIn",
    "email-me.txt": "Email Me",
    "tucn-media.txt": "TUCN Media",
    "corrupted.dat": "⚠️ CORRUPTED FILE",
    "block-game.game": "🎮 Block Game",
  }
  return titleMap[fileName] || fileName
}

export const Component = () => {
  const [windows, setWindows] = useState<Window[]>([])
  const [nextZIndex, setNextZIndex] = useState(100)
  const [isDraggingTree, setIsDraggingTree] = useState(false)
  const [treePosition, setTreePosition] = useState({ x: 16, y: 16 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);

    if (isDraggingTree) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setTreePosition({ x: newX, y: newY });
    }
  };

  const handleTreeDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingTree(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - treePosition.x,
        y: e.clientY - treePosition.y,
      });
    }
  };

  const handleTreeDragEnd = () => {
    setIsDraggingTree(false);
  };

  const handleFileClick = (fileName: string, fileType: string) => {
    // Only handle explorable files
    const validFiles = [
      "about.md",
      "instagram.txt",
      "linkedin.txt",
      "email-me.txt",
      "tucn-media.txt",
      "corrupted.dat",
      "block-game.game",
      "README.md",
      "package.json",
      "styles.css",
      "app.tsx",
    ]
    
    if (!validFiles.includes(fileName)) {
      return
    }

    // Check if window already exists
    if (windows.some(w => w.fileName === fileName)) {
      return
    }

    const windowCount = windows.length
    
    // Calculate safe position that keeps window on screen
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const isMobile = viewportWidth <= 768
    
    // Position windows
    let x: number
    let y: number
    
    if (isMobile) {
      // Mobile: Center the window on screen with offset for stacking
      const windowWidth = Math.min(viewportWidth - 32, 384)
      const windowHeight = 320
      
      x = (viewportWidth - windowWidth) / 2
      y = Math.max(60, (viewportHeight - windowHeight) / 2) + windowCount * 20
      
      // Ensure it's not off screen
      y = Math.min(y, viewportHeight - windowHeight - 20)
    } else {
      // Desktop: Original positioning
      x = 400 + windowCount * 20
      y = 50 + windowCount * 20
    }
    
    const newWindow: Window = {
      id: `${fileName}-${Date.now()}`,
      title: getTitleFromFileName(fileName),
      content: "",
      fileName: fileName,
      x,
      y,
      zIndex: nextZIndex,
    }

    setWindows([...windows, newWindow])
    setNextZIndex(nextZIndex + 1)
  }

  const handleCloseWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id))
  }

  const handleFocusWindow = (id: string) => {
    setNextZIndex(nextZIndex + 1)
    setWindows(
      windows.map(w =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      )
    )
  }

  const handlePositionChange = (id: string, x: number, y: number) => {
    setWindows(
      windows.map(w =>
        w.id === id ? { ...w, x, y } : w
      )
    )
  }

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const speedX = 0.5;
  const speedY = 0.5;

  React.useEffect(() => {
    const handleMouseUp = () => {
      handleTreeDragEnd();
    };

    if (isDraggingTree) {
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDraggingTree]);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + speedX) % 40);
    gridOffsetY.set((gridOffsetY.get() + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full h-screen overflow-hidden bg-background")}
    >
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/40 dark:bg-orange-600/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/40 dark:bg-blue-600/20 blur-[120px]" />
      </div>

      {/* Time Display */}
      <TimeDisplay />

      {/* File Tree in Top Left */}
      <FileTree
        data={defaultFileStructure}
        className="bg-white/95 backdrop-blur-sm shadow-lg"
        onFileClick={handleFileClick}
        isDraggable={true}
        position={treePosition}
        onDragStart={handleTreeDragStart}
        onDragEnd={handleTreeDragEnd}
      />

      {/* Floating Windows */}
      {windows.map(window => (
        <FloatingWindow
          key={window.id}
          window={window}
          onClose={handleCloseWindow}
          onFocus={handleFocusWindow}
          onPositionChange={handlePositionChange}
        />
      ))}
    </div>
  );
};

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: any;
  offsetY: any;
}) => (
  <svg className="w-full h-full">
    <defs>
      <motion.pattern
        id="grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x={offsetX}
        y={offsetY}
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-muted-foreground"
        />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);

