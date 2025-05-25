# 🌸 Keyfleur

_Keyfleur_ is a poetic API key generator — blending structure and beauty into every token.  
Whether you want a delicate **haiku**, a **steampunk sigil**, or a **mythic mantra**,  
Keyfleur creates keys that are elegant, readable, and never boring.

---

## 🔧 Installation

### From npm (once published)
```bash
npm install -g keyfleur-ts
```

### From Git Repository (for development or pre-publishing)
```bash
npm install -g <your-git-repo-url> 
# Example: npm install -g https://github.com/Xopper/keyfleur.git 
# (Replace with the actual URL if different)
```
After installation, you can run `keyfleur-ts --help` to verify.

---

## 🚀 CLI Usage

```bash
keyfleur-ts --theme=forest --mode=haiku --count=3
```
Or using aliases:
```bash
keyfleur-ts -t forest -m haiku -c 3
```

### Options

| Option    | Alias | Description                                 |
| --------- | ----- | ------------------------------------------- |
| `--theme` | `-t`  | The semantic dictionary to draw words from. |
|           |       | *(haiku, forest, mythic, sunny, etc.)*      |
| `--mode`  | `-m`  | The structural format of the key.           |
|           |       | *(haiku, sigil, quartz, mantra, etc.)*      |
| `--count` | `-c`  | Number of keys to generate. Default is `1`. |

---

## ✨ Modes

| Mode      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `haiku`   | A 5-7-5 syllable poetic identifier.                            |
| `lace`    | Symmetric structure with mirrored syllables.                   |
| `mirrora` | Reversed syllable pairs (e.g., `im-mi`).                       |
| `rune`    | A haiku fused with a time-based symbolic rune.                 |
| `sonnet`  | Two-part name with soft romantic cadence.                      |
| `sigil`   | Word-number-word combo, evocative of arcane codes.             |
| `seed`    | Short base+hex identifier, suitable for seed values.           |
| `mantra`  | Repetitive and affirming (e.g., `Glow-Glow-Sky`).              |
| `quartz`  | Crystal-inspired symmetrical compound (e.g., `Opal22.22lApO`). |

---

## 🌿 Themes

Themes determine the pool of vocabulary used:

* `haiku` – melodic invented roots
* `nocturnal` – night, shadow, echo
* `sunny` – light, warmth, radiance
* `floreal` – flowers, petals, blooming
* `forest` – leaves, moss, trees
* `desert` – dust, sand, mirage
* `celestial` – stars, moons, galaxies
* `crystalline` – gems, quartz, clarity
* `oceanic` – tides, coral, depths
* `mythic` – runes, phoenixes, arcane
* `library` – ink, scrolls, tomes
* `decay` – rust, ash, erosion
* `steampunk` – cogs, brass, valves

---

## 🧪 Example

```bash
keyfleur-ts --theme=celestial --mode=haiku
```

Might output:

```
Nova-DriftingOrbit-Moonlight 
# (Output will vary due to randomization and potential syllable count differences from Python version)
```

---

## 🧠 Use cases

* Generate poetic API keys or user-facing identifiers
* Use in games, lore systems, or design prototypes
* Inject elegance into otherwise boring IDs

---

## 🛠️ Development / Building from Source

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (usually comes with Node.js)

### Setup
1. Clone the repository:
   ```bash
   git clone <your-git-repo-url> 
   # Example: git clone https://github.com/Xopper/keyfleur.git
   cd keyfleur 
   # (Or the directory name if different)
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Building
To compile the TypeScript code to JavaScript (output to `dist` directory):
```bash
npm run build
```

### Running Tests
To run the unit and integration tests:
```bash
npm run test
```

---

## 📚 Library Usage

You can use `keyfleur-ts` as a library in your TypeScript or JavaScript projects.

```typescript
// Assuming you've installed it: npm install keyfleur-ts
// Or for local development, you might need to adjust the import path
// e.g., import { poetic_key, THEMES, MODES } from './dist'; 
// after running npm run build

import { poetic_key, THEMES, MODES } from 'keyfleur-ts'; 

const key = poetic_key('mythic', 'rune');
console.log(key);

// You can also access the available themes and modes:
console.log('Available Themes:', Object.keys(THEMES));
console.log('Available Modes:', Object.keys(MODES));

// Example of generating a key with default parameters
const defaultKey = poetic_key(); // Uses 'haiku' mode and 'haiku' theme
console.log('Default Key:', defaultKey);

// Example of mirrora mode (which doesn't require a theme)
const mirrorKey = poetic_key('mirrora');
console.log('Mirrora Key:', mirrorKey);
```

---

Made without a goal
