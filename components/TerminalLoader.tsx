"use client";

import type { CSSProperties } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type TerminalLine = {
  id: string;
  type: "system" | "success" | "warning" | "error" | "command";
  text: string;
};

type InstallStep = {
  at: number;
  label: string;
};

const bootSequence = [
  "[boot] Initializing terminal shell...",
  "[boot] Mapping interface modules...",
  "[boot] Loading animation drivers...",
  "[boot] Checking portfolio routes...",
  "[boot] UI systems online.",
] as const;

const helpEntries = [
  ["help", "show every command and what it does"],
  ["start", "launch the portfolio"],
  ["clear", "clear all terminal output"],
  ["next.skip", "toggle whether the terminal is skipped next visit"],
  ["page.light", "switch the site to light mode and open it"],
  ["page.dark", "switch the site to dark mode and open it"],
  ["status", "show the fake server status board"],
  ["version", "show the current app package versions"],
  ["matrix", "print the component version matrix"],
  ["hack", "run the fake green-code hacking sequence"],
  ["coffee", "run the brewing animation"],
] as const;

const installSteps: InstallStep[] = [
  { at: 6, label: "Resolving dependency graph..." },
  { at: 18, label: "Fetching react@19.2.3..." },
  { at: 34, label: "Installing next@16.1.6..." },
  { at: 49, label: "Linking package tree..." },
  { at: 66, label: "Building client bundles..." },
  { at: 82, label: "Injecting UI modules..." },
  { at: 95, label: "Preparing browser runtime..." },
] as const;

const TERMINAL_SKIP_STORAGE_KEY = "w4whiskers-terminal-skip";
const PAGE_THEME_STORAGE_KEY = "w4whiskers-page-theme";
const OPEN_TERMINAL_EVENT = "portfolio:open-terminal";

const matrixColumns = Array.from({ length: 22 }, (_, index) => ({
  id: `matrix-col-${index}`,
  text: Array.from({ length: 14 }, (_, row) => ((index + row) % 3 === 0 ? "1" : "0")).join(" "),
  duration: 2.6 + (index % 5) * 0.45,
  delay: (index % 6) * 0.18,
}));

const sleep = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const applyPageTheme = (theme: "light" | "dark") => {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(PAGE_THEME_STORAGE_KEY, theme);
};

export default function TerminalLoader() {
  const [sessionKey, setSessionKey] = useState(0);
  const [phase, setPhase] = useState<"boot" | "command" | "launch" | "exit" | "done">(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem(TERMINAL_SKIP_STORAGE_KEY) === "true"
    ) {
      return "done";
    }

    return "boot";
  });
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [installLabel, setInstallLabel] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [activeEffect, setActiveEffect] = useState<null | "hack" | "coffee">(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  const bootStartedRef = useRef(false);
  const shouldAutoScrollRef = useRef(true);

  const promptLabel = useMemo(() => "visitor@w4whiskers:~$", []);

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem(PAGE_THEME_STORAGE_KEY) === "light" ? "light" : "dark";
    applyPageTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (
      sessionKey === 0 &&
      window.localStorage.getItem(TERMINAL_SKIP_STORAGE_KEY) === "true"
    ) {
      return;
    }

    if (bootStartedRef.current) {
      return;
    }

    bootStartedRef.current = true;
    isMountedRef.current = true;

    const runBootSequence = async () => {
      for (const [index, entry] of bootSequence.entries()) {
        if (!isMountedRef.current) {
          return;
        }

        setLines((current) => [
          ...current,
          {
            id: `boot-${sessionKey}-${index}`,
            type: index === bootSequence.length - 1 ? "success" : "system",
            text: entry,
          },
        ]);

        await sleep(360);
      }

      if (!isMountedRef.current) {
        return;
      }

      setLines((current) => [
        ...current,
        {
          id: `boot-prompt-${sessionKey}`,
          type: "warning",
          text: 'Type "start" to enter the portfolio.',
        },
        {
          id: `boot-hint-${sessionKey}`,
          type: "warning",
          text: 'Click the command box below, type "start" or "help", and press Enter.',
        },
        {
          id: `boot-skip-${sessionKey}`,
          type: "system",
          text: 'Available commands: "help", "start", "clear", "next.skip", "page.light", "page.dark", "status", "version", "matrix", "hack", and "coffee".',
        },
      ]);
      setPhase("command");
    };

    void runBootSequence();

    return () => {
      isMountedRef.current = false;
    };
  }, [sessionKey]);

  useEffect(() => {
    if (phase === "command") {
      const input = inputRef.current;
      input?.focus();
      input?.select();
      if (input) {
        const length = input.value.length;
        input.setSelectionRange(length, length);
      }
    }
  }, [phase]);

  useLayoutEffect(() => {
    const outputEnd = outputEndRef.current;

    if (!outputEnd || !shouldAutoScrollRef.current) {
      return;
    }

    const scrollToBottom = () => {
      outputEnd.scrollIntoView({ block: "end" });
    };

    scrollToBottom();
    const frame = window.requestAnimationFrame(scrollToBottom);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [lines, installLabel, progressPercent, activeEffect, phase]);

  const progressBar = useMemo(() => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((progressPercent / 100) * totalBlocks);

    return Array.from({ length: totalBlocks }, (_, index) => ({
      id: `block-${index}`,
      filled: index < filledBlocks,
    }));
  }, [progressPercent]);

  const appendLine = (type: TerminalLine["type"], text: string) => {
    setLines((current) => [
      ...current,
      {
        id: `line-${sessionKey}-${current.length}`,
        type,
        text,
      },
    ]);
  };

  const runHackSequence = async () => {
    setActiveEffect("hack");
    appendLine("warning", "[hack] Access request accepted. Starting faux intrusion...");
    await sleep(280);
    appendLine("system", "[hack] Bypassing portfolio firewall...");
    await sleep(240);
    appendLine("system", "[hack] Injecting green-code visualizer...");
    await sleep(260);
    appendLine("success", "[hack] Root access: granted (cinematic mode).");
    await sleep(1500);
    setActiveEffect(null);
    appendLine("warning", "[hack] Sequence complete. No actual systems were touched.");
  };

  const runCoffeeSequence = async () => {
    setActiveEffect("coffee");
    appendLine("system", "[coffee] Heating water...");
    await sleep(420);
    appendLine("system", "[coffee] Grinding beans...");
    await sleep(420);
    appendLine("warning", "[coffee] Brewing...");
    await sleep(1600);
    setActiveEffect(null);
    appendLine("success", "[coffee] Fresh cup deployed. Productivity +12.");
  };

  const runStartSequence = async () => {
    setPhase("launch");
    setInstallLabel("Initializing package manager...");
    setProgressPercent(0);

    setLines((current) => [
      ...current,
      {
        id: `start-sequence-${sessionKey}-${current.length}`,
        type: "system",
        text: "[pm] Installing portfolio dependencies...",
      },
    ]);

    let stepIndex = 0;
    for (let percent = 0; percent <= 100; percent += 2) {
      if (!isMountedRef.current) {
        return;
      }

      while (stepIndex < installSteps.length && percent >= installSteps[stepIndex].at) {
        const currentStep = installSteps[stepIndex];
        setInstallLabel(currentStep.label);
        setLines((current) => [
          ...current,
          {
            id: `install-step-${sessionKey}-${current.length}`,
            type: "system",
            text: `[pm] ${currentStep.label}`,
          },
        ]);
        stepIndex += 1;
      }

      setProgressPercent(percent);
      await sleep(percent < 70 ? 85 : 115);
    }

    setInstallLabel("Dependencies installed.");
    setLines((current) => [
      ...current,
      {
        id: `start-ready-${sessionKey}-${current.length}`,
        type: "success",
        text: "[pm] Install complete. Launching client...",
      },
      {
        id: `start-final-${sessionKey}-${current.length + 1}`,
        type: "success",
        text: "[exec] Portfolio ready.",
      },
    ]);

    if (!isMountedRef.current) {
      return;
    }

    setPhase("exit");
    await sleep(520);

    if (!isMountedRef.current) {
      return;
    }

    setPhase("done");
  };

  const closeTerminalToSite = async (themeMessage: string) => {
    setLines((current) => [
      ...current,
      {
        id: `theme-${sessionKey}-${current.length}`,
        type: "success",
        text: themeMessage,
      },
      {
        id: `theme-open-${sessionKey}-${current.length + 1}`,
        type: "success",
        text: "[exec] Opening portfolio...",
      },
    ]);

    await sleep(280);

    if (!isMountedRef.current) {
      return;
    }

    setPhase("exit");
    await sleep(520);

    if (!isMountedRef.current) {
      return;
    }

    setPhase("done");
  };

  const handleCommandSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (phase !== "command") {
      return;
    }

    const normalized = inputValue.trim().toLowerCase();
    if (!normalized) {
      return;
    }

    setCommandHistory((current) => [...current, normalized]);
    setHistoryIndex(null);

    setLines((current) => [
      ...current,
      {
        id: `command-${sessionKey}-${current.length}`,
        type: "command",
        text: `${promptLabel} ${normalized}`,
      },
    ]);
    setInputValue("");

    if (normalized === "start") {
      await runStartSequence();
      return;
    }

    if (normalized === "help") {
      appendLine("warning", "[help] Available commands");
      helpEntries.forEach(([command, description]) => {
        appendLine("system", `[help] ${command.padEnd(12, " ")} - ${description}`);
      });
      return;
    }

    if (normalized === "clear") {
      setLines([]);
      setInstallLabel("");
      setProgressPercent(0);
      setActiveEffect(null);
      return;
    }

    if (normalized === "next.skip") {
      const skipWasEnabled =
        window.localStorage.getItem(TERMINAL_SKIP_STORAGE_KEY) === "true";

      if (skipWasEnabled) {
        window.localStorage.removeItem(TERMINAL_SKIP_STORAGE_KEY);
      } else {
        window.localStorage.setItem(TERMINAL_SKIP_STORAGE_KEY, "true");
      }

      setLines((current) => [
        ...current,
        {
          id: `skip-${sessionKey}-${current.length}`,
          type: "success",
          text: skipWasEnabled
            ? "[config] Terminal overlay skip disabled. The terminal will appear on your next visit."
            : "[config] Terminal overlay will be skipped on your next visit.",
        },
      ]);
      return;
    }

    if (normalized === "page.light" || normalized === "page.dark") {
      const nextTheme = normalized === "page.light" ? "light" : "dark";
      applyPageTheme(nextTheme);
      await closeTerminalToSite(
        nextTheme === "light"
          ? "[theme] Light mode enabled."
          : "[theme] Dark mode enabled.",
      );
      return;
    }

    if (normalized === "status") {
      appendLine("success", "[status] portfolio-web ........ online");
      appendLine("warning", "[status] creator-lab ......... degraded");
      appendLine("error", "[status] side-quest-node ..... offline");
      return;
    }

    if (normalized === "version") {
      appendLine("system", "[version] site ............ 0.1.0");
      appendLine("system", "[version] next ............ 16.1.6");
      appendLine("system", "[version] react ........... 19.2.3");
      appendLine("system", "[version] tsparticles ..... 3.9.1");
      return;
    }

    if (normalized === "matrix") {
      appendLine("warning", "[matrix] component version map");
      appendLine("system", "[matrix] site       | 0.1.0");
      appendLine("system", "[matrix] next       | 16.1.6");
      appendLine("system", "[matrix] react      | 19.2.3");
      appendLine("system", "[matrix] particles  | 3.9.1");
      return;
    }

    if (normalized === "hack") {
      await runHackSequence();
      return;
    }

    if (normalized === "coffee") {
      await runCoffeeSequence();
      return;
    }

    setLines((current) => [
      ...current,
      {
        id: `error-${sessionKey}-${current.length}`,
        type: "error",
        text: `Command not found: ${normalized}. Try "help", "start", "clear", "status", "version", "matrix", "hack", "coffee", "next.skip", "page.light", or "page.dark".`,
      },
    ]);
  };

  useEffect(() => {
    const openTerminal = () => {
      bootStartedRef.current = false;
      isMountedRef.current = true;
      setLines([]);
      setInputValue("");
      setInstallLabel("");
      setProgressPercent(0);
      setActiveEffect(null);
      shouldAutoScrollRef.current = true;
      setPhase("boot");
      setSessionKey((current) => current + 1);
    };

    window.addEventListener(OPEN_TERMINAL_EVENT, openTerminal);

    return () => {
      window.removeEventListener(OPEN_TERMINAL_EVENT, openTerminal);
    };
  }, []);

  const handleOutputScroll = () => {
    const output = outputRef.current;

    if (!output) {
      return;
    }

    shouldAutoScrollRef.current =
      output.scrollTop + output.clientHeight >= output.scrollHeight - 10;
  };

  return (
    <>
      {phase === "done" ? null : (
        <div className={`terminal-loader ${phase === "exit" ? "terminal-loader--exit" : ""}`}>
          <div className="terminal-loader__stack">
            <div className="terminal-loader__window">
              <div className="terminal-loader__bar">
                <span className="terminal-loader__dot terminal-loader__dot--red" />
                <span className="terminal-loader__dot terminal-loader__dot--amber" />
                <span className="terminal-loader__dot terminal-loader__dot--green" />
                <span className="terminal-loader__title">portfolio-terminal</span>
              </div>

              <div className="terminal-loader__body">
                <div className="terminal-loader__help-panel">
                  <span className="terminal-loader__help-chip">{`{help}`}</span>
                  <span className="terminal-loader__help-inline">
                    Use the <strong>help</strong> command to learn every terminal command.
                  </span>
                </div>

                <div
                  ref={outputRef}
                  className="terminal-loader__output"
                  onScroll={handleOutputScroll}
                >
                  {lines.map((line) => (
                    <div
                      key={line.id}
                      className={`terminal-loader__line terminal-loader__line--${line.type}`}
                    >
                      {line.text}
                    </div>
                  ))}

                  {phase === "launch" ? (
                    <div className="terminal-loader__install">
                      <div className="terminal-loader__install-label">{installLabel}</div>
                      <div className="terminal-loader__progress-row">
                        <div className="terminal-loader__progress-bar" aria-hidden="true">
                          {progressBar.map((block) => (
                            <span
                              key={block.id}
                              className={`terminal-loader__progress-block ${
                                block.filled
                                  ? "terminal-loader__progress-block--filled"
                                  : "terminal-loader__progress-block--empty"
                              }`}
                            >
                              ■
                            </span>
                          ))}
                        </div>
                        <span className="terminal-loader__progress-percent">
                          {progressPercent}%
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {activeEffect === "hack" ? (
                    <div className="terminal-loader__effect terminal-loader__effect--hack" aria-hidden="true">
                      {matrixColumns.map((column) => (
                        <span
                          key={column.id}
                          className="terminal-loader__matrix-column"
                          style={
                            {
                              "--matrix-duration": `${column.duration}s`,
                              "--matrix-delay": `${column.delay}s`,
                            } as CSSProperties
                          }
                        >
                          {column.text}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {activeEffect === "coffee" ? (
                    <div className="terminal-loader__effect terminal-loader__effect--coffee" aria-hidden="true">
                      <div className="terminal-loader__coffee">
                        <div className="terminal-loader__coffee-steam terminal-loader__coffee-steam--one" />
                        <div className="terminal-loader__coffee-steam terminal-loader__coffee-steam--two" />
                        <div className="terminal-loader__coffee-cup">
                          <span className="terminal-loader__coffee-label">brewing...</span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div ref={outputEndRef} className="terminal-loader__output-end" />
                </div>

                {phase === "command" ? (
                  <form className="terminal-loader__prompt" onSubmit={handleCommandSubmit}>
                    <p className="terminal-loader__input-hint">
                      Command input: type <span>start</span> and press Enter
                    </p>
                    <div className="terminal-loader__input-shell">
                      <span className="terminal-loader__prompt-label">{promptLabel}</span>
                      <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onFocus={(event) => {
                          const length = event.currentTarget.value.length;
                          event.currentTarget.setSelectionRange(length, length);
                        }}
                        onKeyDown={(event) => {
                          if (event.key !== "ArrowUp") {
                            if (event.key === "ArrowDown" && historyIndex !== null) {
                              event.preventDefault();
                              if (historyIndex >= commandHistory.length - 1) {
                                setInputValue("");
                                setHistoryIndex(null);
                                return;
                              }

                              const nextIndex = historyIndex + 1;
                              setInputValue(commandHistory[nextIndex] ?? "");
                              setHistoryIndex(nextIndex);
                            }
                            return;
                          }

                          if (commandHistory.length === 0) {
                            return;
                          }

                          event.preventDefault();

                          const nextIndex =
                            historyIndex === null
                              ? commandHistory.length - 1
                              : Math.max(0, historyIndex - 1);

                          setInputValue(commandHistory[nextIndex] ?? "");
                          setHistoryIndex(nextIndex);
                        }}
                        className="terminal-loader__input"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        autoFocus
                        placeholder='Type "start" here...'
                      />
                      <span className="terminal-loader__cursor" />
                    </div>
                  </form>
                ) : (
                  <div className="terminal-loader__status">
                    <span className="terminal-loader__prompt-label">{promptLabel}</span>
                    <span className="terminal-loader__cursor" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
