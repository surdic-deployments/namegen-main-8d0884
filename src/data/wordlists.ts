import type { WordCategoryId } from "../types";

export interface WordCategory {
  id: WordCategoryId;
  label: string;
  blurb: string;
  words: string[];
}

const nature: string[] = [
  "ember", "willow", "cedar", "birch", "canyon", "tundra", "meadow", "thicket", "brook", "glacier",
  "boulder", "ridge", "valley", "prairie", "marsh", "delta", "dune", "cliff", "grove", "forest",
  "harbor", "coral", "reef", "tide", "current", "breeze", "gale", "storm", "thunder", "frost",
  "dew", "mist", "fog", "drizzle", "monsoon", "blossom", "petal", "thorn", "root", "branch",
  "leaf", "moss", "fern", "ivy", "reed", "bramble", "heather", "clover", "lichen", "sapling",
  "timber", "driftwood", "cinder", "flint", "quartz", "granite", "slate", "marble", "amber", "opal",
  "jade", "copper", "cobalt", "pearl", "shell", "wave", "ripple", "stream", "river", "creek",
  "lagoon", "lake", "pond", "spring", "geyser", "cavern", "cave", "summit", "peak", "slope",
  "foothill", "plateau", "mesa", "gorge", "ravine", "basin", "oasis", "savanna", "steppe", "wetland",
  "bog", "swamp", "glade", "hollow", "dell", "dale", "moor", "heath", "wildwood", "evergreen",
  "maple", "aspen", "spruce", "cypress", "alder", "elm", "hazel", "juniper", "magnolia", "sycamore",
  "hawthorn", "larch", "holly", "laurel", "falcon", "otter", "heron", "sparrow", "raven", "lynx",
  "badger", "wolf", "stag", "hare", "owl", "hawk", "wren", "finch", "swift", "kestrel",
  "osprey", "dolphin", "whale", "seal", "urchin", "starfish", "kelp", "plankton", "sable", "ferret",
];

const cosmic: string[] = [
  "nova", "quasar", "nebula", "comet", "meteor", "asteroid", "galaxy", "orbit", "eclipse", "aurora",
  "zenith", "solstice", "equinox", "corona", "photon", "proton", "neutron", "electron", "quantum", "plasma",
  "vortex", "horizon", "pulsar", "stardust", "cosmos", "lunar", "solar", "astral", "void", "gravity",
  "momentum", "velocity", "satellite", "spectrum", "prism", "radiant", "luminous", "stellar", "meteorite", "wormhole",
  "halo", "flare", "ion", "helix", "orbiter", "drift", "apex", "axis", "umbra", "penumbra",
  "parallax", "azimuth", "nadir", "meridian", "twilight", "dusk", "dawn", "glow", "spark", "ray",
  "beam", "starlight", "moonbeam", "sunspot", "cluster", "constellation", "ecliptic", "perigee", "apogee", "vertex",
  "singularity", "magnetar", "cryostar", "exoplanet", "ionosphere", "magnetosphere", "chromosphere", "photosphere", "zenithal", "celestia",
];

const mythology: string[] = [
  "atlas", "orion", "phoenix", "titan", "oracle", "zephyr", "nyx", "helios", "apollo", "artemis",
  "athena", "hermes", "hades", "poseidon", "chronos", "eros", "iris", "luna", "freya", "odin",
  "thor", "loki", "baldur", "hela", "ymir", "valkyrie", "saga", "mimir", "fenrir", "huginn",
  "ra", "osiris", "isis", "anubis", "horus", "thoth", "bastet", "sphinx", "griffin", "chimera",
  "hydra", "pegasus", "siren", "minotaur", "kraken", "leviathan", "golem", "djinn", "roc", "wyrm",
  "drake", "wyvern", "banshee", "sprite", "nymph", "dryad", "naiad", "muse", "fury", "fate",
  "kami", "yokai", "oni", "tengu", "qilin", "garuda", "indra", "agni", "shiva", "maya",
  "karma", "dharma", "nirvana", "mana", "totem", "spirit", "omen", "prophecy", "legend", "myth",
  "rune", "sigil", "glyph", "ward", "charm", "relic", "talisman", "amulet", "seer", "sage",
];

const abstract: string[] = [
  "zeal", "vigor", "grace", "valor", "mirth", "solace", "wonder", "clarity", "harmony", "cadence",
  "echo", "whisper", "glimmer", "flicker", "flow", "pulse", "rhythm", "tempo", "courage", "wisdom",
  "truth", "hope", "faith", "trust", "honor", "glory", "triumph", "destiny", "fortune", "legacy",
  "essence", "instinct", "intuition", "insight", "vision", "dream", "reverie", "serenity", "tranquil", "balance",
  "unity", "synergy", "resolve", "resilience", "ambition", "aspiration", "inspiration", "motivation", "passion", "devotion",
  "loyalty", "integrity", "virtue", "candor", "prudence", "temperance", "justice", "liberty", "equity", "empathy",
  "compassion", "kindness", "gratitude", "humility", "patience", "diligence", "tenacity", "fortitude", "audacity", "charisma",
  "elegance", "finesse", "poise", "panache", "flair", "zest", "verve", "gusto", "vitality", "vibrance",
  "radiance", "brilliance", "luster", "sheen", "shimmer", "sparkle", "glisten", "wanderlust", "nostalgia", "epiphany",
];

const tech: string[] = [
  "vector", "forge", "spark", "nimbus", "flux", "surge", "drift", "signal", "beacon", "relay",
  "matrix", "cipher", "vertex", "nexus", "catalyst", "kinetic", "dynamo", "turbine", "engine", "circuit",
  "node", "cluster", "grid", "array", "stream", "pipeline", "protocol", "kernel", "cache", "buffer",
  "thread", "socket", "packet", "byte", "pixel", "render", "compile", "deploy", "launch", "ignite",
  "propel", "thrust", "trajectory", "frontier", "pioneer", "venture", "quest", "voyage", "expedition", "odyssey",
  "pinnacle", "milestone", "blueprint", "framework", "foundation", "cornerstone", "keystone", "anchor", "compass", "lighthouse",
  "gateway", "portal", "bridge", "junction", "crossroad", "pathway", "trail", "route", "course", "uplink",
  "downlink", "mainframe", "firmware", "runtime", "endpoint", "instance", "worker", "shard", "daemon", "sentinel",
];

export const WORD_CATEGORIES: Record<WordCategoryId, WordCategory> = {
  nature: {
    id: "nature",
    label: "Nature",
    blurb: "Trees, weather, land, and water",
    words: nature,
  },
  cosmic: {
    id: "cosmic",
    label: "Cosmic",
    blurb: "Space, light, and astronomy",
    words: cosmic,
  },
  mythology: {
    id: "mythology",
    label: "Mythology",
    blurb: "Gods, legends, and folklore",
    words: mythology,
  },
  abstract: {
    id: "abstract",
    label: "Abstract",
    blurb: "Emotions, virtues, and qualities",
    words: abstract,
  },
  tech: {
    id: "tech",
    label: "Tech & Motion",
    blurb: "Engineering and momentum",
    words: tech,
  },
};

export const WORD_CATEGORY_LIST = Object.values(WORD_CATEGORIES);

export function wordsForCategories(ids: WordCategoryId[]): string[] {
  const ids_ = ids.length ? ids : (Object.keys(WORD_CATEGORIES) as WordCategoryId[]);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of ids_) {
    for (const w of WORD_CATEGORIES[id].words) {
      if (!seen.has(w)) {
        seen.add(w);
        out.push(w);
      }
    }
  }
  return out;
}
