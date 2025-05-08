# 🌸 Keyfleur

_Keyfleur_ is a poetic API key generator — blending structure and beauty into every token.  
Whether you want a delicate **haiku**, a **steampunk sigil**, or a **mythic mantra**,  
Keyfleur creates keys that are elegant, readable, and never boring.

---

## 🔧 Installation

```bash
pip install .
````

---

## 🚀 CLI Usage

```bash
keyfleur --theme=forest --mode=haiku --count=3
```

### Options

| Option    | Description                                 |
| --------- | ------------------------------------------- |
| `--theme` | The semantic dictionary to draw words from. |
|           | *(haiku, forest, mythic, sunny, etc.)*      |
| `--mode`  | The structural format of the key.           |
|           | *(haiku, sigil, quartz, mantra, etc.)*      |
| `--count` | Number of keys to generate. Default is `1`. |

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
keyfleur --theme=celestial --mode=haiku
```

Might output:

```
Nova-DriftingOrbit-Moonlight
```

---

## 🧠 Use cases

* Generate poetic API keys or user-facing identifiers
* Use in games, lore systems, or design prototypes
* Inject elegance into otherwise boring IDs

---

Made without a goal
