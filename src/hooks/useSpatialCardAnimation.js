import { useState, useEffect, useCallback, useRef } from "react";

// --- Spatial Grid Klasse zur Verwaltung von Positionen und Kollisionen ---

class EnhancedSpatialGrid {
  constructor(width, height, cardWidth = 230, cardHeight = 275) {
    this.width = width;
    this.height = height;
    this.cardWidth = cardWidth;
    this.cardHeight = cardHeight;
    this.activeTimeouts = new Map();
    const mobileBreakpoint = 768;
    this.isMobile = width < mobileBreakpoint;

    if (this.isMobile) {
      // --- MOBILE KONFIGURATION ---
      this.numLanes = 2;
      const mobileEdgeOffset = -cardWidth / 4;
      this.lanes = [
        {
          id: 0,
          x: mobileEdgeOffset,
          activeCards: new Map(),
          nextAvailableTime: 0,
        },
        {
          id: 1,
          x: width - cardWidth - mobileEdgeOffset,
          activeCards: new Map(),
          nextAvailableTime: 0,
        },
      ];
      // Aggressiver Abstand, falls doch mal etwas kollidieren sollte
      this.minVerticalGap = cardHeight + 500;
    } else {
      // --- DESKTOP KONFIGURATION ---
      this.laneWidth = cardWidth + 50;
      this.numLanes = Math.floor(width / this.laneWidth);
      this.lanes = Array.from({ length: this.numLanes }, (_, i) => ({
        id: i,
        x: i * this.laneWidth + (this.laneWidth - cardWidth) / 2,
        activeCards: new Map(),
        nextAvailableTime: 0,
      }));
      this.minVerticalGap = cardHeight + 300;
    }
    // ErhÃ¶hen Sie minTimingGap, um sicherzustellen, dass eine Spur "ruht", bevor die nÃ¤chste Karte kommt.
    this.minTimingGap = 8000; // 8 Sekunden Pause pro Spur
  }

  /**
   * Findet die beste Spur (Lane) fÃ¼r eine neue Karte.
   * Priorisiert Spuren mit den wenigsten aktiven Karten und der kÃ¼rzesten Wartezeit.
   */
  findBestLane(currentTime = Date.now()) {
    const laneStats = this.lanes.map((lane) => ({
      ...lane,
      waitTime: Math.max(0, lane.nextAvailableTime - currentTime),
      activeCardsCount: lane.activeCards.size,
    }));

    // 1. Finde die minimale Anzahl aktiver Karten in allen Spuren
    const minActiveCards = Math.min(
      ...laneStats.map((l) => l.activeCardsCount)
    );
    // 2. Filtere alle Spuren, die diese minimale Anzahl haben
    const lanesWithMinCards = laneStats.filter(
      (l) => l.activeCardsCount === minActiveCards
    );

    // 3. Finde unter diesen Spuren diejenige mit der geringsten Wartezeit
    const minWaitTime = Math.min(...lanesWithMinCards.map((l) => l.waitTime));
    const bestLanes = lanesWithMinCards.filter(
      (l) => l.waitTime === minWaitTime
    );

    // WÃ¤hle zufÃ¤llig aus den besten Kandidaten
    return bestLanes[Math.floor(Math.random() * bestLanes.length)];
  }

  /**
   * Berechnet eine sichere vertikale Position (Y) in einer bestimmten Spur.
   * Vermeidet Kollisionen basierend auf minVerticalGap.
   * @param {object} lane - Die Spur, in der die Position gefunden werden soll.
   * @param {number} prospectiveStartTime - Der geplante Startzeitpunkt der neuen Karte.
   */
  calculateSafeYPosition(lane, prospectiveStartTime) {
    const availableHeight = this.height - this.cardHeight;

    if (this.isMobile) {
      // --- MOBILE STRATEGIE: FESTER STARTPUNKT ---
      // Um Ãœberlappungen zu vermeiden und einen echten Zyklus zu simulieren,
      // starten alle Karten auf MobilgerÃ¤ten an derselben Y-Position (unten).
      // Die Trennung erfolgt hier rein zeitlich Ã¼ber minTimingGap.
      return availableHeight; // Platziert die Oberkante der Karte am unteren Rand des verfÃ¼gbaren Bereichs.
    } else {
      // --- DESKTOP STRATEGIE: URSPRÃœNGLICHE LOGIK (Zufall + Kollisionscheck) ---

      // Filtere Karten, deren Lebensdauer sich mit dem Startzeitpunkt der neuen Karte Ã¼berschneidet.
      const activeCardsInLane = Array.from(lane.activeCards.values()).filter(
        (card) => prospectiveStartTime < card.startTime + card.duration
      );

      if (activeCardsInLane.length === 0) {
        return Math.random() * availableHeight;
      }

      const occupiedYs = activeCardsInLane.map((card) => card.y);
      const maxAttempts = 30; // Anzahl der Versuche, eine zufÃ¤llige Position zu finden

      // 1. Zufallsversuche (Optimierung)
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const candidateY = Math.random() * availableHeight;
        const isSafe = occupiedYs.every(
          (existingY) => Math.abs(candidateY - existingY) >= this.minVerticalGap
        );
        if (isSafe) {
          return candidateY;
        }
      }

      // 2. Iterativer Scan (Robuster Fallback)
      const stepSize = this.cardHeight / 4; // SchrittgrÃ¶ÃŸe fÃ¼r das Scannen
      for (
        let candidateY = 0;
        candidateY <= availableHeight;
        candidateY += stepSize
      ) {
        const isSafe = occupiedYs.every(
          (existingY) => Math.abs(candidateY - existingY) >= this.minVerticalGap
        );
        if (isSafe) {
          return candidateY;
        }
      }

      // 3. Notfall-Fallback fÃ¼r Desktop (kann bei hoher Dichte zu Ãœberlappungen fÃ¼hren)
      console.warn(
        `[EnhancedSpatialGrid] Could not find safe position in lane ${lane.id} (Desktop). Density issue.`
      );
      return Math.random() * availableHeight;
    }
  }

  /**
   * Reserviert eine Position im Grid fÃ¼r eine neue Karte.
   * @param {string} cardId - Eindeutige ID der Karte.
   * @param {number} duration - Dauer der Kartenanzeige in Millisekunden.
   * @param {object} timing - Timing-Informationen (z.B. initialDelay).
   * @returns {object} Positionsdaten (x, y) und tatsÃ¤chliche StartverzÃ¶gerung.
   */
  reservePosition(cardId, duration, timing) {
    const currentTime = Date.now();
    const bestLane = this.findBestLane(currentTime);

    const requestedStartTime = currentTime + (timing.initialDelay || 0) * 1000;
    const startTime = Math.max(requestedStartTime, bestLane.nextAvailableTime);

    const safeY = this.calculateSafeYPosition(bestLane, startTime);

    const cardInfo = {
      startTime: startTime,
      duration: duration,
      y: safeY,
    };

    bestLane.activeCards.set(cardId, cardInfo);
    bestLane.nextAvailableTime = startTime + this.minTimingGap;

    const cleanupTime = cardInfo.startTime + duration + 1000; // 1 Sekunde Puffer

    // AufrÃ¤um-Timeout fÃ¼r diese Karte setzen/aktualisieren
    if (this.activeTimeouts.has(cardId)) {
      clearTimeout(this.activeTimeouts.get(cardId));
    }
    const timeoutId = setTimeout(() => {
      this.freePosition(cardId);
    }, cleanupTime - Date.now());
    this.activeTimeouts.set(cardId, timeoutId);

    const actualStartDelayInSeconds = (startTime - currentTime) / 1000;

    return {
      x: bestLane.x,
      y: safeY,
      laneId: bestLane.id,
      actualStartDelay: actualStartDelayInSeconds,
    };
  }

  /**
   * Gibt die Position einer Karte explizit frei und entfernt den AufrÃ¤um-Timeout.
   * @param {string} cardId - ID der freizugebenden Karte.
   */
  freePosition(cardId) {
    if (this.activeTimeouts.has(cardId)) {
      clearTimeout(this.activeTimeouts.get(cardId));
      this.activeTimeouts.delete(cardId);
    }
    this.lanes.forEach((lane) => {
      lane.activeCards.delete(cardId);
    });
  }

  /** RÃ¤umt alle Timeouts und aktiven Karten auf (z.B. bei unmount). */
  clear() {
    this.activeTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.activeTimeouts.clear();
    this.lanes.forEach((lane) => {
      lane.activeCards.clear();
      lane.nextAvailableTime = 0;
    });
  }
}

// --- React Hook fÃ¼r die Animation ---

const useSpatialCardAnimation = (transformationExamples) => {
  const [flowingCards, setFlowingCards] = useState([]);
  const spatialGridRef = useRef(null);
  const timeoutsRef = useRef(new Set());
  const mountedRef = useRef(true);

  // NEU: Ref für die Verfolgung der bereits verwendeten Indices
  const usedIndicesRef = useRef(new Set());

  // Hilfsfunktion zum Bereinigen aller laufenden Timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current.clear();
  }, []);

  // Ref, um den aktuellen Stand von flowingCards fÃ¼r asynchrone Callbacks zu halten
  const flowingCardsRef = useRef(flowingCards);
  useEffect(() => {
    flowingCardsRef.current = flowingCards;
  }, [flowingCards]);

  // Berechnet die Dauer der verschiedenen Animationsphasen (JETZT RANDOMISIERT)
  const generateTimingParameters = useCallback(() => {
    // --- STEUERPARAMETER 1: FLUSSGESCHWINDIGKEIT ---
    // Legt fest, wie lange die Karte fÃ¼r die gesamte Bewegung Ã¼ber den Bildschirm benÃ¶tigt.
    // HÃ¶herer Wert = langsamere Bewegung.
    const flowDurationSeconds = 25.0; // z.B. 25 Sekunden Gesamtdauer

    // --- STEUERPARAMETER 2: INTERNE TRANSFORMATIONSLOGIK ---
    // Legt fest, wann die Transformation (z.B. Bildwechsel) stattfindet,
    // unabhÃ¤ngig von der Gesamtflussdauer.

    // Option A: Fester Zeitpunkt fÃ¼r die Transformation (z.B. immer nach 4 Sekunden)
    // const beforeImageFlowDurationSeconds = 4.0;

    // Option B: Randomisierter Zeitpunkt fÃ¼r die Transformation (empfohlen fÃ¼r Varianz)
    const minPhase1Duration = 3.0; // Min. Dauer Phase 1 in Sekunden
    const maxPhase1Duration = 6.0; // Max. Dauer Phase 1 in Sekunden
    const beforeImageFlowDurationSeconds =
      minPhase1Duration +
      Math.random() * (maxPhase1Duration - minPhase1Duration);

    // --- BERECHNUNGEN ---

    // 1. Gesamtzykluszeit (fÃ¼r CSS-Animation und Respawn-Timer)
    //    Wird direkt von der Flussgeschwindigkeit bestimmt.
    const totalCycleTimeMs = flowDurationSeconds * 1000;

    // 2. TransformationsverzÃ¶gerung (interner Zeitpunkt des Bildwechsels)
    //    Wird unabhÃ¤ngig von der Gesamtzeit berechnet.
    const transformationDelayMs = beforeImageFlowDurationSeconds * 1000;

    // SicherheitsprÃ¼fung: Stellen Sie sicher, dass die Transformation nicht nach dem Ende des Zyklus stattfindet.
    if (beforeImageFlowDurationSeconds >= flowDurationSeconds) {
      console.warn(
        "Transformation timing issue: Phase 1 duration exceeds total flow duration."
      );
      // Ggf. transformationDelayMs auf einen Maximalwert kappen, z.B.:
      // transformationDelayMs = flowDurationSeconds * 0.9 * 1000;
    }

    return {
      transformationDelay: transformationDelayMs, // Gesteuert durch Parameter 2
      totalCycleTime: totalCycleTimeMs, // Gesteuert durch Parameter 1
      animationDuration: flowDurationSeconds, // Gesteuert durch Parameter 1
    };
  }, []);

  // NEU: Hilfsfunktion für zufällige Index-Auswahl mit Rotation
  const getNewRandomIndex = useCallback(() => {
    const totalExampleCount = transformationExamples.length;

    // Wenn alle Indices verwendet wurden, setze die Verfolgung zurück
    if (usedIndicesRef.current.size >= totalExampleCount) {
      usedIndicesRef.current.clear();
    }

    // Erstelle Array von noch nicht verwendeten Indices
    const availableIndices = [];
    for (let i = 0; i < totalExampleCount; i++) {
      if (!usedIndicesRef.current.has(i)) {
        availableIndices.push(i);
      }
    }

    // Wenn keine verfügbaren Indices, nimm alle
    if (availableIndices.length === 0) {
      usedIndicesRef.current.clear();
      for (let i = 0; i < totalExampleCount; i++) {
        availableIndices.push(i);
      }
    }

    // Wähle zufälligen Index aus verfügbaren
    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    usedIndicesRef.current.add(randomIndex);

    return randomIndex;
  }, [transformationExamples.length]);

  /**
   * Erstellt eine neue Karte und reserviert eine Position im Grid.
   * @param {number} index - Index des Beispielsdatensatzes.
   * @param {object} grid - Referenz auf das EnhancedSpatialGrid.
   * @param {number} initialStartDelayMs - GewÃ¼nschte StartverzÃ¶gerung in Millisekunden.
   */
  const createNewCard = useCallback(
    (index, grid, initialStartDelayMs = 0) => {
      if (!grid) return null;

      const timing = generateTimingParameters();
      const cardId = `card-${index}-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;

      const positionData = grid.reservePosition(cardId, timing.totalCycleTime, {
        initialDelay: initialStartDelayMs / 1000,
      });

      // Wenn keine Position gefunden werden konnte (sollte nicht passieren, aber sicher ist sicher)
      if (!positionData) return null;

      const animationStartDelaySeconds = positionData.actualStartDelay;

      const animationString = `endless-cycle ${timing.animationDuration}s linear ${animationStartDelaySeconds}s infinite`;

      return {
        key: cardId,
        style: {
          left: `${positionData.x}px`,
          top: `${positionData.y}px`,
          animation: animationString,
        },
        transformationDelay: timing.transformationDelay, // Interner Delay der Karte fÃ¼r Bildwechsel
        cycleTime: timing.totalCycleTime, // Gesamtdauer des Zyklus
        startTime: Date.now() + animationStartDelaySeconds * 1000, // Berechneter Startzeitpunkt
        index,
        cardId,
      };
    },
    [generateTimingParameters]
  );

  /**
   * Plant den Ersatz einer Karte am Ende ihres Zyklus.
   * @param {object} card - Die Karte, die ersetzt werden soll.
   */
  const scheduleNextReplacement = useCallback(
    (card) => {
      // Berechne die verbleibende Zeit bis zum Ende des aktuellen Zyklus der Karte.
      const timeRemaining = card.startTime + card.cycleTime - Date.now();
      // FÃ¼ge einen kleinen Puffer hinzu, um Race Conditions sicher zu vermeiden.
      const delayUntilRespawn = Math.max(0, timeRemaining) + 50;

      const timeoutId = setTimeout(() => {
        if (!mountedRef.current || !spatialGridRef.current) return;

        // *** SYNCHRONISATION: Alte Karte explizit aus dem Grid entfernen ***
        spatialGridRef.current.freePosition(card.cardId);

        // NEU: Verwende neuen zufälligen Index statt dem alten Index
        const newIndex = getNewRandomIndex();
        const newCard = createNewCard(newIndex, spatialGridRef.current, 0);

        if (newCard) {
          setFlowingCards((prev) =>
            prev.map((p) => (p.key === card.key ? newCard : p))
          );
          scheduleNextReplacement(newCard);
        }
      }, delayUntilRespawn);

      timeoutsRef.current.add(timeoutId);
    },
    [createNewCard, getNewRandomIndex]
  );

  // Initialisierung und Resize-Handler
  useEffect(() => {
    mountedRef.current = true;

    const initialize = () => {
      if (!mountedRef.current) return;
      clearAllTimeouts();

      // NEU: Reset der verwendeten Indices bei Initialisierung
      usedIndicesRef.current.clear();

      spatialGridRef.current = new EnhancedSpatialGrid(
        window.innerWidth,
        window.innerHeight
      );

      const grid = spatialGridRef.current;
      const mobileCardCount = 2; // Setzen Sie hier die gewÃ¼nschte maximale Anzahl fÃ¼r Mobile (z.B. 4 oder 6)

      const numCardsToShow = grid.isMobile
        ? Math.min(mobileCardCount, transformationExamples.length) // Nimm maximal 2 Karten, aber nicht mehr als vorhanden
        : transformationExamples.length;

      // NEU: Erstelle Karten mit zufälligen Indices statt sequenzieller
      const initialCards = [];
      for (let i = 0; i < numCardsToShow; i++) {
        const randomIndex = getNewRandomIndex();
        const initialDelay = Math.random() * 5000;
        const card = createNewCard(randomIndex, grid, initialDelay);
        if (card) {
          initialCards.push(card);
        }
      }

      setFlowingCards(initialCards);
      initialCards.forEach(scheduleNextReplacement);
    };

    initialize();

    const handleResize = () => initialize();
    window.addEventListener("resize", handleResize);

    return () => {
      mountedRef.current = false;
      window.removeEventListener("resize", handleResize);
      spatialGridRef.current?.clear();
      clearAllTimeouts();
    };
  }, [
    createNewCard,
    scheduleNextReplacement,
    transformationExamples,
    getNewRandomIndex,
  ]);

  return { flowingCards };
};

export default useSpatialCardAnimation;
