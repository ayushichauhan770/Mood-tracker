// Tarot Card Data
export const tarotCards = [
    // Major Arcana
    { id: 0, name: "The Fool", suit: "major", meaning: "New beginnings, innocence, spontaneity, free spirit", reversed: "Recklessness, taken advantage of, inconsideration" },
    { id: 1, name: "The Magician", suit: "major", meaning: "Manifestation, resourcefulness, power, inspired action", reversed: "Manipulation, poor planning, untapped talents" },
    { id: 2, name: "The High Priestess", suit: "major", meaning: "Intuition, sacred knowledge, divine feminine, subconscious", reversed: "Secrets, disconnected from intuition, withdrawal" },
    { id: 3, name: "The Empress", suit: "major", meaning: "Femininity, beauty, nature, nurturing, abundance", reversed: "Creative block, dependence on others" },
    { id: 4, name: "The Emperor", suit: "major", meaning: "Authority, establishment, structure, father figure", reversed: "Domination, excessive control, lack of discipline" },
    { id: 5, name: "The Hierophant", suit: "major", meaning: "Spiritual wisdom, religious beliefs, conformity, tradition", reversed: "Personal beliefs, freedom, challenging the status quo" },
    { id: 6, name: "The Lovers", suit: "major", meaning: "Love, harmony, relationships, values alignment, choices", reversed: "Self-love, disharmony, imbalance, misalignment" },
    { id: 7, name: "The Chariot", suit: "major", meaning: "Control, willpower, success, action, determination", reversed: "Self-discipline, opposition, lack of direction" },
    { id: 8, name: "Strength", suit: "major", meaning: "Strength, courage, persuasion, influence, compassion", reversed: "Inner strength, self-doubt, low energy, raw emotion" },
    { id: 9, name: "The Hermit", suit: "major", meaning: "Soul searching, introspection, inner guidance, solitude", reversed: "Isolation, loneliness, withdrawal" },
    { id: 10, name: "Wheel of Fortune", suit: "major", meaning: "Good luck, karma, life cycles, destiny, turning point", reversed: "Bad luck, resistance to change, breaking cycles" },
    { id: 11, name: "Justice", suit: "major", meaning: "Justice, fairness, truth, cause and effect, law", reversed: "Unfairness, lack of accountability, dishonesty" },
    { id: 12, name: "The Hanged Man", suit: "major", meaning: "Pause, surrender, letting go, new perspectives", reversed: "Delays, resistance, stalling, indecision" },
    { id: 13, name: "Death", suit: "major", meaning: "Endings, change, transformation, transition", reversed: "Resistance to change, personal transformation, inner purging" },
    { id: 14, name: "Temperance", suit: "major", meaning: "Balance, moderation, patience, purpose", reversed: "Imbalance, excess, self-healing, re-alignment" },
    { id: 15, name: "The Devil", suit: "major", meaning: "Shadow self, attachment, addiction, restriction, sexuality", reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment" },
    { id: 16, name: "The Tower", suit: "major", meaning: "Sudden change, upheaval, chaos, revelation, awakening", reversed: "Personal transformation, fear of change, averting disaster" },
    { id: 17, name: "The Star", suit: "major", meaning: "Hope, faith, purpose, renewal, spirituality", reversed: "Lack of faith, despair, self-trust, disconnection" },
    { id: 18, name: "The Moon", suit: "major", meaning: "Illusion, fear, anxiety, subconscious, intuition", reversed: "Release of fear, repressed emotion, inner confusion" },
    { id: 19, name: "The Sun", suit: "major", meaning: "Positivity, fun, warmth, success, vitality", reversed: "Inner child, feeling down, overly optimistic" },
    { id: 20, name: "Judgement", suit: "major", meaning: "Judgement, rebirth, inner calling, absolution", reversed: "Self-doubt, inner critic, ignoring the call" },
    { id: 21, name: "The World", suit: "major", meaning: "Completion, integration, accomplishment, travel", reversed: "Seeking personal closure, short-cuts, delays" }
];

// Zodiac Compatibility Data
export const compatibilityData = {
    "Aries": {
        "Aries": { score: 70, description: "Fiery and passionate, but may clash due to strong personalities." },
        "Taurus": { score: 50, description: "Different paces - Aries rushes while Taurus takes time." },
        "Gemini": { score: 85, description: "Exciting and adventurous partnership with great energy." },
        "Cancer": { score: 45, description: "Fire and water can create steam or conflict." },
        "Leo": { score: 90, description: "Dynamic duo! Both love adventure and excitement." },
        "Virgo": { score: 40, description: "Methodical Virgo may frustrate spontaneous Aries." },
        "Libra": { score: 65, description: "Opposites attract but require balance." },
        "Scorpio": { score: 55, description: "Intense connection but power struggles possible." },
        "Sagittarius": { score: 95, description: "Perfect match! Both love freedom and adventure." },
        "Capricorn": { score: 45, description: "Different approaches to life and goals." },
        "Aquarius": { score: 80, description: "Innovative and exciting relationship." },
        "Pisces": { score: 35, description: "Very different emotional needs and expressions." }
    },
    "Taurus": {
        "Aries": { score: 50, description: "Different paces - Aries rushes while Taurus takes time." },
        "Taurus": { score: 75, description: "Stable and comfortable, though may lack excitement." },
        "Gemini": { score: 40, description: "Grounded Taurus vs flighty Gemini creates tension." },
        "Cancer": { score: 95, description: "Nurturing and stable - perfect domestic bliss." },
        "Leo": { score: 60, description: "Both stubborn, but can create luxury together." },
        "Virgo": { score: 90, description: "Earth signs unite! Practical and harmonious." },
        "Libra": { score: 70, description: "Both love beauty and comfort." },
        "Scorpio": { score: 85, description: "Intense and sensual connection." },
        "Sagittarius": { score: 35, description: "Homebody meets wanderer - challenging mix." },
        "Capricorn": { score: 95, description: "Power couple! Both value security and success." },
        "Aquarius": { score: 45, description: "Traditional vs unconventional creates friction." },
        "Pisces": { score: 80, description: "Gentle and romantic partnership." }
    },
    "Gemini": {
        "Aries": { score: 85, description: "Exciting and adventurous partnership with great energy." },
        "Taurus": { score: 40, description: "Grounded Taurus vs flighty Gemini creates tension." },
        "Gemini": { score: 65, description: "Mentally stimulating but may lack depth." },
        "Cancer": { score: 50, description: "Head vs heart - different communication styles." },
        "Leo": { score: 80, description: "Fun and playful with lots of social activities." },
        "Virgo": { score: 55, description: "Mental connection but different approaches." },
        "Libra": { score: 95, description: "Air signs unite! Intellectual and social harmony." },
        "Scorpio": { score: 40, description: "Light Gemini vs intense Scorpio struggles." },
        "Sagittarius": { score: 85, description: "Adventure and learning - great match!" },
        "Capricorn": { score: 35, description: "Serious Capricorn dampens Gemini's playfulness." },
        "Aquarius": { score: 90, description: "Innovative and intellectually stimulating." },
        "Pisces": { score: 50, description: "Logic vs emotion creates misunderstanding." }
    },
    "Cancer": {
        "Aries": { score: 45, description: "Fire and water can create steam or conflict." },
        "Taurus": { score: 95, description: "Nurturing and stable - perfect domestic bliss." },
        "Gemini": { score: 50, description: "Head vs heart - different communication styles." },
        "Cancer": { score: 80, description: "Emotionally in sync but may be too sensitive." },
        "Leo": { score: 60, description: "Cancer nurtures Leo's ego nicely." },
        "Virgo": { score: 85, description: "Caring and devoted partnership." },
        "Libra": { score: 55, description: "Different emotional needs require work." },
        "Scorpio": { score: 95, description: "Deep emotional and psychic connection." },
        "Sagittarius": { score: 40, description: "Homebody vs adventurer - tough match." },
        "Capricorn": { score: 75, description: "Opposite signs with complementary strengths." },
        "Aquarius": { score: 35, description: "Emotional Cancer vs detached Aquarius." },
        "Pisces": { score: 90, description: "Dreamy and romantic water sign connection." }
    },
    "Leo": {
        "Aries": { score: 90, description: "Dynamic duo! Both love adventure and excitement." },
        "Taurus": { score: 60, description: "Both stubborn, but can create luxury together." },
        "Gemini": { score: 80, description: "Fun and playful with lots of social activities." },
        "Cancer": { score: 60, description: "Cancer nurtures Leo's ego nicely." },
        "Leo": { score: 70, description: "Two stars competing for the spotlight." },
        "Virgo": { score: 50, description: "Critical Virgo may wound Leo's pride." },
        "Libra": { score: 85, description: "Glamorous and social power couple." },
        "Scorpio": { score: 55, description: "Both need control - power struggles." },
        "Sagittarius": { score: 95, description: "Fire sign magic - passionate and fun!" },
        "Capricorn": { score: 45, description: "Different values and life approaches." },
        "Aquarius": { score: 65, description: "Opposite signs - intriguing but challenging." },
        "Pisces": { score: 50, description: "Leo's boldness vs Pisces's sensitivity." }
    },
    "Virgo": {
        "Aries": { score: 40, description: "Methodical Virgo may frustrate spontaneous Aries." },
        "Taurus": { score: 90, description: "Earth signs unite! Practical and harmonious." },
        "Gemini": { score: 55, description: "Mental connection but different approaches." },
        "Cancer": { score: 85, description: "Caring and devoted partnership." },
        "Leo": { score: 50, description: "Critical Virgo may wound Leo's pride." },
        "Virgo": { score: 70, description: "Perfect in theory but may over-analyze." },
        "Libra": { score: 60, description: "Both seek perfection in different ways." },
        "Scorpio": { score: 80, description: "Deep understanding and loyalty." },
        "Sagittarius": { score: 45, description: "Cautious Virgo vs reckless Sagittarius." },
        "Capricorn": { score: 95, description: "Ambitious earth signs - excellent team!" },
        "Aquarius": { score: 50, description: "Traditional vs progressive viewpoints." },
        "Pisces": { score: 75, description: "Opposite signs with healing potential." }
    },
    "Libra": {
        "Aries": { score: 65, description: "Opposites attract but require balance." },
        "Taurus": { score: 70, description: "Both love beauty and comfort." },
        "Gemini": { score: 95, description: "Air signs unite! Intellectual and social harmony." },
        "Cancer": { score: 55, description: "Different emotional needs require work." },
        "Leo": { score: 85, description: "Glamorous and social power couple." },
        "Virgo": { score: 60, description: "Both seek perfection in different ways." },
        "Libra": { score: 75, description: "Harmonious but may avoid conflict too much." },
        "Scorpio": { score: 50, description: "Light Libra vs intense Scorpio." },
        "Sagittarius": { score: 80, description: "Social and adventurous partnership." },
        "Capricorn": { score: 55, description: "Different priorities - work vs play." },
        "Aquarius": { score: 90, description: "Intellectual air signs - great match!" },
        "Pisces": { score: 65, description: "Romantic but may lack grounding." }
    },
    "Scorpio": {
        "Aries": { score: 55, description: "Intense connection but power struggles possible." },
        "Taurus": { score: 85, description: "Intense and sensual connection." },
        "Gemini": { score: 40, description: "Light Gemini vs intense Scorpio struggles." },
        "Cancer": { score: 95, description: "Deep emotional and psychic connection." },
        "Leo": { score: 55, description: "Both need control - power struggles." },
        "Virgo": { score: 80, description: "Deep understanding and loyalty." },
        "Libra": { score: 50, description: "Light Libra vs intense Scorpio." },
        "Scorpio": { score: 75, description: "Powerfully intense but potentially volatile." },
        "Sagittarius": { score: 45, description: "Possessive Scorpio vs freedom-loving Sag." },
        "Capricorn": { score: 85, description: "Ambitious and powerful partnership." },
        "Aquarius": { score: 40, description: "Emotional intensity vs detachment." },
        "Pisces": { score: 95, description: "Intuitive water sign soulmates." }
    },
    "Sagittarius": {
        "Aries": { score: 95, description: "Perfect match! Both love freedom and adventure." },
        "Taurus": { score: 35, description: "Homebody meets wanderer - challenging mix." },
        "Gemini": { score: 85, description: "Adventure and learning - great match!" },
        "Cancer": { score: 40, description: "Homebody vs adventurer - tough match." },
        "Leo": { score: 95, description: "Fire sign magic - passionate and fun!" },
        "Virgo": { score: 45, description: "Cautious Virgo vs reckless Sagittarius." },
        "Libra": { score: 80, description: "Social and adventurous partnership." },
        "Scorpio": { score: 45, description: "Possessive Scorpio vs freedom-loving Sag." },
        "Sagittarius": { score: 80, description: "Ultimate freedom - exciting but unstable." },
        "Capricorn": { score: 50, description: "Optimistic vs pessimistic outlooks." },
        "Aquarius": { score: 90, description: "Freedom-loving and progressive!" },
        "Pisces": { score: 60, description: "Opposite signs - different but intriguing." }
    },
    "Capricorn": {
        "Aries": { score: 45, description: "Different approaches to life and goals." },
        "Taurus": { score: 95, description: "Power couple! Both value security and success." },
        "Gemini": { score: 35, description: "Serious Capricorn dampens Gemini's playfulness." },
        "Cancer": { score: 75, description: "Opposite signs with complementary strengths." },
        "Leo": { score: 45, description: "Different values and life approaches." },
        "Virgo": { score: 95, description: "Ambitious earth signs - excellent team!" },
        "Libra": { score: 55, description: "Different priorities - work vs play." },
        "Scorpio": { score: 85, description: "Ambitious and powerful partnership." },
        "Sagittarius": { score: 50, description: "Optimistic vs pessimistic outlooks." },
        "Capricorn": { score: 80, description: "Hardworking but may lack spontaneity." },
        "Aquarius": { score: 60, description: "Traditional vs unconventional." },
        "Pisces": { score: 70, description: "Grounding earth meets dreamy water." }
    },
    "Aquarius": {
        "Aries": { score: 80, description: "Innovative and exciting relationship." },
        "Taurus": { score: 45, description: "Traditional vs unconventional creates friction." },
        "Gemini": { score: 90, description: "Innovative and intellectually stimulating." },
        "Cancer": { score: 35, description: "Emotional Cancer vs detached Aquarius." },
        "Leo": { score: 65, description: "Opposite signs - intriguing but challenging." },
        "Virgo": { score: 50, description: "Traditional vs progressive viewpoints." },
        "Libra": { score: 90, description: "Intellectual air signs - great match!" },
        "Scorpio": { score: 40, description: "Emotional intensity vs detachment." },
        "Sagittarius": { score: 90, description: "Freedom-loving and progressive!" },
        "Capricorn": { score: 60, description: "Traditional vs unconventional." },
        "Aquarius": { score: 75, description: "Unique understanding but may be too detached." },
        "Pisces": { score: 55, description: "Head vs heart - different wavelengths." }
    },
    "Pisces": {
        "Aries": { score: 35, description: "Very different emotional needs and expressions." },
        "Taurus": { score: 80, description: "Gentle and romantic partnership." },
        "Gemini": { score: 50, description: "Logic vs emotion creates misunderstanding." },
        "Cancer": { score: 90, description: "Dreamy and romantic water sign connection." },
        "Leo": { score: 50, description: "Leo's boldness vs Pisces's sensitivity." },
        "Virgo": { score: 75, description: "Opposite signs with healing potential." },
        "Libra": { score: 65, description: "Romantic but may lack grounding." },
        "Scorpio": { score: 95, description: "Intuitive water sign soulmates." },
        "Sagittarius": { score: 60, description: "Opposite signs - different but intriguing." },
        "Capricorn": { score: 70, description: "Grounding earth meets dreamy water." },
        "Aquarius": { score: 55, description: "Head vs heart - different wavelengths." },
        "Pisces": { score: 70, description: "Deeply empathetic but may lack boundaries." }
    }
};

// Moon Phases
export const getMoonPhase = (date = new Date()) => {
    const lunarMonth = 29.53058867; // days
    const knownNewMoon = new Date('2000-01-06'); // A known new moon
    const daysSinceKnownNewMoon = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
    const phase = (daysSinceKnownNewMoon % lunarMonth) / lunarMonth;

    if (phase < 0.0625 || phase >= 0.9375) return { name: "New Moon", emoji: "🌑", description: "New beginnings, set intentions" };
    if (phase < 0.1875) return { name: "Waxing Crescent", emoji: "🌒", description: "Building energy, take action" };
    if (phase < 0.3125) return { name: "First Quarter", emoji: "🌓", description: "Overcome challenges, make decisions" };
    if (phase < 0.4375) return { name: "Waxing Gibbous", emoji: "🌔", description: "Refine and perfect your plans" };
    if (phase < 0.5625) return { name: "Full Moon", emoji: "🌕", description: "Culmination, release what doesn't serve you" };
    if (phase < 0.6875) return { name: "Waning Gibbous", emoji: "🌖", description: "Gratitude and sharing" };
    if (phase < 0.8125) return { name: "Last Quarter", emoji: "🌗", description: "Let go, forgive, rest" };
    return { name: "Waning Crescent", emoji: "🌘", description: "Surrender, recuperate, reflect" };
};
