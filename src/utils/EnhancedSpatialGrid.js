export class EnhancedSpatialGrid {
  constructor(width, height, cardWidth = 230, cardHeight = 275) {
    this.width = width;
    this.height = height;
    this.cardWidth = cardWidth;
    this.cardHeight = cardHeight;

    // Statische Grid-Positionen statt dynamischer Berechnung
    this.gridRows = Math.floor(height / (cardHeight + 250)); // 250px Abstand zwischen Reihen
    this.gridCols = Math.max(3, Math.floor(width / (cardWidth + 150))); // Mindestens 3 Spalten
    this.gridPositions = [];
    
    // Erstelle vordefinierte Grid-Positionen
    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        this.gridPositions.push({
          x: col * (cardWidth + 150) + 75,
          y: row * (cardHeight + 250) + 100,
          row,
          col,
          occupied: false,
          occupiedUntil: 0
        });
      }
    }

    this.minVerticalGap = cardHeight + 300;
    this.minTimingGap = 5000;
    this.activeTimeouts = new Map();
    this.occupiedPositions = new Map();
  }

  findBestPosition(currentTime = Date.now()) {
    // Finde alle verfügbaren Positionen
    const availablePositions = this.gridPositions.filter(pos => 
      !pos.occupied || pos.occupiedUntil <= currentTime
    );

    if (availablePositions.length === 0) {
      // Wenn keine Position verfügbar ist, finde die mit der kürzesten Wartezeit
      const soonestAvailable = this.gridPositions
        .map(pos => ({
          ...pos,
          waitTime: Math.max(0, pos.occupiedUntil - currentTime)
        }))
        .sort((a, b) => a.waitTime - b.waitTime);
      
      return soonestAvailable[0];
    }

    // Wähle zufällig aus verfügbaren Positionen
    return availablePositions[Math.floor(Math.random() * availablePositions.length)];
  }

  // Wird nicht mehr benötigt mit Grid-System
  calculateSafeYPosition() {
    return 0;
  }

  reservePosition(cardId, duration, timing) {
    const currentTime = Date.now();
    const bestPosition = this.findBestPosition(currentTime);

    const startTime = Math.max(currentTime, bestPosition.occupiedUntil);
    const actualStartTime = startTime + (timing.initialDelay || 0) * 1000;

    // Markiere Position als besetzt
    bestPosition.occupied = true;
    bestPosition.occupiedUntil = actualStartTime + duration;

    // Speichere die Positionsinformation
    this.occupiedPositions.set(cardId, {
      position: bestPosition,
      startTime: actualStartTime,
      duration: duration
    });

    // Plane das Freigeben der Position
    const cleanupTime = actualStartTime + duration + 1000;
    const timeoutId = setTimeout(() => {
      this.freePosition(cardId);
      this.activeTimeouts.delete(cardId);
    }, cleanupTime - currentTime);

    this.activeTimeouts.set(cardId, timeoutId);

    const actualStartDelay = (actualStartTime - currentTime) / 1000;

    return {
      x: bestPosition.x,
      y: bestPosition.y,
      laneId: bestPosition.row * this.gridCols + bestPosition.col,
      actualStartDelay,
    };
  }

  reservePositionWithCollisionCheck(cardId, duration, timing, occupiedPositions) {
    const currentTime = Date.now();
    
    // Finde alle verfügbaren Positionen
    const availablePositions = this.gridPositions.filter(pos => {
      // Prüfe ob die Position im Grid frei ist
      const gridFree = !pos.occupied || pos.occupiedUntil <= currentTime;
      
      // Prüfe ob die Position in der occupiedPositions Map frei ist
      const mapFree = !Array.from(occupiedPositions.entries()).some(([otherCardId, occupation]) => {
        if (otherCardId === cardId) return false; // Gleiche Karte ignorieren
        
        const distance = Math.sqrt(
          Math.pow(pos.x - occupation.x, 2) + 
          Math.pow(pos.y - occupation.y, 2)
        );
        
        // Mindestabstand von 200px zwischen beliebigen Karten
        return distance < 200 && occupation.until > currentTime;
      });
      
      return gridFree && mapFree;
    });

    if (availablePositions.length === 0) {
      return null; // Keine freie Position gefunden
    }

    // Wähle die zufälligste verfügbare Position
    const bestPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];

    const startTime = Math.max(currentTime, bestPosition.occupiedUntil);
    const actualStartTime = startTime + (timing.initialDelay || 0) * 1000;

    // Markiere Position als besetzt
    bestPosition.occupied = true;
    bestPosition.occupiedUntil = actualStartTime + duration;

    // Speichere die Positionsinformation
    this.occupiedPositions.set(cardId, {
      position: bestPosition,
      startTime: actualStartTime,
      duration: duration
    });

    // Plane das Freigeben der Position
    const cleanupTime = actualStartTime + duration + 1000;
    const timeoutId = setTimeout(() => {
      this.freePosition(cardId);
      this.activeTimeouts.delete(cardId);
    }, cleanupTime - currentTime);

    this.activeTimeouts.set(cardId, timeoutId);

    const actualStartDelay = (actualStartTime - currentTime) / 1000;

    return {
      x: bestPosition.x,
      y: bestPosition.y,
      laneId: bestPosition.row * this.gridCols + bestPosition.col,
      actualStartDelay,
    };
  }

  freePosition(cardId) {
    if (this.activeTimeouts.has(cardId)) {
      clearTimeout(this.activeTimeouts.get(cardId));
      this.activeTimeouts.delete(cardId);
    }
    
    if (this.occupiedPositions.has(cardId)) {
      const { position } = this.occupiedPositions.get(cardId);
      position.occupied = false;
      position.occupiedUntil = 0;
      this.occupiedPositions.delete(cardId);
    }
  }

  clear() {
    this.activeTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.activeTimeouts.clear();
    this.occupiedPositions.clear();
    this.gridPositions.forEach(pos => {
      pos.occupied = false;
      pos.occupiedUntil = 0;
    });
  }

  getDebugInfo() {
    const totalActiveCards = this.occupiedPositions.size;
    const occupiedPositions = Array.from(this.occupiedPositions.values());
    const positionUsage = this.gridPositions.map((pos, index) => ({
      index,
      occupied: pos.occupied,
      occupiedUntil: pos.occupiedUntil > Date.now() 
        ? `${Math.ceil((pos.occupiedUntil - Date.now()) / 1000)}s` 
        : "available",
      x: pos.x,
      y: pos.y
    }));
    return {
      totalActiveCards,
      totalPositions: this.gridPositions.length,
      gridRows: this.gridRows,
      gridCols: this.gridCols,
      activeTimeouts: this.activeTimeouts.size,
      positionUsage,
    };
  }
}