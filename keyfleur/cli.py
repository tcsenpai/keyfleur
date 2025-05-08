# keyfleur_poetic_generator.py

import random

# === THEME WORDS ===
THEMES = {
    'haiku': [
        'nyrae','soliv','virel','ethae','omura','lyr','aeli','sirune','nuvia','evara',
        'halen','ilari','tyrel','elune','kairi','syrel','narun','velia','orune','faeli'
    ],
    'nocturnal': [
        'luna','night','star','owl','dusk','twilight','midnight','shade','echo','eclipse',
        'gloom','moth','raven','void','mist','sleep','howl','nova','quiet','shiver',
        'dark','silence','phantom','crescent','hollow','dream','veil','crypt','umbra','noir'
    ],
    'sunny': [
        'sol','sun','ray','bright','day','dawn','shine','gold','beam','sky',
        'flare','light','summer','glow','warmth','clear','zenith','haze','amber','bliss',
        'gleam','glint','sunrise','radiant','beam','halo','lucid','fire','flare','glory'
    ],
    'floreal': [
        'rose','lily','petal','bloom','ivy','orchid','daisy','violet','primrose','stem',
        'pollen','sprout','bud','blossom','flora','camellia','garden','leaf','nectar','thistle',
        'lavender','tulip','clover','hyacinth','marigold','chrysant','wisteria','magnolia','peony','fern'
    ],
    'oceanic': [
        'wave','coral','foam','drift','deep','pearl','tide','gull','salt','whale',
        'kelp','abyss','current','surf','ocean','marina','shoal','siren','lagoon','shell',
        'reef','seastar','nautilus','spray','undertow','isle','brine','anchor','swell','ripple'
    ],
    'crystalline': [
        'crystal','gem','shard','opal','quartz','glint','ice','snow','frost','facet',
        'prism','glass','clear','gleam','diamond','shine','mirror','spark','flake','glow',
        'glacier','amethyst','glisten','translucent','silica','bismuth','halo','chime','lucent','citrine'
    ],
    'mythic': [
        'aether','wyrm','oracle','sigil','blade','fable','mythos','grimoire','phoenix','echo',
        'titan','nymph','elysium','lore','rune','arcane','wyrd','hero','legend','shade',
        'sphinx','hydra','oblivion','divine','hex','omen','ritual','saga','daemon','prophecy'
    ],
    'forest': [
        'moss','bark','deer','grove','tree','fern','owl','leaf','fox','thicket',
        'pine','birch','root','sap','fungus','log','trail','wild','branch','meadow',
        'cedar','acorn','willow','glade','lichen','bluff','elm','spruce','hedge','nest'
    ],
    'desert': [
        'sand','dune','mirage','sun','dry','camel','cactus','arid','scorch','salt',
        'wind','dust','stone','haze','burn','sol','flame','crack','barren','sizzle',
        'ember','serpent','blister','parch','ash','glare','mesa','quartz','sirocco','ridge'
    ],
    'celestial': [
        'nova','orbit','comet','moon','star','sol','galaxy','void','pulse','flare',
        'venus','eclipse','plasma','space','light','sphere','sky','drift','saturn','zero',
        'nebula','equinox','zenith','meteor','lunar','solstice','mercury','aster','axis','horizon'
    ],
    'library': [
        'scroll','ink','book','page','shelf','quiet','dust','study','read','verse',
        'prose','codex','folio','scribe','script','glyph','letter','note','pen','volume',
        'archive','index','library','margin','annotation','spine','binding','tome','quill','text'
    ],
    'decay': [
        'rot','rust','moss','mold','crack','fade','peel','dust','crumble','ash',
        'time','void','wilt','droop','filth','wear','flaw','scratch','stain','dull',
        'brittle','smudge','erode','fracture','debris','decay','fester','grime','soot','relic'
    ],
    'steampunk': [
        'gear','steam','cog','brass','pipe','gauge','valve','weld','bolt','clock',
        'spark','smoke','engine','vane','dial','joint','helm','rivets','boiler','coil',
        'piston','frame','rotor','socket','vent','torque','copper','chrono','lever','mech'
    ]
}

SOFT_CONS = 'flmnrschv'
VOWELS = 'aeiouy'
RUNES = ['now+1d','now-2h','dawn','midnight','solstice','infinite','epoch']


def syllable():
    return random.choice(SOFT_CONS) + random.choice(VOWELS)

# === MODES ===

def estimate_syllables(word):
    if not word or not isinstance(word, str):
        return 0
    word = word.lower()
    vowels = 'aeiouy'
    count = 0
    prev_char = ''
    for char in word:
        if char in vowels and prev_char not in vowels:
            count += 1
        prev_char = char
    if word.endswith("e") and count > 1:
        count -= 1
    return max(1, count)

def haiku(theme):
    all_words = [word for words in THEMES.values() for word in words if word]
    random.shuffle(all_words)

    used_words = set()

    def find_words(target_syllables):
        result = []
        total = 0
        for word in all_words:
            if not word or word in used_words:
                continue
            syll = estimate_syllables(word)
            if syll == 0:
                continue
            if total + syll <= target_syllables:
                result.append(word.capitalize())
                used_words.add(word)
                total += syll
                if total == target_syllables:
                    break
        return result if total == target_syllables else []

    line1 = find_words(5)
    line2 = find_words(7)
    line3 = find_words(5)

    if not (line1 and line2 and line3):
        return "incomplete-haiku"

    return "-".join(["".join(line1), "".join(line2), "".join(line3)])

def lace(theme):
    roots = THEMES.get(theme, THEMES['haiku'])
    word = random.choice(roots)
    mid = syllable()
    return f"{word}{mid}-{mid[::-1]}{word[::-1]}"

def mirrora():
    s = syllable()
    return f"{s[::-1]}-{s}"

def rune_key(theme):
    base = haiku(theme).capitalize()
    rune = random.choice(RUNES)
    return f"{base}_{rune}"

def sonnet(theme):
    roots = THEMES.get(theme, THEMES['haiku'])
    return f"{random.choice(roots).capitalize()}{syllable()[:2]}-{random.choice(roots).capitalize()}{syllable()[:2]}"

def sigil(theme):
    roots = THEMES.get(theme, THEMES['haiku'])
    return f"{random.choice(roots).capitalize()}-{random.randint(100,999)}-{random.choice(roots).capitalize()}"

def seed(theme):
    roots = THEMES.get(theme, THEMES['haiku'])
    return f"{random.choice(roots).capitalize()[:4]}-{random.randint(1000,9999):04x}"

def mantra(theme):
    word = random.choice(THEMES.get(theme, THEMES['haiku'])).capitalize()
    return f"{word}-{word}-{random.choice(THEMES[theme]).capitalize()}"

def quartz(theme):
    root = random.choice(THEMES.get(theme, THEMES['haiku'])).capitalize()
    rev = root[::-1][:4]
    num = str(random.randint(10,99))
    return f"{root}{num}.{num}{rev}"

MODES = {
    'haiku': haiku,
    'lace': lace,
    'mirrora': lambda t: mirrora(),
    'rune': rune_key,
    'sonnet': sonnet,
    'sigil': sigil,
    'seed': seed,
    'mantra': mantra,
    'quartz': quartz
}


def poetic_key(mode='haiku', theme='haiku'):
    func = MODES.get(mode, haiku)
    return func(theme)


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Keyfleur: generate poetic API keys.")
    parser.add_argument("--theme", default="haiku", choices=THEMES.keys(), help="Theme for word source")
    parser.add_argument("--mode", default="haiku", choices=MODES.keys(), help="Poetic structure to use")
    parser.add_argument("--count", type=int, default=1, help="Number of keys to generate")

    args = parser.parse_args()

    for _ in range(args.count):
        print(poetic_key(mode=args.mode, theme=args.theme))


if __name__ == "__main__":
    main()

