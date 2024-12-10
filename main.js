// Loading Scene - handles asset loading
class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    // Load assets
    this.load.image("star", "assets/phaser2.png");
    this.load.image("box", "assets/car.png");
    this.load.audio("ping", "assets/explosion.mp3");
    this.load.json("gameData", "assets/gameData.json");

    // Display loading progress
    let loadingText = this.add.text(400, 300, "Loading...", {
      fontSize: "24px",
      fill: "#ffffff",
    });
    loadingText.setOrigin(0.5);
  }

  create() {
    // Switch to game scene when loading is complete
    this.scene.start("GameScene");
  }
}

// Main Game Scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.toggleTimer = 0;
    this.showImage = true;
  }

  create() {
    // Create a container
    this.container = this.add.container(400, 300);

    // Add star image to container
    this.star = this.add.image(0, -50, "star");
    this.container.add(this.star);

    // Add box image that will toggle visibility
    this.box = this.add.image(400, 300, "box");

    // Play sound
    this.sound.play("ping");

    // Load JSON data
    const gameData = this.cache.json.get("gameData");
    console.log("Loaded JSON data:", gameData);

    // Add button to destroy star
    const destroyButton = this.add.text(400, 500, "Destroy", {
      font: "30px bolder",
      fill: "#cc33ff",
      backgroundColor: "#f2f2f2",
      padding: { x: 15, y: 5 },
    });
    destroyButton.setInteractive();
    destroyButton.setOrigin(0.5);
    destroyButton.on("pointerdown", () => {
      this.star.destroy();
      destroyButton.destroy();
    });
  }

  update(time, delta) {
    // Toggle box visibility every 2 seconds
    this.toggleTimer += delta;
    if (this.toggleTimer >= 2000) {
      this.showImage = !this.showImage;
      this.box.setVisible(this.showImage);
      this.toggleTimer = 0;
    }
  }
}

// Create the Phaser game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#cc33ff",
  scene: [LoadingScene, GameScene],
};

// Create the game instance
const game = new Phaser.Game(config);
