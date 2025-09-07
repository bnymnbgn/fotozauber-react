import { useState, useEffect, useCallback, useRef } from "react";

// --- Spatial Grid Klasse zur Verwaltung von Positionen und Kollisionen ---

class EnhancedSpatialGrid {
  constructor(width, height, cardWidth = 230, cardHeight = 275) {
    this.width = width;
    this.height = height;
    this.cardWidth = cardWidth;
    this.cardHeight = cardHeight;

    this.laneWidth = cardWidth + 50; // Breite einer Spur (Karte + Puffer)
    this.numLanes = Math.floor(width / this.laneWidth);

    // Initialisiere Spuren (Lanes)
    this.lanes = Array.from({ length: this.numLanes }, (_, i) => ({
      id: i,
      x: i * this.laneWidth + (this.laneWidth - cardWidth) / 2,
      activeCards: new Map(), // Speichert Karten, die derzeit in dieser Spur aktiv sind
      nextAvailableTime: 0, // Zeitstempel, wann diese Spur wieder belegt werden darf
    }));

    // *** AGGRESSIVE PARAMETERANPASSUNG ***
    // Mindestabstand zwischen den Startpunkten (Y) der Karten.
    // Wenn die Karten vertikal driften, muss dieser Wert die Drift + Kartenhöhe abdecken.
    // Erhöhe diesen Wert, wenn Kollisionen weiterhin auftreten.
    this.minVerticalGap = cardHeight + 300; // Erhöhter Puffer (vorher: +200)

    // Mindestzeit in Millisekunden, bevor dieselbe Spur wieder verwendet werden darf.
    // Ein höherer Wert reduziert die Dichte pro Spur drastisch.
    this.minTimingGap = 6000; // Erhöhter Zeitpuffer (vorher: 3000-4000)

    this.activeTimeouts = new Map();
  }

  /**
   * Findet die beste Spur (Lane) für eine neue Karte.
   * Priorisiert Spuren mit den wenigsten aktiven Karten und der kürzesten Wartezeit.
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

    // Wähle zufällig aus den besten Kandidaten
    return bestLanes[Math.floor(Math.random() * bestLanes.length)];
  }

  /**
   * Berechnet eine sichere vertikale Position (Y) in einer bestimmten Spur.
   * Vermeidet Kollisionen basierend auf minVerticalGap.
   * @param {object} lane - Die Spur, in der die Position gefunden werden soll.
   * @param {number} prospectiveStartTime - Der geplante Startzeitpunkt der neuen Karte.
   */
  calculateSafeYPosition(lane, prospectiveStartTime) {
    // Filtere Karten, deren Lebensdauer sich mit dem Startzeitpunkt der neuen Karte überschneidet.
    const activeCardsInLane = Array.from(lane.activeCards.values()).filter(
      (card) => prospectiveStartTime < card.startTime + card.duration
    );

    const availableHeight = this.height - this.cardHeight;

    if (activeCardsInLane.length === 0) {
      return Math.random() * availableHeight;
    }

    const occupiedYs = activeCardsInLane.map((card) => card.y);
    const maxAttempts = 30; // Anzahl der Versuche, eine zufällige Position zu finden

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
    // Wenn Zufallsversuche fehlschlagen, scanne den Bildschirm schrittweise ab.
    const stepSize = this.cardHeight / 4; // Schrittgröße für das Scannen
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

    // 3. Notfall-Fallback
    // Wenn absolut kein Platz gefunden wurde (wg. extrem hoher Dichte oder zu großem minVerticalGap),
    // gib eine zufällige Position zurück und protokolliere eine Warnung.
    console.warn(
      `[EnhancedSpatialGrid] Could not find safe position in lane ${lane.id}. Density issue.`
    );
    return Math.random() * availableHeight;
  }

  /**
   * Reserviert eine Position im Grid für eine neue Karte.
   * @param {string} cardId - Eindeutige ID der Karte.
   * @param {number} duration - Dauer der Kartenanzeige in Millisekunden.
   * @param {object} timing - Timing-Informationen (z.B. initialDelay).
   * @returns {object} Positionsdaten (x, y) und tatsächliche Startverzögerung.
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

    // Aufräum-Timeout für diese Karte setzen/aktualisieren
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
   * Gibt die Position einer Karte explizit frei und entfernt den Aufräum-Timeout.
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

  /** Räumt alle Timeouts und aktiven Karten auf (z.B. bei unmount). */
  clear() {
    this.activeTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.activeTimeouts.clear();
    this.lanes.forEach((lane) => {
      lane.activeCards.clear();
      lane.nextAvailableTime = 0;
    });
  }
}

// --- React Hook für die Animation ---

const useSpatialCardAnimation = (transformationExamples) => {
  const [flowingCards, setFlowingCards] = useState([]);
  const spatialGridRef = useRef(null);
  const timeoutsRef = useRef(new Set());
  const mountedRef = useRef(true);

  // Hilfsfunktion zum Bereinigen aller laufenden Timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current.clear();
  }, []);

  // Berechnet die Dauer der verschiedenen Animationsphasen (JETZT RANDOMISIERT)
  const generateTimingParameters = useCallback(() => {
    // --- STEUERPARAMETER 1: FLUSSGESCHWINDIGKEIT ---
    // Legt fest, wie lange die Karte für die gesamte Bewegung über den Bildschirm benötigt.
    // Höherer Wert = langsamere Bewegung.
    const flowDurationSeconds = 25.0; // z.B. 25 Sekunden Gesamtdauer

    // --- STEUERPARAMETER 2: INTERNE TRANSFORMATIONSLOGIK ---
    // Legt fest, wann die Transformation (z.B. Bildwechsel) stattfindet,
    // unabhängig von der Gesamtflussdauer.

    // Option A: Fester Zeitpunkt für die Transformation (z.B. immer nach 4 Sekunden)
    // const beforeImageFlowDurationSeconds = 4.0;

    // Option B: Randomisierter Zeitpunkt für die Transformation (empfohlen für Varianz)
    const minPhase1Duration = 3.0; // Min. Dauer Phase 1 in Sekunden
    const maxPhase1Duration = 6.0; // Max. Dauer Phase 1 in Sekunden
    const beforeImageFlowDurationSeconds =
      minPhase1Duration +
      Math.random() * (maxPhase1Duration - minPhase1Duration);

    // --- BERECHNUNGEN ---

    // 1. Gesamtzykluszeit (für CSS-Animation und Respawn-Timer)
    //    Wird direkt von der Flussgeschwindigkeit bestimmt.
    const totalCycleTimeMs = flowDurationSeconds * 1000;

    // 2. Transformationsverzögerung (interner Zeitpunkt des Bildwechsels)
    //    Wird unabhängig von der Gesamtzeit berechnet.
    const transformationDelayMs = beforeImageFlowDurationSeconds * 1000;

    // Sicherheitsprüfung: Stellen Sie sicher, dass die Transformation nicht nach dem Ende des Zyklus stattfindet.
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

  /**
   * Erstellt eine neue Karte und reserviert eine Position im Grid.
   * @param {number} index - Index des Beispielsdatensatzes.
   * @param {object} grid - Referenz auf das EnhancedSpatialGrid.
   * @param {number} initialStartDelayMs - Gewünschte Startverzögerung in Millisekunden.
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
        transformationDelay: timing.transformationDelay, // Interner Delay der Karte für Bildwechsel
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
      // Füge einen kleinen Puffer hinzu, um Race Conditions sicher zu vermeiden.
      const delayUntilRespawn = Math.max(0, timeRemaining) + 50;

      const timeoutId = setTimeout(() => {
        if (!mountedRef.current || !spatialGridRef.current) return;

        // *** SYNCHRONISATION: Alte Karte explizit aus dem Grid entfernen ***
        spatialGridRef.current.freePosition(card.cardId);

        // Neue Karte erstellen (ohne initialStartDelay, da sie sofort beginnen soll,
        // die Verzögerung wird durch nextAvailableTime im Grid gesteuert).
        const newCard = createNewCard(card.index, spatialGridRef.current, 0);

        if (newCard) {
          setFlowingCards((prev) =>
            prev.map((p) => (p.key === card.key ? newCard : p))
          );
          scheduleNextReplacement(newCard);
        }
      }, delayUntilRespawn);

      timeoutsRef.current.add(timeoutId);
    },
    [createNewCard]
  ); // createNewCard ist dependency

  // Initialisierung und Resize-Handler
  useEffect(() => {
    mountedRef.current = true;

    const initialize = () => {
      if (!mountedRef.current) return;
      clearAllTimeouts();

      spatialGridRef.current = new EnhancedSpatialGrid(
        window.innerWidth,
        window.innerHeight
      );

      const initialCards = transformationExamples
        .map((_, index) => {
          const initialDelay = Math.random() * 5000; // Zufällige Startverzögerung für initialen Load
          return createNewCard(index, spatialGridRef.current, initialDelay);
        })
        .filter(Boolean); // Entferne null-Werte, falls Erstellung fehlschlägt

      setFlowingCards(initialCards);
      initialCards.forEach(scheduleNextReplacement);
    };

    initialize();

    const handleResize = () => {
      // Debounce oder Throttle wäre hier ideal, aber für die Logik reicht das:
      initialize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mountedRef.current = false;
      window.removeEventListener("resize", handleResize);
      spatialGridRef.current?.clear();
      clearAllTimeouts();
    };
  }, [createNewCard, scheduleNextReplacement, transformationExamples]);

  return { flowingCards };
};

export default useSpatialCardAnimation;
